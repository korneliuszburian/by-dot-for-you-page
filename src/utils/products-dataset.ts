import productsData from "../../public/dataset/output.json";

export interface DatasetProduct {
  id: number;
  status: "Available" | "Unavailable";
  product_name: string;
  size_eu: string;
  collection: string;
  type: string;
  price_pln: number;
  price_usd?: number;
  fabric: string;
  base: string | null;
  website_des: string[] | string;
  care_instruction?: string[] | string;
  size_a_waist?: string;
  size_b_length?: string;
  size_c_leg_opening?: string;
  size_d_inseam?: string;
  size_w_inch?: string;
  images: string[];
}

export interface CommerceProduct {
  slug: string;
  data: DatasetProduct & {
    images: string[];
  };
}

const slugifyProduct = (product: DatasetProduct) =>
  `${product.product_name.toLowerCase().replace(/\s+/g, "-")}-${product.id}`;

const normalizeImagePath = (imagePath: string) => {
  if (imagePath.startsWith("/")) {
    return imagePath;
  }

  return `/dataset/database/${imagePath.replace(/^Items\//, "").replace(/\/Website\//, "/")}`;
};

const dedupeProducts = (products: DatasetProduct[]) => {
  const seenIds = new Set<number>();

  return products.filter((product) => {
    if (seenIds.has(product.id)) {
      return false;
    }

    seenIds.add(product.id);
    return true;
  });
};

const allProducts = dedupeProducts(productsData as DatasetProduct[]).map((product) => ({
  slug: slugifyProduct(product),
  data: {
    ...product,
    images: product.images.map(normalizeImagePath),
  },
}));

export function getAllProducts(): CommerceProduct[] {
  return allProducts;
}

export function getProductBySlug(slug: string): CommerceProduct | undefined {
  return allProducts.find((product) => product.slug === slug);
}

export function getCategoryCounts(products: CommerceProduct[] = allProducts) {
  return products.reduce<Record<string, number>>((acc, product) => {
    const category = product.data.type;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
}

export function getCategories(products: CommerceProduct[] = allProducts) {
  return [...new Set(products.map((product) => product.data.type))];
}
