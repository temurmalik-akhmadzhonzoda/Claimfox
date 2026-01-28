import React from 'react'
import Card from '@/components/ui/Card'

type RegisterStepProps = {
  authMethod: 'email' | 'phone'
  contact: string
  password: string
  agreed: boolean
  showSuccess: boolean
  onAuthMethodChange: (method: 'email' | 'phone') => void
  onContactChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onAgreedChange: (value: boolean) => void
}

export default function RegisterStep({
  authMethod,
  contact,
  password,
  agreed,
  showSuccess,
  onAuthMethodChange,
  onContactChange,
  onPasswordChange,
  onAgreedChange
}: RegisterStepProps) {
  const placeholder = authMethod === 'email' ? 'Email address' : 'Phone number'

  return (
    <>
      <Card title="Create account" subtitle="Pick your preferred sign-in method." variant="glass" className="demo-card">
        <div className="demo-badge-row">
          {['No login required (demo)', 'Mobile-first'].map((badge) => (
            <span key={badge} className="demo-badge">{badge}</span>
          ))}
        </div>
      </Card>

      <Card variant="glass" className="demo-card">
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['email', 'phone'] as const).map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => onAuthMethodChange(method)}
              style={{
                flex: 1,
                padding: '0.6rem',
                border: `1px solid ${authMethod === method ? 'var(--ix-primary)' : 'var(--ix-border)'}`,
                background: 'transparent',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Continue with {method}
            </button>
          ))}
        </div>
      </Card>

      <Card title="Details" subtitle="Just two fields to get started." variant="glass" className="demo-card">
        <div style={{ display: 'grid', gap: '0.6rem' }}>
          <input
            value={contact}
            onChange={(event) => onContactChange(event.target.value)}
            placeholder={placeholder}
            style={{ padding: '0.6rem', border: '1px solid var(--ix-border)' }}
          />
          <input
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            placeholder="Password (optional)"
            type="password"
            style={{ padding: '0.6rem', border: '1px solid var(--ix-border)' }}
          />
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <input type="checkbox" checked={agreed} onChange={(event) => onAgreedChange(event.target.checked)} />
            I agree (demo)
          </label>
        </div>
      </Card>

      {showSuccess && (
        <Card variant="glass" className="demo-card">
          <strong>Account created (demo)</strong>
        </Card>
      )}
    </>
  )
}
