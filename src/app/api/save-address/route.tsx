import { NextRequest, NextResponse } from 'next/server';
import { saveaddress_collcetion,address_collcetionList } from '../../../../helpers/address';
import {sendPaymentInitiationNotification} from '../../../../helpers/user'

export const POST = async (request: NextRequest) => {
  try {
    const req = await request.json();


    const response = await saveaddress_collcetion(req);

    return NextResponse.json({
      success: true,
      status: 200,
      message: 'Address saved successfully',
      data: response,
    });
  } catch (error: any) {
    console.error('Error saving address:', error);

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
  
    const response = await address_collcetionList(user_id);
  
    console.log("product List Debug 5");
    await sendPaymentInitiationNotification();
    return NextResponse.json({
      success: true,
      status: 200,
      data: response.address,
    });
  };
