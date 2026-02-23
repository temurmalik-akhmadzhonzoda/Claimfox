import { useMemo, useState, type CSSProperties } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type BiText = { de: string; en: string }

type DealRow = { label: BiText; value: BiText }
type ComparisonRow = { category: BiText; flock: BiText; insurfox: BiText }
type OptionRow = {
  option: string
  name: BiText
  speed: number
  control: number
  capitalIntensity: number
  underwritingEdge: number
  distributionEdge: number
  regulatoryComplexity: number
}

const dealRows: DealRow[] = [
  { label: { de: 'Käufer', en: 'Buyer' }, value: { de: 'Admiral Group plc', en: 'Admiral Group plc' } },
  { label: { de: 'Zielunternehmen', en: 'Target' }, value: { de: 'Flock (Commercial Fleet Insurance + Risk Tech)', en: 'Flock (commercial fleet insurance + risk tech)' } },
  { label: { de: 'Ankündigung', en: 'Announced' }, value: { de: '12. Februar 2026', en: '12 February 2026' } },
  { label: { de: 'Eigenkapitalwert', en: 'Equity value' }, value: { de: '£80m', en: 'GBP80m' } },
  { label: { de: 'Abschluss', en: 'Close' }, value: { de: 'Erwartet Q2 2026', en: 'Expected Q2 2026' } },
  { label: { de: 'Bedingungen', en: 'Conditions' }, value: { de: 'Vorbehaltlich regulatorischer Freigabe', en: 'Subject to regulatory approval' } },
  { label: { de: 'Vorbeziehung', en: 'Pre-deal relationship' }, value: { de: 'Partnerschaft seit 2024', en: 'Partnership since 2024' } }
]

