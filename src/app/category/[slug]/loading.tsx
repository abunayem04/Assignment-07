import React from "react";
import SkeletonCard from "@/components/SkeletonCard";

export default function CategoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
      <div className="w-36 h-4 bg-slate-200 rounded-md" />

      <div className="flex items-center justify-between bg-white p-8 rounded-3xl border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-200" />
          <div className="space-y-2">
            <div className="w-40 h-7 bg-slate-200 rounded-md" />
            <div className="w-64 h-4 bg-slate-200 rounded-md" />
          </div>
        </div>
        <div className="w-44 h-10 bg-slate-200 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
