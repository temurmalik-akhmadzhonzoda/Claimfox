import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import '@/styles/underwriter-premium.css'

export default function DemoDriverOverviewPage() {
  const navigate = useNavigate()

  return (
    <section className="uw-page">
      <div className="uw-container">
        <Header
          title="Driver Journey Demo"
          subtitle="Register, complete your profile, report a claim — and see how chat supports you."
          subtitleColor="#65748b"
          actions={(
            <div className="uw-actions">
              <Button onClick={() => navigate('/demo-driver/step/register')} disableHover>
                Start demo
              </Button>
            </div>
          )}
        />

        <div className="uw-grid uw-kpi">
          <Card title="Steps" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>6</strong>
              <span className="uw-muted">Registration to summary</span>
            </div>
          </Card>
          <Card title="Audience" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>Driver</strong>
              <span className="uw-muted">Claims journey</span>
            </div>
          </Card>
          <Card title="Mode" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>Demo</strong>
              <span className="uw-muted">No login required</span>
            </div>
          </Card>
          <Card title="Channel" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>Chat + Upload</strong>
              <span className="uw-muted">HITL support</span>
            </div>
          </Card>
          <Card title="Response SLA" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>24h</strong>
              <span className="uw-muted">Initial response</span>
            </div>
          </Card>
          <Card title="Status" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>Ready</strong>
              <span className="uw-muted">Start the demo</span>
            </div>
          </Card>
        </div>

        <div className="uw-grid uw-split">
          <Card title="Step overview" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <table className="uw-table">
                <thead>
                  <tr>
                    <th>Step</th>
                    <th>Focus</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Registration</td>
                    <td>Demo ready</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Profile completion</td>
                    <td>Prefilled</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>FNOL claim</td>
                    <td>Chat-based</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Evidence upload</td>
                    <td>Attached</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Chat support</td>
                    <td>HITL</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Summary</td>
                    <td>Audit-ready</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
          <Card title="Snapshot" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <strong>Driver journey demo</strong>
              <div>Pre-filled data, no manual input required.</div>
              <div className="uw-muted">AI suggestion — requires human review</div>
              <div className="uw-muted">Insurance communication shown</div>
            </div>
          </Card>
        </div>

        <div className="uw-grid uw-triplet">
          <Card title="AI & HITL" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <div className="uw-panel">AI suggestion — requires human review</div>
              <div>AI triages the intake, humans approve the outcome.</div>
            </div>
          </Card>
          <Card title="Governance" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <div>Audit trail for every step.</div>
              <div className="uw-muted">Decision accountability stays with the carrier.</div>
            </div>
          </Card>
          <Card title="Communication" variant="glass" className="uw-card">
            <div className="uw-card-body">
              <div>Driver + insurance chat with clear next steps.</div>
              <div className="uw-muted">No automated decisions.</div>
            </div>
          </Card>
        </div>

        <Card title="Audit log" variant="glass" className="uw-card">
          <div className="uw-card-body">
            <div>Demo created</div>
            <div>Driver journey staged</div>
            <div>HITL checkpoints defined</div>
          </div>
        </Card>

        <div className="uw-disclaimer">
          Demo data only. AI suggestions require human review.
        </div>
      </div>
    </section>
  )
}
