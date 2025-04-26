import { NextRequest, NextResponse } from 'next/server'
import { resetPassword } from "../../../../helpers/user";

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  console.log("payload +++++++", req);
  let response: any

  response = await resetPassword(req);


  return NextResponse.json({
    success: true,
    status: 200,
    message: "Password reset successfully",
    data: response,
  });
}
