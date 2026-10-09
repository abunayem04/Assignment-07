import React from "react";
import { getProductBySlug } from "@/lib/api";
import ProductDetailView from "@/components/ProductDetailView";
import type { Metadata } from "next";


interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const product = await getProductBySlug(decodedSlug);

  return {
    title: product
      ? `${product.nameBn} এর আজকের বাজারদর - বাজার দর`
      : "পণ্যের বিবরণ - বাজার দর",
    description: product
      ? `${product.nameBn} এর সর্বশেষ খুচরা ও পাইকারি বাজারদর, সর্বনিম্ন, সর্বোচ্চ ও গড় মূল্য তালিকা।`
      : "নিত্যপ্রয়োজনীয় পণ্যের বাজারদর",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const product = await getProductBySlug(decodedSlug);

  return <ProductDetailView product={product} slug={decodedSlug} />;
}
