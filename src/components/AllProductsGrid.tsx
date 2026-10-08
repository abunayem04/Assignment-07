"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Product, Category, SortOption } from "@/types";
import ProductCard from "./ProductCard";
import SortFilter from "./SortFilter";

interface AllProductsGridProps {
  initialProducts: Product[];
  initialCategories?: Category[];
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
      list.sort((a, b) => Number(a.today) - Number(b.today));
    } else if (currentSort === "price-desc") {
      list.sort((a, b) => Number(b.today) - Number(a.today));
    }
    return list;
  }, [initialProducts, selectedCategory, currentSort]);

  return (
    <div id="সব-পণ্য" className="space-y-6 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">সব পণ্য</h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            দৈনন্দিন খাদ্য ও নিত্যপ্রয়োজনীয় সকল পণ্যের সর্বশেষ খুচরা ও পাইকারি বাজারদর।
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SortFilter currentSort={currentSort} onSortChange={setCurrentSort} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAndSortedProducts.map((product) => (
          <ProductCard key={product.id || product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
