import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  short: z.string(),
  description: z.string(),
  rating: z.number().optional(),
  reviews: z.number().optional()
})

export type Product = z.infer<typeof ProductSchema>

export const mockProducts: Product[] = [
  {
    id: 'p-1',
    title: 'Carrier Liability Insurance',
    short: 'Liability for carriers and logistics',
    description: 'Comprehensive cover for carriers including third-party liability.',
    rating: 4.6,
    reviews: 42
  },
  {
    id: 'p-2',
    title: 'Fleet Insurance',
    short: 'Full fleet management coverage',
    description: 'Protect your fleet with tailored policies.'
  }
]
