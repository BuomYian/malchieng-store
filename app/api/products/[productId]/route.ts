import Collection from "@/lib/models/Collections";
import Product from "@/lib/models/products";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  rea: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();
    const product = await Product.findById(params.productId).populate({
      path: "collections",
      model: Collection,
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[productId_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
