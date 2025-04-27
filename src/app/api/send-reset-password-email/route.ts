import { NextRequest, NextResponse } from 'next/server'
import { generateResetToken } from "../../../../helpers/user";

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  console.log("payload +++++++", req);

  const response = await generateResetToken(req);

  return NextResponse.json({
    success: true,
    status: 200,
    message: "Password reset link sent successfully",
    data: response,
  });
}
