import { AuthAdapter, User } from '../types'

const DEMOS: Record<string, { password: string; user: User; token: string }> = {
  exec: {
    password: 'exec',
    token: 'demo.exec.token',
    user: { id: 'u-exec', name: 'Exec Demo', roles: ['ROLE_EXEC'] }
  },
  broker: {
    password: 'broker',
    token: 'demo.broker.token',
    user: { id: 'u-broker', name: 'Broker Demo', roles: ['ROLE_BROKER'] }
  },
  insurer: {
    password: 'insurer',
    token: 'demo.insurer.token',
    user: { id: 'u-insurer', name: 'Insurer Demo', roles: ['ROLE_INSURER'] }
  }
}

const LocalAuthAdapter: AuthAdapter = {
  async init() {
    // nothing to init for local
  },
  async login(username: string, password: string) {
    const entry = DEMOS[username]
    if (!entry || entry.password !== password) throw new Error('Invalid credentials')
    return { token: entry.token, user: entry.user }
  },
  async logout() {
    // nothing
  }
}

export default LocalAuthAdapter
