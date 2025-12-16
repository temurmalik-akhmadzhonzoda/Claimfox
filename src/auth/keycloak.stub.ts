/**
 * Placeholder Keycloak adapter so the app structure is ready for a future integration.
 * Replace the implementations with a real Keycloak client when needed.
 */

export interface KeycloakClient {
  getToken(): string | null
  login(): Promise<void>
  logout(): Promise<void>
}

export function createKeycloakClient(): KeycloakClient {
  return {
    async login() {
      // call Keycloak login here
    },
    async logout() {
      // call Keycloak logout here
    },
    getToken() {
      return null
    }
  }
}