const comparisonRows: ComparisonRow[] = [
  {
    category: { de: 'Geschäftsmodell', en: 'Business model' },
    flock: { de: 'Fleet-Insurance-Angebot mit telematikgetriebenem Risk-Tech-Fokus innerhalb Admiral.', en: 'Fleet insurance proposition with telemetry-driven risk-tech focus within Admiral.' },
    insurfox: { de: 'Hybrid aus MGA + Broker + Plattform (IaaS) mit operativer End-to-end-Ausführung.', en: 'Hybrid MGA + broker + platform (IaaS) with end-to-end execution.' }
  },
  {
    category: { de: 'Regulatorischer Betriebsmodus', en: 'Regulatory status / operating model' },
    flock: { de: 'Insurer-embedded Modell über Admiral-Struktur.', en: 'Insurer-embedded model via Admiral structure.' },
    insurfox: { de: 'Delegated-Authority-orientierter MGA-/Broker-Operating-Ansatz.', en: 'Delegated-authority oriented MGA/broker operating approach.' }
  },
  {
    category: { de: 'Distributionsansatz', en: 'Distribution motion' },
    flock: { de: 'Flottenfokus mit Broker- und Direktpfaden über Admiral/Flock-Ökosystem.', en: 'Fleet-focused through broker and direct paths in Admiral/Flock ecosystem.' },
    insurfox: { de: 'Broker- und Partnernetzwerk plus modulare Plattformdistribution.', en: 'Broker/partner network plus modular platform distribution.' }
  },
  {
    category: { de: 'Datenvorteil', en: 'Data advantage' },
    flock: { de: 'Realtime-Telematikdaten und fahrverhaltensbasierte Signalverarbeitung.', en: 'Real-time telematics and driving-behavior signal processing.' },
    insurfox: { de: 'Lifecycle-Daten über Underwriting, Claims, Fleet und Partner-Workflows.', en: 'Lifecycle data across underwriting, claims, fleet, and partner workflows.' }
  },
  {
    category: { de: 'Underwriting-Vorteil', en: 'Underwriting edge' },
    flock: { de: 'Telematikbasierte Risikoselektion im Commercial-Motor-Kontext.', en: 'Telemetry-based risk selection in commercial motor context.' },
    insurfox: { de: 'Kombination aus MGA-Authority-Pfad, Pricing-Logik und operativer Execution.', en: 'Combination of MGA authority path, pricing logic, and operational execution.' }
  },
  {
    category: { de: 'Claims-Automatisierungs-Linkage', en: 'Claims automation linkage' },
    flock: { de: 'Primär Prävention/Risk-Layer; Claims-Tiefe nicht als Kernfokus publiziert.', en: 'Primarily prevention/risk layer; deep claims automation not published as core focus.' },
    insurfox: { de: 'Claimsfox als operativer Claims-Execution-Layer inkl. FNOL-Orchestrierung.', en: 'Claimsfox as operational claims execution layer incl. FNOL orchestration.' }
  },
  {
    category: { de: 'Fleet-Services-Adjazenz', en: 'Fleet services adjacency (Fleetfox)' },
    flock: { de: 'Stark bei Safety-Feedback und telematiknahen Flottensignalen.', en: 'Strong on safety feedback and telematics fleet signals.' },
    insurfox: { de: 'Fleetfox verbindet Flottenbetrieb mit Underwriting/Claims/Partner-Steuerung.', en: 'Fleetfox links fleet operations with underwriting/claims/partner steering.' }
  },
  {
    category: { de: 'Partner-Ökosystem-Adjazenz', en: 'Partner ecosystem adjacency (Partnerfox)' },
    flock: { de: 'Broker-/Flottenfokus, begrenzte öffentlich sichtbare Servicepartner-Tiefe.', en: 'Broker/fleet focus, limited publicly visible service-partner depth.' },
    insurfox: { de: 'Partnerfox integriert Werkstatt-, Assistance- und Serviceökosysteme.', en: 'Partnerfox integrates workshop, assistance, and service ecosystems.' }
  },
  {
    category: { de: 'Plattformvorteil (IaaS)', en: 'Platform advantage (IaaS modules)' },
    flock: { de: 'Starke vertikale Telematik-/Risk-Engine.', en: 'Strong vertical telematics/risk engine.' },
    insurfox: { de: 'Breiter horizontaler IaaS-Stack über Brokerfox/Claimsfox/Fleetfox/Partnerfox/AI Fox.', en: 'Broad horizontal IaaS stack across Brokerfox/Claimsfox/Fleetfox/Partnerfox/AI Fox.' }
  },
  {
    category: { de: 'Konflikt-/Synergiepotenzial', en: 'Conflict/synergy potential' },
    flock: { de: 'Kann bei Fleet-Distribution kompetitiv wirken, aber starke Data-Synergien bieten.', en: 'Can be competitive on fleet distribution, while providing strong data synergies.' },
    insurfox: { de: 'Kann als Integrations- und Execution-Layer Partnerschaften monetarisieren.', en: 'Can monetize partnerships as integration and execution layer.' }
  }
]

const options: OptionRow[] = [
  { option: 'A', name: { de: 'Partner mit Telematikanbieter', en: 'Partner with telemetry provider' }, speed: 5, control: 2, capitalIntensity: 2, underwritingEdge: 3, distributionEdge: 3, regulatoryComplexity: 2 },
  { option: 'B', name: { de: 'Eigenes Scoring-MVP + Partner-Validierung', en: 'Build in-house scoring MVP + partner validation' }, speed: 3, control: 4, capitalIntensity: 3, underwritingEdge: 4, distributionEdge: 3, regulatoryComplexity: 3 },
  { option: 'C', name: { de: 'Nischenplayer akquirieren (EU)', en: 'Acquire niche player (EU)' }, speed: 2, control: 5, capitalIntensity: 5, underwritingEdge: 5, distributionEdge: 4, regulatoryComplexity: 4 },
  { option: 'D', name: { de: 'Kapazitätsgeführtes Programm + Safety Dividend', en: 'Capacity-led program + safety dividend' }, speed: 4, control: 4, capitalIntensity: 3, underwritingEdge: 4, distributionEdge: 5, regulatoryComplexity: 3 }
]

