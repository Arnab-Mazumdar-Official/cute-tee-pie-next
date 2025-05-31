import { usercollectionList } from "../../../../helpers/collections";


import { NextResponse } from "next/server";


export const GET = async () => {


  const response = await usercollectionList();




  return NextResponse.json({
    success: true,
    status: 200,
    data: response,
  });
}