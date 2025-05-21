import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '../../../../db/dbConnect';
import users from '../.././../../models/users';

export const POST = async (request: NextRequest) => {
    try {
      const req = await request.json();
      console.log("Payload received:", req);
  
      const { code } = req;
  
      if (!code ) {
        return NextResponse.json({
          success: false,
          status: 400,
          message: 'Code Required',
        });
      }
      await dbConnect();
  
      const response = await users.find({referralCode:code});
  
      if (response.length > 0) {
        return NextResponse.json({
          success: true,
          status: 200,
          is_reffer:true
        });
      } else {
        // Return error message if login failed
        return NextResponse.json({
          success: false,
          status: 401,
          is_reffer:false
        });
      }
  
    } catch (error) {
      console.error('Error during login:', error);
  
      return NextResponse.json({
        success: false,
        status: 500,
        is_reffer:false
      });
    }
  }
