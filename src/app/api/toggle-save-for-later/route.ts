import { NextRequest, NextResponse } from 'next/server';
import { saveItLetter } from '../../../../helpers/cart';

export const POST = async (request: NextRequest) => {
  try {
    const req = await request.json();

    console.log("Cart Data----------->>",req);
    
    const response = await saveItLetter(req._id);

    return NextResponse.json({
      success: true,
      status: 200,
      message: 'Cart Update successfully',
      data: response,
    });
  } catch (error: any) {
    console.error('Error saving Cart:', error);

    return NextResponse.json({
      success: false,
      status: 500,
      message: 'Internal server error',
      error: error?.message || 'Unexpected error occurred',
    }, { status: 500 });
  }
};