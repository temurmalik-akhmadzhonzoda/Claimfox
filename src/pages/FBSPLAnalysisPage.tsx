import { useMemo, useState, type CSSProperties } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'
import {
  capabilityCoverage,
  capabilityRows,
  companyProfile,
  contactPeople,
  decisionOptions,
  riskBullets,
  riskHeatmap,
  solutionLensRows,
  sourceUrls,
  strategicFitPoints,
  synergies,
  type BiText
} from '@/analysis/fbspl/fbsplData'

function bi(value: BiText, lang: 'de' | 'en') {
  return lang === 'de' ? value.de : value.en
}

function numberFmt(value: number) {
  return new Intl.NumberFormat('en-US').format(Math.round(value))
}

function heatColor(score: number) {
  if (score >= 16) return '#b91c1c'
  if (score >= 12) return '#dc2626'
  if (score >= 9) return '#f97316'
  if (score >= 6) return '#f59e0b'
  return '#16a34a'
}

export default function FBSPLAnalysisPage() {
  const { lang } = useI18n()
  const l = lang === 'de' ? 'de' : 'en'

  const [annualVolume, setAnnualVolume] = useState(90_000)
  const [inhouseCost, setInhouseCost] = useState(34)
  const [outsourcedCost, setOutsourcedCost] = useState(24)
  const [qaOverheadPct, setQaOverheadPct] = useState(8)

  const riskChartData = useMemo(
    () =>
      riskHeatmap.map((risk) => {
        const score = risk.likelihood * risk.impact
        return {
          label: bi(risk.label, l),
          score,
          likelihood: risk.likelihood,
          impact: risk.impact
        }
      }),
    [l]
  )

  const coverageChartData = useMemo(
    () => capabilityCoverage.map((row) => ({ area: bi(row.area, l), fbspl: row.fbspl, insurfox: row.insurfox })),
    [l]
  )

  const strategicChartData = useMemo(
    () => strategicFitPoints.map((row) => ({ name: bi(row.name, l), overlap: row.overlap, value: row.value })),
    [l]
  )

  const finance = useMemo(() => {
    const grossOperationalSavings = annualVolume * (inhouseCost - outsourcedCost)
    const qaPenalty = annualVolume * outsourcedCost * (qaOverheadPct / 100)
    const riskAdjustedValue = grossOperationalSavings - qaPenalty
    const transitionCost = 150_000

    const unitBenefit = inhouseCost - outsourcedCost - outsourcedCost * (qaOverheadPct / 100)
    const breakEvenVolume = unitBenefit > 0 ? transitionCost / unitBenefit : Number.POSITIVE_INFINITY

    return {
      grossOperationalSavings,
      breakEvenVolume,
      riskAdjustedValue,
      transitionCost
    }
  }, [annualVolume, inhouseCost, outsourcedCost, qaOverheadPct])

  const financialTrend = useMemo(() => {
    const monthlyVolume = annualVolume / 12
    const monthlyInhouse = monthlyVolume * inhouseCost
    const monthlyOutsourced = monthlyVolume * outsourcedCost + monthlyVolume * outsourcedCost * (qaOverheadPct / 100)

    return Array.from({ length: 12 }, (_, i) => {
      const month = i + 1
      const onboarding = month <= 2 ? finance.transitionCost / 2 : 0
      return {
        month,
        inhouse: month * monthlyInhouse,
        outsourced: month * monthlyOutsourced + onboarding,
        value: month * (monthlyInhouse - monthlyOutsourced) - onboarding
      }
    })
  }, [annualVolume, inhouseCost, outsourcedCost, qaOverheadPct, finance.transitionCost])

  const decisionChartData = useMemo(
    () =>
      decisionOptions.map((row) => ({
        option: row.option,
        risk: row.risk,
        control: row.control,
        timeToValue: row.timeToValue,
        compliance: row.compliance,
        upside: row.upside
      })),
    []
  )

  function handleExportPdf() {
    const oldTitle = document.title
    document.title = 'FBSPL_Strategic_Analysis_Insurfox'
    window.print()
    window.setTimeout(() => {
      document.title = oldTitle
    }, 700)
  }

  return (
    <section className="page" style={{ gap: '1.25rem', background: '#ffffff', paddingTop: '1rem' }}>
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 10mm; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .fbspl-print-hide { display: none !important; }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gap: '1rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <Header
              title={bi({ de: 'FBSPL Strategic Analysis & Insurfox Comparison', en: 'FBSPL Strategic Analysis & Insurfox Comparison' }, l)}
              subtitle={bi({ de: 'Insurance Outsourcing & Operational Enablement vs. Digital MGA, Broker & IaaS Platform', en: 'Insurance Outsourcing & Operational Enablement vs. Digital MGA, Broker & IaaS Platform' }, l)}
              titleColor="#0f172a"
              subtitleColor="#475569"
            />
            <div className="fbspl-print-hide" style={{ position: 'sticky', top: 84 }}>
              <Button size="sm" onClick={handleExportPdf}>{bi({ de: 'Executive Report herunterladen (PDF)', en: 'Download Executive Report (PDF)' }, l)}</Button>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: 'Executive Summary', en: 'Executive Summary' }, l)}>
          <div style={{ display: 'grid', gap: '0.6rem', color: '#334155', lineHeight: 1.65 }}>
            <p style={{ margin: 0 }}>{bi({ de: 'FBSPL agiert als BPM- und Insurance-Outsourcing-Partner mit Schwerpunkt auf operativer Ausführung in Policy-, Claims- und Servicing-Prozessen.', en: 'FBSPL operates as a BPM and insurance outsourcing partner focused on operational execution in policy, claims, and servicing processes.' }, l)}</p>
            <p style={{ margin: 0 }}>{bi({ de: 'Insurfox agiert als Hybrid aus MGA, Broker und Plattformbetreiber mit AI-gestützter Workflow-Steuerung sowie Entscheidungsverantwortung.', en: 'Insurfox operates as a hybrid MGA, broker, and platform operator with AI-enabled workflow control and decision accountability.' }, l)}</p>
            <p style={{ margin: 0 }}>{bi({ de: 'Differenzierung: FBSPL liefert Execution-Kapazität; Insurfox steuert Risiko, Underwriting, Distribution und Plattformkontrolle.', en: 'Differentiation: FBSPL delivers execution capacity; Insurfox controls risk, underwriting, distribution, and platform governance.' }, l)}</p>
            <p style={{ margin: 0 }}>{bi({ de: 'Schlüsselfrage für das Board: Wettbewerbspotenzial oder kontrollierter Partnerschaftshebel für skalierbares MGA-Wachstum?', en: 'Key board question: competitive pressure or a controlled partnership lever for scalable MGA growth?' }, l)}</p>
          </div>
        </Card>

        <Card title={bi({ de: 'Unternehmensprofile', en: 'Company Profiles' }, l)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1rem' }}>
            <Card title={bi({ de: 'FBSPL Profil', en: 'FBSPL Profile' }, l)}>
              <ul style={listStyle}>
                {companyProfile.fbspl.map((fact) => (
                  <li key={fact.label.en}><strong>{bi(fact.label, l)}:</strong> {bi(fact.value, l)}</li>
                ))}
              </ul>
            </Card>
            <Card title={bi({ de: 'Insurfox Profil', en: 'Insurfox Profile' }, l)}>
              <ul style={listStyle}>
                {companyProfile.insurfox.map((fact) => (
                  <li key={fact.label.en}><strong>{bi(fact.label, l)}:</strong> {bi(fact.value, l)}</li>
                ))}
              </ul>
            </Card>
          </div>
        </Card>

        <Card title={bi({ de: 'Lösungsvergleich: MGA, Broker, Plattformbetreiber', en: 'Solution comparison: MGA, broker, platform operator' }, l)}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{bi({ de: 'Linse', en: 'Lens' }, l)}</th>
                  <th style={thStyle}>FBSPL</th>
                  <th style={thStyle}>Insurfox</th>
                  <th style={thStyle}>{bi({ de: 'Implikation', en: 'Implication' }, l)}</th>
                </tr>
              </thead>
              <tbody>
                {solutionLensRows.map((row) => (
                  <tr key={row.lens.en}>
                    <td style={tdStrongStyle}>{bi(row.lens, l)}</td>
                    <td style={tdStyle}>{bi(row.fbspl, l)}</td>
                    <td style={tdStyle}>{bi(row.insurfox, l)}</td>
                    <td style={tdStyle}>{bi(row.implication, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={bi({ de: 'Capability Comparison', en: 'Capability Comparison' }, l)}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{bi({ de: 'Capability', en: 'Capability' }, l)}</th>
                  <th style={thStyle}>FBSPL</th>
                  <th style={thStyle}>Insurfox</th>
                </tr>
              </thead>
              <tbody>
                {capabilityRows.map((row) => (
                  <tr key={row.category.en}>
                    <td style={tdStrongStyle}>{bi(row.category, l)}</td>
                    <td style={tdStyle}>{bi(row.fbspl, l)}</td>
                    <td style={tdStyle}>{bi(row.insurfox, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)', gap: '1rem' }}>
          <Card title={bi({ de: 'Capability Coverage (0-100%)', en: 'Capability Coverage (0-100%)' }, l)}>
            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={coverageChartData} margin={{ top: 10, right: 12, left: 0, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="area" stroke="#475569" angle={-12} textAnchor="end" height={64} />
                  <YAxis domain={[0, 100]} stroke="#475569" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="fbspl" name="FBSPL" fill="#d4380d" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="insurfox" name="Insurfox" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title={bi({ de: 'Strategic Fit / Value Matrix', en: 'Strategic Fit / Value Matrix' }, l)}>
            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 12, left: 10, bottom: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" dataKey="overlap" domain={[20, 85]} stroke="#475569" name={bi({ de: 'Operational Overlap', en: 'Operational overlap' }, l)} />
                  <YAxis type="number" dataKey="value" domain={[35, 95]} stroke="#475569" name={bi({ de: 'Strategic Value', en: 'Strategic value' }, l)} />
                  <Tooltip labelFormatter={(_, payload) => (payload?.[0]?.payload?.name ?? '') as string} />
                  <Scatter data={strategicChartData} fill="#0f172a" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
          <Card title={bi({ de: 'Synergies', en: 'Synergies' }, l)}>
            <ul style={listStyle}>
              {synergies.map((entry) => (
                <li key={entry.en}>{bi(entry, l)}</li>
              ))}
            </ul>
          </Card>
          <Card title={bi({ de: 'Risks', en: 'Risks' }, l)}>
            <ul style={listStyle}>
              {riskBullets.map((entry) => (
                <li key={entry.en}>{bi(entry, l)}</li>
              ))}
            </ul>
          </Card>
        </div>

        <Card title={bi({ de: 'Risk Heatmap', en: 'Risk Heatmap' }, l)}>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskChartData} margin={{ top: 10, right: 12, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="label" stroke="#475569" angle={-12} textAnchor="end" height={64} />
                <YAxis domain={[0, 25]} stroke="#475569" />
                <Tooltip formatter={(value: number, _, payload) => {
                  const p = payload as { payload?: { likelihood: number; impact: number } }
                  const detail = p?.payload ? `L${p.payload.likelihood} x I${p.payload.impact}` : ''
                  return [`${value} (${detail})`, bi({ de: 'Score', en: 'Score' }, l)]
                }} />
                <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                  {riskChartData.map((item) => (
                    <Cell key={item.label} fill={heatColor(item.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={bi({ de: 'Financial Impact Simulation', en: 'Financial Impact Simulation' }, l)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(360px, 1fr)', gap: '1rem' }}>
            <div style={{ display: 'grid', gap: '0.8rem' }}>
              <SliderRow
                label={bi({ de: 'Annual transaction volume', en: 'Annual transaction volume' }, l)}
                value={annualVolume}
                min={20_000}
                max={300_000}
                step={5_000}
                suffix=""
                onChange={setAnnualVolume}
              />
              <SliderRow
                label={bi({ de: 'In-house cost per process', en: 'In-house cost per process' }, l)}
                value={inhouseCost}
                min={10}
                max={90}
                step={1}
                suffix="€"
                onChange={setInhouseCost}
              />
              <SliderRow
                label={bi({ de: 'Outsourced cost per process', en: 'Outsourced cost per process' }, l)}
                value={outsourcedCost}
                min={8}
                max={80}
                step={1}
                suffix="€"
                onChange={setOutsourcedCost}
              />
              <SliderRow
                label={bi({ de: 'Rework / QA overhead', en: 'Rework / QA overhead' }, l)}
                value={qaOverheadPct}
                min={0}
                max={25}
                step={1}
                suffix="%"
                onChange={setQaOverheadPct}
              />
            </div>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              <MetricCard label={bi({ de: 'Gross operational cost savings', en: 'Gross operational cost savings' }, l)} value={`€${numberFmt(finance.grossOperationalSavings)}`} />
              <MetricCard label={bi({ de: 'Break-even outsourcing point (volume)', en: 'Break-even outsourcing point (volume)' }, l)} value={Number.isFinite(finance.breakEvenVolume) ? `${numberFmt(finance.breakEvenVolume)} tx` : bi({ de: 'Kein Break-even', en: 'No break-even' }, l)} />
              <MetricCard label={bi({ de: 'Risk-adjusted value', en: 'Risk-adjusted value' }, l)} value={`€${numberFmt(finance.riskAdjustedValue)}`} />
              <p style={noteStyle}>{bi({ de: 'Finanzwerte sind modellbasierte Szenarioannahmen für die Management-Entscheidung.', en: 'Financial values are scenario assumptions for management decision support.' }, l)}</p>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <h3 style={subHeadingStyle}>{bi({ de: 'Simulationstrend (12 Monate)', en: 'Simulation trend (12 months)' }, l)}</h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={financialTrend} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#475569" />
                  <YAxis stroke="#475569" />
                  <Tooltip formatter={(value: number) => `€${numberFmt(value)}`} />
                  <Legend />
                  <Line type="monotone" dataKey="inhouse" name={bi({ de: 'In-house kumuliert', en: 'In-house cumulative' }, l)} stroke="#0f172a" strokeWidth={2.2} dot={false} />
                  <Line type="monotone" dataKey="outsourced" name={bi({ de: 'Outsourced kumuliert', en: 'Outsourced cumulative' }, l)} stroke="#d4380d" strokeWidth={2.2} dot={false} />
                  <Line type="monotone" dataKey="value" name={bi({ de: 'Netto-Wert', en: 'Net value' }, l)} stroke="#16a34a" strokeWidth={2.2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card title={bi({ de: 'Partnership Decision Radar', en: 'Partnership Decision Radar' }, l)}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{bi({ de: 'Option', en: 'Option' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Description', en: 'Description' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Risk', en: 'Risk' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Control', en: 'Control' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Time-to-value', en: 'Time-to-value' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Compliance', en: 'Compliance' }, l)}</th>
                  <th style={thStyle}>{bi({ de: 'Strategic upside', en: 'Strategic upside' }, l)}</th>
                </tr>
              </thead>
              <tbody>
                {decisionOptions.map((option) => (
                  <tr key={option.option}>
                    <td style={tdStrongStyle}>{option.option}</td>
                    <td style={tdStyle}>{bi(option.label, l)}</td>
                    <td style={tdStyle}>{option.risk}</td>
                    <td style={tdStyle}>{option.control}</td>
                    <td style={tdStyle}>{option.timeToValue}</td>
                    <td style={tdStyle}>{option.compliance}</td>
                    <td style={tdStyle}>{option.upside}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '0.85rem', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={decisionChartData} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="option" stroke="#475569" />
                <YAxis domain={[0, 5]} stroke="#475569" />
                <Tooltip />
                <Legend />
                <Bar dataKey="risk" fill="#ef4444" />
                <Bar dataKey="control" fill="#0ea5e9" />
                <Bar dataKey="timeToValue" fill="#d4380d" />
                <Bar dataKey="compliance" fill="#7c3aed" />
                <Bar dataKey="upside" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {contactPeople.length > 0 && (
          <Card title={bi({ de: 'Ansprechpartner (öffentlich verfügbare Quellen)', en: 'Contacts (publicly available sources)' }, l)}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '0.65rem' }}>
              {contactPeople.map((contact) => (
                <div key={`${contact.name}-${contact.role.en}`} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.65rem', background: '#f8fafc', display: 'grid', gap: '0.25rem' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{contact.name}</div>
                  <div style={{ color: '#334155', fontSize: '0.85rem' }}>{bi(contact.role, l)}</div>
                  <div style={{ color: '#475569', fontSize: '0.82rem' }}>{bi(contact.businessUnit, l)} - {bi(contact.region, l)}</div>
                  {contact.linkedinUrl ? (
                    <a href={contact.linkedinUrl} target="_blank" rel="noreferrer" style={{ color: '#0ea5e9', fontSize: '0.82rem', textDecoration: 'none' }}>
                      LinkedIn
                    </a>
                  ) : (
                    <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{bi({ de: 'LinkedIn: verify', en: 'LinkedIn: verify' }, l)}</span>
                  )}
                  <a href={contact.source} target="_blank" rel="noreferrer" style={{ color: '#0ea5e9', fontSize: '0.8rem', textDecoration: 'none' }}>
                    {bi({ de: 'Quelle', en: 'Source' }, l)}
                  </a>
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card title={bi({ de: 'Sources & Assumptions', en: 'Sources & Assumptions' }, l)}>
          <ul style={listStyle}>
            {sourceUrls.map((url) => (
              <li key={url}>{url}</li>
            ))}
            <li>{bi({ de: 'FBSPL Capability Coverage basiert auf öffentlich verfügbaren Servicebeschreibungen.', en: 'FBSPL capability coverage is based on publicly available service descriptions.' }, l)}</li>
            <li>{bi({ de: 'Insurfox wird im Vergleich als Modell mit Underwriting Authority und Plattformkontrolle angenommen (interne Annahme).', en: 'Insurfox is assumed to have underwriting authority and platform control in this comparison (internal assumption).' }, l)}</li>
            <li>{bi({ de: 'Finanzielle Szenarien sind Managementannahmen und keine Preiszusage.', en: 'Financial scenarios are management assumptions, not a commercial quote.' }, l)}</li>
          </ul>
        </Card>
      </div>
    </section>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '0.65rem', background: '#f8fafc' }}>
      <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{label}</div>
      <div style={{ color: '#0f172a', fontWeight: 700, marginTop: '0.2rem', fontSize: '1.05rem' }}>{value}</div>
    </div>
  )
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  suffix: string
  onChange: (value: number) => void
}) {
  return (
    <label style={{ display: 'grid', gap: '0.35rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem' }}>
        <span style={{ color: '#334155', fontWeight: 600 }}>{label}</span>
        <span style={{ color: '#0f172a', fontWeight: 700 }}>
          {suffix === '€' ? `${suffix}${value}` : `${numberFmt(value)}${suffix}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ accentColor: '#d4380d' }}
      />
    </label>
  )
}

const listStyle: CSSProperties = {
  margin: 0,
  paddingLeft: '1rem',
  display: 'grid',
  gap: '0.35rem',
  color: '#334155'
}

const noteStyle: CSSProperties = {
  margin: 0,
  color: '#64748b',
  fontSize: '0.82rem',
  lineHeight: 1.5
}

const subHeadingStyle: CSSProperties = {
  margin: '0 0 0.45rem',
  color: '#0f172a',
  fontSize: '1rem'
}

const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  fontSize: '0.86rem'
}

const headRowStyle: CSSProperties = {
  background: '#f1f5f9'
}

const thStyle: CSSProperties = {
  textAlign: 'left',
  color: '#334155',
  padding: '0.55rem',
  borderBottom: '1px solid #dbe2ea',
  fontWeight: 700,
  whiteSpace: 'nowrap'
}

const tdStyle: CSSProperties = {
  color: '#334155',
  padding: '0.55rem',
  borderBottom: '1px solid #e2e8f0',
  verticalAlign: 'top'
}

const tdStrongStyle: CSSProperties = {
  ...tdStyle,
  color: '#0f172a',
  fontWeight: 700
}
