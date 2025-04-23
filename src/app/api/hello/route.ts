import { NextRequest, NextResponse } from 'next/server'
import { createProducts } from "../../../../helpers/products";

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  console.log("payload +++++++", req);
  let response: any

  response = await createProducts(req);


  return NextResponse.json({
    success: true,
    status: 200,
    message: req.id ? "Opportunity updated successfully" : "Opportunity created successfully",
    data: response,
  });
}
