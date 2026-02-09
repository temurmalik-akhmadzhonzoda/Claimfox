import { useMemo } from 'react'
import { useAuth } from '@/features/auth/AuthContext'
import type { TenantContext } from '@/brokerfox/types'

export function useTenantContext(): TenantContext {
  const { user } = useAuth()

  return useMemo(() => {
    const userId = user?.username ?? 'demo-user'
    const tenantId = user?.username ? `tenant-${user.username}` : 'demo-tenant'

    return {
      tenantId,
      userId,
      roles: [],
      mode: user?.mode
    }
  }, [user])
}
