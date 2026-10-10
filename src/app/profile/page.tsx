"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { LogOut, Loader2, Edit3, User, Mail, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন");
      router.replace("/signin?redirect=/profile");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#0f7a3f] animate-spin" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছেন");
      window.location.href = "/";
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          আমার প্রোফাইল
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          আপনার অ্যাকাউন্টের বিস্তারিত তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#0f7a3f] text-white flex items-center justify-center text-2xl font-bold uppercase shadow-xs shrink-0">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              user.name ? user.name.charAt(0) : "U"
            )}
          </div>
          <div className="space-y-0.5">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              {user.name || "ব্যবহারকারী"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-medium">
              {user.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/profile/update"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0f7a3f] hover:bg-[#0c6634] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>তথ্য আপডেট করুন</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>সাইন আউট</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">
            অ্যাকাউন্ট বিবরণ
          </h3>
          <Link
            href="/profile/update"
            className="text-xs font-bold text-[#0f7a3f] hover:underline flex items-center gap-1"
          >
            <span>সম্পাদনা করুন</span>
            <span>&rarr;</span>
          </Link>
        </div>

        <div className="divide-y divide-gray-50 text-xs sm:text-sm">
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <User className="w-4 h-4 text-gray-400" />
              <span>পূর্ণ নাম</span>
            </div>
            <div className="font-bold text-gray-900">
              {user.name || "প্রদান করা হয়নি"}
            </div>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>ইমেইল ঠিকানা</span>
            </div>
            <div className="font-bold text-gray-900">
              {user.email}
            </div>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>নিরাপত্তা ও অথেন্টিকেশন</span>
            </div>
            <div className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-xs">
              BetterAuth দিয়ে সুরক্ষিত
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="/profile/update"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#0f7a3f] text-[#0f7a3f] hover:bg-[#0f7a3f] hover:text-white font-bold text-xs sm:text-sm transition-all"
          >
            <Edit3 className="w-4 h-4" />
            <span>Update Information (তথ্য পরিবর্তন করুন)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
