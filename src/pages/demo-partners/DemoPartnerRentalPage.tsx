import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'
import { appendAudit, resetKeys, writeJson } from './_partnerStorage'

const KEY_STATE = 'DEMO_PARTNER_RENTAL_STATE'
const KEY_AUDIT = 'DEMO_PARTNER_RENTAL_AUDIT'

type RentalState = {
  selectedPartner: string
  vehicleMatch: 'none' | 'van' | 'truck' | 'replacement-car'
  pricingMode: 'none' | 'standard' | 'capped' | 'exception'
  calcReceived: boolean
  chatTemplate: 'none' | 'reserve' | 'confirm-price' | 'close'
  closed: boolean
}

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

export default function DemoPartnerRentalPage() {
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
                <h2 className="page-title">Rental – Vehicle Match & Pricing</h2>
                <div className="text-muted">Click-only · Match vehicle and confirm pricing</div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <button className="btn btn-outline-secondary" onClick={() => {
                    resetKeys([KEY_STATE, KEY_AUDIT])
                    writeJson(KEY_STATE, defaultState())
                    appendAudit(KEY_AUDIT, 'Demo reset (manual)')
                  }}>Reset</button>
                  <button className="btn btn-primary" onClick={() => nav('/demo-partners/rental/step/intake')}>
                    Start rental
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
                      <h3 className="card-title">5 steps · match → close</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-muted">Case</div>
                    <div className="fw-semibold">CLM-10421 · Rental need</div>
                    <div className="mt-3 d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => nav('/demo-partners/rental/step/intake')}>
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
                  <h4>Rental – Accountability</h4>
                  <div>Decides: vehicle match + pricing</div>
                  <div>Accountable: cost & SLA adherence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
