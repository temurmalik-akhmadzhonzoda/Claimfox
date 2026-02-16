import type { CSSProperties } from 'react'

type CapabilityScoreBarProps = {
  label: string
  score: number
  max?: number
}

export default function CapabilityScoreBar({ label, score, max = 5 }: CapabilityScoreBarProps) {
  const normalized = Math.max(0, Math.min(max, score))
  const width = `${(normalized / max) * 100}%`

  return (
    <div style={{ display: 'grid', gap: '0.3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', fontSize: '0.85rem' }}>
        <span style={{ color: '#334155' }}>{label}</span>
        <strong style={{ color: '#0f172a' }}>{normalized.toFixed(1)} / {max}</strong>
      </div>
      <div style={trackStyle}>
        <div style={{ ...fillStyle, width }} />
      </div>
    </div>
  )
}

const trackStyle: CSSProperties = {
  height: 8,
  borderRadius: 999,
  background: '#e2e8f0',
  overflow: 'hidden'
}

const fillStyle: CSSProperties = {
  height: '100%',
  borderRadius: 999,
  background: '#d4380d'
}
