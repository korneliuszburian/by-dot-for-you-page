import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const productSchema = z.object({
  id: z.number(),
  status: z.enum(["Available", "Unavailable"]),
  product_name: z.string(),
  size_eu: z.string(),
  collection: z.string(),
  type: z.string(),
  price_pln: z.number(),
  fabric: z.string(),
  base: z.string().nullable(),
  website_des: z.string(),
  images: z.array(z.string()),
});

export const collections = {
  products: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
    schema: productSchema,
  }),
};
