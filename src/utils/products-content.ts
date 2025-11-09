/**
 * Dot For You - Product Data Management System
 * Using Astro Content Collections for type-safe product data
 */

import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

// Export the Product type from content collections
export type Product = CollectionEntry<'products'>;

// Collections based on actual product data
export const COLLECTIONS = {
  'One Peace': {
    name: "One Peace Collection",
    description: "Classic designs with a peaceful aesthetic",
    theme: "Timeless comfort and style"
  },
  'Rusty Oil': {
    name: "Rusty Oil Collection",
    description: "Industrial-inspired pieces with character",
    theme: "Urban grit meets refined design"
  },
  'Anarchy': {
    name: "Anarchy Collection",
    description: "Bold designs for the rebellious spirit",
    theme: "Break free from conventional style"
  },
  'Sandy Oil': {
    name: "Sandy Oil Collection",
    description: "Weathered pieces with desert aesthetics",
    theme: "Sun-kissed and time-worn elegance"
  }
} as const;

export type CollectionKey = keyof typeof COLLECTIONS;

// Product filtering functions
export async function getAvailableProducts(): Promise<Product[]> {
  const products = await getCollection('products');
  return products.filter(product =>
    product.data.status === 'Available'
  );
}

export async function getUnavailableProducts(): Promise<Product[]> {
  const products = await getCollection('products');
  return products.filter(product =>
    product.data.status === 'Unavailable'
  );
}

export async function getProductsByCollection(collection: string): Promise<Product[]> {
  const products = await getCollection('products');
  return products.filter(product =>
    product.data.collection === collection
  );
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const products = await getCollection('products');
  return products.find(product => product.data.id === id);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getCollection('products');
  return products.find(product => product.slug === slug);
}

export async function getProductsByType(type: string): Promise<Product[]> {
  const products = await getCollection('products');
  return products.filter(product => product.data.type === type);
}

export async function getProductsBySize(size: string): Promise<Product[]> {
  const products = await getCollection('products');
  return products.filter(product => product.data.size_eu === size);
}

// Search functionality
export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getCollection('products');
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);

  return products.filter(product => {
    const searchableText = [
      product.data.product_name,
      product.data.collection,
      product.data.type,
      product.data.fabric,
      product.data.website_des,
      ...product.data.images
    ].join(' ').toLowerCase();

    return searchTerms.every(term => searchableText.includes(term));
  });
}

// Price filtering
export async function getProductsInPriceRange(min: number, max: number): Promise<Product[]> {
  const products = await getCollection('products');
  return products.filter(product =>
    product.data.price_pln >= min && product.data.price_pln <= max
  );
}

export async function getProductsUnderPrice(maxPrice: number): Promise<Product[]> {
  const products = await getCollection('products');
  return products.filter(product => product.data.price_pln <= maxPrice);
}

export async function getProductsOverPrice(minPrice: number): Promise<Product[]> {
  const products = await getCollection('products');
  return products.filter(product => product.data.price_pln >= minPrice);
}

// Material filtering
export async function getProductsByMaterial(material: string): Promise<Product[]> {
  const products = await getCollection('products');
  return products.filter(product =>
    product.data.fabric.toLowerCase().includes(material.toLowerCase())
  );
}

// Sorting utilities
export async function getSortedProductsByPrice(ascending: boolean = true): Promise<Product[]> {
  const products = await getCollection('products');
  return [...products].sort((a, b) =>
    ascending ? a.data.price_pln - b.data.price_pln : b.data.price_pln - a.data.price_pln
  );
}

export async function getSortedProductsByName(): Promise<Product[]> {
  const products = await getCollection('products');
  return [...products].sort((a, b) => a.data.product_name.localeCompare(b.data.product_name));
}

export async function getSortedProductsById(): Promise<Product[]> {
  const products = await getCollection('products');
  return [...products].sort((a, b) => a.data.id - b.data.id);
}

// Analytics utilities
export async function getProductCount(): Promise<number> {
  const products = await getCollection('products');
  return products.length;
}

export async function getAveragePrice(): Promise<number> {
  const products = await getCollection('products');
  if (products.length === 0) return 0;
  const total = products.reduce((sum, product) => sum + product.data.price_pln, 0);
  return Math.round(total / products.length);
}

export async function getPriceRange(): Promise<{ min: number; max: number }> {
  const products = await getCollection('products');
  if (products.length === 0) return { min: 0, max: 0 };

  const prices = products.map(p => p.data.price_pln);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}

export async function getCollectionCounts(): Promise<Record<string, number>> {
  const products = await getCollection('products');
  const counts: Record<string, number> = {};

  products.forEach(product => {
    counts[product.data.collection] = (counts[product.data.collection] || 0) + 1;
  });

  return counts;
}

export async function getTypeCounts(): Promise<Record<string, number>> {
  const products = await getCollection('products');
  const counts: Record<string, number> = {};

  products.forEach(product => {
    counts[product.data.type] = (counts[product.data.type] || 0) + 1;
  });

  return counts;
}

export async function getStatusCounts(): Promise<Record<string, number>> {
  const products = await getCollection('products');
  const counts: Record<string, number> = {};

  products.forEach(product => {
    counts[product.data.status] = (counts[product.data.status] || 0) + 1;
  });

  return counts;
}

// Utility function to generate product URLs
export function getProductUrl(product: Product): string {
  return `/products/${product.slug}`;
}

export function getProductImageUrl(product: Product, imageIndex: number = 0): string {
  if (product.data.images.length > imageIndex) {
    return `/images/${product.data.images[imageIndex]}`;
  }
  return `/images/${product.data.images[0]}`;
}

export function getAllProductImages(product: Product): string[] {
  return product.data.images.map(image => `/images/${image}`);
}

// Get unique values for filtering
export async function getUniqueCollections(): Promise<string[]> {
  const products = await getCollection('products');
  return [...new Set(products.map(product => product.data.collection))];
}

export async function getUniqueTypes(): Promise<string[]> {
  const products = await getCollection('products');
  return [...new Set(products.map(product => product.data.type))];
}

export async function getUniqueSizes(): Promise<string[]> {
  const products = await getCollection('products');
  return [...new Set(products.map(product => product.data.size_eu))];
}

export async function getUniqueMaterials(): Promise<string[]> {
  const products = await getCollection('products');
  return [...new Set(products.map(product => product.data.fabric))];
}