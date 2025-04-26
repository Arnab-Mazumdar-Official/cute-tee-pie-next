import { NextRequest, NextResponse } from 'next/server'
import { generateResetToken } from "../../../../helpers/user";

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  console.log("payload +++++++", req);
  let response: any

  response = await generateResetToken(req);


  return NextResponse.json({
    success: true,
    status: 200,
    message: "Password reset link send successfully",
    data: response,
  });
}