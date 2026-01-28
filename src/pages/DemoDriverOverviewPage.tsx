import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import '@/styles/underwriter-premium.css'
import '@/styles/driver-demo.css'

export default function DemoDriverOverviewPage() {
  const navigate = useNavigate()

  return (
    <section className="uw-page">
      <div className="uw-container">
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

        <Card variant="glass" className="uw-card">
          <div className="uw-card-body" style={{ gap: '0.6rem' }}>
            <strong>Start demo</strong>
            <span className="uw-muted">Full driver journey in 3 minutes.</span>
            <Button onClick={() => navigate('/demo-driver/step/register')} disableHover>
              Start demo
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