const strategicMatrix = [
  { name: { de: 'M&A-Signal etablierter Carrier', en: 'Incumbent M&A signal' }, overlap: 78, value: 90 },
  { name: { de: 'Datenvorteil im Fleet-Bereich', en: 'Fleet data moat' }, overlap: 72, value: 87 },
  { name: { de: 'Risiko der Broker-Disintermediation', en: 'Broker displacement risk' }, overlap: 65, value: 38 },
  { name: { de: 'Chance für Partner-first-Strategie', en: 'Partner-first opportunity' }, overlap: 55, value: 85 }
]

const sourceLinks = [
  {
    label: 'Alliance News report (syndicated): Admiral buys commercial fleet insurer Flock in GBP80 million deal',
    href: 'https://www.lse.co.uk/news/admiral-buys-commercial-fleet-insurer-flock-in-gbp80-million-deal-158dnpi98hy242a.html'
  },
  {
    label: 'FF News: Admiral Group acquires Flock to drive innovation in commercial motor market',
    href: 'https://ffnews.com/newsarticle/admiral-group-acquires-flock-to-drive-innovation-in-commercial-motor-market/'
  },
  {
    label: 'Bloomberg Markets profile: Milena Mondini de Focatiis (CEO, Admiral Group)',
    href: 'https://www.bloomberg.com/profile/person/18674746'
  }
]

function bi(value: BiText, lang: 'de' | 'en') {
  return lang === 'de' ? value.de : value.en
}

function formatM(value: number, lang: 'de' | 'en') {
  const locale = lang === 'de' ? 'de-DE' : 'en-US'
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value)
}

