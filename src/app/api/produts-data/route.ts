import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../db/dbConnect';
import products from '../../../../models/products';


export async function POST(req: NextRequest) {
  await dbConnect();


  try {
    const body = await req.json();
    const { id } = body;


    if (!id) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: 'Missing category ID in request body',
        data: null,
      }, { status: 400 });
    }


    const response = await products.findById(id);


    if (!response) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: 'Category not found',
        data: null,
      }, { status: 404 });
    }


    return NextResponse.json({
      success: true,
      status: 200,
      message: 'Category fetched successfully',
      data: response,
    });


  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: 'Server error',
    }, { status: 500 });
  }
}
