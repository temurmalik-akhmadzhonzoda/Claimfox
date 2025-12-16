import { AuthAdapter, User } from '../types'

// Placeholder adapter. Does not require keycloak libraries. To enable a real
// Keycloak adapter, add keycloak-js and implement the flows.
const KeycloakAuthAdapter = (env: {
  url?: string
  realm?: string
  clientId?: string
}): AuthAdapter => {
  return {
    async init() {
      // placeholder: would initialize Keycloak instance
      if (!env.url) return
    },
    async login(username: string, password: string) {
      // placeholder: do not perform real auth
      const user: User = { id: 'kc-' + username, name: username, roles: ['ROLE_BROKER'] }
      return { token: 'kc.demo.token', user }
    },
    async logout() {
      // placeholder
    }
  }
}

export default KeycloakAuthAdapter
