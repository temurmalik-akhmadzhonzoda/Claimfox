import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

export type AuthUser = {
  username: string
  displayName: string
  roles: string[]
}

type AuthContextValue = {
  user: AuthUser | null
  isLoggedIn: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

type UserRecord = AuthUser & { password: string }

const STORAGE_KEY = 'claimfox_session_user'

const VALID_USERS: UserRecord[] = [
  { username: 'Sven', password: '9021', displayName: 'Sven', roles: ['executive'] },
  { username: 'Jürgen', password: '9021', displayName: 'Jürgen', roles: ['executive'] }
]

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function readUserFromSession(): AuthUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

function persistUser(user: AuthUser | null) {
  if (typeof window === 'undefined') return
  try {
    if (user) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      window.sessionStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // ignore storage errors in mock auth
  }
}

function findValidUser(username: string, password: string): AuthUser | null {
  const user = VALID_USERS.find(
    (candidate) => candidate.username === username && candidate.password === password
  )
  if (!user) return null
  const { password: _password, ...authUser } = user
  return authUser
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readUserFromSession())

  const login = useCallback(async (username: string, password: string) => {
    const trimmedUsername = username.trim()
    const trimmedPassword = password.trim()
    if (!trimmedUsername || !trimmedPassword) {
      throw new Error('Missing credentials')
    }

    const authUser = findValidUser(trimmedUsername, trimmedPassword)
    if (!authUser) {
      throw new Error('Invalid credentials')
    }

    setUser(authUser)
    persistUser(authUser)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    persistUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoggedIn: !!user,
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
