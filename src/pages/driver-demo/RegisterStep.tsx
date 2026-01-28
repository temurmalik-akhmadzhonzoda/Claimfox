import React from 'react'
import Card from '@/components/ui/Card'

type RegisterStepProps = {
  authMethod: 'email' | 'phone'
  contact: string
  showSuccess: boolean
  password: string
  agreed: boolean
}

export default function RegisterStep({
  authMethod,
  contact,
  password,
  agreed,
  showSuccess
}: RegisterStepProps) {
  const placeholder = authMethod === 'email' ? 'Email address' : 'Phone number'
  const contactValue = contact || (authMethod === 'phone' ? '+49 170 555 210' : 'alex.driver@demo.insurfox')

  return (
    <>
      <Card title="Create account" subtitle="Demo details are prefilled." variant="glass" className="demo-card">
        <div className="demo-badge-row">
          {['No login required (demo)', 'Mobile-first'].map((badge) => (
            <span key={badge} className="demo-badge">{badge}</span>
          ))}
        </div>
      </Card>

      <Card title="Sign-in method" subtitle="Email" variant="glass" className="demo-card">
        <div className="uw-card-body" style={{ gap: '0.35rem' }}>
          <strong>{authMethod === 'phone' ? 'Phone' : 'Email'}</strong>
        </div>
      </Card>

      <Card title="Details" subtitle="Auto-filled for demo." variant="glass" className="demo-card">
        <div style={{ display: 'grid', gap: '0.35rem' }}>
          <div><strong>{placeholder}</strong>: {contactValue}</div>
          <div><strong>Password</strong>: {password ? '••••••••' : '••••••••'}</div>
          <div><strong>Consent</strong>: {agreed ? 'Granted' : 'Granted (demo)'}</div>
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
