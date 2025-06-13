import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../db/dbConnect';
import products from '../../../../models/products';

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // connect to MongoDB

    const body = await req.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const product = await products.findOne({ slug });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ image: product.thumbnail_url });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
