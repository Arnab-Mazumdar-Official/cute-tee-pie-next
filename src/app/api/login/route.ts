import { NextRequest, NextResponse } from 'next/server'
import { login } from "../../../../helpers/user";

export const POST = async (request: NextRequest) => {
    try {
      const req = await request.json();
      console.log("Payload received:", req);
  
      const { email, password, ipInfo } = req;
  
      if (!email || !password) {
        return NextResponse.json({
          success: false,
          status: 400,
          message: 'Email and password are required',
        });
      }
  
      const response = await login(req);
  
      if (response.message === 'Login successful') {
        return NextResponse.json({
          success: true,
          status: 200,
          message: response.message,
          data: response.results,
        });
      } else {
        // Return error message if login failed
        return NextResponse.json({
          success: false,
          status: 401,
          message: response.message,  // Error message from login function
        });
      }
  
    } catch (error) {
      console.error('Error during login:', error);
  
      return NextResponse.json({
        success: false,
        status: 500,
        message: 'Internal server error',
      });
    }
  }
