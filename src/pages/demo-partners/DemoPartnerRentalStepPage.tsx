import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_partnerStorage'

const KEY_STATE = 'DEMO_PARTNER_RENTAL_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_RENTAL_AUDIT'

type StepId = 'intake' | 'vehicle-match' | 'pricing' | 'chat' | 'close'

type RentalState = {
  selectedPartner: string
  vehicleMatch: 'none' | 'van' | 'truck' | 'replacement-car'
  pricingMode: 'none' | 'standard' | 'capped' | 'exception'
  calcReceived: boolean
  chatTemplate: 'none' | 'reserve' | 'confirm-price' | 'close'
  closed: boolean
}

const PARTNERS = ['RentMobil', 'CityRent', 'TruckLease Pro']

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Intake', subtitle: 'Select rental partner' },
  { id: 'vehicle-match', title: 'Vehicle match', subtitle: 'Choose vehicle type' },
  { id: 'pricing', title: 'Pricing', subtitle: 'Confirm pricing mode' },
  { id: 'chat', title: 'Chat', subtitle: 'Templates & updates' },
  { id: 'close', title: 'Close', subtitle: 'Close rental' }
]

function defaultState(): RentalState {
  return {
    selectedPartner: '',
    vehicleMatch: 'none',
    pricingMode: 'none',
    calcReceived: false,
    chatTemplate: 'none',
    closed: false
  }
}

export default function DemoPartnerRentalStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])
  const [state, setState] = useState<RentalState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-partners/rental/step/intake" replace />

  function setPartial(p: Partial<RentalState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const snapshot = [
    { label: state.selectedPartner || 'Partner unset', ok: !!state.selectedPartner },
    { label: `Vehicle ${state.vehicleMatch}`, ok: state.vehicleMatch !== 'none' },
    { label: `Pricing ${state.pricingMode}`, ok: state.pricingMode !== 'none' },
    { label: state.calcReceived ? 'Calc received' : 'Calc pending', ok: state.calcReceived },
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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/rental')}>
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
                    <div className="fw-semibold">CLM-10421 · Rental need</div>

                    {stepId === 'intake' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI note</div><div className="text-muted">Select rental partner based on capacity and SLA.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          {PARTNERS.map((p) => (
                            <button key={p} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Partner selected: ${p}`)
                              setPartial({ selectedPartner: p })
                              nav('/demo-partners/rental/step/vehicle-match')
                            }}>{p}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'vehicle-match' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI note</div><div className="text-muted">Match vehicle to fleet need.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: 'Vehicle: Van', value: 'van' },
                            { label: 'Vehicle: Truck', value: 'truck' },
                            { label: 'Vehicle: Replacement car', value: 'replacement-car' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Vehicle match: ${opt.value}`)
                              setPartial({ vehicleMatch: opt.value as RentalState['vehicleMatch'] })
                              nav('/demo-partners/rental/step/pricing')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'pricing' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI note</div><div className="text-muted">Use capped pricing if duration uncertain.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: 'Pricing: Standard', value: 'standard' },
                            { label: 'Pricing: Capped', value: 'capped' },
                            { label: 'Pricing: Exception', value: 'exception' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Pricing mode: ${opt.value}`)
                              setPartial({ pricingMode: opt.value as RentalState['pricingMode'] })
                            }}>{opt.label}</button>
                          ))}
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Calculation received')
                            setPartial({ calcReceived: true })
                            nav('/demo-partners/rental/step/chat')
                          }}>Receive calculation</button>
                        </div>
                      </>
                    )}

                    {stepId === 'chat' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI note</div><div className="text-muted">Send structured templates for reservation and pricing.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Template sent: reserve')
                            setPartial({ chatTemplate: 'reserve' })
                          }}>Send template: Reserve</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Template sent: confirm price')
                            setPartial({ chatTemplate: 'confirm-price' })
                          }}>Send template: Confirm price</button>
                          <button className="btn btn-outline-secondary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Partner update received')
                          }}>Receive partner update</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/rental/step/close')}>
                            Proceed to close
                          </button>
                        </div>
                      </>
                    )}

                    {stepId === 'close' && (
                      <>
                        <div className="card mt-3"><div className="card-body"><div className="fw-semibold">AI note</div><div className="text-muted">Close when reservation confirmed.</div></div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Rental confirmed')
                            setPartial({ closed: true })
                            nav('/demo-partners/rental')
                          }}>Confirm rental started</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/rental')}>
                            Close (no rental)
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
                      <button key={s.id} className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${s.id === stepId ? 'active' : ''}`} onClick={() => nav(`/demo-partners/rental/step/${s.id}`)} type="button">
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>
                  <hr />
                  <h4>AI & Accountability</h4>
                  <div>Decides: vehicle match + pricing</div>
                  <div>Accountable: cost adherence</div>
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
