import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_partnerStorage'

const KEY_STATE = 'DEMO_PARTNER_MGMT_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_MGMT_AUDIT'

type PartnerMgmtState = {
  partner: string
  onboardingStatus: 'none' | 'invited' | 'verified' | 'active'
  contractMode: 'standard' | 'premium-sla' | 'restricted'
  kpiMonitoring: boolean
  escalationRule: 'none' | 'auto' | 'manual'
  locked: boolean
}

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

export default function DemoPartnerManagementPage() {
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
                <h2 className="page-title">Partner Management – Onboarding & Controls</h2>
                <div className="text-muted">Click-only · Onboarding and performance rules</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => {
                    resetKeys([KEY_STATE, KEY_AUDIT])
                    writeJson(KEY_STATE, defaultState())
                    appendAudit(KEY_AUDIT, 'Demo reset (manual)')
                  }}>Reset</button>
                  <button className="btn btn-primary" onClick={() => nav('/demo-partners/management/step/intake')}>
                    Start partner setup
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
                      <h3 className="card-title">5 steps · onboarding → lock</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">Partner</div>
                    <div className="fw-semibold">RoadAssist Süd</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-partners/management/step/intake')}>
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
                  <h4>Partner Management – Accountability</h4>
                  <div>Decides: onboarding + controls + performance</div>
                  <div>Accountable: partner quality & governance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
