import { Scatter, ScatterChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import CapabilityScoreBar from '@/strategy/components/CapabilityScoreBar'

type ComparisonRow = {
  category: string
  loadsure: string
  insurfox: string
}

const comparisonRows: ComparisonRow[] = [
  { category: 'Core Revenue Model', loadsure: 'MGA commissions and freight policy premium flows', insurfox: 'Infrastructure subscription and workflow platform monetization' },
  { category: 'Target Customers', loadsure: 'Shippers, logistics platforms, freight brokers', insurfox: 'Insurers, brokers, fleets, claims organizations, partners' },
  { category: 'Underwriting Capability', loadsure: 'Live cargo risk pricing in production', insurfox: 'Decision support and rule orchestration (infrastructure phase)' },
  { category: 'Claims Automation', loadsure: 'Focused freight claim handling automation', insurfox: 'Cross-module claims process automation with FNOL and workflow depth' },
  { category: 'Embedded APIs', loadsure: 'Strong embedded freight API model', insurfox: 'Broader platform API vision across insurance lifecycle modules' },
  { category: 'Geographic Focus', loadsure: 'US, UK, and selected EU freight corridors', insurfox: 'DACH-first operating model with international infrastructure ambition' },
  { category: 'Product Breadth', loadsure: 'Freight-centric insurance products', insurfox: 'Broker, claims, fleet, partner, underwriting, and governance modules' },
  { category: 'Strategic Position', loadsure: 'AI-native specialty insurer/operator', insurfox: 'AI-driven insurance infrastructure layer' }
]

const swotLoadsure = {
  strengths: 'Commercial underwriting engine, embedded insurance distribution, clear niche specialization.',
  weaknesses: 'Narrower lifecycle control outside freight-specific domains.',
  opportunities: 'Scale embedded distribution partnerships and expand corridor coverage.',
  threats: 'Carrier dependency, pricing competition, and freight cycle volatility.'
}

const swotInsurfox = {
  strengths: 'Full-lifecycle infrastructure vision, module ecosystem, workflow and UX depth.',
  weaknesses: 'Early commercialization stage, underwriting economics not yet fully productized.',
  opportunities: 'Enterprise platform positioning across broker-carrier-fleet operating models.',
  threats: 'Execution speed requirements and competition from specialized AI MGA models.'
}

const positioningData = [
  { name: 'Loadsure', infraDepth: 62, productOwnership: 88 },
  { name: 'Insurfox', infraDepth: 90, productOwnership: 56 }
]

const loadsureAiScores = [
  { label: 'Dynamic pricing', score: 4.6 },
  { label: 'Risk scoring', score: 4.4 },
  { label: 'Freight data integration', score: 4.3 }
]

const insurfoxAiScores = [
  { label: 'Vision AI damage scan', score: 3.9 },
  { label: 'Fraud scoring potential', score: 3.7 },
  { label: 'Predictive fleet risk', score: 4.0 },
  { label: 'Portfolio analytics', score: 3.8 },
  { label: 'Workflow automation', score: 4.2 }
]

export default function LoadsureAnalysisPage() {
  return (
    <section className="page" style={{ gap: '1.25rem', background: '#ffffff' }}>
      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1.25rem' }}>
        <Card>
          <Header
            title="Competitive Analysis: Loadsure vs Insurfox"
            subtitle="AI-powered Freight Insurance vs Intelligent Insurance Infrastructure"
            titleColor="#0f172a"
            subtitleColor="#475569"
          />
        </Card>

        <Card title="Executive Summary">
          <div style={{ display: 'grid', gap: '0.75rem', color: '#334155', lineHeight: 1.65 }}>
            <p style={{ margin: 0 }}>
              Loadsure operates as an AI-native freight-focused MGA with a clear commercial proposition: live cargo pricing and embedded freight insurance delivery through API-enabled channels.
            </p>
            <p style={{ margin: 0 }}>
              Insurfox is developing a broader insurance infrastructure stack that spans underwriting, broker workflows, FNOL, claims orchestration, partner coordination, and fleet risk operations through modular products.
            </p>
            <p style={{ margin: 0 }}>
              Strategically, Loadsure optimizes for vertical insurance product ownership in freight. Insurfox optimizes for horizontal process ownership across the insurance lifecycle.
            </p>
            <p style={{ margin: 0 }}>
              Insurfox has leverage where clients need cross-domain orchestration and long-term operating model modernization, rather than a single embedded freight underwriting engine.
            </p>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
          <Card title="Loadsure">
            <ul style={listStyle}>
              <li>Business model: MGA / Lloyd’s Coverholder</li>
              <li>Focus: On-demand cargo insurance</li>
              <li>Core products: Thames, Orinoco, Danube and freight-specific offerings</li>
              <li>AI underwriting engine in commercial deployment</li>
              <li>API-first architecture for embedded distribution</li>
              <li>Geography: US + UK + EU</li>
              <li>Funding: approximately USD 11M Series A</li>
              <li>Estimated employee range: 10-100</li>
            </ul>
          </Card>
          <Card title="Insurfox">
            <ul style={listStyle}>
              <li>IaaS infrastructure model for insurance operations</li>
              <li>Core modules: Claimsfox, Brokerfox, Fleetfox, Partnerfox</li>
              <li>AI-driven workflow, UX, FNOL, risk, and analytics capabilities</li>
              <li>Ecosystem ambition across broker, insurer, reinsurer, and fleet contexts</li>
              <li>Current maturity: prototype to infrastructure build phase</li>
            </ul>
          </Card>
        </div>

        <Card title="Business Model Comparison">
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Loadsure</th>
                  <th style={thStyle}>Insurfox</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.category}>
                    <td style={tdStrongStyle}>{row.category}</td>
                    <td style={tdStyle}>{row.loadsure}</td>
                    <td style={tdStyle}>{row.insurfox}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(320px, 1fr)', gap: '1rem' }}>
          <Card title="Market Positioning Chart">
            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 12, left: 10, bottom: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" dataKey="infraDepth" name="Infrastructure Depth" domain={[0, 100]} stroke="#475569" />
                  <YAxis type="number" dataKey="productOwnership" name="Insurance Product Ownership" domain={[0, 100]} stroke="#475569" />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    formatter={(value: number, key: string) => [`${value}`, key === 'infraDepth' ? 'Infrastructure Depth' : 'Insurance Product Ownership']}
                    labelFormatter={(_, payload) => (payload?.[0]?.payload?.name ?? '') as string}
                  />
                  <Scatter data={positioningData} fill="#d4380d" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Risk Matrix">
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              <RiskRow label="Execution Speed Risk (Insurfox)" level="Medium-High" />
              <RiskRow label="Pricing Engine Moat (Loadsure)" level="High" />
              <RiskRow label="Platform Adoption Risk (Insurfox)" level="Medium" />
              <RiskRow label="Market Concentration Risk (Loadsure)" level="Medium-High" />
              <RiskRow label="Partnership Dependence Risk (Both)" level="Medium" />
            </div>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1rem' }}>
          <Card title="Loadsure AI Capability">
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {loadsureAiScores.map((item) => <CapabilityScoreBar key={item.label} label={item.label} score={item.score} />)}
            </div>
          </Card>
          <Card title="Insurfox AI Capability Vision">
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {insurfoxAiScores.map((item) => <CapabilityScoreBar key={item.label} label={item.label} score={item.score} />)}
            </div>
          </Card>
        </div>

        <Card title="Strategic Gap Analysis">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            <div>
              <h3 style={subHeadingStyle}>Where Loadsure is ahead</h3>
              <ul style={listStyle}>
                <li>Live underwriting engine in active freight deployment.</li>
                <li>Operational embedded insurance API model.</li>
                <li>Commercially proven product-market fit in niche vertical.</li>
              </ul>
            </div>
            <div>
              <h3 style={subHeadingStyle}>Where Insurfox differentiates</h3>
              <ul style={listStyle}>
                <li>Full-lifecycle infrastructure capability across insurance operations.</li>
                <li>Multi-module ecosystem with extensible architecture.</li>
                <li>UX depth across FNOL, AI scan, and end-to-end workflow orchestration.</li>
                <li>Integrated broker, fleet, claims, and partner operating model.</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card title="SWOT Comparison">
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>Dimension</th>
                  <th style={thStyle}>Loadsure</th>
                  <th style={thStyle}>Insurfox</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={tdStrongStyle}>Strengths</td><td style={tdStyle}>{swotLoadsure.strengths}</td><td style={tdStyle}>{swotInsurfox.strengths}</td></tr>
                <tr><td style={tdStrongStyle}>Weaknesses</td><td style={tdStyle}>{swotLoadsure.weaknesses}</td><td style={tdStyle}>{swotInsurfox.weaknesses}</td></tr>
                <tr><td style={tdStrongStyle}>Opportunities</td><td style={tdStyle}>{swotLoadsure.opportunities}</td><td style={tdStyle}>{swotInsurfox.opportunities}</td></tr>
                <tr><td style={tdStrongStyle}>Threats</td><td style={tdStyle}>{swotLoadsure.threats}</td><td style={tdStyle}>{swotInsurfox.threats}</td></tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Strategic Recommendation (CEO View)">
          <div style={{ display: 'grid', gap: '0.8rem', color: '#334155', lineHeight: 1.6 }}>
            <p style={{ margin: 0 }}>
              Insurfox should not pursue direct tactical replication of Loadsure’s freight niche model as a primary strategy. The stronger path is selective capability parity combined with infrastructure-led differentiation.
            </p>
            <p style={{ margin: 0 }}>
              Partnership should remain an option where freight pricing engines can be integrated through modular interfaces while Insurfox maintains orchestration ownership across underwriting, claims, and partner workflows.
            </p>
            <p style={{ margin: 0 }}>
              A pricing/risk micro-engine should be developed or integrated as an infrastructure component, not as a standalone freight insurance product strategy.
            </p>
            <p style={{ margin: 0 }}>
              Long-term differentiation should focus on becoming the operating layer for multi-party insurance execution across brokers, insurers, reinsurers, and fleets.
            </p>
          </div>
        </Card>

        <Card title="Financial Estimation Panel">
          <div style={{ display: 'grid', gap: '0.7rem', color: '#334155' }}>
            <div style={financeBoxStyle}>
              <strong>Loadsure scenario model</strong>
              <span>Estimated GWP potential (freight niche): EUR 350M - EUR 700M corridor (scenario range).</span>
              <span>Estimated valuation range: MGA-style multiple model at approximately 3x - 6x revenue assumption.</span>
            </div>
            <div style={financeBoxStyle}>
              <strong>Insurfox scenario model</strong>
              <span>Infrastructure platform multiple potential: approximately 6x - 12x ARR if platform scale and recurring enterprise integration are achieved.</span>
            </div>
            <div style={{ fontSize: '0.83rem', color: '#64748b' }}>
              All figures are strategic scenario models for board-level planning and not audited financial guidance.
            </div>
          </div>
        </Card>

        <Card title="Conclusion">
          <p style={{ margin: 0, color: '#334155', lineHeight: 1.7 }}>
            Loadsure is positioned as an AI-native freight insurer. Insurfox is positioned as an AI-driven insurance infrastructure platform.
            The strategic implication is that both sit on different layers of the value chain: product ownership vs operating infrastructure.
          </p>
        </Card>
      </div>
    </section>
  )
}

