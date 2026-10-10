import type { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import ToasterProvider from "@/components/ToasterProvider";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর - নিত্যপ্রয়োজনীয় পণ্যের লাইভ বাজারদর",
  description:
    "প্রতিদিনের কাঁচাবাজার, চাল, ডাল, তেল, মাছ, মাংস ও মসলার সঠিক ও হালনাগাদ বাজারদর জানুন এক ক্লিকে।",
  keywords: [
    "বাজার দর",
    "bazardor",
    "market price bangladesh",
    "কাঁচাবাজারের দাম",
  ],
  authors: [{ name: "BazarDor Team" }],
  icons: {
    icon: "data:,",
  },
  openGraph: {
    title: "বাজার দর - প্রতিদিনের নির্ভরযোগ্য বাজারদর",
    description: "নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ ওঠানামা ও নির্ভরযোগ্য বাজার তথ্য।",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8faf8] text-gray-900 font-sans selection:bg-[#0f7a3f] selection:text-white">
        <ToasterProvider />
        <Navbar />
        <PriceTicker />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
