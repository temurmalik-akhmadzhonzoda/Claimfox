import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/uw-demo.css'

const KEY_STATE = 'DEMO_UW_COMPLIANCE_STATE'
const KEY_AUDIT = 'DEMO_UW_COMPLIANCE_AUDIT'

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

function writeState(next: ComplianceState) {
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

export default function DemoCompliancePage() {
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
                <h2 className="page-title">Compliance – Audit & Governance Review</h2>
                <div className="text-muted">Click-only · Audit validation · No underwriting decisions</div>
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
                      nav('/demo-underwriter/compliance/step/intake')
                    }}
                  >
                    Start review
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
                      <span>5 screens · audit-only validation</span>
                    </div>
                    <span className="badge bg-indigo-lt">Compliance</span>
                  </div>

                  <div className="uw-decision-body">
                    <div className="uw-block">
                      <div className="uw-kv">
                        <div className="k">Case</div><div className="v">UW-CA-77102</div>
                        <div className="k">Insured</div><div className="v">Nordstadt Logistics GmbH</div>
                        <div className="k">Product</div><div className="v">Carrier Liability + Fleet</div>
                        <div className="k">Goal</div><div className="v">Audit integrity & governance discipline</div>
                      </div>
                    </div>

                    <div className="uw-block uw-ai">
                      <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI stance (non-binding)</div>
                      <div className="uw-admin-small">
                        Compliance validates rules, evidence, consent, and audit completeness only.
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-azure-lt">Rules</span>
                        <span className="badge bg-azure-lt">Evidence</span>
                        <span className="badge bg-azure-lt">Consent</span>
                        <span className="badge bg-azure-lt">Audit trail</span>
                      </div>
                    </div>

                    <div className="uw-cta-row">
                      <button className="btn btn-primary" onClick={() => nav('/demo-underwriter/compliance/step/intake')}>
                        Start at step 1 (intake)
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => nav('/roles/underwriter/compliance')}>
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
                  <h4>Compliance – Accountability</h4>
                  <div className="uw-admin-small">
                    <div><strong>Decides:</strong> rule & audit integrity checks</div>
                    <div><strong>Accountable:</strong> audit trail & governance discipline</div>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-indigo-lt">Rules</span>
                    <span className="badge bg-indigo-lt">Evidence</span>
                    <span className="badge bg-indigo-lt">Consent</span>
                    <span className="badge bg-indigo-lt">Audit</span>
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
