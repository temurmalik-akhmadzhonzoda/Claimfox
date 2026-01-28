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
}

export default function ProfileStep({
  profile,
  showSaved
}: ProfileStepProps) {
  return (
    <>
      <Card title="Identity" subtitle="Make sure we can identify you." variant="glass" className="demo-card">
        <div style={{ display: 'grid', gap: '0.35rem' }}>
          <div><strong>Full name</strong>: {profile.fullName || 'Alex Driver'}</div>
          <div><strong>Date of birth</strong>: {profile.dob || '12 Apr 1993'}</div>
        </div>
      </Card>

      <Card title="Vehicle" subtitle="Basic vehicle info." variant="glass" className="demo-card">
        <div style={{ display: 'grid', gap: '0.35rem' }}>
          <div><strong>License plate</strong>: {profile.licensePlate || 'M-IF 421'}</div>
          <div><strong>Vehicle type</strong>: {profile.vehicleType || 'Car'}</div>
        </div>
      </Card>

      <Card title="Policy basics" subtitle="Optional but helpful." variant="glass" className="demo-card">
        <div style={{ display: 'grid', gap: '0.35rem' }}>
          <div><strong>Policy number</strong>: {profile.policyNumber || 'PL-204889'}</div>
          <div><strong>Insurer</strong>: {profile.insurer || 'Atlas Insurance'}</div>
        </div>
      </Card>

      {showSaved && (
        <Card variant="glass" className="demo-card">
          <strong>Profile saved (demo)</strong>
        </Card>
      )}
    </>
  )
}
