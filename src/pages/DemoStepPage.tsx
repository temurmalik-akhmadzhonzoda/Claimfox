import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

type RoleOption = {
  id: string
  label: string
  decision: string
  accountability: string
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'junior-underwriter',
    label: 'Junior Underwriter',
    decision: 'standard underwriting within corridor',
    accountability: 'evidence completeness and SLA'
  },
  {
    id: 'senior-underwriter',
    label: 'Senior Underwriter',
    decision: 'exception approvals and pricing overrides',
    accountability: 'portfolio impact and escalation quality'
  },
  {
    id: 'carrier-authority',
    label: 'Carrier Authority',
    decision: 'final capacity and limit commitments',
    accountability: 'risk ownership and regulatory alignment'
  },
  {
    id: 'legal',
    label: 'Legal',
    decision: 'coverage interpretation and dispute stance',
    accountability: 'policy compliance and claims defensibility'
  },
  {
    id: 'finance',
    label: 'Finance',
    decision: 'capital allocation and recoveries posture',
    accountability: 'cash impact and audit trace'
  },
  {
    id: 'fraud',
    label: 'Fraud',
    decision: 'suspicious activity escalation',
    accountability: 'loss leakage prevention and evidence trail'
  }
]

const TOTAL_STEPS = 5
const ROLE_STORAGE_KEY = 'insurfox-demo-role'

const STEP_TITLES: Record<number, string> = {
  1: 'Who is making the decision?',
  2: 'What requires attention right now?',
  3: 'How AI supports - not replaces - decisions',
  4: 'Decision, accountability and governance',
  5: 'What remains visible and auditable'
}

