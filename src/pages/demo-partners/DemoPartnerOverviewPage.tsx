import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_partnerStorage'

const KEY_STATE = 'DEMO_PARTNER_OVERVIEW_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_OVERVIEW_AUDIT'

type OverviewState = {
  caseId: string
  network: 'assistance' | 'rental' | 'surveyors' | 'major-loss' | 'parts' | 'none'
  selectedPartner: string
  dataPack: 'calc' | 'report' | 'claim' | 'all' | 'none'
  locked: boolean
}

function defaultState(): OverviewState {
  return {
    caseId: 'CLM-10421',
    network: 'none',
    selectedPartner: '',
    dataPack: 'none',
    locked: false
  }
}

export default function DemoPartnerOverviewPage() {
  const nav = useNavigate()

  useEffect(() => {
    resetKeys([KEY_STATE, KEY_AUDIT])
    writeJson(KEY_STATE, defaultState())
    appendAudit(KEY_AUDIT, 'Demo started (state reset)')
  }, [])

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">PARTNER DEMO</div>
                <h2 className="page-title">Partner Overview – Network Selection</h2>
                <div className="text-muted">Click-only · Choose network, partner, and data pack</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      resetKeys([KEY_STATE, KEY_AUDIT])
                      writeJson(KEY_STATE, defaultState())
                      appendAudit(KEY_AUDIT, 'Demo reset (manual)')
                    }}
                  >
                    Reset
                  </button>
                  <button className="btn btn-primary" onClick={() => nav('/demo-partners/overview/step/intake')}>
                    Start overview
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
                      <div className="text-muted">What you will review</div>
                      <h3 className="card-title">5 steps · network → data pack</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">Case</div>
                    <div className="fw-semibold">CLM-10421 · Fleet liability</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-partners/overview/step/intake')}>
                        Start at step 1 (intake)
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => nav('/demo')}>
                        Back to demo overview
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="finance-admin">
                <div className="admin-panel">
                  <h4>Partner Overview – Accountability</h4>
                  <div>Decides: network + partner + data pack</div>
                  <div>Accountable: data access discipline</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
