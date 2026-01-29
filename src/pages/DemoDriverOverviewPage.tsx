import React from 'react'
import { useNavigate } from 'react-router-dom'
import '@/styles/demo-shell.css'

const stateKey = 'DEMO_DRIVER_STATE'
const auditKey = 'DEMO_DRIVER_AUDIT'
const animKey = 'DEMO_DRIVER_ANIM_DONE'
const chatKey = 'DEMO_DRIVER_CHAT'

const resetDemo = () => {
  sessionStorage.removeItem(stateKey)
  sessionStorage.removeItem(auditKey)
  sessionStorage.removeItem(animKey)
  sessionStorage.removeItem(chatKey)
}

export default function DemoDriverOverviewPage() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">Driver demo</div>
                <h2 className="page-title">Driver Journey — Guided Demo</h2>
                <div className="text-muted">
                  UX-first click dummy. No typing required. See how the driver experience connects to carrier operations.
                </div>
              </div>
              <div className="col-auto ms-auto">
                <div className="btn-list">
                  <button type="button" className="btn btn-primary" onClick={() => navigate('/demo-driver/step/register')}>
                    Start demo
                  </button>
                  <button type="button" className="btn btn-outline-primary" onClick={() => resetDemo()}>
                    Reset demo
                  </button>
                  <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/demo')}>
                    Back to overview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              <div className="col-12 col-lg-7">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">What you’ll see</h3>
                  </div>
                  <div className="card-body">
                    <ol className="list-group list-group-numbered">
                      <li className="list-group-item">Registration — capture email</li>
                      <li className="list-group-item">Onboarding — wizard + progress</li>
                      <li className="list-group-item">Profile — driver & company data</li>
                      <li className="list-group-item">Identification — ID + selfie match</li>
                      <li className="list-group-item">Quote — carrier liability + vehicles</li>
                      <li className="list-group-item">Purchase — checkout + payment</li>
                      <li className="list-group-item">Claims — FNOL chatbot intake</li>
                      <li className="list-group-item">Chat — insurer communication (HITL)</li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-5">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Guided demo principles</h3>
                  </div>
                  <div className="card-body d-grid gap-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-muted">No manual input</span>
                      <span className="badge bg-green-lt">Click-only</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-muted">Prefilled data</span>
                      <span className="badge bg-blue-lt">Realistic</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-muted">AI & HITL</span>
                      <span className="badge bg-orange-lt">Human review</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-muted">Audit trail</span>
                      <span className="badge bg-indigo-lt">Always on</span>
                    </div>
                  </div>
                </div>
                <div className="card mt-3">
                  <div className="card-body">
                    <div className="text-muted">Ready to start?</div>
                    <div className="fw-bold">Click “Start demo” to open the driver surface.</div>
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
