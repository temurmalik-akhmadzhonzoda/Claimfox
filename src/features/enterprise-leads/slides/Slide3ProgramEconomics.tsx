import React from 'react'

export default function Slide3ProgramEconomics() {
  return (
    <div className="bp3-slide">
      <div className="bp3-header">
        <h1>Program Economics &amp; Revenue Mechanics (MGA View)</h1>
        <p>Indicative economics (70% utilization). Carrier-aligned. Exposure ≠ premium ≠ revenue.</p>
      </div>
      <div className="bp3-grid">
        <div className="bp3-panel">
          <div className="bp3-cap">Projected Gross Written Premium</div>
          <div className="bp3-subtitle">(70% utilization, conservative base case)</div>
          <table className="bp3-table">
            <thead>
              <tr>
                <th>Year</th>
                <th className="num">GWP (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Y1</td><td className="num">$9.1M</td></tr>
              <tr><td>Y2</td><td className="num">$19.8M</td></tr>
              <tr><td>Y3</td><td className="num">$21.1M</td></tr>
              <tr><td>Y4</td><td className="num">$50.9M</td></tr>
              <tr><td className="bp3-strong">Y5</td><td className="num bp3-strong">$102.8M</td></tr>
            </tbody>
          </table>
          <div className="bp3-notes">
            <p>Based on verified enterprise leads</p>
            <p>Broker-led distribution</p>
            <p>Regional expansion without change to underwriting limits</p>
          </div>
        </div>
        <div className="bp3-panel">
          <div className="bp3-cap">MGA Economics</div>
          <table className="bp3-table">
            <tbody>
              <tr><td>Base commission</td><td className="num">29.5%</td></tr>
              <tr><td>Performance bonus</td><td className="num">up to 9.5%</td></tr>
              <tr><td className="bp3-strong">Total commission potential</td><td className="num bp3-strong">up to 39.0%</td></tr>
              <tr><td className="bp3-strong">Target loss ratio</td><td className="num bp3-strong">&lt; 27.5%</td></tr>
            </tbody>
          </table>
          <ul className="bp3-bullets">
            <li>Capital-light MGA model</li>
            <li>No balance sheet risk retained</li>
            <li>Incentives aligned with portfolio performance</li>
            <li>Linear scalability with premium growth</li>
          </ul>
        </div>
        <div className="bp3-panel">
          <div className="bp3-cap">Portfolio Quality Signals</div>
          <ul className="bp3-bullets">
            <li>Enterprise fleet, logistics &amp; cargo insureds</li>
            <li>Tier-1 broker distribution</li>
            <li>Trigger-based, parametric structures</li>
            <li>Per-risk limit: $150,000</li>
            <li>Stable frequency / low severity profile</li>
          </ul>
          <div className="bp3-callout">High-margin MGA economics with controlled downside risk.</div>
        </div>
      </div>
      <div className="bp3-footer">
        <div className="bp3-footer-rule" aria-hidden="true" />
        <div className="bp3-footer-text">
          <span>Economics are carrier-aligned: underwriting authority is delegated,</span>
          <span>capital and risk remain with the insurer and reinsurance panel.</span>
        </div>
      </div>
    </div>
  )
}
