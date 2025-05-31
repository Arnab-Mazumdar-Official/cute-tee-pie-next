import { productListByCategory } from "../../../../helpers/products";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("id");
    const page = parseInt(searchParams.get("page") || "0");
    const limit = parseInt(searchParams.get("limit") || "6");
    const skip = page * limit;

    if (!categoryId) {
      return NextResponse.json(
        { success: false, message: "Missing categoryId" },
        { status: 400 }
      );
    }

    const response = await productListByCategory({ categoryId, skip, limit });

    return NextResponse.json({
      success: true,
      status: 200,
      data: response,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};
