import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  short: z.string(),
  description: z.string()
})

export type Product = z.infer<typeof ProductSchema>
