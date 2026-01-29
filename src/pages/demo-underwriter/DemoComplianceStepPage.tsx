import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/uw-demo.css'

const KEY_STATE = 'DEMO_UW_COMPLIANCE_STATE'
const KEY_AUDIT = 'DEMO_UW_COMPLIANCE_AUDIT'

type StepId = 'intake' | 'rules' | 'evidence' | 'exceptions' | 'signoff'

type ComplianceState = {
  caseId: string
  insured: string
  product: string
  referralReason: string
  ruleSetVersion: string
  modelVersion: string
  consentLogged: boolean
  evidenceScore: number
  evidenceChecked: boolean
  rulesChecked: boolean
  exceptionFlagged: boolean
  exceptionReason: 'none' | 'low_evidence' | 'rule_conflict' | 'consent_missing' | 'data_mismatch'
  auditSealed: boolean
}

type AuditItem = { ts: number; message: string }

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Compliance intake', subtitle: 'Scope & governance only' },
  { id: 'rules', title: 'Rules integrity', subtitle: 'Validate ruleset execution' },
  { id: 'evidence', title: 'Evidence review', subtitle: 'Confirm evidence quality' },
  { id: 'exceptions', title: 'Exceptions', subtitle: 'Escalate or mark informational' },
  { id: 'signoff', title: 'Audit sign-off', subtitle: 'Seal audit trail' },
]

function nowTs() {
  return Date.now()
}
function fmt(ts: number) {
  return new Date(ts).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })
}

function defaultState(): ComplianceState {
  return {
    caseId: 'UW-CA-77102',
    insured: 'Nordstadt Logistics GmbH',
    product: 'Carrier Liability + Fleet',
    referralReason: 'Senior UW requested compliance validation (override path)',
    ruleSetVersion: 'UW-RULESET-4.8.2',
    modelVersion: 'risk-model-2.3.1',
    consentLogged: true,
    evidenceScore: 86,
    evidenceChecked: false,
    rulesChecked: false,
    exceptionFlagged: false,
    exceptionReason: 'none',
    auditSealed: false,
  }
}

