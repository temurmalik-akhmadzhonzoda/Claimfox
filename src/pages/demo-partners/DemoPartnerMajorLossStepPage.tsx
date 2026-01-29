import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_partnerStorage'

const KEY_STATE = 'DEMO_PARTNER_MAJORLOSS_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_MAJORLOSS_AUDIT'

type StepId = 'intake' | 'triage' | 'experts' | 'governance' | 'lock'

type MajorLossState = {
  selectedPartner: string
  triageLevel: 'none' | 'high-touch' | 'standard' | 'containment'
  expertsRequested: boolean
  governanceNotified: boolean
  locked: boolean
}

const PARTNERS = ['CrisisAdjust', 'MajorLoss Partners', 'ForensicClaims']

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Intake', subtitle: 'Begin major loss triage' },
  { id: 'triage', title: 'Triage', subtitle: 'Set triage level' },
  { id: 'experts', title: 'Experts', subtitle: 'Request experts pack' },
  { id: 'governance', title: 'Governance', subtitle: 'Notify governance' },
  { id: 'lock', title: 'Lock', subtitle: 'Lock major loss plan' }
]

function defaultState(): MajorLossState {
  return {
    selectedPartner: '',
    triageLevel: 'none',
    expertsRequested: false,
    governanceNotified: false,
    locked: false
  }
}

export default function DemoPartnerMajorLossStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])
  const [state, setState] = useState<MajorLossState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-partners/major-loss/step/intake" replace />

  function setPartial(p: Partial<MajorLossState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const snapshot = [
    { label: state.selectedPartner || 'Partner unset', ok: !!state.selectedPartner },
    { label: `Triage ${state.triageLevel}`, ok: state.triageLevel !== 'none' },
    { label: state.expertsRequested ? 'Experts requested' : 'Experts not requested', ok: state.expertsRequested },
    { label: state.governanceNotified ? 'Governance notified' : 'Governance not notified', ok: state.governanceNotified },
    { label: state.locked ? 'Locked' : 'Unlocked', ok: state.locked }
  ]

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">PARTNER DEMO</div>
                <h2 className="page-title">{current.title}</h2>
                <div className="text-muted">{current.subtitle}</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/major-loss')}>
                    Restart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page-body">
          <div className="container-xl">
            <div className="finance-shell">
              <div>
                <div className="card">
                  <div className="card-header">
                    <div>
                      <div className="text-muted">Step {STEPS.findIndex((s) => s.id === stepId) + 1}/{STEPS.length}</div>
                      <h3 className="card-title mb-0">{current.title}</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">Case</div>
                    <div className="fw-semibold">CLM-10421 · Major loss</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI note</div><div className="text-muted">High exposure: start triage and identify expert network.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Major loss intake started')
                            nav('/demo-partners/major-loss/step/triage')
                          }}>Begin major loss triage</button>
                        </div>
                      </>
                    )}

                    {stepId === 'triage' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI recommendation</div><div className="text-muted">Use high-touch for catastrophic exposure.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: 'Triage: High-touch', value: 'high-touch' },
                            { label: 'Triage: Standard', value: 'standard' },
                            { label: 'Triage: Containment', value: 'containment' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Triage level: ${opt.value}`)
                              setPartial({ triageLevel: opt.value as MajorLossState['triageLevel'] })
                              nav('/demo-partners/major-loss/step/experts')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'experts' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI recommendation</div><div className="text-muted">Select a major loss partner and request experts pack.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          {PARTNERS.map((p) => (
                            <button key={p} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Partner selected: ${p}`)
                              setPartial({ selectedPartner: p })
                            }}>{p}</button>
                          ))}
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Experts pack requested')
                            setPartial({ expertsRequested: true })
                            nav('/demo-partners/major-loss/step/governance')
                          }}>Request experts pack</button>
                        </div>
                      </>
                    )}

                    {stepId === 'governance' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI note</div><div className="text-muted">Notify governance if exposure exceeds thresholds.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Governance notified')
                            setPartial({ governanceNotified: true })
                            nav('/demo-partners/major-loss/step/lock')
                          }}>Notify governance</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Governance held')
                            setPartial({ governanceNotified: false })
                            nav('/demo-partners/major-loss/step/lock')
                          }}>Hold governance</button>
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">Summary</div><div className="text-muted">Triage: {state.triageLevel}</div><div className="text-muted">Partner: {state.selectedPartner || '—'}</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Major loss plan locked')
                            setPartial({ locked: true })
                            nav('/demo-partners/major-loss')
                          }}>Lock major loss plan</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/major-loss')}>
                            Restart demo
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="finance-admin">
                <div className="admin-panel">
                  <h4>Step navigation</h4>
                  <div className="list-group">
                    {STEPS.map((s) => (
                      <button key={s.id} className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${s.id === stepId ? 'active' : ''}`} onClick={() => nav(`/demo-partners/major-loss/step/${s.id}`)} type="button">
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>
                  <hr />
                  <h4>AI & Accountability</h4>
                  <div>Decides: triage + experts + governance</div>
                  <div>Accountable: severity control</div>
                  <hr />
                  <h4>Snapshot</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {snapshot.map((s) => (
                      <span key={s.label} className={`badge ${s.ok ? 'bg-green-lt' : 'bg-secondary-lt'}`}>
                        {s.label}
                      </span>
                    ))}
                  </div>
                  <hr />
                  <h4>Audit log</h4>
                  <div className="admin-audit">
                    {audit.length === 0 && <div className="text-muted">No entries yet.</div>}
                    {audit.slice(0, 8).map((a) => (
                      <div key={`${a.ts}-${a.message}`} className="admin-audit-item">
                        <div className="ts">{a.ts}</div>
                        <div className="msg">{a.message}</div>
                      </div>
                    ))}
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
