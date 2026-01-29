import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/uw-demo.css'

const KEY_STATE = 'DEMO_UW_CARRIER_STATE'
const KEY_AUDIT = 'DEMO_UW_CARRIER_AUDIT'

type StepId = 'handover' | 'capacity' | 'limits' | 'compliance' | 'final'

type CarrierAuthorityState = {
  caseId: string
  insured: string
  product: string
  requestedLimit: number
  capacityAvailable: number
  capacityConfirmed: boolean
  limitApproved: boolean
  complianceChecked: boolean
  decision: 'pending' | 'approve' | 'restrict' | 'decline'
  decisionLocked: boolean
}

type AuditItem = { ts: number; message: string }

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'handover', title: 'Escalation handover', subtitle: 'Review escalation summary' },
  { id: 'capacity', title: 'Capacity check', subtitle: 'Confirm carrier capacity' },
  { id: 'limits', title: 'Limit approval', subtitle: 'Approve full or reduced limit' },
  { id: 'compliance', title: 'Compliance check', subtitle: 'Regulatory checklist review' },
  { id: 'final', title: 'Final decision', subtitle: 'Lock capacity & limits' },
]

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): CarrierAuthorityState {
  return {
    caseId: 'UW-CAR-77104',
    insured: 'Nordbahn Freight AG',
    product: 'Fleet Liability + Cargo Extension',
    requestedLimit: 20,
    capacityAvailable: 28,
    capacityConfirmed: false,
    limitApproved: false,
    complianceChecked: false,
    decision: 'pending',
    decisionLocked: false,
  }
}

