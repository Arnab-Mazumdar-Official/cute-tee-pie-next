import { productListByType } from "../../../../helpers/products";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const rawType = searchParams.get("id");
    const type = rawType ? rawType.replace(/_/g, " ").trim() : null;

    const page = parseInt(searchParams.get("page") || "0");
    const limit = parseInt(searchParams.get("limit") || "6");
    const skip = page * limit;

    console.log("Debug Api------------>>", type);

    if (!type) {
      return NextResponse.json(
        { success: false, message: "Missing type" },
        { status: 400 }
      );
    }

    const response = await productListByType({ type, skip, limit });

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
