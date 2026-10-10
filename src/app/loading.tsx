import React from "react";
import SkeletonCard from "@/components/SkeletonCard";

export default function HomeLoading() {
  return (
    <div className="space-y-12 pb-16 animate-pulse">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="bg-[#ecf7ee] rounded-3xl p-8 sm:p-12 lg:p-14 border border-[#e1f0e4]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="w-32 h-6 bg-slate-200/80 rounded-full" />
              <div className="w-3/4 h-10 bg-slate-200/80 rounded-xl" />
              <div className="w-full h-5 bg-slate-200/80 rounded-lg" />
              <div className="w-36 h-11 bg-slate-200/80 rounded-xl mt-4" />
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-64 h-56 bg-slate-200/60 rounded-3xl" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <section className="space-y-5">
          <div className="w-48 h-7 bg-slate-200 rounded-lg" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={`skel-a-${i}`} />
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <div className="w-48 h-7 bg-slate-200 rounded-lg" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={`skel-b-${i}`} />
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <div className="w-40 h-7 bg-slate-200 rounded-lg" />
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={`skel-cat-${i}`} className="w-20 h-8 bg-slate-200 rounded-full" />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={`skel-c-${i}`} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
