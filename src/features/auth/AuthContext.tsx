import React, { createContext, useContext, useMemo, useState, useCallback } from 'react'

type AuthContextValue = {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const STORAGE_KEY = 'cf_auth'
const VALID_USERNAME = 'ralf'
const VALID_PASSWORD = '2106'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function isBrowser() {
  return typeof window !== 'undefined'
}

function readStoredState() {
  if (!isBrowser()) {
    return false
  }
  return window.localStorage.getItem(STORAGE_KEY) === 'true'
}

function persistState(nextState: boolean) {
  if (!isBrowser()) {
    return
  }
  if (nextState) {
    window.localStorage.setItem(STORAGE_KEY, 'true')
  } else {
    window.localStorage.removeItem(STORAGE_KEY)
  }
}

function credentialsMatch(username: string, password: string) {
  const normalizedUsername = username.trim().toLowerCase()
  return normalizedUsername === VALID_USERNAME.toLowerCase() && password.trim() === VALID_PASSWORD
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => readStoredState())

  const login = useCallback((username: string, password: string) => {
    const success = credentialsMatch(username, password)
    persistState(success)
    setIsAuthenticated(success)
    return success
  }, [])

  const logout = useCallback(() => {
    persistState(false)
    setIsAuthenticated(false)
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    isAuthenticated,
    login,
    logout
  }), [isAuthenticated, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
