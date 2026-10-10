import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-5 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xl">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl shadow-xs">
          🛒
        </div>

        <div className="space-y-1.5">
          <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider">
            ৪০৪ - পেজটি খুঁজে পাওয়া যায়নি
          </span>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            দুঃখিত! পৃষ্ঠাটি পাওয়া যায়নি
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
            আপনি যে পেজ বা পণ্যের তথ্য খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ঠিকানাটি ভুল।
          </p>
        </div>

        <div className="pt-3">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#0f7a3f] hover:bg-[#0c6634] text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
