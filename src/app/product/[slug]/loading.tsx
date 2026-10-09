import React from "react";

export default function ProductLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8 animate-pulse">
      <div className="w-36 h-4 bg-slate-200 rounded-md" />
      <div className="h-64 bg-slate-200 rounded-3xl" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="h-32 bg-slate-200 rounded-2xl" />
        <div className="h-32 bg-slate-200 rounded-2xl" />
        <div className="h-32 bg-slate-200 rounded-2xl" />
      </div>

      <div className="h-80 bg-slate-200 rounded-3xl" />
    </div>
  );
}
