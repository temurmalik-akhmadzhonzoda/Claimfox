import { type CSSProperties } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'

const lossRatioTrend = [
  { month: 'Jan', lossRatio: 61 },
  { month: 'Feb', lossRatio: 63 },
  { month: 'Mar', lossRatio: 66 },
  { month: 'Apr', lossRatio: 64 },
  { month: 'May', lossRatio: 62 }
]

const referralOverrideData = [
  { metric: 'Referral Rate', value: 18 },
  { metric: 'AI Override Rate', value: 7 },
  { metric: 'Exception Cases', value: 4 }
]

const portfolioMixData = [
  { line: 'Fleet', value: 45 },
  { line: 'Cargo', value: 35 },
  { line: 'Composite', value: 20 }
]

const aiConfidenceOverride = [
  { case: 'Case A', confidence: 92, override: 0 },
  { case: 'Case B', confidence: 68, override: 1 },
  { case: 'Case C', confidence: 74, override: 0 }
]

const riskRadarData = [
  { metric: 'Capital Risk', score: 4 },
  { metric: 'Regulatory Risk', score: 3 },
  { metric: 'Portfolio Volatility', score: 4 },
  { metric: 'Reputation Risk', score: 3 },
  { metric: 'Model Risk', score: 3 }
]

const authorityBands = [
  { role: 'Underwriter', limit: 'up to €250k exposure', width: '35%', color: '#94a3b8' },
  { role: 'Senior Underwriter', limit: 'up to €1M exposure', width: '62%', color: '#64748b' },
  { role: 'Chief Underwriting Officer (MGA)', limit: 'unlimited / strategic exceptions', width: '100%', color: '#0f172a' }
]

const sectionAnchors = [
  { id: 'executive-role-definition', label: '1. Executive Role Definition' },
  { id: 'insurfox-role-context', label: '2. Insurfox-Specific Role Context' },
  { id: 'capital-and-risk-responsibility', label: '3. Capital & Risk Responsibility' },
  { id: 'authority-corridor', label: '4. Authority Corridor Visualization' },
  { id: 'kpi-dashboard', label: '5. KPI Dashboard' },
  { id: 'decision-scenarios', label: '6. Realistic Decision Scenarios' },
  { id: 'ai-governance', label: '7. AI Governance' },
  { id: 'risk-profile', label: '8. Risk Profile Visualization' },
  { id: 'structural-criticality', label: '9. Why This Role Is Structurally Critical for Insurfox' }
]

