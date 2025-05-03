// import { NextRequest, NextResponse } from 'next/server'
// import { createProducts } from "../../../../helpers/products";

import { NextResponse } from "next/server";

// export const POST = async (request: NextRequest) => {
//   const req = await request.json();
//   console.log("payload +++++++", req);
//   let response: any
// added a line here

//   response = await createProducts(req);


//   return NextResponse.json({
//     success: true,
//     status: 200,
//     message: req.id ? "Opportunity updated successfully" : "Opportunity created successfully",
//     data: response,
//   });
// }
// File: src/app/api/hello/route.ts

export async function GET() {
  return NextResponse.json({ message: 'Hello world!' })
}

