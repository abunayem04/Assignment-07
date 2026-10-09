import React from "react";
import { getCategoryBySlug, getProducts } from "@/lib/api";
import CategoryClientView from "@/components/CategoryClientView";
import type { Metadata } from "next";


interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const category = await getCategoryBySlug(decodedSlug);

  return {
    title: category
      ? `${category.nameBn} এর বাজারদর - বাজার দর`
      : "ক্যাটেগরি - বাজার দর",
    description: category
      ? `${category.nameBn} ক্যাটেগরির সকল নিত্যপণ্যের আজকের নির্ভরযোগ্য বাজারদর ও মূল্যতালিকা।`
      : "নিত্যপ্রয়োজনীয় পণ্যের বাজারদর",
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  
  const [category, products] = await Promise.all([
    getCategoryBySlug(decodedSlug),
    getProducts(decodedSlug),
  ]);

  return (
    <CategoryClientView
      category={category}
      slug={decodedSlug}
      initialProducts={products}
    />
  );
}
