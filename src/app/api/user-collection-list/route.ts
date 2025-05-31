import { userallcollectionList } from "../../../../helpers/collections";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '0');
  const limit = parseInt(searchParams.get('limit') || '6');

  const skip = page * limit;

  const response = await userallcollectionList({ skip, limit });

  return NextResponse.json({
    success: true,
    status: 200,
    data: response,
  });
};