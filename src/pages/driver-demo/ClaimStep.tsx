import React from 'react'
import Card from '@/components/ui/Card'

type ClaimData = {
  claimType: string
  when: string
  location: string
  injured: string
  description: string
  claimId: string
}

type ClaimStepProps = {
  claim: ClaimData
  showSubmitted: boolean
  onClaimChange: (updates: Partial<ClaimData>) => void
}

export default function ClaimStep({
  claim,
  showSubmitted,
  onClaimChange
}: ClaimStepProps) {
  const incidentTypes = ['Accident', 'Theft', 'Glass', 'Other']
  const whenOptions = ['Today', 'Yesterday', 'Pick date']

  return (
    <>
      <Card title="Incident type" subtitle="What happened?" variant="glass" className="demo-card">
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {incidentTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onClaimChange({ claimType: type })}
              style={{
                padding: '0.5rem 0.75rem',
                border: `1px solid ${claim.claimType === type ? 'var(--ix-primary)' : 'var(--ix-border)'}`,
                background: 'transparent',
                cursor: 'pointer'
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </Card>

      <Card title="When did it happen?" subtitle="Quick pick is enough." variant="glass" className="demo-card">
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {whenOptions.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onClaimChange({ when: value })}
              style={{
                padding: '0.5rem 0.75rem',
                border: `1px solid ${claim.when === value ? 'var(--ix-primary)' : 'var(--ix-border)'}`,
                background: 'transparent',
                cursor: 'pointer'
              }}
            >
              {value}
            </button>
          ))}
        </div>
      </Card>

      <Card title="Location" subtitle="Optional city or street." variant="glass" className="demo-card">
        <input
          value={claim.location}
          onChange={(event) => onClaimChange({ location: event.target.value })}
          placeholder="City / Street (optional)"
          style={{ padding: '0.6rem', border: '1px solid var(--ix-border)', width: '100%' }}
        />
      </Card>

      <Card title="Any injuries?" subtitle="Required for handling." variant="glass" className="demo-card">
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['Yes', 'No'].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onClaimChange({ injured: value })}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: `1px solid ${claim.injured === value ? 'var(--ix-primary)' : 'var(--ix-border)'}`,
                background: 'transparent',
                cursor: 'pointer'
              }}
            >
              {value}
            </button>
          ))}
        </div>
      </Card>

      <Card title="Short description" subtitle="Optional (2 lines max)." variant="glass" className="demo-card">
        <textarea
          value={claim.description}
          onChange={(event) => onClaimChange({ description: event.target.value })}
          placeholder="Describe what happened"
          rows={2}
          style={{ padding: '0.6rem', border: '1px solid var(--ix-border)', width: '100%' }}
        />
      </Card>

      {showSubmitted && (
        <Card variant="glass" className="demo-card">
          <div style={{ display: 'grid', gap: '0.35rem' }}>
            <strong>Claim reported: {claim.claimId}</strong>
            <span className="demo-badge">SLA: 24h initial response</span>
          </div>
        </Card>
      )}
    </>
  )
}
