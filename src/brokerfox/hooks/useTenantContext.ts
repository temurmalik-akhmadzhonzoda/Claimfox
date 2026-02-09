import { useMemo } from 'react'
import { useAuth } from '@/features/auth/AuthContext'
import type { TenantContext } from '@/brokerfox/types'

const STORAGE_KEY = 'brokerfox:tenant'

function readTenantOverride() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(STORAGE_KEY)
}

export function setTenantOverride(tenantId: string | null) {
  if (typeof window === 'undefined') return
  if (tenantId) {
    window.localStorage.setItem(STORAGE_KEY, tenantId)
  } else {
    window.localStorage.removeItem(STORAGE_KEY)
  }
}

export function useTenantContext(): TenantContext {
  const { user } = useAuth()

  return useMemo(() => {
    const override = readTenantOverride()
    const userId = user?.username ?? 'demo-user'
    const tenantId = override || (user?.username ? `tenant-${user.username}` : 'demo-tenant')

    return {
      tenantId,
      userId,
      roles: [],
      mode: user?.mode
    }
  }, [user])
}
