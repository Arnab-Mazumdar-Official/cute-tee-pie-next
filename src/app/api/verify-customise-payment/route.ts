import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '../../../../db/dbConnect';
import customise_orders from '../.././../../models/customise_orders';

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
          size,
          color,
          quantity,
          product,
          amount
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
      size,
      color,
      quantity,
      product,
      amount
    });

    // Validate all required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !user_id || !Array.isArray(product)) {
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


      const orderDoc = {
        razorpay_order_id,
        razorpay_payment_id,
        status: 'failed',
        verified: false,
        user_id,
        product,
        size,
        color,
        quantity,
        source:"Customise",
        amount,
        desposition:'On Hold'
      };
      const created = await customise_orders.create(orderDoc);
      console.log('✅ Order saved for product:', created);
      return NextResponse.json(
        {
          success: false,
          message: 'Payment verification failed',
          result: created,
        },
        { status: 400 }
      );
    }
    else{
        const orderDoc = {
        razorpay_order_id,
        razorpay_payment_id,
        status: 'success',
        verified: true,
        user_id,
        product,
        size,
        color,
        quantity,
        source:"Customise",
        amount,
        desposition:'Received'
      };
      const created = await customise_orders.create(orderDoc);
      console.log('✅ Order saved for product:', created);

    return NextResponse.json(
      {
        success: true,
        message: 'Payment verified and customise_orders created successfully',
        results: created,
      },
      { status: 200 }
    );
    }
      

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
