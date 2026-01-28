import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import '@/styles/underwriter-premium.css'
import '@/styles/driver-demo.css'

const jumpOptions = [
  { id: 'register', label: 'Registration' },
  { id: 'profile', label: 'Profile' },
  { id: 'claim', label: 'Report claim' },
  { id: 'upload', label: 'Upload evidence' },
  { id: 'chat', label: 'Chat' },
  { id: 'summary', label: 'Summary' }
]

export default function DemoDriverOverviewPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'consumer' | 'commercial'>('consumer')
  const [jumpStep, setJumpStep] = useState('')

  return (
    <section className="uw-page">
      <div className="demo-shell">
        <Header
          title="Driver Journey Demo"
          subtitle="Register, complete your profile, report a claim — and see how chat supports you."
          subtitleColor="#65748b"
        />

        <div className="demo-badge-row">
          {['Mobile-first', 'No login required (demo)', 'Insurance communication shown'].map((badge) => (
            <span key={badge} className="demo-badge">{badge}</span>
          ))}
        </div>

        <Card variant="glass" className="demo-card">
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setMode('consumer')}
              style={{
                flex: 1,
                padding: '0.6rem',
                border: `1px solid ${mode === 'consumer' ? 'var(--ix-primary)' : 'var(--ix-border)'}`,
                background: 'transparent',
                cursor: 'pointer'
              }}
            >
              Consumer mode
            </button>
            <button
              type="button"
              onClick={() => setMode('commercial')}
              style={{
                flex: 1,
                padding: '0.6rem',
                border: `1px solid ${mode === 'commercial' ? 'var(--ix-primary)' : 'var(--ix-border)'}`,
                background: 'transparent',
                cursor: 'pointer'
              }}
            >
              Commercial driver
            </button>
          </div>
        </Card>

        <Card variant="glass" className="demo-card">
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <span className="demo-progress">Jump to step</span>
            <select
              value={jumpStep}
              onChange={(event) => {
                const value = event.target.value
                setJumpStep(value)
                if (value) {
                  navigate(`/demo-driver/step/${value}`)
                }
              }}
              style={{ padding: '0.6rem', border: '1px solid var(--ix-border)' }}
            >
              <option value="">Select a step</option>
              {jumpOptions.map((option) => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </div>
        </Card>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <Card variant="glass" className="demo-card">
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              <strong>Start demo</strong>
              <span className="demo-progress">Full driver journey in 3 minutes.</span>
              <Button onClick={() => navigate('/demo-driver/step/register')} disableHover>
                Start demo
              </Button>
            </div>
          </Card>

          <Card variant="glass" className="demo-card">
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              <strong>Jump to claim</strong>
              <span className="demo-progress">See FNOL intake in one screen.</span>
              <Button onClick={() => navigate('/demo-driver/step/claim')} variant="secondary" disableHover>
                Jump to claim
              </Button>
            </div>
          </Card>

          <Card variant="glass" className="demo-card">
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              <strong>Jump to chat</strong>
              <span className="demo-progress">Human + AI support in one conversation.</span>
              <Button onClick={() => navigate('/demo-driver/step/chat')} variant="secondary" disableHover>
                Jump to chat
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
