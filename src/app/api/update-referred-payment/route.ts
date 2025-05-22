import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../db/dbConnect'
import refferel_earning from '../../../../models/refferel_earning'
import mongoose from 'mongoose';

export async function PUT(req: NextRequest) {
  try {
    await dbConnect(); // Connect to MongoDB

    const body = await req.json();
    const { id, referred_paid } = body;

    if (!id || !referred_paid) {
      return NextResponse.json({ error: 'Missing id or referred_paid' }, { status: 400 });
    }

    const response = await refferel_earning.updateMany(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { refferel_payment_status:referred_paid } }
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

