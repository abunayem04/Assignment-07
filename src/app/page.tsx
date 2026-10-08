import React from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import AllProductsGrid from "@/components/AllProductsGrid";
import { getProducts, getTopRisers, getTopFallers, getCategories } from "@/lib/api";

export default async function HomePage() {
  const [allProducts, risers, fallers, categories] = await Promise.all([
    getProducts(),
    getTopRisers(6),
    getTopFallers(6),
    getCategories(),
  ]);

  return (
    <div className="space-y-12 pb-16">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {risers.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-1.5">
                <span>আজ দাম বেড়েছে</span>
                <span className="text-emerald-700 font-bold">▲</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {risers.map((product) => (
                <ProductCard key={`riser-${product.id || product.slug}`} product={product} />
              ))}
            </div>
          </section>
        )}

        {fallers.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-1.5">
                <span>আজ দাম কমেছে</span>
                <span className="text-rose-600 font-bold">▼</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {fallers.map((product) => (
                <ProductCard key={`faller-${product.id || product.slug}`} product={product} />
              ))}
            </div>
          </section>
        )}

        <section>
          <AllProductsGrid initialProducts={allProducts} initialCategories={categories} />
        </section>
      </div>
    </div>
  );
}
