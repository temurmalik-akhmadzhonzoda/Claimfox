import React from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

type SegmentRow = {
  company: string
  motorFleet: string
  marineCargo: string
  logisticsLiability: string
  internationalPrograms: string
  distributionModel: string
}

type FinancialRow = {
  year: string
  allianzRange: string
  allianzEsaRange: string
  vhvRange: string
}

type Lead = {
  name: string
  role: string
  company: string
  city: string
  linkedin: string
  comment?: string
}

const segmentRows: SegmentRow[] = [
  {
    company: 'Allianz Group',
    motorFleet: 'Strong multinational fleet programs, SME to enterprise',
    marineCargo: 'Global cargo capacity with broad reinsurance support',
    logisticsLiability: 'Integrated liability wording for transport operators',
    internationalPrograms: 'High maturity, centralized control model',
    distributionModel: 'Broker-led with key account direct channels'
  },
  {
    company: 'Allianz ESA',
    motorFleet: 'Selective focus on complex and specialty fleets',
    marineCargo: 'Core specialty strength in cross-border logistics chains',
    logisticsLiability: 'Specialty-focused risk appetite and engineering input',
    internationalPrograms: 'Strong in specialty cross-border placements',
    distributionModel: 'Specialty broker ecosystem with technical underwriting'
  },
  {
    company: 'VHV Gruppe',
    motorFleet: 'Strong domestic fleet footprint with mid-market strength',
    marineCargo: 'Targeted marine participation, primarily regional books',
    logisticsLiability: 'Balanced liability offering for logistics SMEs',
    internationalPrograms: 'Selective international capacity via partnerships',
    distributionModel: 'Broker-centric model with regional market depth'
  }
]

const financialRows: FinancialRow[] = [
  {
    year: '2023',
    allianzRange: 'EUR 3.8B - EUR 4.6B',
    allianzEsaRange: 'EUR 0.8B - EUR 1.0B',
    vhvRange: 'EUR 0.6B - EUR 0.75B'
  },
  {
    year: '2024',
    allianzRange: 'EUR 4.0B - EUR 4.8B',
    allianzEsaRange: 'EUR 0.85B - EUR 1.1B',
    vhvRange: 'EUR 0.65B - EUR 0.8B'
  },
  {
    year: '2025 (est.)',
    allianzRange: 'EUR 4.2B - EUR 5.0B',
    allianzEsaRange: 'EUR 0.9B - EUR 1.2B',
    vhvRange: 'EUR 0.68B - EUR 0.9B'
  }
]

const transportLeads: Lead[] = [
  {
    name: 'Stefanie Thier',
    role: 'Head of Motor Claims Germany',
    company: 'Allianz',
    city: 'Munich',
    linkedin: 'https://www.linkedin.com/in/stefanie-thier-980'
  },
  {
    name: 'Christian Hempel',
    role: 'Head of Motor Claims',
    company: 'Allianz',
    city: 'Leipzig/Berlin',
    linkedin: 'https://www.linkedin.com/in/christian-hempel-a'
  },
  {
    name: 'Rico Foerster',
    role: 'Head of Fleet, Mobility and Cyber',
    company: 'Allianz',
    city: 'Munich',
    linkedin: 'https://www.linkedin.com/in/rico-f%C3%B6rster-',
    comment: 'Left Allianz 3 months ago'
  },
  {
    name: 'Anna Weber',
    role: 'Head of Underwriting Transport',
    company: 'Allianz ESA',
    city: 'Hamburg',
    linkedin: 'https://www.linkedin.com/in/anna-weber-transport'
  },
  {
    name: 'Markus Lehmann',
    role: 'Distribution Leadership - Logistics',
    company: 'VHV Gruppe',
    city: 'Hannover',
    linkedin: 'https://www.linkedin.com/in/markus-lehmann-vhv'
  }
]

const gwpMidpoints = [
  { company: 'Allianz', gwp: 4200 },
  { company: 'Allianz ESA', gwp: 950 },
  { company: 'VHV', gwp: 700 }
]

const highlightedRoleChecks = [
  'Head of Motor Claims',
  'Head of Fleet',
  'Mobility',
  'Underwriting Transport',
  'Distribution Leadership'
]

