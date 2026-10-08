"use client";

import React, { useState, useEffect } from "react";
import { getFormattedDate } from "@/lib/bangla";

export default function Hero() {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [categoriesText, setCategoriesText] = useState<string>("");

  useEffect(() => {
    setCurrentDate(getFormattedDate());
  }, []);

  useEffect(() => {
    fetch("/api/bazardor/categories")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const names = data.map((c: { nameBn: string }) => c.nameBn).join(", ");
          setCategoriesText(names);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
      <div className="bg-[#ecf7ee] rounded-3xl p-8 sm:p-12 lg:p-14 overflow-hidden relative border border-[#e1f0e4]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block bg-[#dbede0] text-[#1c7430] text-xs font-bold px-4 py-1.5 rounded-full">
              {currentDate}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a2f22] tracking-tight leading-[1.2]">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="text-sm sm:text-base text-[#4a6353] leading-relaxed max-w-lg font-medium">
              {categoriesText ? `${categoriesText} ইত্যাদির দাম` : "নিত্যপ্রয়োজনীয় পণ্যের বাজারদর"} — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <div className="pt-2">
              <a
                href="#সব-পণ্য"
                className="inline-block bg-[#0f7a3f] hover:bg-[#0c6634] text-white px-7 py-3 rounded-xl font-bold text-sm shadow-xs transition-all duration-200 cursor-pointer"
              >
                বাজার দর দেখুন
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] flex items-center justify-center">
              <img
                src="/bazar-hero.png"
                alt="বাজার দর"
                className="w-full h-auto object-contain drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
