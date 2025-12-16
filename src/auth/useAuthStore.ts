import create from 'zustand'
import { persist } from 'zustand/middleware'
import LocalAuthAdapter from './adapters/localAuth'
import KeycloakAuthAdapter from './adapters/keycloakAuth'
import { AuthAdapter, User } from './types'

type Status = 'idle' | 'loading' | 'authenticated' | 'error'

type AuthState = {
  status: Status
  token?: string | null
  user?: User | null
  isAuthenticated: () => boolean
  init: () => Promise<void>
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  _adapter: AuthAdapter
}

const sessionStorageImpl = {
  getItem: (name: string) => Promise.resolve(sessionStorage.getItem(name)),
  setItem: (name: string, value: string) => Promise.resolve(sessionStorage.setItem(name, value)),
  removeItem: (name: string) => Promise.resolve(sessionStorage.removeItem(name))
}

const defaultAdapter = LocalAuthAdapter

const useAuthStore = create<AuthState>(
  persist(
    (set, get) => ({
      status: 'idle',
      token: null,
      user: null,
      _adapter: defaultAdapter,
      isAuthenticated: () => !!get().token,
      init: async () => {
        const adapter: AuthAdapter = (get()._adapter as AuthAdapter)
        await adapter.init()
        const token = get().token
        if (token) set({ status: 'authenticated' })
      },
      login: async (username: string, password: string) => {
        set({ status: 'loading' })
        try {
          const adapter = get()._adapter
          const { token, user } = await adapter.login(username, password)
          set({ token, user, status: 'authenticated' })
        } catch (e) {
          set({ status: 'error' })
          throw e
        }
      },
      logout: async () => {
        const adapter = get()._adapter
        await adapter.logout()
        set({ token: null, user: null, status: 'idle' })
      }
    }),
    {
      name: 'auth-storage',
      getStorage: () => sessionStorageImpl
    }
  )
)

// helper to switch adapter to Keycloak later
export function useKeycloakAdapter() {
  const adapter = KeycloakAuthAdapter({
    url: import.meta.env.VITE_KEYCLOAK_URL as string,
    realm: import.meta.env.VITE_KEYCLOAK_REALM as string,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID as string
  })
  return adapter
}

export default useAuthStore
