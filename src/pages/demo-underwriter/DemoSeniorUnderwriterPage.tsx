import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/uw-demo.css'

const KEY_STATE = 'DEMO_UW_SENIOR_STATE'
const KEY_AUDIT = 'DEMO_UW_SENIOR_AUDIT'

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

function writeState(next: SeniorUwState) {
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

export default function DemoSeniorUnderwriterPage() {
  const nav = useNavigate()

  // AUTO RESET ON START
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
                <h2 className="page-title">Senior Underwriter – Override + Governance</h2>
                <div className="text-muted">Click-only · AI recommends · Governance gate · No dashboards</div>
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
                      nav('/demo-underwriter/senior/step/intake')
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
                      <span>6 screens · override requires governance</span>
                    </div>
                    <span className="badge bg-indigo-lt">Senior UW</span>
                  </div>

                  <div className="uw-decision-body">
                    <div className="uw-block">
                      <div className="uw-kv">
                        <div className="k">Case</div><div className="v">UW-OVR-88317</div>
                        <div className="k">Insured</div><div className="v">Nordbahn Freight AG</div>
                        <div className="k">Product</div><div className="v">Fleet Liability + Cargo Extension</div>
                        <div className="k">Goal</div><div className="v">Override under governance + portfolio check</div>
                      </div>
                    </div>

                    <div className="uw-block uw-ai">
                      <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI stance (non-binding)</div>
                      <div className="uw-admin-small">
                        AI suggests a controlled override and highlights portfolio constraints and escalation triggers.
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-azure-lt">Override candidate</span>
                        <span className="badge bg-azure-lt">Governance gate</span>
                        <span className="badge bg-azure-lt">Portfolio impact</span>
                      </div>
                    </div>

                    <div className="uw-cta-row">
                      <button className="btn btn-primary" onClick={() => nav('/demo-underwriter/senior/step/intake')}>
                        Start at step 1 (intake)
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => nav('/roles/underwriter/senior')}>
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
                  <h4>Senior UW – Accountability</h4>
                  <div className="uw-admin-small">
                    <div><strong>Decides:</strong> overrides with governance approval</div>
                    <div><strong>Accountable:</strong> portfolio impact & escalation logic</div>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-indigo-lt">Override governance</span>
                    <span className="badge bg-indigo-lt">Portfolio impact</span>
                    <span className="badge bg-indigo-lt">Escalations</span>
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
