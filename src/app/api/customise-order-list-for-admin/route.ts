import { customiseOrderList } from "../../../../helpers/products";
import { NextResponse } from "next/server";


export const GET = async () => {

    console.log("product List Debug 4");
  const response = await customiseOrderList();

  console.log("product List Debug 5");


  return NextResponse.json({
    success: true,
    status: 200,
    data: response,
  });
}
