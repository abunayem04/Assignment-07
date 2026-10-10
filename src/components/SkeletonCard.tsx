import React from "react";

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 animate-pulse flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="w-16 h-16 rounded-2xl bg-slate-200" />
        <div className="flex flex-col items-end gap-2">
          <div className="w-16 h-5 rounded-full bg-slate-200" />
          <div className="w-14 h-5 rounded-full bg-slate-200" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="w-3/4 h-5 rounded-md bg-slate-200" />
        <div className="w-1/3 h-4 rounded-md bg-slate-200" />
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="space-y-1.5">
          <div className="w-16 h-3 rounded-md bg-slate-200" />
          <div className="w-24 h-6 rounded-md bg-slate-200" />
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}