function RiskRow({ label, level }: { label: string; level: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.7rem', border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.55rem 0.65rem' }}>
      <span style={{ color: '#334155', fontSize: '0.88rem' }}>{label}</span>
      <strong style={{ color: '#0f172a', fontSize: '0.86rem' }}>{level}</strong>
    </div>
  )
}

const listStyle = {
  margin: 0,
  paddingLeft: '1.1rem',
  display: 'grid',
  gap: '0.4rem',
  color: '#334155',
  lineHeight: 1.5
}

const subHeadingStyle = {
  margin: '0 0 0.4rem 0',
  fontSize: '1rem',
  color: '#0f172a'
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse' as const,
  fontSize: '0.9rem'
}

const headRowStyle = {
  background: '#f8fafc',
  color: '#0f172a'
}

const thStyle = {
  textAlign: 'left' as const,
  padding: '0.65rem 0.7rem',
  borderBottom: '1px solid #e2e8f0',
  fontWeight: 700,
  fontSize: '0.82rem'
}

const tdStyle = {
  padding: '0.6rem 0.7rem',
  borderBottom: '1px solid #eef2f7',
  verticalAlign: 'top' as const,
  color: '#334155'
}

const tdStrongStyle = {
  ...tdStyle,
  color: '#0f172a',
  fontWeight: 600
}

const financeBoxStyle = {
  display: 'grid',
  gap: '0.35rem',
  border: '1px solid #e2e8f0',
  borderRadius: 10,
  padding: '0.65rem 0.75rem'
}
