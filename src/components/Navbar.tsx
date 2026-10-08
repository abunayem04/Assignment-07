"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getFormattedDate } from "@/lib/bangla";
import { useSession, signOut } from "@/lib/auth-client";
import { Category } from "@/types";
import toast from "react-hot-toast";
import {
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

function NavbarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [banglaDate, setBanglaDate] = useState<string>("");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBanglaDate(getFormattedDate());
  }, []);

  useEffect(() => {
    fetch("/api/bazardor/categories")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load categories:", err);
      })
      .finally(() => {
        setLoadingCategories(false);
      });
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setProfileDropdownOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছেন!");
      window.location.href = "/";
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  };

  const displayName = session?.user?.name || "User";
  const displayEmail = session?.user?.email || "";

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#0f7a3f] flex items-center justify-center p-2 shadow-xs shrink-0 transition-transform group-hover:scale-105">
              <img
                src="/logo-icon.png"
                alt="বাজার দর Logo"
                className="w-6 h-6 object-contain filter brightness-0 invert"
              />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 leading-tight">
                বাজার দর
              </div>
              <div className="text-[11px] sm:text-xs text-gray-400 font-medium">
                আজকের বাজারদর
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="w-24 h-9 bg-gray-100 animate-pulse rounded-full" />
            ) : session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-[#0f7a3f] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{displayName.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-gray-800 hidden sm:inline">
                    {displayName}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-gray-100 shadow-xl z-50 p-4 animate-in fade-in zoom-in-95 duration-150">
                    <div className="pb-3 border-b border-gray-100">
                      <div className="font-bold text-sm text-gray-900">
                        {displayName}
                      </div>
                      <div className="text-xs text-gray-400 truncate mt-0.5">
                        {displayEmail}
                      </div>
                    </div>

                    <div className="pt-2 space-y-1">
                      <Link
                        href="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#0f7a3f] transition-colors"
                      >
                        <User className="w-4 h-4 text-gray-500" />
                        <span>আমার প্রোফাইল</span>
                      </Link>

                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>সাইন আউট</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-gray-700 hover:text-[#0f7a3f] hover:bg-gray-50 transition-all"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0f7a3f] hover:bg-[#0c6634] shadow-xs transition-all"
                >
                  সাইন আপ
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 py-2.5 overflow-x-auto no-scrollbar">
            {loadingCategories ? (
              <div className="flex items-center gap-2 py-0.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-7 w-16 bg-gray-100 animate-pulse rounded-xl shrink-0"
                  />
                ))}
              </div>
            ) : (
              categories.map((cat) => {
                const isActive = pathname === `/category/${cat.slug}`;
                return (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-[#0f7a3f] text-white shadow-xs"
                        : "text-gray-700 hover:text-[#0f7a3f] hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-sm sm:text-base">{cat.icon}</span>
                    <span>{cat.nameBn}</span>
                  </Link>
                );
              })
            )}
          </nav>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white p-4 space-y-2 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 text-xs font-bold text-gray-800"
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-20 bg-white border-b border-gray-100" />}>
      <NavbarContent />
    </Suspense>
  );
}
