"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Product, Category, SortOption } from "@/types";
import ProductCard from "./ProductCard";
import SortFilter from "./SortFilter";
import { LayoutGrid } from "lucide-react";
import { toBengaliNumber, parseBengaliNumber } from "@/lib/bangla";

interface AllProductsGridProps {
  initialProducts: Product[];
  initialCategories?: Category[];
}

function getNumericPrice(p: Product): number {
  if (typeof p.today === "number") return p.today;
  return parseBengaliNumber(String(p.today ?? 0));
}

export default function AllProductsGrid({
  initialProducts,
  initialCategories = [],
}: AllProductsGridProps) {
  const [currentSort, setCurrentSort] = useState<SortOption>("default");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  useEffect(() => {
    if (categories.length === 0) {
      fetch("/api/bazardor/categories")
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setCategories(data);
          }
        })
        .catch(() => {});
    }
  }, [categories.length]);

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...initialProducts];

    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (currentSort === "price-asc") {
      list.sort((a, b) => getNumericPrice(a) - getNumericPrice(b));
    } else if (currentSort === "price-desc") {
      list.sort((a, b) => getNumericPrice(b) - getNumericPrice(a));
    }

    return list;
  }, [initialProducts, selectedCategory, currentSort]);

  return (
    <div id="সব-পণ্য" className="space-y-6 scroll-mt-24">
      <span id="all-products" className="block relative -top-24 invisible" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">
            সব পণ্য
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            দৈনন্দিন খাদ্য ও নিত্যপ্রয়োজনীয় সকল পণ্যের সর্বশেষ খুচরা ও পাইকারি বাজারদর।
          </p>
        </div>

        <div className="shrink-0">
          <SortFilter currentSort={currentSort} onSortChange={setCurrentSort} />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
            selectedCategory === "all"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>সব ({toBengaliNumber(initialProducts.length)})</span>
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          const count = initialProducts.filter((p) => p.category === cat.slug).length;
          return (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                isSelected
                  ? "bg-[#0f7a3f] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.nameBn}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? "bg-[#0c6634] text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {toBengaliNumber(count)}
              </span>
            </button>
          );
        })}
      </div>

      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8 space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="text-base font-bold text-gray-800">কোনো পণ্য পাওয়া যায়নি</h3>
          <p className="text-xs text-gray-500">
            অনুগ্রহ করে অন্য ক্যাটেগরি নির্বাচন করুন।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id || product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