export default function CuoMgaRolePage() {
  const navigate = useNavigate()

  function handlePrint() {
    const oldTitle = document.title
    document.title = 'CUO_MGA_Role_Governance'
    window.print()
    window.setTimeout(() => {
      document.title = oldTitle
    }, 700)
  }

  return (
    <section className="page" style={{ gap: '1.25rem', background: '#fff', paddingTop: '1rem' }}>
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 10mm; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .print-hide { display: none !important; }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <Header
              title="Chief Underwriting Officer (MGA) – Executive Role Definition"
              subtitle="Inside Insurfox / Roles / Chief Underwriting Officer (MGA)"
              titleColor="#0f172a"
              subtitleColor="#475569"
            />
            <div className="print-hide" style={{ display: 'grid', gap: '0.45rem' }}>
              <Button size="sm" onClick={handlePrint}>Print as PDF</Button>
              <Button size="sm" variant="secondary" onClick={() => navigate('/inside-insurfox/roles')}>
                Back to Roles Overview
              </Button>
            </div>
          </div>

          <div className="print-hide" style={{ marginTop: '0.7rem', fontSize: '0.84rem', color: '#334155', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <Link to="/inside-insurfox">Inside Insurfox</Link>
            <span>/</span>
            <Link to="/inside-insurfox/roles">Roles</Link>
            <span>/</span>
            <span>Chief Underwriting Officer (MGA)</span>
          </div>

          <div className="print-hide" style={{ marginTop: '0.8rem', display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {sectionAnchors.map((s) => (
              <a key={s.id} href={`#${s.id}`} style={anchorStyle}>{s.label}</a>
            ))}
          </div>
        </Card>

        <Card title="1. Executive Role Definition">
          <div id="executive-role-definition">
            <p style={pStyle}>
              The Chief Underwriting Officer is the executive accountable for underwriting quality, portfolio profitability, and the discipline of risk acceptance. In classical insurance structures,
              the CUO sets underwriting appetite, authority frameworks, pricing governance, and escalation boundaries. The role is structurally tied to capital stewardship because underwriting decisions
              directly determine loss ratio trajectory, volatility, and solvency pressure.
            </p>
            <p style={{ ...pStyle, marginTop: '0.55rem' }}>
              In a carrier model, the CUO typically controls enterprise underwriting strategy across owned balance sheet and line hierarchies. In an MGA model, the CUO operates under delegated authority
              from capacity providers and must align underwriting strategy with contractually defined corridors, referral triggers, and treaty constraints. This makes governance precision and escalation quality
              central to the role.
            </p>
          </div>
        </Card>

        <Card title="2. Insurfox-Specific Role Context">
          <div id="insurfox-role-context">
            <p style={pStyle}>
              At Insurfox, the CUO sits in a hybrid operating model: MGA + Broker + IaaS platform. The role governs underwriting decisions while preserving alignment between broker-facing market execution,
              MGA authority control, and platform-level data governance. External brokers are connected through the broker portal, and insurers/capacity providers are integrated through the same infrastructure layer.
            </p>
            <p style={{ ...pStyle, marginTop: '0.55rem' }}>
              The CUO works daily with Pricing Actuary, Portfolio Manager, AI Governance Officer, Reinsurance Manager, and Head of Claims. Underwriting is real-time and data-driven; AI supports triage and risk signals,
              but final accountability remains human and explicitly governed.
            </p>
          </div>
        </Card>

        <Card title="3. Capital & Risk Responsibility">
          <div id="capital-and-risk-responsibility">
            <p style={pStyle}>
              The CUO owns underwriting impact on loss ratio and contributes materially to combined ratio resilience. The role balances growth and profitability by controlling acceptance quality, corridor pricing, and exception discipline.
              Capital efficiency depends on reducing avoidable volatility, preventing concentration risk, and ensuring treaty design is used as intended.
            </p>
            <p style={{ ...pStyle, marginTop: '0.55rem' }}>
              Aggregation management and treaty dependency are core: a technically acceptable individual risk can still be declined or referred if portfolio concentration, reinsurance constraints,
              or capital stress signals are breached.
            </p>
          </div>
        </Card>

        <Card title="4. Authority Corridor Visualization">
          <div id="authority-corridor" style={{ display: 'grid', gap: '0.65rem' }}>
            {authorityBands.map((band) => (
              <div key={band.role} style={{ display: 'grid', gap: '0.35rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.8rem', flexWrap: 'wrap' }}>
                  <strong style={{ color: '#0f172a' }}>{band.role}</strong>
                  <span style={{ color: '#475569', fontSize: '0.85rem' }}>{band.limit}</span>
                </div>
                <div style={{ background: '#e2e8f0', borderRadius: 999, height: 14 }}>
                  <div style={{ width: band.width, height: '100%', borderRadius: 999, background: band.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="5. KPI Dashboard">
          <div id="kpi-dashboard" style={chartGridStyle}>
            <div style={chartCardStyle}>
              <h3 style={chartTitleStyle}>Loss Ratio Trend</h3>
              <div style={chartWrapStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lossRatioTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="lossRatio" stroke="#0f172a" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={chartCardStyle}>
              <h3 style={chartTitleStyle}>Referral Rate vs Override Rate</h3>
              <div style={chartWrapStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={referralOverrideData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#334155" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={chartCardStyle}>
              <h3 style={chartTitleStyle}>Portfolio Mix</h3>
              <div style={chartWrapStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={portfolioMixData} dataKey="value" nameKey="line" outerRadius={80}>
                      {portfolioMixData.map((entry, idx) => (
                        <Cell key={entry.line} fill={['#0f172a', '#334155', '#64748b'][idx]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>

        <Card title="6. Realistic Decision Scenarios">
          <div id="decision-scenarios" style={{ display: 'grid', gap: '0.75rem' }}>
            <div style={scenarioCardStyle}>
              <h3 style={subHeadingStyle}>Scenario 1: High-value fleet risk with low AI confidence</h3>
              <p style={noteStyle}><strong>Inputs:</strong> Fleet submission with high insured value, AI recommends accept with confidence below governance minimum.</p>
              <p style={noteStyle}><strong>Risk signals:</strong> Segment concentration already elevated; accumulation limits approaching threshold.</p>
              <p style={noteStyle}><strong>Final decision:</strong> CUO overrides “accept” and issues conditional referral with stricter terms.</p>
              <p style={noteStyle}><strong>Capital implication:</strong> Prevents concentration-driven volatility and preserves reinsurance corridor discipline.</p>
            </div>

            <div style={scenarioCardStyle}>
              <h3 style={subHeadingStyle}>Scenario 2: Cargo risk with geopolitical exposure</h3>
              <p style={noteStyle}><strong>Inputs:</strong> Cargo route intersects unstable geopolitical corridor; AI classifies as moderate.</p>
              <p style={noteStyle}><strong>Risk signals:</strong> Elevated external event risk not fully represented in model baseline.</p>
              <p style={noteStyle}><strong>Final decision:</strong> CUO refers case for enhanced review and conditional capacity consultation.</p>
              <p style={noteStyle}><strong>Capital implication:</strong> Reduces tail-risk exposure and supports treaty-compatibility under stress scenarios.</p>
            </div>

            <div style={scenarioCardStyle}>
              <h3 style={subHeadingStyle}>Scenario 3: Pricing outside corridor under broker pressure</h3>
              <p style={noteStyle}><strong>Inputs:</strong> AI suggests €480k premium; broker requests discount outside approved corridor.</p>
              <p style={noteStyle}><strong>Risk signals:</strong> Discount would erode technical margin below acceptable threshold.</p>
              <p style={noteStyle}><strong>Final decision:</strong> CUO rejects out-of-corridor discount and maintains margin discipline.</p>
              <p style={noteStyle}><strong>Capital implication:</strong> Protects underwriting margin and avoids adverse selection drift in portfolio mix.</p>
            </div>
          </div>
        </Card>

        <Card title="7. AI Governance">
          <div id="ai-governance">
            <p style={pStyle}>
              The CUO does not build AI models. The role defines override thresholds, confidence minimums, human-in-the-loop policy, and escalation triggers for underwriting decisions.
              This ensures AI is an acceleration layer, not an uncontrolled authority source.
            </p>
            <div style={{ ...chartCardStyle, marginTop: '0.65rem' }}>
              <h3 style={chartTitleStyle}>AI Confidence vs Override Example</h3>
              <div style={chartWrapStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={aiConfidenceOverride}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="case" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="confidence" fill="#334155" />
                    <Bar dataKey="override" fill="#b91c1c" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>

        <Card title="8. Risk Profile Visualization">
          <div id="risk-profile" style={chartCardStyle}>
            <h3 style={chartTitleStyle}>CUO Risk Profile (Scale 1–5)</h3>
            <div style={chartWrapStyle}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={riskRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <Radar dataKey="score" stroke="#0f172a" fill="#334155" fillOpacity={0.5} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card title="9. Why This Role Is Structurally Critical for Insurfox">
          <div id="structural-criticality">
            <p style={pStyle}>
              The CUO is the structural control point for profitability discipline in a hybrid MGA + Broker + IaaS model. The role converts strategy into underwriting boundaries
              that keep growth technically profitable.
            </p>
            <p style={{ ...pStyle, marginTop: '0.55rem' }}>
              The CUO anchors AI accountability by defining when models are advisory and when human intervention is mandatory. The role protects capacity credibility in front of insurers,
              enforces broker discipline in pricing corridors, and stabilizes capital outcomes through concentration and treaty governance.
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}

const pStyle: CSSProperties = {
  margin: 0,
  color: '#334155',
  fontSize: '0.9rem',
  lineHeight: 1.62
}

const noteStyle: CSSProperties = {
  margin: 0,
  color: '#334155',
  fontSize: '0.84rem',
  lineHeight: 1.55
}

const subHeadingStyle: CSSProperties = {
  margin: '0 0 0.35rem',
  color: '#0f172a',
  fontSize: '0.92rem'
}

const anchorStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 999,
  padding: '0.25rem 0.55rem',
  color: '#0f172a',
  fontSize: '0.76rem',
  textDecoration: 'none',
  background: '#f8fafc'
}

const chartGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '0.7rem'
}

const chartCardStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 10,
  padding: '0.65rem',
  background: '#f8fafc'
}

const chartTitleStyle: CSSProperties = {
  margin: '0 0 0.45rem',
  color: '#0f172a',
  fontSize: '0.9rem'
}

const chartWrapStyle: CSSProperties = {
  width: '100%',
  height: 240
}

const scenarioCardStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 10,
  padding: '0.65rem',
  background: '#f8fafc',
  display: 'grid',
  gap: '0.35rem'
}
