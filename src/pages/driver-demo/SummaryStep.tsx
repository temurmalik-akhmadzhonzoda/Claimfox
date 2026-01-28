import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

type SummaryStepProps = {
  profileSkipped: boolean
  claimId: string
  uploadsComplete: boolean
  onRestart: () => void
}

export default function SummaryStep({
  profileSkipped,
  claimId,
  uploadsComplete,
  onRestart
}: SummaryStepProps) {
  const navigate = useNavigate()

  return (
    <>
      <Card title="Account created" subtitle="Ready for ongoing support." variant="glass" className="demo-card" />
      <Card
        title="Profile saved"
        subtitle={profileSkipped ? 'Profile incomplete (demo)' : 'Profile complete'}
        variant="glass"
        className="demo-card"
      />
      <Card title={`Claim reported: ${claimId}`} subtitle="SLA: 24h initial response" variant="glass" className="demo-card" />
      <Card
        title="Evidence attached"
        subtitle={uploadsComplete ? 'Uploads added to claim file' : 'Some uploads missing (demo)'}
        variant="glass"
        className="demo-card"
      />
      <Card title="Chat log created" subtitle="Audit-ready conversation trail" variant="glass" className="demo-card" />

      <Card title="Why this matters" subtitle="Outcome for drivers and insurers" variant="glass" className="demo-card">
        <ul style={{ margin: '0.4rem 0 0 1rem' }}>
          <li>Faster claim intake (FNOL)</li>
          <li>Transparent communication</li>
          <li>Audit-ready evidence trail</li>
        </ul>
      </Card>

      <div style={{ display: 'grid', gap: '0.6rem' }}>
        <Button onClick={onRestart} disableHover>Restart driver demo</Button>
        <Button onClick={() => navigate('/demo')} variant="secondary" disableHover>Explore role demos</Button>
        <Button onClick={() => navigate('/home')} variant="secondary" disableHover>Back to homepage</Button>
      </div>
    </>
  )
}
