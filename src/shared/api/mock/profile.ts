import { z } from 'zod'

export const ProfileSchema = z.object({ id: z.string(), name: z.string(), company: z.string().optional() })
export type Profile = z.infer<typeof ProfileSchema>

export const mockProfile: Profile = { id: 'p-1', name: 'Demo User', company: 'Demo Company GmbH' }
