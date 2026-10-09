"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Category, Product, SortOption } from "@/types";
import ProductCard from "./ProductCard";
import SortFilter from "./SortFilter";
import { ArrowLeft } from "lucide-react";
import { toBengaliNumber, parseBengaliNumber } from "@/lib/bangla";

interface CategoryClientViewProps {
  category: Category | null;
  slug: string;
  initialProducts: Product[];
}

function getNumericPrice(p: Product): number {
  if (typeof p.today === "number") return p.today;
  return parseBengaliNumber(String(p.today ?? 0));
}

export default function CategoryClientView({
  category,
  slug,
  initialProducts,
}: CategoryClientViewProps) {
  const [currentSort, setCurrentSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    if (currentSort === "price-asc") {
      list.sort((a, b) => getNumericPrice(a) - getNumericPrice(b));
    } else if (currentSort === "price-desc") {
      list.sort((a, b) => getNumericPrice(b) - getNumericPrice(a));
    }
    return list;
  }, [initialProducts, currentSort]);

  if (!category || initialProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center text-4xl shadow-xs">
          📦
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-gray-900">
            এই ক্যাটেগরিতে কোনো পণ্য পাওয়া যায়নি
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            আপনি যে ক্যাটেগরিটি খুঁজছেন ({slug}) তা বর্তমানে বিদ্যমান নেই অথবা কোনো পণ্য তালিকাভুক্ত নেই।
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f7a3f] hover:bg-[#0c6634] text-white font-bold text-sm transition-all shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  const categoryIcon = category.icon || "🛒";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-5">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f4f7f5] flex items-center justify-center text-4xl sm:text-5xl shrink-0">
          {categoryIcon}
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {category.nameBn}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-medium">
            প্রতি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="bg-white p-4 sm:px-6 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-end">
        <SortFilter currentSort={currentSort} onSortChange={setCurrentSort} />
      </div>

      <div className="text-xs sm:text-sm font-semibold text-gray-400 pl-1">
        মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id || product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