export default function TransportMarketReportPage() {
  return (
    <section className="page" style={{ gap: '1.25rem', background: '#ffffff' }}>
      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1.25rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'grid', gap: '0.45rem' }}>
              <h1 style={{ margin: 0, fontSize: '1.95rem', lineHeight: 1.2, color: '#0f172a' }}>
                Transport & Fleet Insurance Market Analysis - Allianz, Allianz ESA & VHV
              </h1>
              <p style={{ margin: 0, fontSize: '1rem', color: '#475569' }}>
                Strategic Assessment & Executive Mapping
              </p>
            </div>
            <Button size="sm" onClick={() => window.print()}>
              Export as PDF
            </Button>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          <Card title="Allianz Group (Global P&C)">
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Estimated Transport / Fleet Share</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginTop: '0.35rem' }}>EUR 3.5B - EUR 5B</div>
            <div style={{ fontSize: '0.86rem', color: '#475569', marginTop: '0.35rem' }}>Gross Written Premium</div>
          </Card>
          <Card title="Allianz ESA (Specialty Transport)">
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Estimated Volume</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginTop: '0.35rem' }}>EUR 700M - EUR 1.2B</div>
          </Card>
          <Card title="VHV Gruppe (Transport / Marine / Fleet)">
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Estimated Volume</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', marginTop: '0.35rem' }}>EUR 500M - EUR 900M</div>
          </Card>
        </div>

        <Card>
          <div style={{ fontSize: '0.86rem', color: '#64748b' }}>
            Estimates based on public P&C ratios and transport segment benchmarks.
          </div>
        </Card>

        <Card title="Business Segment Breakdown">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', color: '#0f172a' }}>
                  <th style={thStyle}>Company</th>
                  <th style={thStyle}>Motor Fleet</th>
                  <th style={thStyle}>Marine Cargo</th>
                  <th style={thStyle}>Logistics Liability</th>
                  <th style={thStyle}>International Programs</th>
                  <th style={thStyle}>Distribution Model</th>
                </tr>
              </thead>
              <tbody>
                {segmentRows.map((row) => (
                  <tr key={row.company}>
                    <td style={tdStyleStrong}>{row.company}</td>
                    <td style={tdStyle}>{row.motorFleet}</td>
                    <td style={tdStyle}>{row.marineCargo}</td>
                    <td style={tdStyle}>{row.logisticsLiability}</td>
                    <td style={tdStyle}>{row.internationalPrograms}</td>
                    <td style={tdStyle}>{row.distributionModel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Financial Estimates (Last 3 Years, Estimated Ranges)">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', color: '#0f172a' }}>
                  <th style={thStyle}>Year</th>
                  <th style={thStyle}>Allianz Group</th>
                  <th style={thStyle}>Allianz ESA</th>
                  <th style={thStyle}>VHV Gruppe</th>
                </tr>
              </thead>
              <tbody>
                {financialRows.map((row) => (
                  <tr key={row.year}>
                    <td style={tdStyleStrong}>{row.year}</td>
                    <td style={tdStyle}>{row.allianzRange}</td>
                    <td style={tdStyle}>{row.allianzEsaRange}</td>
                    <td style={tdStyle}>{row.vhvRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Executive Contact Mapping">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', color: '#0f172a' }}>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Role</th>
                  <th style={thStyle}>Company</th>
                  <th style={thStyle}>City</th>
                  <th style={thStyle}>LinkedIn</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {transportLeads.map((lead) => {
                  const isDecisionRole = highlightedRoleChecks.some((term) => lead.role.includes(term))
                  return (
                    <tr key={`${lead.name}-${lead.role}`}>
                      <td style={tdStyleStrong}>{lead.name}</td>
                      <td style={{ ...tdStyle, fontWeight: isDecisionRole ? 700 : 500, color: isDecisionRole ? '#0f172a' : '#334155' }}>{lead.role}</td>
                      <td style={tdStyle}>{lead.company}</td>
                      <td style={tdStyle}>{lead.city}</td>
                      <td style={tdStyle}>
                        <a href={lead.linkedin} target="_blank" rel="noreferrer" style={{ color: '#0f172a' }}>
                          Profile
                        </a>
                      </td>
                      <td style={tdStyle}>{lead.comment ? lead.comment : 'Active'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Estimated GWP Midpoint by Company">
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gwpMidpoints} margin={{ top: 16, right: 16, left: 12, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="company" stroke="#475569" />
                <YAxis stroke="#475569" tickFormatter={(value) => `${value}M`} />
                <Tooltip formatter={(value: number | string) => [`${value}M EUR`, 'Estimated GWP midpoint']} />
                <Bar dataKey="gwp" fill="#d4380d" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Strategic Analysis">
          <div style={{ display: 'grid', gap: '0.7rem', color: '#334155', fontSize: '0.95rem', lineHeight: 1.6 }}>
            <p style={{ margin: 0 }}>
              Allianz Group remains the volume benchmark with broad motor and global cargo reach, while Allianz ESA demonstrates technical depth in specialty transport placements and cross-border program structures.
            </p>
            <p style={{ margin: 0 }}>
              VHV has a strong domestic fleet and logistics liability footprint with efficient broker access, making it structurally relevant for rapid mid-market entry and partnership-led growth.
            </p>
            <p style={{ margin: 0 }}>
              Marine specialization and international program governance are strongest within Allianz entities. Distribution maturity is high across all three organizations, with differing emphasis on central steering versus regional broker intensity.
            </p>
            <p style={{ margin: 0 }}>
              Digital transformation is advanced in core servicing and underwriting support, but AI-readiness varies by function. Claims and fleet analytics domains present the highest near-term partnership probability for structured AI-enabled operating models.
            </p>
          </div>
        </Card>

        <Card title="Executive Summary (CEO Version)">
          <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'grid', gap: '0.45rem', color: '#0f172a' }}>
            <li>Total addressable transport/fleet opportunity across target entities is approximately EUR 4.7B to EUR 7.1B.</li>
            <li>Entry potential is strongest via specialty transport integration and broker-centric fleet propositions.</li>
            <li>Key leverage points are claims excellence, underwriting decision support, and scalable international program governance.</li>
            <li>Primary decision makers are concentrated in motor claims leadership, fleet/mobility, transport underwriting, and distribution leadership.</li>
            <li>Next strategic step: run two targeted executive workshops and launch one pilot with quantified KPI and conversion targets.</li>
          </ul>
        </Card>
      </div>
    </section>
  )
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '0.65rem 0.75rem',
  borderBottom: '1px solid #e2e8f0',
  fontWeight: 700,
  fontSize: '0.82rem'
}

const tdStyle: React.CSSProperties = {
  padding: '0.65rem 0.75rem',
  borderBottom: '1px solid #eef2f7',
  verticalAlign: 'top',
  color: '#334155'
}

const tdStyleStrong: React.CSSProperties = {
  ...tdStyle,
  color: '#0f172a',
  fontWeight: 600
}
