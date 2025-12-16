import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'insurfox_auth_user'

type User = {
  username: string
  displayName: string
}

type AuthContextValue = {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const USERS: Array<User & { password: string }> = [
  { username: 'Seven', displayName: 'Seven', password: '9021' },
  { username: 'J\u00fcrgen', displayName: 'J\u00fcrgen', password: '9021' }
]

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function normalize(value: string) {
  return value.trim().toLowerCase()
}

function findUser(username: string, password: string): User | null {
  const normalized = normalize(username)
  const match = USERS.find((candidate) => normalize(candidate.username) === normalized)
  if (!match || match.password !== password) {
    return null
  }
  return { username: match.username, displayName: match.displayName }
}

function loadStoredUser(): User | null {
  try {
    if (typeof window === 'undefined') {
      return null
    }
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    return JSON.parse(stored) as User
  } catch (error) {
    return null
  }
}

function persistUser(user: User | null) {
  try {
    if (typeof window === 'undefined') {
      return
    }
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  } catch (error) {
    // ignore storage errors
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setUser(loadStoredUser())
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    user,
    async login(username: string, password: string) {
      const found = findUser(username, password)
      if (!found) {
        throw new Error('Invalid credentials')
      }
      setUser(found)
      persistUser(found)
    },
    logout() {
      setUser(null)
      persistUser(null)
    }
  }), [user])

  return React.createElement(AuthContext.Provider, { value }, children)
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
