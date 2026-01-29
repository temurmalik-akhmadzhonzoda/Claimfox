import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_partnerStorage'

const KEY_STATE = 'DEMO_PARTNER_ASSIST_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_ASSIST_AUDIT'

type StepId = 'intake' | 'dispatch' | 'sla-kpi' | 'chat' | 'close'

type AssistState = {
  selectedPartner: string
  dispatchMode: 'none' | 'tow' | 'roadside' | 'replacement'
  slaChecked: boolean
  kpiChecked: boolean
  chatTemplate: 'none' | 'dispatch' | 'status' | 'close'
  closed: boolean
}

const PARTNERS = ['RoadAssist Süd', 'AutoHelp24', 'FleetRescue']

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Intake', subtitle: 'Select partner' },
  { id: 'dispatch', title: 'Dispatch', subtitle: 'Set dispatch mode' },
  { id: 'sla-kpi', title: 'SLA/KPI', subtitle: 'Confirm checks' },
  { id: 'chat', title: 'Chat', subtitle: 'Send templates' },
  { id: 'close', title: 'Close', subtitle: 'Close assistance' }
]

function defaultState(): AssistState {
  return {
    selectedPartner: '',
    dispatchMode: 'none',
    slaChecked: false,
    kpiChecked: false,
    chatTemplate: 'none',
    closed: false
  }
}

export default function DemoPartnerAssistanceStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])
  const [state, setState] = useState<AssistState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-partners/assistance/step/intake" replace />

  function setPartial(p: Partial<AssistState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const snapshot = [
    { label: state.selectedPartner || 'Partner unset', ok: !!state.selectedPartner },
    { label: `Dispatch ${state.dispatchMode}`, ok: state.dispatchMode !== 'none' },
    { label: state.slaChecked ? 'SLA checked' : 'SLA not checked', ok: state.slaChecked },
    { label: state.kpiChecked ? 'KPI checked' : 'KPI not checked', ok: state.kpiChecked },
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/assistance')}>
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
                    <div className="fw-semibold">CLM-10421 · München</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI note</div><div className="text-muted">Pick closest capable partner; confirm dispatch type.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Assistance flow started')
                            nav('/demo-partners/assistance/step/dispatch')
                          }}>Select assistance partner</button>
                        </div>
                      </>
                    )}

                    {stepId === 'dispatch' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI recommendation</div><div className="text-muted">Select partner and dispatch mode aligned with SLA.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          {PARTNERS.map((p) => (
                            <button key={p} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Partner selected: ${p}`)
                              setPartial({ selectedPartner: p })
                            }}>{p}</button>
                          ))}
                          {[
                            { label: 'Dispatch: Tow', value: 'tow' },
                            { label: 'Dispatch: Roadside', value: 'roadside' },
                            { label: 'Dispatch: Replacement vehicle', value: 'replacement' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-outline-secondary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Dispatch mode: ${opt.value}`)
                              setPartial({ dispatchMode: opt.value as AssistState['dispatchMode'] })
                              nav('/demo-partners/assistance/step/sla-kpi')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'sla-kpi' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI note</div><div className="text-muted">SLA target 30 min; current ETA 22 min.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'SLA checked')
                            setPartial({ slaChecked: true })
                          }}>Confirm SLA check</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'KPI checked')
                            setPartial({ kpiChecked: true })
                            nav('/demo-partners/assistance/step/chat')
                          }}>Confirm KPI check</button>
                        </div>
                      </>
                    )}

                    {stepId === 'chat' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI note</div><div className="text-muted">Use structured templates; avoid free text.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Template sent: dispatch details')
                            setPartial({ chatTemplate: 'dispatch' })
                          }}>Send template: Dispatch details</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Template sent: status request')
                            setPartial({ chatTemplate: 'status' })
                          }}>Send template: Status request</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Partner update received')
                          }}>Receive partner update</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/assistance/step/close')}>
                            Proceed to close
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'close' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI note</div><div className="text-muted">Close once completion evidence received.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Assistance completed')
                            setPartial({ closed: true })
                            nav('/demo-partners/assistance')
                          }}>Mark completed</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/assistance')}>
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
                      <button key={s.id} className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${s.id === stepId ? 'active' : ''}`} onClick={() => nav(`/demo-partners/assistance/step/${s.id}`)} type="button">
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>
                  <hr />
                  <h4>AI & Accountability</h4>
                  <div>Decides: dispatch + SLA/KPI checks</div>
                  <div>Accountable: response time & comms</div>
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
