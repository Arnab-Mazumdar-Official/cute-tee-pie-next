import { NextRequest, NextResponse } from 'next/server';
import { getProductByid } from '../../../../helpers/products';

// Properly type the params
export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body from the request
    const body = await req.json();
    const { product_id } = body;
    console.log("Product ID ---------->>",product_id);
    

    if (!product_id) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: 'Product id is required',
        },
        { status: 400 }
      );
    }

    // Fetch product based on the provided product name
    const product = await getProductByid(product_id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          status: 404,
          message: 'Product not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        status: 200,
        data: product,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
