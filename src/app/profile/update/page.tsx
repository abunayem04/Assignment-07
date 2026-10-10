"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, updateUser } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Loader2, ArrowLeft, UserCheck } from "lucide-react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন");
      router.replace("/signin?redirect=/profile/update");
    } else if (session?.user) {
      setName(session.user.name || "");
    }
  }, [isPending, session, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("অনুগ্রহ করে আপনার নাম লিখুন");
      toast.error("অনুগ্রহ করে আপনার নাম লিখুন");
      return;
    }

    setLoading(true);

    try {
      const res = await updateUser({
        name: name.trim(),
      });

      if (res.error) {
        const msg = res.error.message || "তথ্য আপডেট করতে ব্যর্থ হয়েছে";
        setErrorMessage(msg);
        toast.error(msg);
      } else {
        toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে!");
        router.push("/profile");
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "তথ্য আপডেট করতে ব্যর্থ হয়েছে";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs text-gray-400 font-medium">
            আপনার অ্যাকাউন্টের নাম ও ব্যক্তিগত তথ্য পরিবর্তন করুন
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 block">
              ইমেইল (অপরিবর্তনীয়)
            </label>
            <input
              type="text"
              disabled
              value={session.user.email || ""}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs sm:text-sm text-gray-400 cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 block">
              নাম (Name)
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পূর্ণ নাম লিখুন"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#fbfcfb] text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#0f7a3f] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-[#0f7a3f] hover:bg-[#0c6634] text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>তথ্য আপডেট হচ্ছে...</span>
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4" />
                <span>তথ্য আপডেট করুন</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#0f7a3f] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>প্রোফাইলে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
