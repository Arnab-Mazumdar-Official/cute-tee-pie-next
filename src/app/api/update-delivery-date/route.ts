import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '../../../../db/dbConnect'; // Update path as needed
import Orders from '../../../../models/orders'; // Update path as needed

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { orderId, deliveryDate } = await req.json();

    if (!orderId || !deliveryDate) {
      return NextResponse.json({ error: 'Missing orderId or deliveryDate' }, { status: 400 });
    }

    const result = await Orders.updateOne(
      { _id: new mongoose.Types.ObjectId(orderId) },
      { $set: { delivery_date: deliveryDate } }
    );

    if (result.modifiedCount > 0) {
      return NextResponse.json({ message: 'Delivery date updated successfully' });
    } else {
      return NextResponse.json({ message: 'No changes made' }, { status: 200 });
    }
  } catch (error) {
    console.error('Error updating delivery date:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
