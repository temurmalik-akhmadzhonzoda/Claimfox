import { z } from 'zod'

export const ClaimSchema = z.object({ id: z.string(), title: z.string(), status: z.string(), amount: z.number(), date: z.string() })
export type Claim = z.infer<typeof ClaimSchema>
