import { collectionList } from "../../../../helpers/collections";


import { NextResponse } from "next/server";


export const GET = async () => {


  const response = await collectionList();




  return NextResponse.json({
    success: true,
    status: 200,
    data: response,
  });
}
