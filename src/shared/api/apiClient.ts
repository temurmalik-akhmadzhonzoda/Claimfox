import { mockProducts } from './mock/products'
import { mockClaims, createMockClaim } from './mock/claims'
import { mockProfile } from './mock/profile'

// Simple client facade. Currently uses mock data but includes Authorization header handling.
const apiClient = {
  async get(path: string, token?: string) {
    if (path.startsWith('/api/products')) return mockProducts
    if (path.startsWith('/api/claims')) return mockClaims
    if (path.startsWith('/api/profile')) return mockProfile
    return null
  },
  async post(path: string, body: any, token?: string) {
    if (path === '/api/claims') return createMockClaim(body)
    return null
  }
}

export default apiClient
