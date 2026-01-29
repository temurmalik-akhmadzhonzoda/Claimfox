import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_partnerStorage'

const KEY_STATE = 'DEMO_PARTNER_SURVEY_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_SURVEY_AUDIT'

type StepId = 'intake' | 'assign' | 'report' | 'sla-kpi' | 'close'

type SurveyState = {
  selectedPartner: string
  assignment: 'none' | 'onsite' | 'remote' | 'desk-review'
  reportStatus: 'none' | 'requested' | 'received'
  slaChecked: boolean
  chatTemplate: 'none' | 'request-report' | 'remind-sla' | 'close'
  closed: boolean
}

const PARTNERS = ['GutachtenPlus', 'IngenieurBüro Keller', 'SurveyPro']

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Intake', subtitle: 'Assign surveyor' },
  { id: 'assign', title: 'Assign', subtitle: 'Select partner & mode' },
  { id: 'report', title: 'Report', subtitle: 'Request or receive' },
  { id: 'sla-kpi', title: 'SLA/KPI', subtitle: 'Confirm SLA check' },
  { id: 'close', title: 'Close', subtitle: 'Close survey' }
]

function defaultState(): SurveyState {
  return {
    selectedPartner: '',
    assignment: 'none',
    reportStatus: 'none',
    slaChecked: false,
    chatTemplate: 'none',
    closed: false
  }
}

export default function DemoPartnerSurveyorsStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])
  const [state, setState] = useState<SurveyState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-partners/surveyors/step/intake" replace />

  function setPartial(p: Partial<SurveyState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const snapshot = [
    { label: state.selectedPartner || 'Partner unset', ok: !!state.selectedPartner },
    { label: `Assign ${state.assignment}`, ok: state.assignment !== 'none' },
    { label: `Report ${state.reportStatus}`, ok: state.reportStatus === 'received' },
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/surveyors')}>
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
                    <div className="fw-semibold">CLM-10421 · Survey request</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI note</div><div className="text-muted">Assign the fastest qualified surveyor.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Survey flow started')
                            nav('/demo-partners/surveyors/step/assign')
                          }}>Assign surveyor</button>
                        </div>
                      </>
                    )}

                    {stepId === 'assign' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI recommendation</div><div className="text-muted">Choose partner and assignment mode.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          {PARTNERS.map((p) => (
                            <button key={p} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Surveyor selected: ${p}`)
                              setPartial({ selectedPartner: p })
                            }}>{p}</button>
                          ))}
                          {[
                            { label: 'Assignment: Onsite', value: 'onsite' },
                            { label: 'Assignment: Remote', value: 'remote' },
                            { label: 'Assignment: Desk review', value: 'desk-review' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-outline-secondary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Assignment mode: ${opt.value}`)
                              setPartial({ assignment: opt.value as SurveyState['assignment'] })
                              nav('/demo-partners/surveyors/step/report')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'report' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI recommendation</div><div className="text-muted">Request report and confirm reception.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Report requested')
                            setPartial({ reportStatus: 'requested', chatTemplate: 'request-report' })
                          }}>Request report</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Report received')
                            setPartial({ reportStatus: 'received' })
                            nav('/demo-partners/surveyors/step/sla-kpi')
                          }}>Receive report</button>
                        </div>
                      </>
                    )}

                    {stepId === 'sla-kpi' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI note</div><div className="text-muted">Target report SLA: 48 h.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'SLA checked')
                            setPartial({ slaChecked: true })
                          }}>Confirm SLA check</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'SLA breach escalated')
                          }}>Escalate SLA breach</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/surveyors/step/close')}>
                            Proceed to close
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'close' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI note</div><div className="text-muted">Close once report is received and logged.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Survey closed')
                            setPartial({ closed: true })
                            nav('/demo-partners/surveyors')
                          }}>Close with report</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/surveyors')}>
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
                      <button key={s.id} className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${s.id === stepId ? 'active' : ''}`} onClick={() => nav(`/demo-partners/surveyors/step/${s.id}`)} type="button">
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>
                  <hr />
                  <h4>AI & Accountability</h4>
                  <div>Decides: surveyor assignment + report flow</div>
                  <div>Accountable: report SLA</div>
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
