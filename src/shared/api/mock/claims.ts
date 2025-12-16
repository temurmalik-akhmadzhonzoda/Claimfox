import { z } from 'zod'

export const ClaimSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  amount: z.number(),
  date: z.string()
})

export type Claim = z.infer<typeof ClaimSchema>

let nextId = 3
export const mockClaims: Claim[] = [
  { id: 'c-1', title: 'Rear-end collision', status: 'Open', amount: 1200, date: '2025-12-10' },
  { id: 'c-2', title: 'Broken windshield', status: 'Closed', amount: 400, date: '2025-11-02' }
]

export function createMockClaim(data: Partial<Claim>) {
  const claim: Claim = {
    id: `c-${++nextId}`,
    title: data.title || 'New claim',
    status: 'Open',
    amount: data.amount || 0,
    date: new Date().toISOString().slice(0, 10)
  }
  mockClaims.unshift(claim)
  return claim
}
