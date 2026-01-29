import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/uw-demo.css'

const KEY_STATE = 'DEMO_UW_SENIOR_STATE'
const KEY_AUDIT = 'DEMO_UW_SENIOR_AUDIT'

type StepId = 'intake' | 'override' | 'portfolio' | 'governance' | 'decision' | 'confirm'

type SeniorUwState = {
  caseId: string
  insured: string
  product: string
  basePremiumMonthly: number
  aiSuggestedOverride: 'none' | 'limit_increase' | 'deductible_adjust'
  overrideProposed: boolean
  portfolioChecked: boolean
  governanceRequested: boolean
  governanceApproved: boolean
  escalatedToCarrier: boolean
  decision: 'pending' | 'approve_override' | 'decline' | 'escalate'
  decisionLocked: boolean
}

type AuditItem = { ts: number; message: string }

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Referral intake', subtitle: 'Identify override need' },
  { id: 'override', title: 'Override proposal', subtitle: 'Choose override path' },
  { id: 'portfolio', title: 'Portfolio impact', subtitle: 'Confirm portfolio constraints' },
  { id: 'governance', title: 'Governance gate', subtitle: 'Request + receive approval' },
  { id: 'decision', title: 'Decision', subtitle: 'Approve override, decline, or escalate' },
  { id: 'confirm', title: 'Final confirmation', subtitle: 'Lock audit rationale' },
]

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): SeniorUwState {
  return {
    caseId: 'UW-OVR-88317',
    insured: 'Nordbahn Freight AG',
    product: 'Fleet Liability + Cargo Extension',
    basePremiumMonthly: 189,
    aiSuggestedOverride: 'limit_increase',
    overrideProposed: false,
    portfolioChecked: false,
    governanceRequested: false,
    governanceApproved: false,
    escalatedToCarrier: false,
    decision: 'pending',
    decisionLocked: false,
  }
}

