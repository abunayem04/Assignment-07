"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfileUpdatePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await authClient.updateUser({ name });
    toast.success("নাম আপডেট হয়েছে");
    router.push("/profile");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-xs mt-10">
      <h1 className="text-xl font-bold mb-4">প্রোফাইল আপডেট</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded-lg"
          placeholder="আপনার নাম"
        />
        <button type="submit" className="w-full bg-[#0f7a3f] text-white p-2 rounded-lg">
          আপডেট করুন
        </button>
      </form>
    </div>
  );
}
