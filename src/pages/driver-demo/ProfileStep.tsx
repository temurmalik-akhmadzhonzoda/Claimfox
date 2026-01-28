import React from 'react'
import Card from '@/components/ui/Card'

type ProfileData = {
  fullName: string
  dob: string
  licensePlate: string
  vehicleType: string
  policyNumber: string
  insurer: string
}

type ProfileStepProps = {
  profile: ProfileData
  showSaved: boolean
  onProfileChange: (updates: Partial<ProfileData>) => void
  onSkip: () => void
}

export default function ProfileStep({
  profile,
  showSaved,
  onProfileChange,
  onSkip
}: ProfileStepProps) {
  return (
    <>
      <Card title="Identity" subtitle="Make sure we can identify you." variant="glass" className="demo-card">
        <div style={{ display: 'grid', gap: '0.6rem' }}>
          <input
            value={profile.fullName}
            onChange={(event) => onProfileChange({ fullName: event.target.value })}
            placeholder="Full name"
            style={{ padding: '0.6rem', border: '1px solid var(--ix-border)' }}
          />
          <select
            value={profile.dob}
            onChange={(event) => onProfileChange({ dob: event.target.value })}
            style={{ padding: '0.6rem', border: '1px solid var(--ix-border)' }}
          >
            <option value="">Date of birth</option>
            <option value="1993-04-12">12 Apr 1993</option>
            <option value="1988-09-22">22 Sep 1988</option>
            <option value="1979-01-05">05 Jan 1979</option>
          </select>
        </div>
      </Card>

      <Card title="Vehicle" subtitle="Basic vehicle info." variant="glass" className="demo-card">
        <div style={{ display: 'grid', gap: '0.6rem' }}>
          <input
            value={profile.licensePlate}
            onChange={(event) => onProfileChange({ licensePlate: event.target.value })}
            placeholder="License plate"
            style={{ padding: '0.6rem', border: '1px solid var(--ix-border)' }}
          />
          <select
            value={profile.vehicleType}
            onChange={(event) => onProfileChange({ vehicleType: event.target.value })}
            style={{ padding: '0.6rem', border: '1px solid var(--ix-border)' }}
          >
            <option value="">Vehicle type</option>
            <option value="car">Car</option>
            <option value="van">Van</option>
            <option value="truck">Truck</option>
          </select>
        </div>
      </Card>

      <Card title="Policy basics" subtitle="Optional but helpful." variant="glass" className="demo-card">
        <div style={{ display: 'grid', gap: '0.6rem' }}>
          <input
            value={profile.policyNumber}
            onChange={(event) => onProfileChange({ policyNumber: event.target.value })}
            placeholder="Policy number (optional)"
            style={{ padding: '0.6rem', border: '1px solid var(--ix-border)' }}
          />
          <select
            value={profile.insurer}
            onChange={(event) => onProfileChange({ insurer: event.target.value })}
            style={{ padding: '0.6rem', border: '1px solid var(--ix-border)' }}
          >
            <option value="">Select insurer</option>
            <option value="atlas">Atlas Insurance</option>
            <option value="contora">Contora Mobility</option>
            <option value="fleetsecure">FleetSecure</option>
          </select>
        </div>
      </Card>

      <button type="button" onClick={onSkip} style={{ background: 'none', border: 'none', color: 'var(--ix-text-muted)' }}>
        Skip for now
      </button>

      {showSaved && (
        <Card variant="glass" className="demo-card">
          <strong>Profile saved (demo)</strong>
        </Card>
      )}
    </>
  )
}
