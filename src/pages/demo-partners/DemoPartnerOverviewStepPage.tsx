import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, readAudit, readJson, writeJson } from './_partnerStorage'

const KEY_STATE = 'DEMO_PARTNER_OVERVIEW_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_OVERVIEW_AUDIT'

type StepId = 'intake' | 'network' | 'selection' | 'data-pack' | 'lock'

type OverviewState = {
  caseId: string
  network: 'assistance' | 'rental' | 'surveyors' | 'major-loss' | 'parts' | 'none'
  selectedPartner: string
  dataPack: 'calc' | 'report' | 'claim' | 'all' | 'none'
  locked: boolean
}

const NETWORK_PARTNERS: Record<string, string[]> = {
  assistance: ['RoadAssist Süd', 'AutoHelp24', 'FleetRescue'],
  rental: ['RentMobil', 'CityRent', 'TruckLease Pro'],
  surveyors: ['GutachtenPlus', 'IngenieurBüro Keller', 'SurveyPro'],
  'major-loss': ['CrisisAdjust', 'MajorLoss Partners', 'ForensicClaims'],
  parts: ['PartsDirect', 'OEM Hub', 'Aftermarket Pro']
}

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 'intake', title: 'Intake', subtitle: 'Start network selection' },
  { id: 'network', title: 'Network', subtitle: 'Choose a network' },
  { id: 'selection', title: 'Selection', subtitle: 'Pick a partner' },
  { id: 'data-pack', title: 'Data pack', subtitle: 'Request data' },
  { id: 'lock', title: 'Lock', subtitle: 'Lock selection' }
]

function defaultState(): OverviewState {
  return {
    caseId: 'CLM-10421',
    network: 'none',
    selectedPartner: '',
    dataPack: 'none',
    locked: false
  }
}

export default function DemoPartnerOverviewStepPage() {
  const nav = useNavigate()
  const { stepId } = useParams<{ stepId: StepId }>()
  const current = useMemo(() => STEPS.find((s) => s.id === stepId), [stepId])
  const [state, setState] = useState<OverviewState>(() => readJson(KEY_STATE, defaultState()))

  useEffect(() => {
    const next = readJson(KEY_STATE, defaultState())
    setState(next)
    writeJson(KEY_STATE, next)
  }, [stepId])

  if (!stepId || !current) return <Navigate to="/demo-partners/overview/step/intake" replace />

  function setPartial(p: Partial<OverviewState>) {
    const next = { ...state, ...p }
    setState(next)
    writeJson(KEY_STATE, next)
  }

  const audit = readAudit(KEY_AUDIT)
  const snapshot = [
    { label: `Network ${state.network}`, ok: state.network !== 'none' },
    { label: state.selectedPartner || 'Partner not set', ok: !!state.selectedPartner },
    { label: `Data pack ${state.dataPack}`, ok: state.dataPack !== 'none' },
    { label: state.locked ? 'Locked' : 'Unlocked', ok: state.locked }
  ]

  const partnerOptions = state.network !== 'none' ? NETWORK_PARTNERS[state.network] : []

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
                  <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/overview')}>
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
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI note</div>
                          <div className="text-muted">Select network first; avoid cross-network leakage.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Partner overview started')
                            nav('/demo-partners/overview/step/network')
                          }}>Choose network</button>
                        </div>
                      </>
                    )}

                    {stepId === 'network' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">Pick the network that owns the operational step.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: 'Network: Assistance', value: 'assistance' },
                            { label: 'Network: Rental', value: 'rental' },
                            { label: 'Network: Surveyors', value: 'surveyors' },
                            { label: 'Network: Major Loss', value: 'major-loss' },
                            { label: 'Network: Parts', value: 'parts' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Network selected: ${opt.value}`)
                              setPartial({ network: opt.value as OverviewState['network'], selectedPartner: '' })
                              nav('/demo-partners/overview/step/selection')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'selection' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">Select partner based on SLA and proximity.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {partnerOptions.map((partner) => (
                            <button key={partner} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Partner selected: ${partner}`)
                              setPartial({ selectedPartner: partner })
                              nav('/demo-partners/overview/step/data-pack')
                            }}>{partner}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'data-pack' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">AI recommendation</div>
                          <div className="text-muted">Pull calculations + claim info first; request report if needed.</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          {[
                            { label: 'Request: Calculations', value: 'calc' },
                            { label: 'Request: Gutachten/Report', value: 'report' },
                            { label: 'Request: Claim info', value: 'claim' },
                            { label: 'Request: Full pack', value: 'all' }
                          ].map((opt) => (
                            <button key={opt.value} className="btn btn-primary" onClick={() => {
                              appendAudit(KEY_AUDIT, `Data pack requested: ${opt.value}`)
                              setPartial({ dataPack: opt.value as OverviewState['dataPack'] })
                              nav('/demo-partners/overview/step/lock')
                            }}>{opt.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {stepId === 'lock' && (
                      <>
                        <div className="card mt-3"><div className="card-body">
                          <div className="fw-semibold">Summary</div>
                          <div className="text-muted">Network: {state.network}</div>
                          <div className="text-muted">Partner: {state.selectedPartner || '—'}</div>
                          <div className="text-muted">Pack: {state.dataPack}</div>
                        </div></div>
                        <div className="mt-3 d-grid gap-2">
                          <button className="btn btn-primary" onClick={() => {
                            appendAudit(KEY_AUDIT, 'Partner overview locked')
                            setPartial({ locked: true })
                            nav('/demo-partners/overview')
                          }}>Lock selection</button>
                          <button className="btn btn-outline-secondary" onClick={() => nav('/demo-partners/overview')}>
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
                      <button
                        key={s.id}
                        className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${s.id === stepId ? 'active' : ''}`}
                        onClick={() => nav(`/demo-partners/overview/step/${s.id}`)}
                        type="button"
                      >
                        <span>{s.title}</span>
                        <span className="badge bg-blue-lt">{s.id}</span>
                      </button>
                    ))}
                  </div>

                  <hr />
                  <h4>AI & Accountability</h4>
                  <div>Decides: network + partner + data pack</div>
                  <div>Accountable: access discipline</div>

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
