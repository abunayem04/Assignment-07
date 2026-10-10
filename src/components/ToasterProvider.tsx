"use client";

import React, { useEffect, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { checkAndShowPendingToast } from "@/lib/toast";

function PathWatcher() {
  const pathname = usePathname();

  useEffect(() => {
    checkAndShowPendingToast();
  }, [pathname]);

  return null;
}

export default function ToasterProvider() {
  useEffect(() => {
    checkAndShowPendingToast();
    window.addEventListener("storage", checkAndShowPendingToast);
    window.addEventListener("popstate", checkAndShowPendingToast);
    return () => {
      window.removeEventListener("storage", checkAndShowPendingToast);
      window.removeEventListener("popstate", checkAndShowPendingToast);
    };
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PathWatcher />
      </Suspense>
      <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={10}
      containerStyle={{
        top: 24,
        zIndex: 999999,
      }}
      toastOptions={{
        duration: 3500,
        style: {
          background: "#18261e",
          color: "#f8fafc",
          borderRadius: "14px",
          padding: "12px 20px",
          fontSize: "14px",
          fontWeight: 600,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          maxWidth: "92vw",
        },
        success: {
          duration: 3500,
          iconTheme: {
            primary: "#10b981",
            secondary: "#ffffff",
          },
        },
        error: {
          duration: 4500,
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
          },
        },
      }}
    />
    </>
  );
}

