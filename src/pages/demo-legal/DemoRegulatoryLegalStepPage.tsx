import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/uw-demo.css'

const KEY_STATE = 'DEMO_LEGAL_REGULATORY_STATE'
const KEY_AUDIT = 'DEMO_LEGAL_REGULATORY_AUDIT'

type StepId = 'intake' | 'materiality' | 'disclosure' | 'escalation' | 'signoff'

type RegulatoryLegalState = {
  caseId: string
  sourceRole: 'Underwriting' | 'Claims' | 'Compliance'
  insured: string
  product: string
  jurisdiction: 'DE' | 'EU'
  triggerType: 'override' | 'systemic_issue' | 'complaint' | 'incident'
  materialityLevel: 'low' | 'medium' | 'high'
  reportable: boolean
  disclosureScope: 'none' | 'partial' | 'full'
  regulatorTarget: 'BaFin' | 'EIOPA' | 'LocalAuthority'
  escalationRequired: boolean
  decisionLocked: boolean
}

type AuditItem = { ts: number; message: string }

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Regulatory intake', subtitle: 'Supervisory scope review' },
  { id: 'materiality', title: 'Materiality', subtitle: 'Assess reporting threshold' },
  { id: 'disclosure', title: 'Disclosure', subtitle: 'Define disclosure scope' },
  { id: 'escalation', title: 'Escalation', subtitle: 'Internal escalation decision' },
  { id: 'signoff', title: 'Regulatory sign-off', subtitle: 'Lock supervisory position' },
]

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): RegulatoryLegalState {
  return {
    caseId: 'REG-2024-0917',
    sourceRole: 'Underwriting',
    insured: 'Nordstadt Logistics GmbH',
    product: 'Carrier Liability + Fleet',
    jurisdiction: 'DE',
    triggerType: 'override',
    materialityLevel: 'medium',
    reportable: false,
    disclosureScope: 'none',
    regulatorTarget: 'BaFin',
    escalationRequired: false,
    decisionLocked: false,
  }
}

