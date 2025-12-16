import { z } from 'zod'

export const ProfileSchema = z.object({ id: z.string(), name: z.string(), company: z.string().optional() })
export type Profile = z.infer<typeof ProfileSchema>
