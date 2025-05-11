import { NextRequest, NextResponse } from 'next/server';
import { addToCart,cartList } from '../../../../helpers/cart';
import dbConnect from '../../../../db/dbConnect';
import add_to_cart from '../../../../models/cart';

export const POST = async (request: NextRequest) => {
  try {
    const req = await request.json();

    console.log("Cart Data----------->>",req);
    
    const response = await addToCart(req);

    return NextResponse.json({
      success: true,
      status: 200,
      message: 'Cart saved successfully',
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


export const GET = async (req: Request) => {
    console.log("product List Debug 4");
  
    // Extract user_id from the query parameters
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
  
    if (!user_id) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Missing user_id in query parameters",
      });
    }
  
    const response = await cartList(user_id);
  
    console.log("product List Debug 5");
  
    return NextResponse.json({
      success: true,
      status: 200,
      data: response.cartData,
    });
  };


  export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { _id } = body;

    if (!_id) {
      return NextResponse.json({ success: false, message: 'Missing _id' }, { status: 400 });
    }

    await dbConnect();

    const deletedItem = await add_to_cart.findByIdAndDelete(_id);

    if (!deletedItem) {
      return NextResponse.json({ success: false, message: 'Cart item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Cart item deleted' }, { status: 200 });
  } catch (error) {
    console.error('Delete cart error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}