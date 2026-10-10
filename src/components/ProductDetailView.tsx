"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Product } from "@/types";
import { toBengaliNumber, formatUnit } from "@/lib/bangla";
import { showToast } from "@/lib/toast";
import { Lock } from "lucide-react";

interface ProductDetailViewProps {
  product: Product | null;
  slug: string;
}

export default function ProductDetailView({ product, slug }: ProductDetailViewProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user && !hasRedirected) {
      setHasRedirected(true);
      showToast("error", "পণ্যটির বিস্তারিত দেখতে অনুগ্রহ করে প্রথমে সাইন ইন করুন", {
        id: "product-detail-redirect",
        persistNextPage: true,
      });
      router.replace(`/signin?redirect=/product/${encodeURIComponent(slug)}`);
    }
  }, [isPending, session, slug, router, hasRedirected]);

  const markets = product?.markets ?? [];

  const { minPrice, maxPrice, avgPrice } = (() => {
    if (!markets.length) {
      const today = product?.today || 0;
      return { minPrice: today, maxPrice: today, avgPrice: today };
    }
    let min = Infinity, max = -Infinity, sum = 0;
    for (const m of markets) {
      if (m.min < min) min = m.min;
      if (m.max > max) max = m.max;
      sum += (m.min + m.max) / 2;
    }
    return {
      minPrice: min === Infinity ? product?.today || 0 : min,
      maxPrice: max === -Infinity ? product?.today || 0 : max,
      avgPrice: Math.round(sum / markets.length),
    };
  })();

  if (isPending) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-6 animate-pulse">
        <div className="w-36 h-4 bg-gray-200 rounded-md" />
        <div className="h-44 bg-white rounded-2xl border border-gray-100" />
        <div className="grid grid-cols-3 gap-5">
          <div className="h-28 bg-white rounded-2xl border border-gray-100" />
          <div className="h-28 bg-white rounded-2xl border border-gray-100" />
          <div className="h-28 bg-white rounded-2xl border border-gray-100" />
        </div>
        <div className="h-64 bg-white rounded-2xl border border-gray-100" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-3xl border border-gray-100 text-center shadow-lg space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">লগইন প্রয়োজন</h2>
        <p className="text-xs sm:text-sm text-gray-500">
          এটি একটি সংরক্ষিত পেজ। আপনাকে সাইন ইন পেজে নিয়ে যাওয়া হচ্ছে...
        </p>
        <div className="pt-2">
          <Link
            href={`/signin?redirect=/product/${encodeURIComponent(slug)}`}
            className="inline-block px-5 py-2.5 rounded-xl bg-[#0f7a3f] text-white font-bold text-xs sm:text-sm"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center text-4xl shadow-xs">
          🔍
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-gray-900">
            পণ্যটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            আপনি যে পণ্যের তথ্য খুঁজছেন ({slug}) তা ডাটাবেজে পাওয়া যায়নি।
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f7a3f] hover:bg-[#0c6634] text-white font-bold text-sm transition-all"
          >
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pct = Math.abs(product.change?.pct ?? 0);
  const unitFormatted = formatUnit(product.unit);
  const diffPrice = Math.abs(product.today - (product.yesterday || product.today));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7">
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
        <Link href="/" className="hover:text-[#0f7a3f] transition-colors">
          হোম
        </Link>
        <span>&gt;</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-[#0f7a3f] transition-colors"
        >
          {product.categoryNameBn || "ক্যাটেগরি"}
        </Link>
        <span>&gt;</span>
        <span className="text-gray-900 font-bold">{product.nameBn}</span>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-[#f4f7f5] flex items-center justify-center text-4xl sm:text-5xl shrink-0">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {product.nameBn}
            </h1>
            <p className="text-xs text-gray-400 font-medium">
              {unitFormatted} • {product.categoryNameBn || "নিত্যপণ্য"}
            </p>
            <p className="text-xs text-gray-600 font-medium pt-0.5">
              গতকালকের তুলনায় আজ দাম {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"} • {toBengaliNumber(diffPrice || pct)} {diffPrice ? "টাকা" : "%"}
            </p>
          </div>
        </div>

        <div className="bg-[#f4f7f5] rounded-2xl p-4 sm:py-4 sm:px-6 text-center shrink-0 min-w-[140px] space-y-0.5">
          <span className="text-xs text-gray-400 font-semibold block">
            আজকের গড়
          </span>
          <div className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            {toBengaliNumber(avgPrice || product.today)}
          </div>
          <div className="text-xs text-gray-500 font-medium">
            টাকা / {unitFormatted.replace("প্রতি ", "")}
          </div>
          <div
            className={`text-xs font-bold pt-0.5 ${
              isUp
                ? "text-emerald-700"
                : isDown
                ? "text-rose-600"
                : "text-gray-400"
            }`}
          >
            {isUp ? "▲ " : isDown ? "▼ " : "— "}
            {toBengaliNumber(pct)}%
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-gray-900">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-[#fbfcfb] rounded-xl border border-gray-100 p-5 space-y-1">
            <span className="text-xs text-gray-400 font-semibold block">
              সর্বনিম্ন দাম
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">
              {toBengaliNumber(minPrice)} টাকা
            </div>
            <p className="text-xs text-gray-400 font-medium pt-0.5">
              সবচেয়ে কম দামের বাজার
            </p>
          </div>

          <div className="bg-[#fbfcfb] rounded-xl border border-gray-100 p-5 space-y-1">
            <span className="text-xs text-gray-400 font-semibold block">
              সর্বোচ্চ দাম
            </span>
            <div className="text-2xl sm:text-3xl font-black text-red-600">
              {toBengaliNumber(maxPrice)} টাকা
            </div>
            <p className="text-xs text-gray-400 font-medium pt-0.5">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          <div className="bg-[#fbfcfb] rounded-xl border border-gray-100 p-5 space-y-1">
            <span className="text-xs text-gray-400 font-semibold block">
              গড় দাম
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">
              {toBengaliNumber(avgPrice)} টাকা
            </div>
            <p className="text-xs text-gray-400 font-medium pt-0.5">
              {unitFormatted} এর হিসাব
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {markets.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            এই পণ্যের বাজারভিত্তিক কোনো তথ্য পাওয়া যায়নি।
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f7faf7] border-b border-gray-100 text-gray-500 text-xs font-bold">
                    <th className="py-3.5 px-6">বাজার</th>
                    <th className="py-3.5 px-6">বিভাগ</th>
                    <th className="py-3.5 px-6 text-center">সর্বনিম্ন</th>
                    <th className="py-3.5 px-6 text-center">সর্বোচ্চ</th>
                    <th className="py-3.5 px-6 text-right">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm font-medium">
                  {markets.map((market, idx) => {
                    const avg = Math.round(((market.min + market.max) / 2) * 10) / 10;
                    return (
                      <tr
                        key={`${market.market}-${idx}`}
                        className="hover:bg-[#fbfcfb] transition-colors"
                      >
                        <td className="py-3.5 px-6 font-bold text-gray-900">
                          {market.market}
                        </td>
                        <td className="py-3.5 px-6 text-gray-600">
                          {market.division}
                        </td>
                        <td className="py-3.5 px-6 text-center text-gray-700">
                          {toBengaliNumber(market.min)} টাকা
                        </td>
                        <td className="py-3.5 px-6 text-center text-gray-700">
                          {toBengaliNumber(market.max)} টাকা
                        </td>
                        <td className="py-3.5 px-6 text-right font-bold text-gray-900">
                          {toBengaliNumber(avg)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
