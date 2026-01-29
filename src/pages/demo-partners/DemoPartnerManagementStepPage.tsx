import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_partnerStorage'

const KEY_STATE = 'DEMO_PARTNER_MGMT_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_MGMT_AUDIT'

type StepId = 'intake' | 'onboarding' | 'controls' | 'performance' | 'lock'

type PartnerMgmtState = {
  partner: string
  onboardingStatus: 'none' | 'invited' | 'verified' | 'active'
  contractMode: 'standard' | 'premium-sla' | 'restricted'
  kpiMonitoring: boolean
  escalationRule: 'none' | 'auto' | 'manual'
  locked: boolean
}

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Intake', subtitle: 'Start onboarding review' },
  { id: 'onboarding', title: 'Onboarding', subtitle: 'Verify readiness' },
  { id: 'controls', title: 'Controls', subtitle: 'Set contract mode' },
  { id: 'performance', title: 'Performance', subtitle: 'Set escalation rule' },
  { id: 'lock', title: 'Lock', subtitle: 'Lock partner setup' }
]

function defaultState(): PartnerMgmtState {
  return {
    partner: 'RoadAssist Süd',
    onboardingStatus: 'invited',
    contractMode: 'standard',
    kpiMonitoring: true,
    escalationRule: 'auto',
    locked: false
  }
}

export default function DemoPartnerManagementStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])
  const [state, setState] = useState<PartnerMgmtState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-partners/management/step/intake" replace />

  function setPartial(p: Partial<PartnerMgmtState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const snapshot = [
    { label: `Onboarding ${state.onboardingStatus}`, ok: state.onboardingStatus === 'active' },
    { label: `Contract ${state.contractMode}`, ok: state.contractMode !== 'restricted' },
    { label: state.kpiMonitoring ? 'KPI on' : 'KPI off', ok: state.kpiMonitoring },
    { label: `Escalation ${state.escalationRule}`, ok: state.escalationRule !== 'none' },
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/management')}>
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
                    <div className="text-muted">Partner</div>
                    <div className="fw-semibold">{state.partner}</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI note</div>
                          <div className="text-muted">Validate readiness before activating network access.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Partner management started')
                            nav('/demo-partners/management/step/onboarding')
                          }}>Review onboarding</button>
                        </div>
                      </>
                    )}

                    {stepId === 'onboarding' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">Verify documents before activation.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Documents verified')
                            setPartial({ onboardingStatus: 'verified' })
                          }}>Verify documents</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Partner activated')
                            setPartial({ onboardingStatus: 'active' })
                            nav('/demo-partners/management/step/controls')
                          }}>Activate partner</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Onboarding held')
                            setPartial({ onboardingStatus: 'invited' })
                          }}>Hold onboarding</button>
                        </div>
                      </>
                    )}

                    {stepId === 'controls' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">Least-privilege: restrict access to claim-only unless report needed.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Contract: standard')
                            setPartial({ contractMode: 'standard' })
                          }}>Contract: Standard</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Contract: premium SLA')
                            setPartial({ contractMode: 'premium-sla' })
                          }}>Contract: Premium SLA</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Contract: restricted')
                            setPartial({ contractMode: 'restricted' })
                          }}>Contract: Restricted</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, state.kpiMonitoring ? 'KPI monitoring disabled' : 'KPI monitoring enabled')
                            setPartial({ kpiMonitoring: !state.kpiMonitoring })
                            nav('/demo-partners/management/step/performance')
                          }}>
                            KPI monitoring {state.kpiMonitoring ? 'OFF' : 'ON'}
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'performance' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">Escalate only on repeated SLA breach.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Escalation rule: auto')
                            setPartial({ escalationRule: 'auto' })
                            nav('/demo-partners/management/step/lock')
                          }}>Escalation: Auto</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Escalation rule: manual')
                            setPartial({ escalationRule: 'manual' })
                            nav('/demo-partners/management/step/lock')
                          }}>Escalation: Manual</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'No escalation rule')
                            setPartial({ escalationRule: 'none' })
                            nav('/demo-partners/management/step/lock')
                          }}>No escalation rule</button>
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">Summary</div>
                          <div className="text-muted">Onboarding: {state.onboardingStatus}</div>
                          <div className="text-muted">Contract: {state.contractMode}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Partner setup locked')
                            setPartial({ locked: true })
                            nav('/demo-partners/management')
                          }}>Lock partner setup</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/management')}>
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
                      <button key={s.id} className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${s.id === stepId ? 'active' : ''}`} onClick={() => nav(`/demo-partners/management/step/${s.id}`)} type="button">
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>AI & Accountability</h4>
                  <div>Decides: onboarding + contract controls</div>
                  <div>Accountable: partner quality & governance</div>

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
