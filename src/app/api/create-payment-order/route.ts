// app/api/payment/order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: NextRequest) {
  console.log('Received request to create Razorpay order');

  try {
    const body = await req.json();
    console.log('Request body:', body);

    const { amount } = body;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      console.warn('Invalid or missing amount in request:', amount);
      return NextResponse.json(
        { success: false, message: 'Invalid amount' },
        { status: 400 }
      );
    }

    console.log('Initializing Razorpay instance');
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_PAYMENT_TOKEN!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    console.log(`Creating order with amount: ${amount} (converted to paise: ${amount * 100})`);
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
    });

    console.log('Razorpay order created:', order);

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);

    return NextResponse.json(
      { success: false, message: 'Error creating Razorpay order' },
      { status: 500 }
    );
  }
}