function readState(): ComplianceState {
  try {
    const raw = sessionStorage.getItem(KEY_STATE)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}
function writeState(next: ComplianceState) {
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

export default function DemoComplianceStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])

  const [state, setState] = useState<ComplianceState>(() => readState())

  useEffect(() => {
    const s = readState()
    setState(s)
    writeState(s)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-underwriter/compliance/step/intake" replace />
  const stepIndex = STEPS.findIndex((s) => s.id === stepId)

  function setPartial(p: Partial<ComplianceState>) {
    const next = { ...state, ...p }
    setState(next)
    writeState(next)
  }

  function goTo(next: StepId) {
    nav(`/demo-underwriter/compliance/step/${next}`)
  }

  const snapshotBadges = [
    { label: 'Rules Checked', ok: state.rulesChecked },
    { label: 'Evidence Checked', ok: state.evidenceChecked },
    { label: 'Consent Logged', ok: state.consentLogged },
    { label: 'Exception Flagged', ok: state.exceptionFlagged },
    { label: 'Audit Sealed', ok: state.auditSealed },
  ]

  const canGoNext = (() => {
    if (stepId === 'intake') return true
    if (stepId === 'rules') return state.rulesChecked
    if (stepId === 'evidence') return state.evidenceChecked
    if (stepId === 'exceptions') return true
    if (stepId === 'signoff') return true
    return false
  })()

  const exceptionAction = (() => {
    switch (state.exceptionReason) {
      case 'low_evidence':
        return 'Request additional documentation'
      case 'rule_conflict':
        return 'Escalate to Compliance Lead'
      case 'consent_missing':
        return 'Block until consent logged'
      case 'data_mismatch':
        return 'Reconcile entity identifiers'
      default:
        return 'No exceptions detected'
    }
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-underwriter/compliance')}>
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
                      <span>Step {stepIndex + 1}/{STEPS.length} · audit only</span>
                    </div>
                    <span className="badge bg-indigo-lt">Compliance</span>
                  </div>

                  <div className="uw-decision-body">
                    {stepId === 'intake' && (
                      <>
                        <div className="uw-block">
                          <div className="uw-kv">
                            <Kv k="Case ID" v={state.caseId} />
                            <Kv k="Insured" v={state.insured} />
                            <Kv k="Product" v={state.product} />
                            <Kv k="Referral" v={state.referralReason} />
                          </div>
                        </div>

                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>Scope</div>
                          <div className="uw-admin-small">
                            Scope is governance validation only. Underwriting decision remains with Underwriter/Carrier Authority.
                          </div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>Verify consent</li>
                            <li>Verify rule set version and applied rules</li>
                            <li>Verify evidence completeness</li>
                            <li>Ensure audit trail is complete</li>
                          </ul>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Compliance review started (case received)')
                              goTo('rules')
                            }}
                          >
                            Start compliance review
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'rules' && (
                      <>
                        <div className="uw-block">
                          <div className="uw-kv">
                            <Kv k="RuleSet" v={<span className="badge bg-azure-lt">{state.ruleSetVersion}</span>} />
                            <Kv k="Model" v={<span className="badge bg-azure-lt">{state.modelVersion}</span>} />
                          </div>
                        </div>

                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>Rules executed</div>
                          <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>
                            <li>Appetite check: PASS</li>
                            <li>Sanctions screening: PASS</li>
                            <li>Geo constraints: PASS</li>
                            <li>Override used: YES (requires audit justification)</li>
                          </ul>
                          <div className="uw-admin-small" style={{ marginTop: '0.4rem' }}>
                            Override path detected. Ensure justification + approval trail exists.
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Rules integrity confirmed (ruleset validated)')
                              setPartial({ rulesChecked: true, exceptionFlagged: false, exceptionReason: 'none' })
                              goTo('evidence')
                            }}
                          >
                            Confirm rule integrity
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Exception flagged: rule conflict (manual review required)')
                              setPartial({ rulesChecked: true, exceptionFlagged: true, exceptionReason: 'rule_conflict' })
                              goTo('evidence')
                            }}
                          >
                            Flag rule conflict
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'evidence' && (
                      <>
                        <div className="uw-block">
                          <div className="uw-kv">
                            <Kv k="Company registry match" v={<span className="badge bg-green-lt">MATCH</span>} />
                            <Kv k="Loss history" v={<span className="badge bg-green-lt">YES</span>} />
                            <Kv k="Financials" v={<span className="badge bg-green-lt">YES</span>} />
                            <Kv k="Consent record" v={<span className="badge bg-green-lt">PRESENT</span>} />
                          </div>
                        </div>

                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>Evidence quality</div>
                          <div className="uw-admin-small">Evidence score: {state.evidenceScore}/100</div>
                          <div className="uw-admin-small">Evidence quality is within threshold. Escalate only if below 70.</div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              appendAudit('Evidence pack confirmed (quality sufficient)')
                              setPartial({ evidenceChecked: true })
                              goTo('exceptions')
                            }}
                          >
                            Confirm evidence complete
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              appendAudit('Exception flagged: low evidence (quality below threshold)')
                              setPartial({ evidenceChecked: true, exceptionFlagged: true, exceptionReason: 'low_evidence' })
                              goTo('exceptions')
                            }}
                          >
                            Flag low evidence
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'exceptions' && (
                      <>
                        {state.exceptionFlagged ? (
                          <>
                            <div className="uw-block uw-ai">
                              <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>Exception flagged</div>
                              <div className="uw-admin-small">Reason: {state.exceptionReason}</div>
                              <div className="uw-admin-small">Recommended action: {exceptionAction}</div>
                              <div className="uw-admin-small" style={{ marginTop: '0.3rem' }}>
                                Do not block underwriting automatically unless consent missing. Escalate with clear rationale.
                              </div>
                            </div>

                            <div className="uw-cta-row">
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  appendAudit('Escalated to Compliance Lead (exception review)')
                                  goTo('signoff')
                                }}
                              >
                                Escalate to Compliance Lead
                              </button>
                              <button
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                  appendAudit('Exception noted (informational) – underwriting not blocked')
                                  goTo('signoff')
                                }}
                              >
                                Mark as informational (no block)
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="uw-block">
                              <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>No exceptions detected</div>
                              <div className="uw-admin-small">All governance checks passed.</div>
                            </div>
                            <div className="uw-cta-row">
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  appendAudit('No exceptions detected (proceed to audit seal)')
                                  goTo('signoff')
                                }}
                              >
                                Proceed to audit seal
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {stepId === 'signoff' && (
                      <>
                        <div className="uw-block">
                          <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Compliance summary</div>
                          <div className="uw-kv" style={{ marginTop: '0.4rem' }}>
                            <Kv k="Rules checked" v={<span className={`badge ${state.rulesChecked ? 'bg-green-lt' : 'bg-muted-lt'}`}>{state.rulesChecked ? 'Yes' : 'No'}</span>} />
                            <Kv k="Evidence checked" v={<span className={`badge ${state.evidenceChecked ? 'bg-green-lt' : 'bg-muted-lt'}`}>{state.evidenceChecked ? 'Yes' : 'No'}</span>} />
                            <Kv k="Consent logged" v={<span className={`badge ${state.consentLogged ? 'bg-green-lt' : 'bg-muted-lt'}`}>{state.consentLogged ? 'Yes' : 'No'}</span>} />
                            <Kv k="Exception" v={<span className={`badge ${state.exceptionFlagged ? 'bg-yellow-lt' : 'bg-green-lt'}`}>{state.exceptionFlagged ? 'Flagged' : 'None'}</span>} />
                          </div>
                        </div>

                        <div className="uw-block uw-ai">
                          <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>Output</div>
                          <div className="uw-admin-small">
                            {state.exceptionFlagged || !state.rulesChecked || !state.evidenceChecked
                              ? 'Compliance exception flagged'
                              : 'Compliance cleared'}
                          </div>
                          <div className="uw-admin-small" style={{ marginTop: '0.3rem' }}>
                            Sealing audit trail ensures traceability for governance & regulators.
                          </div>
                        </div>

                        <div className="uw-cta-row">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              if (!state.auditSealed) {
                                appendAudit('Audit sealed (compliance sign-off recorded)')
                                setPartial({ auditSealed: true })
                              }
                              nav('/demo-underwriter/compliance')
                            }}
                          >
                            Seal audit trail
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => nav('/demo-underwriter/compliance')}
                          >
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
                      <div><strong>Decides:</strong> rule & audit integrity checks</div>
                      <div><strong>Accountable:</strong> audit trail & governance discipline</div>
                    </div>
                    <ul className="m-0 ps-3" style={{ fontSize: '0.78rem', lineHeight: 1.25, marginTop: '0.4rem' }}>
                      <li>Validates ruleset + model versions</li>
                      <li>Confirms evidence completeness</li>
                      <li>Flags exceptions with rationale</li>
                      <li>Seals audit trail for regulators</li>
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
