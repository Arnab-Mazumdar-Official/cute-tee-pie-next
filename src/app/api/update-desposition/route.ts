import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../db/dbConnect'
import Orders from '../../../../models/orders'
import mongoose from 'mongoose';

export async function PUT(req: NextRequest) {
  try {
    await dbConnect(); // Connect to MongoDB

    const body = await req.json();
    const { id, desposition } = body;

    if (!id || !desposition) {
      return NextResponse.json({ error: 'Missing id or desposition' }, { status: 400 });
    }

    const response = await Orders.updateMany(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { desposition } }
    );

    if (response.modifiedCount > 0) {
      return NextResponse.json({ message: 'Desposition updated successfully' });
    } else {
      return NextResponse.json({ message: 'No matching records updated' });
    }
  } catch (error) {
    console.error('Error updating desposition:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

