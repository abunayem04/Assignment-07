"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import { showToast } from "@/lib/toast";
import { Loader2 } from "lucide-react";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("অনুগ্রহ করে আপনার নাম লিখুন");
      showToast("error", "অনুগ্রহ করে আপনার নাম লিখুন");
      return;
    }

    if (!email || !password) {
      setErrorMessage("অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড প্রদান করুন");
      showToast("error", "অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড প্রদান করুন");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      showToast("error", "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("উভয় পাসওয়ার্ড মিলছে না");
      showToast("error", "উভয় পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);

    try {
      const res = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (res.error) {
        const msg = res.error.message || "রেজিস্ট্রেশন করতে সমস্যা হয়েছে";
        setErrorMessage(msg);
        showToast("error", msg);
        setLoading(false);
        return;
      }

      await signIn.email({
        email: email.trim(),
        password,
      });

      showToast("success", "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!", { persistNextPage: true });
      const target = (!redirectUrl || redirectUrl === "/signin" || redirectUrl === "/signup") ? "/" : redirectUrl;
      window.location.href = target;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "রেজিস্ট্রেশন করতে সমস্যা হয়েছে";
      setErrorMessage(msg);
      showToast("error", msg);
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      setLoading(true);
      await signIn.social({
        provider,
        callbackURL: redirectUrl,
      });
    } catch {
      showToast("error", `${provider} দিয়ে লগইন করতে সমস্যা হয়েছে`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center py-10 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-gray-100 shadow-xs">
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="text-xs text-gray-400 font-medium">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত তথ্য দেখুন।
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-700">
              নাম
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="যেমন: রহিম উদ্দিন"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#fbfcfb] focus:border-[#0f7a3f] focus:ring-1 focus:ring-[#0f7a3f] outline-none text-xs sm:text-sm text-gray-800 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-700">
              ইমেইল
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#fbfcfb] focus:border-[#0f7a3f] focus:ring-1 focus:ring-[#0f7a3f] outline-none text-xs sm:text-sm text-gray-800 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-700">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#fbfcfb] focus:border-[#0f7a3f] focus:ring-1 focus:ring-[#0f7a3f] outline-none text-xs sm:text-sm text-gray-800 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-700">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="আবার লিখুন"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#fbfcfb] focus:border-[#0f7a3f] focus:ring-1 focus:ring-[#0f7a3f] outline-none text-xs sm:text-sm text-gray-800 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-[#0f7a3f] hover:bg-[#0c6634] text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>অ্যাকাউন্ট তৈরি হচ্ছে...</span>
              </>
            ) : (
              <span>অ্যাকাউন্ট তৈরি করুন</span>
            )}
          </button>
        </form>

        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-gray-400 font-semibold text-[11px]">
              অথবা
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            disabled={loading}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span className="truncate">Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            disabled={loading}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 shrink-0 fill-gray-900" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="truncate">GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        <div className="text-center pt-1 text-xs text-gray-500">
          <span>অ্যাকাউন্ট আছে? </span>
          <Link
            href={redirectUrl && redirectUrl !== "/" && redirectUrl !== "/signin" && redirectUrl !== "/signup" ? `/signin?redirect=${encodeURIComponent(redirectUrl)}` : "/signin"}
            className="font-bold text-[#0f7a3f] hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors font-medium"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#0f7a3f] animate-spin" />
        </div>
      }
    >
      <SignUpContent />
    </Suspense>
  );
}