export default function FlockAdmiralAnalysisPage() {
  const { lang, t } = useI18n()
  const l = lang === 'de' ? 'de' : 'en'

  const [fleetGwpM, setFleetGwpM] = useState<number>(180)
  const [lossRatioPct, setLossRatioPct] = useState<number>(66)
  const [commissionPct, setCommissionPct] = useState<number>(11)
  const [expensePct, setExpensePct] = useState<number>(18)

  const commissionIncomeM = fleetGwpM * (commissionPct / 100)
  const uwMarginRate = Math.max(-0.4, 1 - lossRatioPct / 100 - expensePct / 100)
  const uwMarginM = fleetGwpM * uwMarginRate
  const totalContributionM = commissionIncomeM + uwMarginM
  const fixedCostM = 12
  const breakEvenGwpM = fixedCostM / Math.max(0.01, commissionPct / 100 + uwMarginRate)

  const sensitivityData = useMemo(() => {
    const points = [52, 58, 64, 70, 76, 82, 88]
    return points.map((lr) => {
      const rate = Math.max(-0.4, 1 - lr / 100 - expensePct / 100)
      return {
        lossRatio: lr,
        contribution: fleetGwpM * (commissionPct / 100 + rate)
      }
    })
  }, [commissionPct, expensePct, fleetGwpM])

  function handlePdf() {
    const prev = document.title
    document.title = 'Admiral_Flock_Strategic_Analysis_Insurfox'
    window.print()
    window.setTimeout(() => {
      document.title = prev
    }, 700)
  }

  return (
    <section className="page" style={{ gap: '1.2rem', background: '#ffffff', paddingTop: '1rem' }}>
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
              title={t('analysis.flock.title')}
              subtitle={t('analysis.flock.subtitle')}
              titleColor="#0f172a"
              subtitleColor="#475569"
            />
            <div className="print-hide" style={{ position: 'sticky', top: 84 }}>
              <Button size="sm" onClick={handlePdf}>{t('analysis.flock.exportPdf')}</Button>
            </div>
          </div>
        </Card>

        <Card title={t('analysis.flock.sections.executiveSummary')}>
          <div style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{t('analysis.flock.text.summaryP1')}</p>
            <p style={pStyle}>{t('analysis.flock.text.summaryP2')}</p>
            <p style={pStyle}>{t('analysis.flock.text.summaryP3')}</p>
          </div>
        </Card>

        <Card title={t('analysis.flock.sections.dealSnapshot')}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{t('analysis.flock.labels.field')}</th>
                  <th style={thStyle}>{t('analysis.flock.labels.value')}</th>
                </tr>
              </thead>
              <tbody>
                {dealRows.map((row) => (
                  <tr key={row.label.en}>
                    <td style={tdStrongStyle}>{bi(row.label, l)}</td>
                    <td style={tdStyle}>{bi(row.value, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={t('analysis.flock.sections.productLogic')}>
          <div style={{ display: 'grid', gap: '0.65rem' }}>
            <NarrativeBlock title={t('analysis.flock.text.dataLayerTitle')} body={t('analysis.flock.text.dataLayerBody')} />
            <NarrativeBlock title={t('analysis.flock.text.modelLayerTitle')} body={t('analysis.flock.text.modelLayerBody')} />
            <NarrativeBlock title={t('analysis.flock.text.productLayerTitle')} body={t('analysis.flock.text.productLayerBody')} />
            <NarrativeBlock title={t('analysis.flock.text.outcomeLayerTitle')} body={t('analysis.flock.text.outcomeLayerBody')} />
          </div>
        </Card>

        <Card title={t('analysis.flock.sections.comparison')}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{t('analysis.flock.labels.category')}</th>
                  <th style={thStyle}>Flock</th>
                  <th style={thStyle}>Insurfox</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.category.en}>
                    <td style={tdStrongStyle}>{bi(row.category, l)}</td>
                    <td style={tdStyle}>{bi(row.flock, l)}</td>
                    <td style={tdStyle}>{bi(row.insurfox, l)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={t('analysis.flock.sections.implications')}>
          <div style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{t('analysis.flock.text.implicationsP1')}</p>
            <p style={pStyle}>{t('analysis.flock.text.implicationsP2')}</p>
            <p style={pStyle}>{t('analysis.flock.text.implicationsP3')}</p>
          </div>
          <div style={{ marginTop: '0.75rem', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 12, left: 10, bottom: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" dataKey="overlap" name={t('analysis.flock.labels.overlap')} domain={[0, 100]} stroke="#475569" />
                <YAxis type="number" dataKey="value" name={t('analysis.flock.labels.strategicValue')} domain={[0, 100]} stroke="#475569" />
                <Tooltip labelFormatter={(_, payload) => (payload?.[0]?.payload?.name ?? '') as string} />
                <Scatter data={strategicMatrix.map((row) => ({ name: bi(row.name, l), overlap: row.overlap, value: row.value }))} fill="#1d4ed8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={t('analysis.flock.sections.options')}>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headRowStyle}>
                  <th style={thStyle}>{t('analysis.flock.labels.option')}</th>
                  <th style={thStyle}>{t('analysis.flock.labels.strategy')}</th>
                  <th style={thStyle}>{t('analysis.flock.labels.speed')}</th>
                  <th style={thStyle}>{t('analysis.flock.labels.control')}</th>
                  <th style={thStyle}>{t('analysis.flock.labels.capitalIntensity')}</th>
                  <th style={thStyle}>{t('analysis.flock.labels.uwEdge')}</th>
                  <th style={thStyle}>{t('analysis.flock.labels.distributionEdge')}</th>
                  <th style={thStyle}>{t('analysis.flock.labels.regComplexity')}</th>
                </tr>
              </thead>
              <tbody>
                {options.map((row) => (
                  <tr key={row.option}>
                    <td style={tdStrongStyle}>{row.option}</td>
                    <td style={tdStyle}>{bi(row.name, l)}</td>
                    <td style={tdStyle}>{row.speed}</td>
                    <td style={tdStyle}>{row.control}</td>
                    <td style={tdStyle}>{row.capitalIntensity}</td>
                    <td style={tdStyle}>{row.underwritingEdge}</td>
                    <td style={tdStyle}>{row.distributionEdge}</td>
                    <td style={tdStyle}>{row.regulatoryComplexity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '0.8rem', height: 290 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={options} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="option" stroke="#475569" />
                <YAxis domain={[0, 5]} stroke="#475569" />
                <Tooltip />
                <Legend />
                <Bar dataKey="speed" fill="#0ea5e9" />
                <Bar dataKey="control" fill="#1d4ed8" />
                <Bar dataKey="underwritingEdge" fill="#16a34a" />
                <Bar dataKey="distributionEdge" fill="#d4380d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={t('analysis.flock.sections.financial')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(340px, 1fr)', gap: '1rem' }}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <SliderRow label={t('analysis.flock.labels.fleetGwp')} value={fleetGwpM} min={20} max={600} step={10} suffix="M" onChange={setFleetGwpM} />
              <SliderRow label={t('analysis.flock.labels.lossRatio')} value={lossRatioPct} min={40} max={95} step={1} suffix="%" onChange={setLossRatioPct} />
              <SliderRow label={t('analysis.flock.labels.commissionRate')} value={commissionPct} min={4} max={22} step={1} suffix="%" onChange={setCommissionPct} />
              <SliderRow label={t('analysis.flock.labels.expenseRatio')} value={expensePct} min={10} max={35} step={1} suffix="%" onChange={setExpensePct} />
            </div>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              <MetricCard label={t('analysis.flock.labels.commissionIncome')} value={`EUR ${formatM(commissionIncomeM, l)}m`} />
              <MetricCard label={t('analysis.flock.labels.uwMargin')} value={`EUR ${formatM(uwMarginM, l)}m`} />
              <MetricCard label={t('analysis.flock.labels.totalContribution')} value={`EUR ${formatM(totalContributionM, l)}m`} />
              <MetricCard label={t('analysis.flock.labels.breakEvenGwp')} value={`EUR ${formatM(breakEvenGwpM, l)}m`} />
            </div>
          </div>
          <div style={{ marginTop: '0.8rem', height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensitivityData} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="lossRatio" stroke="#475569" />
                <YAxis stroke="#475569" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="contribution" name={t('analysis.flock.labels.contribution')} stroke="#0f172a" strokeWidth={2.2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={t('analysis.flock.sections.blueprint')}>
          <div style={{ display: 'grid', gap: '0.55rem' }}>
            <BlueprintStep index="1" title={t('analysis.flock.text.bp1Title')} body={t('analysis.flock.text.bp1Body')} />
            <BlueprintStep index="2" title={t('analysis.flock.text.bp2Title')} body={t('analysis.flock.text.bp2Body')} />
            <BlueprintStep index="3" title={t('analysis.flock.text.bp3Title')} body={t('analysis.flock.text.bp3Body')} />
            <BlueprintStep index="4" title={t('analysis.flock.text.bp4Title')} body={t('analysis.flock.text.bp4Body')} />
            <BlueprintStep index="5" title={t('analysis.flock.text.bp5Title')} body={t('analysis.flock.text.bp5Body')} />
          </div>
        </Card>

        <Card title={t('analysis.flock.sections.riskCompliance')}>
          <div style={{ display: 'grid', gap: '0.55rem' }}>
            <p style={pStyle}>{t('analysis.flock.text.riskP1')}</p>
            <p style={pStyle}>{t('analysis.flock.text.riskP2')}</p>
            <p style={pStyle}>{t('analysis.flock.text.riskP3')}</p>
          </div>
        </Card>

        <Card title={t('analysis.flock.sections.actors')}>
          <p style={pStyle}>{t('analysis.flock.text.actorsIntro')}</p>
          <div style={{ display: 'grid', gap: '0.55rem', marginTop: '0.55rem' }}>
            <ActorRow name="Ed Leon Klinger" role={bi({ de: 'Flock CEO, Mitgründer (2018)', en: 'Flock CEO, co-founder (2018)' }, l)} />
            <ActorRow name="Antton Peña" role={bi({ de: 'Flock Mitgründer', en: 'Flock founder' }, l)} />
            <ActorRow name="Milena Mondini de Focatiis" role={bi({ de: 'Group CEO der Admiral Group', en: 'Group CEO, Admiral Group' }, l)} />
          </div>
          <p style={{ ...smallTextStyle, marginTop: '0.55rem' }}>{t('analysis.flock.text.actorsNote')}</p>
        </Card>

        <Card title={t('analysis.flock.sections.sources')}>
          <ul style={listStyle}>
            {sourceLinks.map((src) => (
              <li key={src.href}>
                <a href={src.href} target="_blank" rel="noreferrer" style={{ color: '#0f172a' }}>{src.label}</a>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/*
        PR Summary:
        - Added new executive report page: /analysis/flock-admiral
        - Implemented DE/EN i18n namespace: analysis.flock.*
        - Added route wiring in AppRouter and linked report from Market Analyses overview
        - Included board-level strategy options chart, financial what-if sliders, and sources card

        Demo Script:
        1) Open /analysis/flock-admiral
        2) Click "Download Executive Report (PDF)"
        3) Adjust sliders in Financial What-if section
        4) Review strategy option chart and sensitivity line chart

        Terminal Commands:
        - npm install
        - npm run dev
        - npm run build
      */}
    </section>
  )
}

function NarrativeBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 style={subHeadingStyle}>{title}</h3>
      <p style={pStyle}>{body}</p>
    </div>
  )
}

function BlueprintStep({ index, title, body }: { index: string; title: string; body: string }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, background: '#f8fafc', padding: '0.6rem' }}>
      <div style={{ color: '#0f172a', fontWeight: 700 }}>{index}. {title}</div>
      <p style={{ ...smallTextStyle, marginTop: '0.25rem' }}>{body}</p>
    </div>
  )
}

function ActorRow({ name, role }: { name: string; role: string }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, background: '#f8fafc', padding: '0.55rem' }}>
      <div style={{ color: '#0f172a', fontWeight: 700 }}>{name}</div>
      <div style={{ color: '#334155', fontSize: '0.84rem' }}>{role}</div>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, background: '#f8fafc', padding: '0.65rem' }}>
      <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{label}</div>
      <div style={{ color: '#0f172a', fontWeight: 700, marginTop: '0.2rem', fontSize: '1.04rem' }}>{value}</div>
    </div>
  )
}

function SliderRow({ label, value, min, max, step, suffix, onChange }: { label: string; value: number; min: number; max: number; step: number; suffix: string; onChange: (v: number) => void }) {
  return (
    <label style={{ display: 'grid', gap: '0.35rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem' }}>
        <span style={{ color: '#334155', fontWeight: 600 }}>{label}</span>
        <span style={{ color: '#0f172a', fontWeight: 700 }}>{value}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ accentColor: '#d4380d' }} />
    </label>
  )
}

const pStyle: CSSProperties = {
  margin: 0,
  color: '#334155',
  fontSize: '0.88rem',
  lineHeight: 1.62
}

const smallTextStyle: CSSProperties = {
  margin: 0,
  color: '#334155',
  fontSize: '0.84rem',
  lineHeight: 1.55
}

const subHeadingStyle: CSSProperties = {
  margin: '0 0 0.35rem',
  color: '#0f172a',
  fontSize: '0.96rem'
}

const listStyle: CSSProperties = {
  margin: 0,
  paddingLeft: '1rem',
  display: 'grid',
  gap: '0.35rem',
  color: '#334155'
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
