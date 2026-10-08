"use client";

import React from "react";
import { Product, Category } from "@/types";
import ProductCard from "./ProductCard";

interface AllProductsGridProps {
  initialProducts: Product[];
  initialCategories?: Category[];
}

export default function AllProductsGrid({
  initialProducts,
}: AllProductsGridProps) {
  return (
    <div id="সব-পণ্য" className="space-y-6 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">সব পণ্য</h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            দৈনন্দিন খাদ্য ও নিত্যপ্রয়োজনীয় সকল পণ্যের সর্বশেষ খুচরা ও পাইকারি বাজারদর।
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {initialProducts.map((product) => (
          <ProductCard key={product.id || product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
