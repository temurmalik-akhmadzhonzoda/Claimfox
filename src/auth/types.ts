export type Role = 'ROLE_EXEC' | 'ROLE_BROKER' | 'ROLE_INSURER'

export interface User {
  id: string
  name: string
  email?: string
  roles: Role[]
}

export interface AuthAdapter {
  init(): Promise<void>
  login(username: string, password: string): Promise<{ token: string; user: User }>
  logout(): Promise<void>
}
