import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '../../../../db/dbConnect';
import Orders from '../.././../../models/orders';
import {sendOrderNotification} from '../../../../helpers/user'

export async function POST(req: NextRequest) {
  try {
    console.log('🔐 Starting Razorpay payment verification');

    await dbConnect();
    console.log('✅ Database connected');

    const body = await req.json();
    console.log("body------>>", body);

    // Destructure correctly from nested response
    const {
      response,
      user_id,
      amount,
      quantity,
      products = [],
    } = body || {};

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = response || {};

    console.log('📦 Received payload:', {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      user_id,
      amount,
      products,
      quantity
    });

    // Validate all required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !user_id || !Array.isArray(products)) {
      console.warn('⚠️ Missing required fields in request body');
      return NextResponse.json(
        { success: false, message: 'Missing required Razorpay or product fields' },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      console.error('❌ Missing Razorpay secret key in environment variables');
      return NextResponse.json(
        { success: false, message: 'Missing Razorpay secret key in environment variables' },
        { status: 500 }
      );
    }

    console.log('🔧 Generating signature...');
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    console.log('🧾 Generated Signature:', generatedSignature);
    console.log('🧾 Provided Signature:', razorpay_signature);

    const isValid = generatedSignature === razorpay_signature;
    console.log(`✅ Signature verification result: ${isValid ? 'VALID ✅' : 'INVALID ❌'}`);

    if (!isValid) {

      const source = products.length === 1 ? 'one_item' : 'multiple_item';
    console.log(`📚 Saving ${products.length} order(s) with source: ${source}`);

    const createdOrders = await Promise.all(products.map(async (item) => {
      const orderDoc = {
        razorpay_order_id,
        razorpay_payment_id,
        status: 'failed',
        verified: false,
        user_id,
        product_id: item.product_id,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        source,
        amount,
        desposition:'On Hold'
      };
      const created = await Orders.create(orderDoc);
      console.log('✅ Order saved for product:', item.product_id);
      return created;
    }));
    await sendOrderNotification();
      return NextResponse.json(
        {
          success: false,
          message: 'Payment verification failed',
          order_count: createdOrders.length,
        },
        { status: 400 }
      );
    }

    const source = products.length === 1 ? 'one_item' : 'multiple_item';
    console.log(`📚 Saving ${products.length} order(s) with source: ${source}`);

    const createdOrders = await Promise.all(products.map(async (item) => {
      const orderDoc = {
        razorpay_order_id,
        razorpay_payment_id,
        status: 'success',
        verified: true,
        user_id,
        product_id: item.product_id,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        source,
        amount,
        desposition:'Received'
      };
      const created = await Orders.create(orderDoc);
      console.log('✅ Order saved for product:', item.product_id);
      return created;
    }));
    await sendOrderNotification();
    return NextResponse.json(
      {
        success: true,
        message: 'Payment verified and orders created successfully',
        order_count: createdOrders.length,
      },
      { status: 200 }
    );

  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error during payment verification:', errMsg);

    return NextResponse.json(
      {
        success: false,
        message: 'Server error',
        error: errMsg,
      },
      { status: 500 }
    );
  }
}
