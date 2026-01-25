import React from 'react'

export default function Slide4RiskGovernance() {
  return (
    <div className="bp4-slide">
      <div className="bp4-header">
        <h1>Risk, Governance &amp; Delegated Authority Framework</h1>
        <p>Carrier-aligned controls with real-time data validation and AI-assisted decision support. Capital and risk remain with insurer and reinsurers.</p>
      </div>
      <div className="bp4-grid">
        <div className="bp4-column">
          <div className="bp4-panel">
            <div className="bp4-cap">Delegated Authority &amp; Limits</div>
            <table className="bp4-table">
              <tbody>
                <tr><td>Underwriting authority</td><td className="num">Delegated MGA / Coverholder</td></tr>
                <tr><td>Carrier oversight</td><td className="num">Binding guidelines, referrals, approvals</td></tr>
                <tr><td>Per-risk limit</td><td className="num">$150,000</td></tr>
                <tr><td>Aggregate limits</td><td className="num">Daily and regional aggregates unchanged</td></tr>
                <tr><td>Risk appetite</td><td className="num">Fleet, logistics, cargo (as per binder)</td></tr>
                <tr><td>Exceptions</td><td className="num">Mandatory referral outside defined thresholds</td></tr>
              </tbody>
            </table>
            <div className="bp4-callout">Delegated authority is explicitly bounded by limits, aggregates, appetite and referral rules.</div>
          </div>
          <div className="bp4-panel">
            <div className="bp4-cap">Trigger Mechanics (Realtime, Event-validated)</div>
            <div className="bp4-micro-grid">
              <div className="bp4-micro">
                <h3>Operational Disruption Trigger (Time-based, Days)</h3>
                <ul>
                  <li>Thresholds: 7 / 9 / 10 days</li>
                  <li>Payout logic: 40% at trigger + 3% per additional day (capped at 100%)</li>
                  <li>Validation: Verified real-time logistics and fleet event streams</li>
                </ul>
                <svg className="bp4-spark" width="180" height="72" viewBox="0 0 180 72" role="img" aria-label="Delay trigger payout curve">
                  <polyline points="8,60 60,60 60,42 108,42 108,28 160,28" fill="none" stroke="var(--ix-text-muted)" strokeWidth="2" />
                  <circle cx="60" cy="42" r="3" fill="var(--ix-primary)" />
                  <circle cx="108" cy="28" r="3" fill="var(--ix-primary)" />
                  <text x="8" y="68">7d</text>
                  <text x="58" y="34">9d</text>
                  <text x="106" y="22">10d+</text>
                </svg>
              </div>
              <div className="bp4-micro">
                <h3>Service Interruption Trigger (Telemetry-based, Hours)</h3>
                <ul>
                  <li>Thresholds: 3h / 6h / 9h / 24h</li>
                  <li>Payout logic: 40% at trigger + 6% per incremental interval</li>
                  <li>Validation: System and operational telemetry</li>
                </ul>
                <svg className="bp4-spark" width="180" height="72" viewBox="0 0 180 72" role="img" aria-label="Outage trigger payout curve">
                  <polyline points="8,60 44,60 44,44 84,44 84,30 130,30 130,20 168,20" fill="none" stroke="var(--ix-text-muted)" strokeWidth="2" />
                  <circle cx="44" cy="44" r="3" fill="var(--ix-primary)" />
                  <circle cx="84" cy="30" r="3" fill="var(--ix-primary)" />
                  <circle cx="130" cy="20" r="3" fill="var(--ix-primary)" />
                  <text x="8" y="68">3h</text>
                  <text x="40" y="38">6h</text>
                  <text x="80" y="24">9h</text>
                </svg>
              </div>
            </div>
            <p className="bp4-note">Triggers establish eligibility; payout execution remains subject to policy terms and governance controls.</p>
          </div>
        </div>
        <div className="bp4-column">
          <div className="bp4-panel">
            <div className="bp4-cap">Governance</div>
            <ul className="bp4-bullets">
              <li>Rules-based underwriting and pricing</li>
              <li>Deterministic trigger evaluation</li>
              <li>Referral escalation outside predefined parameters</li>
              <li>Policy wording and pricing version control</li>
              <li>Structured claims workflow</li>
              <li>Moratorium provisions for extreme events</li>
            </ul>
          </div>
          <div className="bp4-panel">
            <div className="bp4-cap">Realtime Data &amp; AI-assisted Decision Framework</div>
            <ul className="bp4-bullets">
              <li>Multi-source real-time data ingestion (logistics, fleet, system telemetry)</li>
              <li>Time-stamped, immutable event records</li>
              <li>Deterministic rule engine for trigger evaluation</li>
              <li>Native AI used for decision support and decision templates</li>
              <li>Human-in-the-loop for approvals and exceptions</li>
              <li>Full audit trail for all trigger and decision events</li>
            </ul>
            <p className="bp4-note">AI provides decision proposals; underwriting authority and final decisions remain governed.</p>
          </div>
        </div>
      </div>
      <footer className="bp4-footer">
        <div className="bp4-footer-rule" aria-hidden="true" />
        <div className="bp4-footer-card">
          <div className="bp4-cap">Audit &amp; Reporting Pack</div>
          <div className="bp4-footer-grid">
            <span>Premium &amp; claims bordereaux</span>
            <span>Loss ratio and frequency/severity monitoring</span>
            <span>Exposure and accumulation views</span>
            <span>Referral and exception logs</span>
            <span>Trigger evidence bundles</span>
            <span>Moratorium and incident reports</span>
          </div>
        </div>
        <p>Designed for delegated authority environments with carrier and reinsurer audit requirements.</p>
      </footer>
    </div>
  )
}
