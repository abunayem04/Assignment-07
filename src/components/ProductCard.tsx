import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { toBengaliNumber, formatUnit } from "@/lib/bangla";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pct = Math.abs(product.change?.pct ?? 0);
  const unitLabel = formatUnit(product.unit);

  return (
    <Link
      href={`/product/${product.slug || product.id}`}
      className="group bg-white rounded-2xl border border-gray-100/90 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-200 p-5 flex flex-col justify-between cursor-pointer"
    >
      <div className="flex items-center gap-3.5">
        <div className="w-13 h-13 rounded-2xl bg-[#f4f7f5] flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform duration-200">
          {product.image || product.categoryIcon || "🛒"}
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900 group-hover:text-[#0f7a3f] transition-colors line-clamp-1">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">
            {unitLabel}
          </p>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-gray-50 flex items-end justify-between">
        <div>
          <span className="text-[11px] text-gray-400 font-semibold block">
            আজকের দাম
          </span>
          <div className="text-xl font-black text-gray-900 tracking-tight">
            {toBengaliNumber(product.today)} <span className="text-sm font-bold text-gray-700">টাকা</span>
          </div>
        </div>

        <div>
          <span
            className={`inline-flex items-center gap-0.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
              isUp
                ? "bg-emerald-50 text-emerald-700"
                : isDown
                ? "bg-rose-50 text-rose-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            <span>{isUp ? "▲ " : isDown ? "▼ " : "— "}</span>
            <span>{toBengaliNumber(pct)}%</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
