import { useAuth } from '@/auth/AuthProvider'

export async function apiFetch(path, options = {}, getToken) {
  const token = await getToken()
  const response = await fetch(path, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(data?.error?.message || data?.message || `Request failed (${response.status})`)
    error.status = response.status
    error.payload = data
    throw error
  }

  return data
}

export function useNetlifyApi() {
  const { getToken } = useAuth()

  return {
    get: (path) => apiFetch(path, { method: 'GET' }, getToken),
    post: (path, body) => apiFetch(path, { method: 'POST', body }, getToken),
    patch: (path, body) => apiFetch(path, { method: 'PATCH', body }, getToken),
    del: (path, body) => apiFetch(path, { method: 'DELETE', body }, getToken)
  }
}
