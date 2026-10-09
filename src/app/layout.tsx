import type { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
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
  description: "প্রতিদিনের বাজারদর",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f8faf8] text-gray-900 font-sans">
        <ToasterProvider />
        <Navbar />
        <PriceTicker />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
