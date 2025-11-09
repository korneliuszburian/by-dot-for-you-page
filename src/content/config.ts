import { z, defineCollection } from 'astro:content';

const productSchema = z.object({
  id: z.number(),
  status: z.enum(['Available', 'Unavailable']),
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
    schema: productSchema,
    type: 'content'
  }),
};