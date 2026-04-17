/**
 * Astro content helpers for the dormant `src/content/products` layer.
 *
 * Runtime commerce is not sourced from this module. The active `/shop` and
 * `/shop/[slug]` pages read from `public/dataset/output.json` through
 * `src/utils/products-dataset.ts`.
 *
 * Keep this file limited to migration, parity checks, or content-entry tooling
 * until the content collection reaches parity with the dataset-backed runtime.
 */

import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export type ContentProduct = CollectionEntry<"products">;

/** @deprecated Prefer `ContentProduct` so Astro-content usage stays explicit. */
export type Product = ContentProduct;

export const PRODUCTS_CONTENT_HELPER_STATUS = {
  role: "astro-content-only",
  runtimeCanonicalSource: "public/dataset/output.json",
  runtimeCanonicalHelper: "src/utils/products-dataset.ts",
} as const;

// Descriptive labels for collection names present in content entries only.
// Runtime collection counts and filters should come from the dataset adapter.
export const CONTENT_COLLECTION_METADATA = {
  "One Peace": {
    name: "One Peace Collection",
    description: "Classic designs with a peaceful aesthetic",
    theme: "Timeless comfort and style",
  },
  "Rusty Oil": {
    name: "Rusty Oil Collection",
    description: "Industrial-inspired pieces with character",
    theme: "Urban grit meets refined design",
  },
  Anarchy: {
    name: "Anarchy Collection",
    description: "Bold designs for the rebellious spirit",
    theme: "Break free from conventional style",
  },
  "Sandy Oil": {
    name: "Sandy Oil Collection",
    description: "Weathered pieces with desert aesthetics",
    theme: "Sun-kissed and time-worn elegance",
  },
} as const;

/** @deprecated Prefer `CONTENT_COLLECTION_METADATA` for Astro-content callers. */
export const COLLECTIONS = CONTENT_COLLECTION_METADATA;

export type CollectionKey = keyof typeof CONTENT_COLLECTION_METADATA;

async function getContentProducts(): Promise<ContentProduct[]> {
  return getCollection("products");
}

const normalizeContentImagePath = (imagePath: string) => {
  if (imagePath.startsWith("/")) {
    return imagePath;
  }

  return `/dataset/database/${imagePath.replace(/^Items\//, "").replace(/\/Website\//, "/")}`;
};

export async function getAvailableProducts(): Promise<ContentProduct[]> {
  const products = await getContentProducts();
  return products.filter((product) => product.data.status === "Available");
}

export async function getUnavailableProducts(): Promise<ContentProduct[]> {
  const products = await getContentProducts();
  return products.filter((product) => product.data.status === "Unavailable");
}

export async function getProductsByCollection(
  collection: string,
): Promise<ContentProduct[]> {
  const products = await getContentProducts();
  return products.filter((product) => product.data.collection === collection);
}

export async function getProductById(
  id: number,
): Promise<ContentProduct | undefined> {
  const products = await getContentProducts();
  return products.find((product) => product.data.id === id);
}

export async function getProductBySlug(
  slug: string,
): Promise<ContentProduct | undefined> {
  const products = await getContentProducts();
  return products.find((product) => product.id === slug);
}

export async function getProductsByType(type: string): Promise<ContentProduct[]> {
  const products = await getContentProducts();
  return products.filter((product) => product.data.type === type);
}

export async function getProductsBySize(size: string): Promise<ContentProduct[]> {
  const products = await getContentProducts();
  return products.filter((product) => product.data.size_eu === size);
}

export async function searchProducts(query: string): Promise<ContentProduct[]> {
  const products = await getContentProducts();
  const searchTerms = query
    .toLowerCase()
    .split(" ")
    .filter((term) => term.length > 0);

  return products.filter((product) => {
    const searchableText = [
      product.data.product_name,
      product.data.collection,
      product.data.type,
      product.data.fabric,
      product.data.website_des,
      ...product.data.images,
    ]
      .join(" ")
      .toLowerCase();

    return searchTerms.every((term) => searchableText.includes(term));
  });
}

export async function getProductsInPriceRange(
  min: number,
  max: number,
): Promise<ContentProduct[]> {
  const products = await getContentProducts();
  return products.filter(
    (product) => product.data.price_pln >= min && product.data.price_pln <= max,
  );
}

