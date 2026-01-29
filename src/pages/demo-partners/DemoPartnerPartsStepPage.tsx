import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_partnerStorage'

const KEY_STATE = 'DEMO_PARTNER_PARTS_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_PARTS_AUDIT'

type StepId = 'intake' | 'sourcing' | 'quote' | 'sla-kpi' | 'close'

type PartsState = {
  selectedPartner: string
  sourcingMode: 'none' | 'oem' | 'aftermarket' | 'mixed'
  quoteStatus: 'none' | 'requested' | 'received'
  slaChecked: boolean
  chatTemplate: 'none' | 'request-quote' | 'confirm-order' | 'close'
  closed: boolean
}

const PARTNERS = ['PartsDirect', 'OEM Hub', 'Aftermarket Pro']

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Intake', subtitle: 'Select parts network' },
  { id: 'sourcing', title: 'Sourcing', subtitle: 'Select partner & mode' },
  { id: 'quote', title: 'Quote', subtitle: 'Request quote' },
  { id: 'sla-kpi', title: 'SLA/KPI', subtitle: 'Confirm checks' },
  { id: 'close', title: 'Close', subtitle: 'Close parts order' }
]

function defaultState(): PartsState {
  return {
    selectedPartner: '',
    sourcingMode: 'none',
    quoteStatus: 'none',
    slaChecked: false,
    chatTemplate: 'none',
    closed: false
  }
}

export default function DemoPartnerPartsStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])
  const [state, setState] = useState<PartsState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-partners/parts/step/intake" replace />

  function setPartial(p: Partial<PartsState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const snapshot = [
    { label: state.selectedPartner || 'Partner unset', ok: !!state.selectedPartner },
    { label: `Sourcing ${state.sourcingMode}`, ok: state.sourcingMode !== 'none' },
    { label: `Quote ${state.quoteStatus}`, ok: state.quoteStatus === 'received' },
    { label: state.slaChecked ? 'SLA checked' : 'SLA not checked', ok: state.slaChecked },
    { label: state.closed ? 'Closed' : 'Open', ok: state.closed }
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/parts')}>
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
                    <div className="fw-semibold">CLM-10421 · Parts request</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI note</div><div className="text-muted">Select network before sourcing mode.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Parts intake started')
                            nav('/demo-partners/parts/step/sourcing')
                          }}>Select parts network</button>
                        </div>
                      </>
                    )}

                    {stepId === 'sourcing' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI recommendation</div><div className="text-muted">OEM for warranty, aftermarket for cost control.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          {PARTNERS.map((p) => (
                            <button key={p} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Partner selected: ${p}`)
                              setPartial({ selectedPartner: p })
                            }}>{p}</button>
                          ))}
                          {[
                            { label: 'Sourcing: OEM', value: 'oem' },
                            { label: 'Sourcing: Aftermarket', value: 'aftermarket' },
                            { label: 'Sourcing: Mixed', value: 'mixed' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-outline-secondary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Sourcing mode: ${opt.value}`)
                              setPartial({ sourcingMode: opt.value as PartsState['sourcingMode'] })
                              nav('/demo-partners/parts/step/quote')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'quote' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI note</div><div className="text-muted">Request quote before order.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Quote requested')
                            setPartial({ quoteStatus: 'requested', chatTemplate: 'request-quote' })
                          }}>Request quote</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Quote received')
                            setPartial({ quoteStatus: 'received' })
                            nav('/demo-partners/parts/step/sla-kpi')
                          }}>Receive quote</button>
                        </div>
                      </>
                    )}

                    {stepId === 'sla-kpi' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI note</div><div className="text-muted">Confirm SLA/KPI before order.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'SLA checked')
                            setPartial({ slaChecked: true })
                          }}>Confirm SLA check</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'KPI checked')
                            nav('/demo-partners/parts/step/close')
                          }}>Confirm KPI check</button>
                        </div>
                      </>
                    )}

                    {stepId === 'close' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI note</div><div className="text-muted">Close once order placed.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Order confirmed')
                            setPartial({ closed: true })
                            nav('/demo-partners/parts')
                          }}>Confirm order placed</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/parts')}>
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
                      <button key={s.id} className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${s.id === stepId ? 'active' : ''}`} onClick={() => nav(`/demo-partners/parts/step/${s.id}`)} type="button">
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>
                  <hr />
                  <h4>AI & Accountability</h4>
                  <div>Decides: sourcing + quote + SLA</div>
                  <div>Accountable: cost & time</div>
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