export default function DemoStepPage() {
  const navigate = useNavigate()
  const { stepId } = useParams()
  const parsedStep = Number(stepId)
  const stepNumber = Number.isFinite(parsedStep) ? parsedStep : 1

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null)
  const [decisionMessage, setDecisionMessage] = useState<string | null>(null)

  useEffect(() => {
    const storedRole = window.localStorage.getItem(ROLE_STORAGE_KEY)
    if (storedRole) {
      setSelectedRoleId(storedRole)
    }
  }, [])

  useEffect(() => {
    setDecisionMessage(null)
  }, [stepNumber])

  const selectedRole = useMemo(
    () => ROLE_OPTIONS.find((role) => role.id === selectedRoleId) ?? null,
    [selectedRoleId]
  )

  if (!Number.isFinite(stepNumber) || stepNumber < 1 || stepNumber > TOTAL_STEPS) {
    return <Navigate to="/demo" replace />
  }

  const progressPercent = Math.round((stepNumber / TOTAL_STEPS) * 100)

  const handleRoleSelect = (roleId: string) => {
    setSelectedRoleId(roleId)
    window.localStorage.setItem(ROLE_STORAGE_KEY, roleId)
  }

  const handleNext = () => {
    if (stepNumber >= TOTAL_STEPS) {
      navigate('/demo')
      return
    }
    navigate(`/demo/step/${stepNumber + 1}`)
  }

  const handleBack = () => {
    if (stepNumber <= 1) {
      navigate('/demo')
      return
    }
    navigate(`/demo/step/${stepNumber - 1}`)
  }

  return (
    <section className="uw-page">
      <div className="uw-container">
        <Header
          title={STEP_TITLES[stepNumber]}
          subtitle="Focused, role-based decisions with AI support and governance built in."
          subtitleColor="#65748b"
          actions={(
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button onClick={handleBack} variant="secondary" disableHover>
                Back
              </Button>
              <Button onClick={handleNext} disableHover>
                {stepNumber === TOTAL_STEPS ? 'Finish Demo' : 'Next'}
              </Button>
            </div>
          )}
        />

        <div className="uw-grid uw-split">
          <Card variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.75rem' }}>
              <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Step {stepNumber} of {TOTAL_STEPS}
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--ix-border)' }}>
                <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--ix-primary)' }} />
              </div>
            </div>
          </Card>
          <Card variant="glass" className="uw-card">
            <div className="uw-card-body" style={{ gap: '0.5rem' }}>
              <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Current role</div>
              <strong>{selectedRole ? selectedRole.label : 'Not selected yet'}</strong>
              <span className="uw-muted">Pick a role to personalize the decision flow.</span>
            </div>
          </Card>
        </div>

        {stepNumber === 1 && (
          <div className="uw-section">
            <h2 className="uw-section-title">Role context</h2>
            <div className="uw-grid uw-cards">
              {ROLE_OPTIONS.map((role) => {
                const isSelected = role.id === selectedRoleId
                return (
                  <Card
                    key={role.id}
                    title={role.label}
                    subtitle={`Decides on ${role.decision}.`}
                    variant="glass"
                    className="uw-card"
                    interactive
                    onClick={() => handleRoleSelect(role.id)}
                    style={isSelected ? { borderColor: 'var(--ix-primary)', boxShadow: '0 0 0 2px rgba(212,56,13,0.2)' } : undefined}
                  >
                    <div className="uw-card-body">
                      <span className="uw-muted">Accountable for {role.accountability}.</span>
                      {isSelected && (
                        <span style={{ color: 'var(--ix-primary)', fontWeight: 700 }}>Selected</span>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>
            {selectedRole && (
              <Card variant="glass" className="uw-card">
                <div className="uw-card-body">
                  <strong>
                    This role decides on {selectedRole.decision} and is accountable for {selectedRole.accountability}.
                  </strong>
                </div>
              </Card>
            )}
          </div>
        )}

        {stepNumber === 2 && (
          <div className="uw-section">
            <h2 className="uw-section-title">Decision inbox</h2>
            <div className="uw-grid uw-cards">
              {[
                { id: 'CLM-9021', type: 'Claim', risk: 'High', sla: 'Due today', flag: 'Out of corridor' },
                { id: 'PLC-5580', type: 'Policy', risk: 'Medium', sla: '8h left', flag: 'Pricing exception' },
                { id: 'PAY-7742', type: 'Payment', risk: 'High', sla: '2h left', flag: 'Suspicious routing' },
                { id: 'CLM-9033', type: 'Claim', risk: 'Low', sla: '24h left', flag: 'AI anomaly' }
              ].map((item) => (
                <Card key={item.id} title={item.id} subtitle={item.type} variant="glass" className="uw-card">
                  <div className="uw-card-body" style={{ gap: '0.35rem' }}>
                    <span><strong>Risk:</strong> {item.risk}</span>
                    <span><strong>SLA:</strong> {item.sla}</span>
                    <span><strong>AI flag:</strong> {item.flag}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {stepNumber === 3 && (
          <div className="uw-section">
            <h2 className="uw-section-title">AI insight</h2>
            <div className="uw-grid uw-split">
              <Card title="Recommended action" subtitle="Hold and request additional evidence" variant="glass" className="uw-card">
                <div className="uw-card-body" style={{ gap: '0.75rem' }}>
                  <div><strong>Confidence:</strong> 82%</div>
                  <div>
                    <strong>Key risk drivers</strong>
                    <ul style={{ margin: '0.35rem 0 0 1rem' }}>
                      <li>Coverage mismatch in prior endorsements</li>
                      <li>Loss frequency above corridor threshold</li>
                      <li>Payment routing anomaly in vendor data</li>
                    </ul>
                  </div>
                  <Button variant="secondary" disableHover>View rationale</Button>
                </div>
              </Card>
              <Card title="AI guardrails" subtitle="Human review required" variant="glass" className="uw-card">
                <div className="uw-card-body" style={{ gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Badges</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {['Human review required', 'Explainable', 'Carrier-aligned'].map((badge) => (
                      <span
                        key={badge}
                        style={{
                          fontSize: '0.72rem',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          padding: '0.25rem 0.5rem',
                          border: '1px solid var(--ix-border)',
                          color: 'var(--ix-text-muted)'
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <span className="uw-muted">AI suggests options, humans stay accountable.</span>
                </div>
              </Card>
            </div>
          </div>
        )}

        {stepNumber === 4 && (
          <div className="uw-section">
            <h2 className="uw-section-title">Decision and governance</h2>
            <div className="uw-grid uw-split">
              <Card title="Decision options" subtitle="Choose the action that fits authority and risk" variant="glass" className="uw-card">
                <div className="uw-card-body" style={{ gap: '0.75rem' }}>
                  {[
                    'Approve',
                    'Approve with conditions',
                    'Escalate',
                    'Reject'
                  ].map((label) => (
                    <Button
                      key={label}
                      variant={label === 'Approve' ? 'primary' : 'secondary'}
                      disableHover
                      onClick={() => setDecisionMessage('Decision recorded (demo).')}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      {label}
                    </Button>
                  ))}
                  {decisionMessage && (
                    <span style={{ color: 'var(--ix-primary)', fontWeight: 700 }}>{decisionMessage}</span>
                  )}
                </div>
              </Card>
              <Card title="Governance snapshot" subtitle="Always visible before you decide" variant="glass" className="uw-card">
                <div className="uw-card-body" style={{ gap: '0.5rem' }}>
                  <span><strong>Required approvals:</strong> Carrier + Legal</span>
                  <span><strong>Authority level:</strong> Tier 3</span>
                  <span><strong>Policy version:</strong> PL-2024-11</span>
                  <span><strong>SLA impact:</strong> 2 hours remaining</span>
                </div>
              </Card>
            </div>
          </div>
        )}

        {stepNumber === 5 && (
          <div className="uw-section">
            <h2 className="uw-section-title">Audit and value</h2>
            <div className="uw-grid uw-split">
              <Card title="Audit timeline" subtitle="Every decision is traceable" variant="glass" className="uw-card">
                <div className="uw-card-body" style={{ gap: '0.5rem' }}>
                  <span>AI viewed - 09:18</span>
                  <span>Human decision - 09:24</span>
                  <span>Approval recorded - 09:26</span>
                  <span>SLA timestamp - 09:27</span>
                </div>
              </Card>
              <Card title="Why this matters" subtitle="Outcome you can trust" variant="glass" className="uw-card">
                <div className="uw-card-body">
                  <ul style={{ margin: '0.35rem 0 0 1rem' }}>
                    <li>Faster decisions</li>
                    <li>Clear accountability</li>
                    <li>Audit-ready by design</li>
                  </ul>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Button onClick={() => navigate('/demo')} variant="secondary" disableHover>
                      Restart Demo
                    </Button>
                    <Button onClick={() => navigate('/roles')} disableHover>
                      Explore Roles
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