function readState(): RegulatoryLegalState {
  try {
    const raw = sessionStorage.getItem(KEY_STATE)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}
function writeState(next: RegulatoryLegalState) {
  sessionStorage.setItem(KEY_STATE, JSON.stringify(next))
}
function readAudit(): AuditItem[] {
  try {
    const raw = sessionStorage.getItem(KEY_AUDIT)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}
function appendAudit(message: string) {
  const list = readAudit()
  list.unshift({ ts: nowTs(), message })
  sessionStorage.setItem(KEY_AUDIT, JSON.stringify(list))
}

function Kv({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <>
      <div className="k">{k}</div>
      <div className="v">{v}</div>
    </>
  )
}

export default function DemoRegulatoryLegalStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])

  const [state, setState] = useState<RegulatoryLegalState>(() => readState())

  useEffect(() => {
    const s = readState()
    setState(s)
    writeState(s)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-legal/regulatory/step/intake" replace />
  const stepIndex = STEPS.findIndex((s) => s.id === stepId)

  function setPartial(p: Partial<RegulatoryLegalState>) {
    const next = { ...state, ...p }
    setState(next)
    writeState(next)
  }

  function goTo(next: StepId) {
    nav(`/demo-legal/regulatory/step/${next}`)
  }

  const snapshotBadges = [
    { label: `Materiality: ${state.materialityLevel}`, ok: true },
    { label: `Reportable: ${state.reportable ? 'Yes' : 'No'}`, ok: state.reportable },
    { label: `Disclosure: ${state.disclosureScope}`, ok: state.disclosureScope !== 'none' },
    { label: 'Escalation Required', ok: state.escalationRequired },
    { label: 'Decision Locked', ok: state.decisionLocked },
  ]

  const canGoNext = (() => {
    if (stepId === 'intake') return true
    if (stepId === 'materiality') return true
    if (stepId === 'disclosure') return true
    if (stepId === 'escalation') return true
    if (stepId === 'signoff') return true
    return false
  })()

  const disclosureHint = state.materialityLevel === 'high'
    ? 'Full disclosure required; notify immediately.'
    : state.materialityLevel === 'medium'
      ? 'Partial disclosure to BaFin recommended.'
      : 'No disclosure required if materiality is low.'

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">LEGAL DEMO</div>
                <h2 className="page-title">{current.title}</h2>
                <div className="text-muted">{current.subtitle}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-legal/regulatory')}>
                    Restart
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => goTo(STEPS[Math.max(0, stepIndex - 1)].id)}
                    disabled={stepIndex === 0}
                  >
                    Back
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => goTo(STEPS[Math.min(STEPS.length - 1, stepIndex + 1)].id)}
                    disabled={!canGoNext || stepIndex === STEPS.length - 1}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="container-xl">
            <div className="uw-shell">
              <div className="uw-left">
                <div className="uw-decision uw-fade-in">
                  <div className="uw-decision-header">
                    <div className="uw-decision-title">
                      <strong>{current.title}</strong>
                      <span>Step {stepIndex + 1}/{STEPS.length} · supervisory review</span>
                    </div>
                    <span className="badge bg-indigo-lt">Regulatory Legal</span>
                  </div>

                  <div className="uw-decision-body">
                    {(stepId === 'intake') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-kv">
                            <Kv k="Case ID" v={state.caseId} />
                            <Kv k="Source" v={state.sourceRole} />
                            <Kv k="Insured" v={state.insured} />
                            <Kv k="Product" v={state.product} />
                            <Kv k="Trigger" v={state.triggerType} />
                            <Kv k="Jurisdiction" v={state.jurisdiction} />
                          </div>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI note</div>
                          <div className="uw-admin-small">
                            Override-based underwriting decisions may trigger supervisory notification depending on materiality.
                          </div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>Regulatory reporting assessment</li>
                            <li>Disclosure scope definition</li>
                            <li>Escalation obligation check</li>
                          </ul>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Regulatory Legal received case for supervisory assessment')
                              goTo('materiality')
                            }}
                          >
                            Assess materiality
                          </button>
                        </div>
                      </>
                    )}

                    {(stepId === 'materiality') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-admin-small" style={{ fontWeight: 700 }}>Materiality factors</div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>Financial impact: Moderate</li>
                            <li>Systemic relevance: Low</li>
                            <li>Customer detriment risk: Medium</li>
                          </ul>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI recommendation</div>
                          <div className="uw-admin-small">Materiality likely medium; reporting may be required depending on disclosure scope.</div>
                        </div>
                        <div className="uw-cta-row">
                          {(['low', 'medium', 'high'] as const).map((level) => (
                            <button
                              key={level}
                              className={level === 'medium' ? 'btn btn-primary' : 'btn btn-outline-secondary'}
                              onClick={() => {
                                appendAudit(`Materiality set to ${level}`)
                                setPartial({ materialityLevel: level })
                                goTo('disclosure')
                              }}
                            >
                              Set materiality: {level.charAt(0).toUpperCase() + level.slice(1)}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {(stepId === 'disclosure') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-admin-small" style={{ fontWeight: 700 }}>Regulatory guidance</div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>Medium materiality → selective disclosure recommended</li>
                            <li>High materiality → mandatory notification</li>
                          </ul>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI recommendation</div>
                          <div className="uw-admin-small">{disclosureHint}</div>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Disclosure scope set: none')
                              setPartial({ disclosureScope: 'none', reportable: false })
                              goTo('escalation')
                            }}
                          >
                            No disclosure required
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Disclosure scope set: partial')
                              setPartial({ disclosureScope: 'partial', reportable: true })
                              goTo('escalation')
                            }}
                          >
                            Partial disclosure
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Disclosure scope set: full')
                              setPartial({ disclosureScope: 'full', reportable: true })
                              goTo('escalation')
                            }}
                          >
                            Full disclosure
                          </button>
                        </div>
                      </>
                    )}

                    {(stepId === 'escalation') && (
                      <>
                        <div className="uw-block">
                          <div className="uw-admin-small" style={{ fontWeight: 700 }}>Escalation rules</div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>High materiality → CRO + Board notification</li>
                            <li>Regulatory deadline risk → escalation required</li>
                          </ul>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI note</div>
                          <div className="uw-admin-small">Escalation ensures governance alignment before regulator contact.</div>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Escalation set: none')
                              setPartial({ escalationRequired: false })
                              goTo('signoff')
                            }}
                          >
                            No escalation required
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Escalation set: CRO')
                              setPartial({ escalationRequired: true })
                              goTo('signoff')
                            }}
                          >
                            Escalate to CRO
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Escalation set: Board')
                              setPartial({ escalationRequired: true })
                              goTo('signoff')
                            }}
                          >
                            Escalate to Board
                          </button>
                        </div>
                      </>
                    )}

                    {(stepId === 'signoff') && (
                      <>
                        <div className="uw-block">
                          <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Decision summary</div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Materiality" v={state.materialityLevel} />
                            <Kv k="Disclosure" v={state.disclosureScope} />
                            <Kv k="Reportable" v={state.reportable ? 'Yes' : 'No'} />
                            <Kv k="Escalation" v={state.escalationRequired ? 'Required' : 'No'} />
                          </div>
                        </div>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI audit note</div>
                          <div className="uw-admin-small">Decision aligned with jurisdictional supervisory guidance.</div>
                        </div>
                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Regulatory decision locked (supervisory position recorded)')
                              setPartial({ decisionLocked: true })
                              nav('/demo-legal/regulatory')
                            }}
                          >
                            Lock regulatory decision
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-legal/regulatory')}>
                            Restart demo
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="uw-admin">
                <div className="uw-admin-panel">
                  <h4>Step navigation</h4>
                  <div className="list-group list-group-flush">
                    {STEPS.map((s, idx) => {
                      const active = s.id === stepId
                      return (
                        <button
                          key={s.id}
                          className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${active ? 'active' : ''}`}
                          onClick={() => goTo(s.id)}
                          type="button"
                        >
                          <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <span className="badge bg-indigo-lt">{idx + 1}</span>
                            <span>{s.title}</span>
                          </span>
                          {active ? <span className="badge bg-white text-indigo">Current</span> : <span className="badge bg-indigo-lt">Open</span>}
                        </button>
                      )
                    })}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>AI & Accountability</h4>
                    <div className="uw-admin-small">
                      <div><strong>Decides:</strong> reportability, disclosure scope, escalation</div>
                      <div><strong>Accountable:</strong> supervisory compliance & timeliness</div>
                    </div>
                    <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25, marginTop: '0.4rem' }}>
                      <li>Materiality sets reporting threshold</li>
                      <li>Disclosure scope must match guidance</li>
                      <li>Escalation ensures governance alignment</li>
                      <li>Audit trail locked for regulators</li>
                    </ul>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>Snapshot</h4>
                    <div className="d-flex flex-wrap gap-2">
                      {snapshotBadges.map((b) => (
                        <span key={b.label} className={`badge ${b.ok ? 'bg-green-lt' : 'bg-muted-lt'}`}>
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>Audit log</h4>
                    <div className="uw-audit">
                      {(() => {
                        const items = readAudit()
                        if (!items.length) return <div className="uw-admin-small">No entries yet.</div>
                        return items.slice(0, 8).map((it) => (
                          <div className="uw-audit-item" key={it.ts}>
                            <div className="ts">{fmt(it.ts)}</div>
                            <div className="msg">{it.message}</div>
                          </div>
                        ))
                      })()}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
