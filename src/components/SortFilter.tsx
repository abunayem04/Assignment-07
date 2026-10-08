"use client";

import React, { useState, useRef, useEffect } from "react";
import { SortOption } from "@/types";
import { ChevronDown, Check } from "lucide-react";

interface SortFilterProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "ডিফল্ট", value: "default" },
  { label: "দাম: কম থেকে বেশি", value: "price-asc" },
  { label: "দাম: বেশি থেকে কম", value: "price-desc" },
];

export default function SortFilter({ currentSort, onSortChange }: SortFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLabel = SORT_OPTIONS.find((opt) => opt.value === currentSort)?.label || "ডিফল্ট";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 font-medium">
          সাজান
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:border-gray-300 text-xs sm:text-sm font-semibold text-gray-800 shadow-xs transition-all cursor-pointer min-w-[130px]"
        >
          <span>{activeLabel}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white border border-gray-100 shadow-lg z-30 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {SORT_OPTIONS.map((option) => {
            const isSelected = currentSort === option.value;
            return (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm font-bold transition-colors text-left cursor-pointer ${
                  isSelected
                    ? "bg-emerald-50 text-[#0f7a3f]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="w-4 h-4 text-[#0f7a3f]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
