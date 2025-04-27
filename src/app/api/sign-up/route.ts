import { savedata } from "../../../../helpers/user";
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  console.log("payload +++++++", req);

  const response = await savedata(req);

  return NextResponse.json({
    success: true,
    status: 200,
    message: req.id ? "Opportunity updated successfully" : response.message,
    data: response,
  });
};
