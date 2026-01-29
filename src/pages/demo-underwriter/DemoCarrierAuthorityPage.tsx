import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/uw-demo.css'

const KEY_STATE = 'DEMO_UW_CARRIER_STATE'
const KEY_AUDIT = 'DEMO_UW_CARRIER_AUDIT'

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

function writeState(next: CarrierAuthorityState) {
  sessionStorage.setItem(KEY_STATE, JSON.stringify(next))
}
function clearAll() {
  sessionStorage.removeItem(KEY_STATE)
  sessionStorage.removeItem(KEY_AUDIT)
}
function appendAudit(message: string) {
  const prev = sessionStorage.getItem(KEY_AUDIT)
  const list: AuditItem[] = prev ? JSON.parse(prev) : []
  list.unshift({ ts: nowTs(), message })
  sessionStorage.setItem(KEY_AUDIT, JSON.stringify(list))
}

export default function DemoCarrierAuthorityPage() {
  const nav = useNavigate()

  useEffect(() => {
    clearAll()
    writeState(defaultState())
    appendAudit('Demo started (state reset)')
  }, [])

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">UNDERWRITER DEMO</div>
                <h2 className="page-title">Carrier Authority – Final Capacity & Limits</h2>
                <div className="text-muted">Click-only · Escalation decision · No dashboards</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      clearAll()
                      writeState(defaultState())
                      appendAudit('Demo reset (manual)')
                    }}
                  >
                    Reset
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      appendAudit('Case opened')
                      nav('/demo-underwriter/carrier/step/handover')
                    }}
                  >
                    Start case
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
                <div className="uw-decision">
                  <div className="uw-decision-header">
                    <div className="uw-decision-title">
                      <strong>What you will click through</strong>
                      <span>5 screens · final capacity & limits</span>
                    </div>
                    <span className="badge bg-indigo-lt">Carrier Authority</span>
                  </div>

                  <div className="uw-decision-body">
                    <div className="uw-block">
                      <div className="uw-kv">
                        <div className="k">Case</div><div className="v">UW-CAR-77104</div>
                        <div className="k">Insured</div><div className="v">Nordbahn Freight AG</div>
                        <div className="k">Product</div><div className="v">Fleet Liability + Cargo Extension</div>
                        <div className="k">Goal</div><div className="v">Final capacity & limit decision</div>
                      </div>
                    </div>

                    <div className="uw-block uw-ai">
                      <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI stance (non-binding)</div>
                      <div className="uw-admin-small">
                        AI summarizes escalation reasons and highlights capacity concentration and compliance checks.
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-azure-lt">Capacity check</span>
                        <span className="badge bg-azure-lt">Limit approval</span>
                        <span className="badge bg-azure-lt">Regulatory check</span>
                      </div>
                    </div>

                    <div className="uw-cta-row">
                      <button className="btn btn-primary" onClick={() => nav('/demo-underwriter/carrier/step/handover')}>
                        Start at step 1 (handover)
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => nav('/roles/underwriter/carrier')}>
                        Back to role page
                      </button>
                    </div>

                    <div className="text-muted" style={{ fontSize: '0.82rem' }}>
                      Note: This start screen auto-resets session state on every visit to ensure the click flow always works.
                    </div>
                  </div>
                </div>
              </div>

              <div className="uw-admin">
                <div className="uw-admin-panel">
                  <h4>Carrier Authority – Accountability</h4>
                  <div className="uw-admin-small">
                    <div><strong>Decides:</strong> final capacity & limits</div>
                    <div><strong>Accountable:</strong> risk bearing & regulatory compliance</div>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-indigo-lt">Capacity</span>
                    <span className="badge bg-indigo-lt">Limits</span>
                    <span className="badge bg-indigo-lt">Compliance</span>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(15,23,42,0.10)', paddingTop: '0.6rem' }}>
                    <h4>Audit (live)</h4>
                    <div className="uw-audit">
                      {(() => {
                        const raw = sessionStorage.getItem(KEY_AUDIT)
                        const items: { ts: number; message: string }[] = raw ? JSON.parse(raw) : []
                        if (!items.length) return <div className="uw-admin-small">No entries yet.</div>
                        return items.slice(0, 6).map((it) => (
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
