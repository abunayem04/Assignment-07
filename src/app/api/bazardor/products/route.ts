import { NextResponse } from "next/server";
import { getProducts } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const products = await getProducts(category);
  return NextResponse.json(products);
}