function readState(): SeniorUwState {
  try {
    const raw = sessionStorage.getItem(KEY_STATE)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}
function writeState(next: SeniorUwState) {
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
  return `€ ${n} / month`
}

export default function DemoSeniorUnderwriterStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])

  const [state, setState] = useState<SeniorUwState>(() => readState())

  // Ensure defaults on deep link
  useEffect(() => {
    const s = readState()
    setState(s)
    writeState(s)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-underwriter/senior/step/intake" replace />
  const stepIndex = STEPS.findIndex((s) => s.id === stepId)

  function setPartial(p: Partial<SeniorUwState>) {
    const next = { ...state, ...p }
    setState(next)
    writeState(next)
  }

  function goTo(next: StepId) {
    nav(`/demo-underwriter/senior/step/${next}`)
  }

  const snapshotBadges = [
    { label: 'Override Proposed', ok: state.overrideProposed },
    { label: 'Portfolio Checked', ok: state.portfolioChecked },
    { label: 'Governance Approved', ok: state.governanceApproved },
    { label: 'Escalated', ok: state.escalatedToCarrier },
    { label: 'Decision Locked', ok: state.decisionLocked },
  ]

  // Next enabling rules (keep it strict + click-only)
  const canGoNext = (() => {
    if (stepId === 'intake') return true
    if (stepId === 'override') return state.overrideProposed || state.escalatedToCarrier || state.decision === 'decline'
    if (stepId === 'portfolio') return state.portfolioChecked
    if (stepId === 'governance') return state.governanceApproved || state.escalatedToCarrier || state.decision === 'decline'
    if (stepId === 'decision') {
      if (state.decision === 'approve_override') return state.governanceApproved && state.portfolioChecked
      if (state.decision === 'escalate') return state.escalatedToCarrier
      if (state.decision === 'decline') return true
      return false
    }
    if (stepId === 'confirm') return true
    return false
  })()

  const aiOverrideText =
    state.aiSuggestedOverride === 'limit_increase'
      ? 'Increase limit with governance approval (controlled exposure)'
      : state.aiSuggestedOverride === 'deductible_adjust'
        ? 'Adjust deductible to align with corridor severity'
        : 'No override needed'

  const premiumWithOverride = state.aiSuggestedOverride === 'limit_increase' ? state.basePremiumMonthly + 24 : state.basePremiumMonthly + 12

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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-underwriter/senior')}>
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
              {/* LEFT */}
              <div className="uw-left">
                <div className="uw-decision uw-fade-in">
                  <div className="uw-decision-header">
                    <div className="uw-decision-title">
                      <strong>{current.title}</strong>
                      <span>Step {stepIndex + 1}/{STEPS.length} · one decision</span>
                    </div>
                    <span className="badge bg-indigo-lt">Senior UW</span>
                  </div>

                  <div className="uw-decision-body">
                    {/* Case context */}
                    <div className="uw-block">
                      <div className="uw-kv">
                        <Kv k="Case ID" v={state.caseId} />
                        <Kv k="Insured" v={state.insured} />
                        <Kv k="Product" v={state.product} />
                        <Kv k="Base premium" v={<span className="badge bg-azure-lt">{money(state.basePremiumMonthly)}</span>} />
                        <Kv k="AI risk score" v={<span className="badge bg-azure-lt">57 / 100</span>} />
                      </div>
                    </div>

                    {stepId === 'intake' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI triage</div>
                          <div className="uw-admin-small">
                            Referral triggers because the requested limit exceeds standard corridor for this insured segment.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Trigger" v={<span className="badge bg-yellow-lt">Limit request exceeds corridor</span>} />
                            <Kv k="Suggested path" v={aiOverrideText} />
                            <Kv k="Escalation hint" v="Escalate if governance rejects or portfolio cap is hit" />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Intake completed (referral classified: override candidate)')
                              goTo('override')
                            }}
                          >
                            Proceed to override proposal
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Escalated to Carrier Authority (direct)')
                              setPartial({ escalatedToCarrier: true, decision: 'escalate' })
                              goTo('confirm')
                            }}
                          >
                            Escalate to Carrier Authority now
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'override' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI proposal</div>
                          <div className="uw-admin-small">
                            AI proposes an override that stays within governance rules and documents rationale.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Override" v={<span className="badge bg-indigo-lt">{aiOverrideText}</span>} />
                            <Kv k="Premium (with override)" v={<span className="badge bg-azure-lt">{money(premiumWithOverride)}</span>} />
                            <Kv k="Why" v="Limit uplift reduces rejection risk; pricing compensates severity tail" />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Override proposed (AI-aligned)')
                              setPartial({ overrideProposed: true, decision: 'pending' })
                              goTo('portfolio')
                            }}
                          >
                            Propose this override
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Decline path selected (override not pursued)')
                              setPartial({ decision: 'decline', overrideProposed: false })
                            }}
                          >
                            Decline (no override)
                          </button>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Escalation selected (override outside authority)')
                              setPartial({ escalatedToCarrier: true, decision: 'escalate' })
                            }}
                          >
                            Escalate to Carrier Authority
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'portfolio' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>Portfolio impact</div>
                          <div className="uw-admin-small">
                            Senior UW is accountable for portfolio impact before requesting governance approval.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Portfolio capacity" v={<span className="badge bg-green-lt">OK</span>} />
                            <Kv k="Concentration" v={<span className="badge bg-green-lt">Within guardrails</span>} />
                            <Kv k="Impact" v="Neutral to slightly positive (priced for limit uplift)" />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Portfolio impact confirmed (guardrails OK)')
                              setPartial({ portfolioChecked: true })
                              goTo('governance')
                            }}
                          >
                            Confirm portfolio impact
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Portfolio risk flagged (escalate)')
                              setPartial({ escalatedToCarrier: true, decision: 'escalate' })
                            }}
                          >
                            Flag risk & escalate
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'governance' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>Governance gate</div>
                          <div className="uw-admin-small">
                            Overrides require governance approval. This step simulates request + approval by click.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Request status" v={<span className={`badge ${state.governanceRequested ? 'bg-azure-lt' : 'bg-muted-lt'}`}>{state.governanceRequested ? 'Requested' : 'Not requested'}</span>} />
                            <Kv k="Approval" v={<span className={`badge ${state.governanceApproved ? 'bg-green-lt' : 'bg-muted-lt'}`}>{state.governanceApproved ? 'Approved' : 'Pending'}</span>} />
                            <Kv k="Required" v="Rationale + portfolio check + authority boundary" />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Governance approval requested')
                              setPartial({ governanceRequested: true })
                            }}
                            disabled={state.governanceRequested}
                          >
                            Request governance approval
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Governance approved (simulated)')
                              setPartial({ governanceApproved: true })
                              goTo('decision')
                            }}
                            disabled={!state.governanceRequested || state.governanceApproved}
                          >
                            Receive approval
                          </button>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Escalated to Carrier Authority (governance alternative)')
                              setPartial({ escalatedToCarrier: true, decision: 'escalate' })
                              goTo('confirm')
                            }}
                          >
                            Escalate to Carrier Authority instead
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'decision' && (
                      <>
                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>Decision options</div>
                          <div className="uw-admin-small">
                            Approve requires governance + portfolio confirmation. Escalate if outside authority.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Governance" v={<span className={`badge ${state.governanceApproved ? 'bg-green-lt' : 'bg-yellow-lt'}`}>{state.governanceApproved ? 'Approved' : 'Not approved'}</span>} />
                            <Kv k="Portfolio" v={<span className={`badge ${state.portfolioChecked ? 'bg-green-lt' : 'bg-yellow-lt'}`}>{state.portfolioChecked ? 'Checked' : 'Not checked'}</span>} />
                            <Kv k="AI stance" v="Approve override if both gates are satisfied" />
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Decision set: approve override')
                              setPartial({ decision: 'approve_override' })
                              goTo('confirm')
                            }}
                            disabled={!state.governanceApproved || !state.portfolioChecked}
                          >
                            Approve override
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Decision set: decline')
                              setPartial({ decision: 'decline' })
                              goTo('confirm')
                            }}
                          >
                            Decline
                          </button>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Decision set: escalate to Carrier Authority')
                              setPartial({ decision: 'escalate', escalatedToCarrier: true })
                              goTo('confirm')
                            }}
                          >
                            Escalate to Carrier Authority
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'confirm' && (
                      <>
                        <div className="uw-block">
                          <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Decision summary</div>
                          <div className="uw-admin-small">Final click locks the decision rationale into the audit trail.</div>

                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Decision" v={<span className="badge bg-indigo-lt">{state.decision === 'approve_override' ? 'Approve override' : state.decision === 'decline' ? 'Decline' : 'Escalate'}</span>} />
                            <Kv k="Governance" v={<span className={`badge ${state.governanceApproved ? 'bg-green-lt' : 'bg-muted-lt'}`}>{state.governanceApproved ? 'Approved' : 'N/A'}</span>} />
                            <Kv k="Portfolio" v={<span className={`badge ${state.portfolioChecked ? 'bg-green-lt' : 'bg-muted-lt'}`}>{state.portfolioChecked ? 'Checked' : 'N/A'}</span>} />
                            <Kv k="Escalation" v={<span className={`badge ${state.escalatedToCarrier ? 'bg-yellow-lt' : 'bg-muted-lt'}`}>{state.escalatedToCarrier ? 'Carrier Authority' : 'No'}</span>} />
                          </div>
                        </div>

                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI audit note</div>
                          <div className="uw-admin-small">
                            AI stores structured rationale fields (non-sensitive) for governance traceability and portfolio reporting.
                          </div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Rationale stored" v="Override trigger + portfolio guardrails + governance status + escalation path" />
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
                              nav('/demo-underwriter/senior')
                            }}
                          >
                            Lock & restart
                          </button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/roles/underwriter/senior')}>
                            Back to role page
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
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
                      <div><strong>Decides:</strong> overrides with governance approval</div>
                      <div><strong>Accountable:</strong> portfolio impact & escalation logic</div>
                    </div>
                    <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25, marginTop: '0.4rem' }}>
                      <li>AI proposes an override and explains tradeoffs</li>
                      <li>Portfolio check confirms guardrails before governance</li>
                      <li>Governance gate is mandatory for override approval</li>
                      <li>Escalate to Carrier Authority if outside authority</li>
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
