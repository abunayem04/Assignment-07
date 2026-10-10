import React from "react";

export default function Footer() {
  return (
    <footer className="bg-transparent text-gray-500 py-8 mt-12 border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500 text-center sm:text-left">
          <div>
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </div>

          <div>
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </div>
        </div>
      </div>
    </footer>
  );
}
