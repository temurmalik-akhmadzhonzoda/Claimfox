import { useMemo } from 'react'
import { useAuth } from '@/auth/AuthProvider'

export const ROLE_ORDER = {
  mitarbeiter: 1,
  management: 2,
  'c-level': 3
}

export function roleSatisfies(userRoles, requiredRole) {
  const requiredWeight = ROLE_ORDER[requiredRole] || Number.MAX_SAFE_INTEGER
  return userRoles.some((role) => (ROLE_ORDER[role] || 0) >= requiredWeight)
}

export function useRoles() {
  const { getRoles } = useAuth()

  const roles = useMemo(() => getRoles(), [getRoles])

  return {
    roles,
    hasRole: (requiredRole) => roleSatisfies(roles, requiredRole),
    hasAny: (requiredRoles = []) => requiredRoles.some((role) => roleSatisfies(roles, role))
  }
}
