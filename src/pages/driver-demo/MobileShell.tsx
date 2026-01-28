import React from 'react'
import Button from '@/components/ui/Button'

type MobileShellProps = {
  title: string
  stepLabel: string
  onBack: () => void
  primaryAction: {
    label: string
    onClick: () => void
    disabled?: boolean
  }
  children: React.ReactNode
}

export default function MobileShell({
  title,
  stepLabel,
  onBack,
  primaryAction,
  children
}: MobileShellProps) {
  return (
    <section className="uw-page">
      <div className="demo-shell">
        <div className="demo-topbar">
          <Button variant="secondary" disableHover onClick={onBack}>
            Back
          </Button>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 700 }}>{title}</div>
            <div className="demo-progress">{stepLabel}</div>
          </div>
        </div>

        {children}
      </div>

      <div className="demo-bottom-bar">
        <div className="demo-bottom-bar__inner">
          <Button onClick={primaryAction.onClick} disableHover disabled={primaryAction.disabled} style={{ width: '100%' }}>
            {primaryAction.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
