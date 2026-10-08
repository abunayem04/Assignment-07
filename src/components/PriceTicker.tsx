"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { toBengaliNumber, formatUnit } from "@/lib/bangla";

interface PriceTickerProps {
  initialProducts?: Product[];
}

export default function PriceTicker({ initialProducts = [] }: PriceTickerProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    if (products.length === 0) {
      fetch("/api/bazardor/products")
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setProducts(data);
          }
        })
        .catch(() => {});
    }
  }, [products.length]);

  if (!products || products.length === 0) {
    return null;
  }

  const tickerItems = [...products, ...products];

  return (
    <div className="bg-[#fafbfa] border-y border-gray-100/90 text-gray-700 overflow-hidden py-2 select-none">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {tickerItems.map((item, index) => {
          const isUp = item.change?.dir === "up";
          const isDown = item.change?.dir === "down";
          const pct = Math.abs(item.change?.pct ?? 0);
          const unit = formatUnit(item.unit).replace("প্রতি ", "");

          return (
            <Link
              key={`${item.id}-${index}`}
              href={`/product/${item.slug || item.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium hover:text-[#0f7a3f] transition-colors cursor-pointer"
            >
              <span className="text-sm">{item.image || item.categoryIcon || "🛒"}</span>
              <span className="text-gray-800 font-bold">{item.nameBn}</span>
              <span className="text-gray-600 font-medium">
                {toBengaliNumber(item.today)} টাকা/{unit}
              </span>
              <span
                className={`font-bold ${
                  isUp
                    ? "text-emerald-700"
                    : isDown
                    ? "text-rose-600"
                    : "text-gray-400"
                }`}
              >
                {isUp ? "▲ " : isDown ? "▼ " : "— "}
                {toBengaliNumber(pct)}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
