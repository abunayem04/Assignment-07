import { Category, Product } from "@/types";

const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

async function fetchFromWorker(path: string): Promise<unknown> {
  const urlPath = path.startsWith("/") ? path : `/${path}`;
  try {
    const res = await fetch(`${BASE_URL}${urlPath}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error(`API failed for ${urlPath}:`, err);
  }
  return null;
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchFromWorker("/categories");
  if (Array.isArray(data)) return data as Category[];
  return [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await fetchFromWorker(`/categories/${slug}`);
  if (data && typeof data === "object" && "slug" in data) return data as Category;
  const all = await getCategories();
  return all.find((c) => c.slug === slug || c.id === slug) || null;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const path = category ? `/products?category=${encodeURIComponent(category)}` : "/products";
  const data = await fetchFromWorker(path);
  if (Array.isArray(data)) return data as Product[];
  return [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (/^\d+$/.test(slug)) {
    const data = await fetchFromWorker(`/products/${slug}`);
    if (data && typeof data === "object" && "id" in data) return data as Product;
  }
  const all = await getProducts();
  return all.find((p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id.toString() === slug) || null;
}

export async function getTopRisers(limit = 6): Promise<Product[]> {
  const all = await getProducts();
  const risers = all
    .filter((p) => p.change && p.change.dir === "up" && p.change.pct > 0)
    .sort((a, b) => b.change.pct - a.change.pct);
  return risers.slice(0, limit);
}

export async function getTopFallers(limit = 6): Promise<Product[]> {
  const all = await getProducts();
  const fallers = all
    .filter((p) => p.change && p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct);
  return fallers.slice(0, limit);
}