function readState(): CarrierAuthorityState {
  try {
    const raw = sessionStorage.getItem(KEY_STATE)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}
function writeState(next: CarrierAuthorityState) {
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

function money(n: number) {
  return `€ ${n} M`
}

export default function DemoCarrierAuthorityStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])

  const [state, setState] = useState<CarrierAuthorityState>(() => readState())

  useEffect(() => {
    const s = readState()
    setState(s)
    writeState(s)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-underwriter/carrier/step/handover" replace />
  const stepIndex = STEPS.findIndex((s) => s.id === stepId)

  function setPartial(p: Partial<CarrierAuthorityState>) {
    const next = { ...state, ...p }
    setState(next)
    writeState(next)
  }

  function goTo(next: StepId) {
    nav(`/demo-underwriter/carrier/step/${next}`)
  }

  const snapshotBadges = [
    { label: 'Capacity Confirmed', ok: state.capacityConfirmed },
    { label: 'Limit Approved', ok: state.limitApproved },
    { label: 'Compliance Checked', ok: state.complianceChecked },
    { label: 'Decision Locked', ok: state.decisionLocked },
  ]

  const canGoNext = (() => {
    if (stepId === 'handover') return true
    if (stepId === 'capacity') return state.capacityConfirmed || state.decision === 'restrict'
    if (stepId === 'limits') return state.limitApproved || state.decision === 'restrict' || state.decision === 'decline'
    if (stepId === 'compliance') return state.complianceChecked
    if (stepId === 'final') return true
    return false
  })()

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">UNDERWRITER DEMO</div>
                <h2 className="page-title">{current.title}</h2>
                <div className="text-muted">{current.subtitle}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-underwriter/carrier')}>
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
                      <span>Step {stepIndex + 1}/{STEPS.length} · one decision</span>
                    </div>
                    <span className="badge bg-indigo-lt">Carrier Authority</span>
                  </div>

                  <div className="uw-decision-body">
                    <div className="uw-block">
                      <div className="uw-kv">
                        <Kv k="Case ID" v={state.caseId} />
                        <Kv k="Insured" v={state.insured} />
                        <Kv k="Product" v={state.product} />
                        <Kv k="Requested limit" v={<span className="badge bg-azure-lt">{money(state.requestedLimit)}</span>} />
                        <Kv k="Capacity available" v={<span className="badge bg-azure-lt">{money(state.capacityAvailable)}</span>} />
                      </div>
                    </div>

                    {stepId === 'handover' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI escalation summary</div>
                          <div className="uw-admin-small">
                            Senior UW escalated due to override requirements and concentration guardrails.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Reason" v="Limit exceeds senior authority, portfolio concentration check required" />
                            <Kv k="AI note" v="Capacity sufficient but concentrated; compliance clear" />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Carrier Authority received escalation')
                              goTo('capacity')
                            }}
                          >
                            Review capacity
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'capacity' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>Capacity assessment</div>
                          <div className="uw-admin-small">
                            AI flags concentration risk but indicates overall capacity suffices.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Capacity" v={<span className="badge bg-green-lt">Sufficient</span>} />
                            <Kv k="Concentration" v={<span className="badge bg-yellow-lt">Elevated</span>} />
                            <Kv k="Recommendation" v="Confirm capacity or restrict exposure" />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Capacity confirmed (sufficient)')
                              setPartial({ capacityConfirmed: true })
                              goTo('limits')
                            }}
                          >
                            Confirm capacity
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Capacity restricted (exposure limited)')
                              setPartial({ decision: 'restrict' })
                              goTo('limits')
                            }}
                          >
                            Restrict exposure
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'limits' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>Limit recommendation</div>
                          <div className="uw-admin-small">
                            AI recommends a full limit approval if capacity confirmed, otherwise reduce limit.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Requested" v={<span className="badge bg-azure-lt">{money(state.requestedLimit)}</span>} />
                            <Kv k="Suggested" v={<span className="badge bg-azure-lt">{money(state.requestedLimit - 4)}</span>} />
                            <Kv k="Why" v="Reduce tail exposure while staying within appetite" />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Full limit approved')
                              setPartial({ limitApproved: true, decision: 'approve' })
                              goTo('compliance')
                            }}
                          >
                            Approve full limit
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Reduced limit approved')
                              setPartial({ limitApproved: true, decision: 'restrict' })
                              goTo('compliance')
                            }}
                          >
                            Approve reduced limit
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'compliance' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>Regulatory checklist</div>
                          <div className="uw-admin-small">No regulatory conflicts detected.</div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Sanctions" v={<span className="badge bg-green-lt">Clear</span>} />
                            <Kv k="Jurisdiction" v={<span className="badge bg-green-lt">Compliant</span>} />
                            <Kv k="Documentation" v={<span className="badge bg-green-lt">Complete</span>} />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Compliance confirmed')
                              setPartial({ complianceChecked: true })
                              goTo('final')
                            }}
                          >
                            Confirm compliance
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'final' && (
                      <>
                        <div className="uw-block">
                          <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Decision summary</div>
                          <div className="uw-admin-small">
                            This decision locks final capacity and limit approval.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Decision" v={<span className="badge bg-indigo-lt">{state.decision === 'restrict' ? 'Approve reduced limit' : state.decision === 'approve' ? 'Approve full limit' : 'Pending'}</span>} />
                            <Kv k="Capacity" v={<span className={`badge ${state.capacityConfirmed ? 'bg-green-lt' : 'bg-muted-lt'}`}>{state.capacityConfirmed ? 'Confirmed' : 'Pending'}</span>} />
                            <Kv k="Compliance" v={<span className={`badge ${state.complianceChecked ? 'bg-green-lt' : 'bg-muted-lt'}`}>{state.complianceChecked ? 'Checked' : 'Pending'}</span>} />
                          </div>
                        </div>

                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI audit note</div>
                          <div className="uw-admin-small">
                            AI records why this capacity/limit decision is safe and compliant.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Rationale stored" v="Capacity available, concentration mitigated, compliance clear" />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              if (!state.decisionLocked) {
                                appendAudit('Decision locked (audit-ready)')
                                setPartial({ decisionLocked: true })
                              }
                              nav('/demo-underwriter/carrier')
                            }}
                          >
                            Lock decision
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-underwriter/carrier')}>
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
                      <div><strong>Decides:</strong> final capacity & limits</div>
                      <div><strong>Accountable:</strong> risk bearing & regulatory compliance</div>
                    </div>
                    <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25, marginTop: '0.4rem' }}>
                      <li>AI summarizes escalation rationale</li>
                      <li>Capacity review checks concentration</li>
                      <li>Limit approval sets final exposure</li>
                      <li>Compliance must be confirmed before lock</li>
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
