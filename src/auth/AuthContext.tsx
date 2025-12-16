import React, { createContext, useContext, useMemo, useState, useCallback } from 'react'

export type AuthUser = {
  username: string
  displayName: string
  roles: string[]
}

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const STORAGE_KEY = 'claimfox_auth_mock_v1'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function restoreUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

function deriveRoles(username: string): string[] {
  const normalized = username.toLowerCase()
  if (normalized.includes('admin')) return ['admin', 'broker']
  if (normalized.includes('insurer')) return ['insurer']
  return ['broker']
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => restoreUser())

  const login = useCallback(async (username: string, password: string) => {
    const trimmedUsername = username.trim()
    const trimmedPassword = password.trim()
    if (!trimmedUsername || !trimmedPassword) {
      throw new Error('Missing credentials')
    }

    const authUser: AuthUser = {
      username: trimmedUsername,
      displayName: trimmedUsername,
      roles: deriveRoles(trimmedUsername)
    }

    setUser(authUser)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser))
  }, [])

  const logout = useCallback(async () => {
    setUser(null)
    window.localStorage.removeItem(STORAGE_KEY)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout
    }),
    [user, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