export async function getProductsUnderPrice(
  maxPrice: number,
): Promise<ContentProduct[]> {
  const products = await getContentProducts();
  return products.filter((product) => product.data.price_pln <= maxPrice);
}

export async function getProductsOverPrice(
  minPrice: number,
): Promise<ContentProduct[]> {
  const products = await getContentProducts();
  return products.filter((product) => product.data.price_pln >= minPrice);
}

export async function getProductsByMaterial(
  material: string,
): Promise<ContentProduct[]> {
  const products = await getContentProducts();
  return products.filter((product) =>
    product.data.fabric.toLowerCase().includes(material.toLowerCase()),
  );
}

export async function getSortedProductsByPrice(
  ascending: boolean = true,
): Promise<ContentProduct[]> {
  const products = await getContentProducts();
  return [...products].sort((a, b) =>
    ascending ? a.data.price_pln - b.data.price_pln : b.data.price_pln - a.data.price_pln,
  );
}

export async function getSortedProductsByName(): Promise<ContentProduct[]> {
  const products = await getContentProducts();
  return [...products].sort((a, b) =>
    a.data.product_name.localeCompare(b.data.product_name),
  );
}

export async function getSortedProductsById(): Promise<ContentProduct[]> {
  const products = await getContentProducts();
  return [...products].sort((a, b) => a.data.id - b.data.id);
}

export async function getProductCount(): Promise<number> {
  const products = await getContentProducts();
  return products.length;
}

export async function getAveragePrice(): Promise<number> {
  const products = await getContentProducts();
  if (products.length === 0) {
    return 0;
  }

  const total = products.reduce((sum, product) => sum + product.data.price_pln, 0);
  return Math.round(total / products.length);
}

export async function getPriceRange(): Promise<{ min: number; max: number }> {
  const products = await getContentProducts();
  if (products.length === 0) {
    return { min: 0, max: 0 };
  }

  const prices = products.map((product) => product.data.price_pln);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

export async function getCollectionCounts(): Promise<Record<string, number>> {
  const products = await getContentProducts();
  const counts: Record<string, number> = {};

  products.forEach((product) => {
    counts[product.data.collection] = (counts[product.data.collection] || 0) + 1;
  });

  return counts;
}

export async function getTypeCounts(): Promise<Record<string, number>> {
  const products = await getContentProducts();
  const counts: Record<string, number> = {};

  products.forEach((product) => {
    counts[product.data.type] = (counts[product.data.type] || 0) + 1;
  });

  return counts;
}

export async function getStatusCounts(): Promise<Record<string, number>> {
  const products = await getContentProducts();
  const counts: Record<string, number> = {};

  products.forEach((product) => {
    counts[product.data.status] = (counts[product.data.status] || 0) + 1;
  });

  return counts;
}

// Astro content entries reuse the same slug pattern as the dataset-backed shop routes.
// This does not make the content collection the runtime source of truth.
export function getProductUrl(product: ContentProduct): string {
  return `/shop/${product.id}`;
}

// Normalize raw content image paths to the same public path shape the live shop uses.
// The image path format is aligned; the content collection ownership is not.
export function getProductImageUrl(
  product: ContentProduct,
  imageIndex: number = 0,
): string {
  const imagePath = product.data.images[imageIndex] ?? product.data.images[0];
  return normalizeContentImagePath(imagePath);
}

export function getAllProductImages(product: ContentProduct): string[] {
  return product.data.images.map(normalizeContentImagePath);
}

export async function getUniqueCollections(): Promise<string[]> {
  const products = await getContentProducts();
  return [...new Set(products.map((product) => product.data.collection))];
}

export async function getUniqueTypes(): Promise<string[]> {
  const products = await getContentProducts();
  return [...new Set(products.map((product) => product.data.type))];
}

export async function getUniqueSizes(): Promise<string[]> {
  const products = await getContentProducts();
  return [...new Set(products.map((product) => product.data.size_eu))];
}

export async function getUniqueMaterials(): Promise<string[]> {
  const products = await getContentProducts();
  return [...new Set(products.map((product) => product.data.fabric))];
}
