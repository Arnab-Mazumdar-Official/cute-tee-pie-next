import { referelEarningList } from "../../../../helpers/products";
import { NextResponse } from "next/server";


export const GET = async () => {

    console.log("Referrel List Debug 4");
  const response = await referelEarningList();

  console.log("Referrel List Debug 5");


  return NextResponse.json({
    success: true,
    status: 200,
    data: response,
  });
}
