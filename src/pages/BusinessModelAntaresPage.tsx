import React, { useMemo } from 'react'
import Card from '@/components/ui/Card'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'
import { useI18n } from '@/i18n/I18nContext'

function getModelContent(lang: 'de' | 'en') {
  const enContent = {
    title: 'Business Model: Insurfox x Antares',
    subtitle: 'A Controlled European Logistics Insurance Portfolio',
    model: 'MGA Partnership with AI-Enabled Portfolio Governance',
    overview: {
      title: 'Executive Overview',
      paragraphs: [
        'Insurfox operates as a Managing General Agent (MGA), originating, underwriting and managing a pan-European logistics insurance portfolio, with Antares acting as sole risk carrier and lead underwriter.',
        'The partnership is designed to deliver predictable portfolio performance, controlled growth and full transparency, supported by AI-enabled underwriting, policierung and claims governance.'
      ],
      emphasis: 'The Insurfox AI IaaS is not the product - it is the operating capability that ensures portfolio quality, control and scalability.'
    },
    strategicRationale: {
      title: 'Strategic Rationale',
      bullets: [
        'Fragmented broker submissions',
        'Inconsistent risk data',
        'Limited portfolio visibility',
        'Volatile loss ratios driven by isolated risk underwriting'
      ],
      note:
        'Insurfox resolves these structural inefficiencies by aggregating logistics risks into a standardized, continuously monitored portfolio, supported by AI-driven data normalization, scoring and process control. This enables Antares to underwrite a managed portfolio, not fragmented individual risks.'
    },
    governance: {
      title: 'Role Allocation and Governance',
      antares: {
        title: 'Antares - Risk Carrier and Capital Steward',
        bullets: [
          'Underwriting appetite and guidelines',
          'Pricing parameters',
          'Capacity allocation',
          'Reinsurance strategy',
          'Final claims authority',
          'Continuous, structured portfolio reporting and ultimate risk ownership'
        ]
      },
      insurfox: {
        title: 'Insurfox - Managing General Agent (MGA)',
        bullets: [
          'Portfolio construction and risk aggregation',
          'Broker onboarding and distribution management',
          'Policierung and contract administration',
          'Delegated underwriting within defined authority',
          'Delegated claims handling within agreed limits',
          'Ongoing portfolio monitoring and reporting',
          'AI IaaS ensures consistency, speed and control across operations'
        ]
      }
    },
    aiModel: {
      title: 'How AI Strengthens the MGA Model (Not Replaces It)',
      resultLabel: 'Result',
      items: [
        {
          title: '01. Standardized Risk Origination',
          bullets: ['Standardized risk objects', 'Consistent exposure definitions', 'Structured data formats'],
          result: 'Clean, comparable risks across brokers and geographies.'
        },
        {
          title: '02. Controlled Underwriting Execution',
          bullets: [
            'Apply agreed underwriting rules consistently',
            'Score risk characteristics',
            'Flag deviations and exceptions'
          ],
          result: 'Underwriting discipline at portfolio level, not dependent on individual underwriters.'
        },
        {
          title: '03. Predictable Policierung',
          bullets: [
            'Automated validation of policy data',
            'Consistency checks against underwriting intent',
            'Reduction of manual corrections'
          ],
          result: 'Faster, error-free policy issuance without altering tariff logic.'
        },
        {
          title: '04. Claims Governance and Loss Control',
          bullets: ['Structured FNOL intake', 'Early severity and complexity scoring', 'Routing by governance rules'],
          result: 'Lower handling cost, faster settlements, controlled severity development.'
        },
        {
          title: '05. Portfolio Transparency and Steering',
          bullets: ['Real-time portfolio KPIs', 'Loss development monitoring', 'Broker and segment insights'],
          result: 'Antares underwrites a portfolio that is continuously observable and steerable.'
        }
      ]
    },
    portfolioScope: {
      title: 'Portfolio Scope',
      insureds: {
        title: 'Target Insureds',
        bullets: [
          'Logistics companies',
          'Freight forwarders',
          'Transport operators',
          'Fleet owners',
          'Mobility and subcontractor networks'
        ]
      },
      lines: {
        title: 'Lines of Business',
        bullets: [
          'Motor fleet insurance',
          "Carrier's liability",
          'Cargo insurance',
          'Logistics combined covers',
          'Ancillary lines (cyber, D&O, legal, equipment)'
        ]
      },
      geography: {
        title: 'Geography',
        bullets: ['Germany (initial market)', "EU expansion via Lloyd's Europe"]
      }
    },
    premiumOutlook: {
      title: 'Premium Development Outlook (GWP)',
      rows: [
        { year: 'Year 1', conservative: 'EUR 3-5m', upside: 'EUR 7m' },
        { year: 'Year 2', conservative: 'EUR 10-15m', upside: 'EUR 20m' },
        { year: 'Year 3', conservative: 'EUR 25-40m', upside: 'EUR 50m+' }
      ],
      bullets: ['Broker aggregation', 'Embedded fleet onboarding', 'High renewal retention', 'Portfolio compounding']
    },
    economics: {
      title: 'Target Portfolio Economics',
      metrics: [
        { label: 'Gross Loss Ratio', value: '45-55%' },
        { label: 'Expense Ratio', value: '20-25%' },
        { label: 'Combined Ratio', value: '<= 80%' }
      ],
      note: 'AI-supported governance reduces leakage, volatility and operational cost.'
    },
    claims: {
      title: 'Claims Governance Framework',
      bullets: [
        'Antares remains final claims authority',
        'Optional delegated authority up to EUR 10,000, subject to complete digital claim data, structured FNOL, and predefined escalation rules',
        'Large or complex claims are handled with loss adjusters'
      ]
    },
    strategicValue: {
      title: 'Strategic Value for Antares',
      bullets: [
        'Sole capacity provider',
        'Lead underwriting position',
        'Portfolio-level transparency',
        'Predictable capital deployment',
        'Scalable premium pipeline',
        'Long-term MGA partnership'
      ],
      operatingTitle: 'The AI-enabled operating model ensures',
      operatingBullets: ['Underwriting discipline', 'Cost efficiency', 'Portfolio stability', 'Scalability across markets']
    },
    coreStatement: {
      title: 'Core Statement',
      text: 'Insurfox, acting as Managing General Agent, delivers a scalable and governable European logistics insurance portfolio, with AI-enabled underwriting and claims execution supporting Antares capital and risk objectives.'
    },
    labels: {
      premiumTable: {
        year: 'Year',
        conservative: 'Conservative',
        upside: 'Upside'
      },
      premiumDrivers: 'Growth is driven by'
    }
  }

  if (lang === 'de') {
    return {
      title: 'Business Model: Insurfox x Antares',
      subtitle: 'Ein kontrolliertes europaeisches Logistik-Versicherungsportfolio',
      model: 'MGA-Partnerschaft mit KI-gestuetzter Portfolio-Governance',
      overview: {
        title: 'Executive Overview',
        paragraphs: [
          'Insurfox agiert als Managing General Agent (MGA) und originiert, zeichnet und managt ein paneuropaeisches Logistik-Versicherungsportfolio, wobei Antares als alleiniger Risikotraeger und Lead Underwriter fungiert.',
          'Die Partnerschaft ist darauf ausgelegt, vorhersehbare Portfolio-Performance, kontrolliertes Wachstum und volle Transparenz zu liefern, unterstuetzt durch KI-gestuetztes Underwriting, Policierung und Claims-Governance.'
        ],
        emphasis:
          'Die Insurfox AI IaaS ist nicht das Produkt - sie ist die operative Faehigkeit, die Portfolioqualitaet, Kontrolle und Skalierbarkeit sicherstellt.'
      },
      strategicRationale: {
        title: 'Strategische Begruendung',
        bullets: [
          'Fragmentierte Broker-Submissions',
          'Inkonsistente Risikodaten',
          'Begrenzte Portfolio-Sichtbarkeit',
          'Volatile Loss Ratios durch isoliertes Risk Underwriting'
        ],
        note:
          'Insurfox behebt diese strukturellen Ineffizienzen, indem Logistikrisiken zu einem standardisierten, kontinuierlich ueberwachten Portfolio aggregiert werden, unterstuetzt durch KI-basierte Daten-Normalisierung, Scoring und Prozesskontrolle. Damit zeichnet Antares ein gesteuertes Portfolio statt fragmentierter Einzelrisiken.'
      },
      governance: {
        title: 'Rollenverteilung und Governance',
        antares: {
          title: 'Antares - Risikotraeger und Kapital-Steward',
          bullets: [
            'Underwriting-Appetit und Guidelines',
            'Pricing-Parameter',
            'Kapazitaetsallokation',
            'Rueckversicherungsstrategie',
            'Finale Claims Authority',
            'Kontinuierliches, strukturiertes Portfolio-Reporting und finale Risikohoheit'
          ]
        },
        insurfox: {
          title: 'Insurfox - Managing General Agent (MGA)',
          bullets: [
            'Portfolioaufbau und Risikoaggregation',
            'Broker-Onboarding und Distribution-Management',
            'Policierung und Vertragsadministration',
            'Delegiertes Underwriting im definierten Rahmen',
            'Delegierte Schadenbearbeitung innerhalb vereinbarter Limits',
            'Laufendes Portfoliomonitoring und Reporting',
            'AI IaaS sichert Konsistenz, Geschwindigkeit und Kontrolle in den Prozessen'
          ]
        }
      },
      aiModel: {
        title: 'Wie KI das MGA-Modell staerkt (und nicht ersetzt)',
        resultLabel: 'Ergebnis',
        items: [
          {
            title: '01. Standardisierte Risiko-Originierung',
            bullets: ['Standardisierte Risikoobjekte', 'Konsistente Exposures', 'Strukturierte Datenformate'],
            result: 'Saubere, vergleichbare Risiken ueber Broker und Laender hinweg.'
          },
          {
            title: '02. Kontrollierte Underwriting-Execution',
            bullets: [
              'Konsequente Anwendung vereinbarter Underwriting-Regeln',
              'Scoring der Risikomerkmale',
              'Markierung von Abweichungen und Ausnahmen'
            ],
            result: 'Underwriting-Disziplin auf Portfolioebene, nicht abhaengig von Einzelentscheidern.'
          },
          {
            title: '03. Vorhersehbare Policierung',
            bullets: [
              'Automatisierte Validierung von Policendaten',
              'Konsistenzchecks gegen die Underwriting-Intention',
              'Reduktion manueller Korrekturen'
            ],
            result: 'Schnelle, fehlerfreie Policierung ohne Aenderung der Tariflogik.'
          },
          {
            title: '04. Claims Governance und Loss Control',
            bullets: ['Strukturierte FNOL-Aufnahme', 'Fruehes Severity- und Complexity-Scoring', 'Routing nach Governance-Regeln'],
            result: 'Niedrigere Handling-Kosten, schnellere Regulierung, kontrollierte Severity-Entwicklung.'
          },
          {
            title: '05. Portfolio-Transparenz und Steuerung',
            bullets: ['Echtzeit-Portfolio-KPIs', 'Monitoring der Loss Development', 'Broker- und Segment-Insights'],
            result: 'Antares zeichnet ein Portfolio, das kontinuierlich beobachtbar und steuerbar ist.'
          }
        ]
      },
      portfolioScope: {
        title: 'Portfolio Scope',
        insureds: {
          title: 'Zielkunden',
          bullets: ['Logistikunternehmen', 'Spediteure', 'Transportunternehmen', 'Flottenbetreiber', 'Mobilitaets- und Subunternehmernetzwerke']
        },
        lines: {
          title: 'Versicherungslinien',
          bullets: [
            'Kfz-Flottenversicherung',
            'Frachtfuehrerhaftpflicht',
            'Transportversicherung',
            'Logistik-Kombideckungen',
            'Zusatzlinien (Cyber, D&O, Rechtsschutz, Equipment)'
          ]
        },
        geography: {
          title: 'Geografie',
          bullets: ['Deutschland (Startmarkt)', "EU-Expansion ueber Lloyd's Europe"]
        }
      },
      premiumOutlook: {
        title: 'Praemienentwicklung (GWP)',
        rows: [
          { year: 'Jahr 1', conservative: 'EUR 3-5m', upside: 'EUR 7m' },
          { year: 'Jahr 2', conservative: 'EUR 10-15m', upside: 'EUR 20m' },
          { year: 'Jahr 3', conservative: 'EUR 25-40m', upside: 'EUR 50m+' }
        ],
        bullets: ['Broker-Aggregation', 'Embedded Fleet Onboarding', 'Hohe Renewal-Retention', 'Portfolio-Compounding']
      },
      economics: {
        title: 'Zielportfolio-Oekonomie',
        metrics: [
          { label: 'Gross Loss Ratio', value: '45-55%' },
          { label: 'Expense Ratio', value: '20-25%' },
          { label: 'Combined Ratio', value: '<= 80%' }
        ],
        note: 'KI-gestuetzte Governance reduziert Leakage, Volatilitaet und operative Kosten.'
      },
      claims: {
        title: 'Claims Governance Framework',
        bullets: [
          'Antares bleibt finale Claims Authority',
          'Optionale delegierte Authority bis EUR 10,000, vorbehaltlich vollstaendiger digitaler Schadenunterlagen, strukturierter FNOL und vordefinierter Eskalationsregeln',
          'Grosse oder komplexe Schaeden werden mit Loss Adjusters abgewickelt'
        ]
      },
      strategicValue: {
        title: 'Strategischer Wert fuer Antares',
        bullets: [
          'Alleiniger Kapazitaetsgeber',
          'Lead Underwriting Position',
          'Portfolio-Transparenz auf Portfolioebene',
          'Vorhersehbare Kapitalallokation',
          'Skalierbare Praemien-Pipeline',
          'Langfristige MGA-Partnerschaft'
        ],
        operatingTitle: 'Das KI-gestuetzte Operating Model stellt sicher',
        operatingBullets: ['Underwriting-Disziplin', 'Kosteneffizienz', 'Portfolio-Stabilitaet', 'Skalierbarkeit ueber Maerkte']
      },
      coreStatement: {
        title: 'Core Statement',
        text: 'Insurfox agiert als Managing General Agent und liefert ein skalierbares und steuerbares europaeisches Logistik-Versicherungsportfolio, mit KI-gestuetztem Underwriting und Claims-Execution zur Unterstuetzung der Kapital- und Risikoziele von Antares.'
      },
      labels: {
        premiumTable: {
          year: 'Jahr',
          conservative: 'Konservativ',
          upside: 'Upside'
        },
        premiumDrivers: 'Wachstum wird getrieben durch'
      }
    }
  }

  return enContent
}

export default function BusinessModelAntaresPage() {
  const { lang } = useI18n()
  const content = useMemo(() => getModelContent(lang), [lang])

  return (
    <section className="page insurfox-whitepaper-page antares-marketing-page">
      <div className="insurfox-whitepaper-shell">
        <div className="framework-header-row insurfox-whitepaper-header antares-header">
          <div className="antares-header-copy">
            <span className="antares-eyebrow">{content.overview.title}</span>
            <h1 className="antares-title">{content.title}</h1>
            <p className="antares-subtitle">{content.subtitle}</p>
            <p className="antares-model">{content.model}</p>
          </div>
          <button
            type="button"
            className="framework-download"
            onClick={() => window.print()}
          >
            {lang === 'en' ? 'Download PDF' : 'PDF herunterladen'}
          </button>
        </div>
        <div className="antares-hero">
          <Card className="antares-hero-card">
            {content.overview.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="antares-highlight">{content.overview.emphasis}</div>
          </Card>
          <div className="antares-hero-aside">
            <Card className="antares-hero-callout">
              <h3>{content.strategicRationale.title}</h3>
              <ul>
                {content.strategicRationale.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="antares-note">{content.strategicRationale.note}</p>
            </Card>
          </div>
        </div>
        <section className="antares-section">
          <div className="antares-section-head">
            <h2>{content.governance.title}</h2>
          </div>
          <div className="antares-grid antares-grid-two">
            <Card className="antares-card">
              <h3>{content.governance.antares.title}</h3>
              <ul>
                {content.governance.antares.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            <Card className="antares-card">
              <h3>{content.governance.insurfox.title}</h3>
              <ul>
                {content.governance.insurfox.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </section>
        <section className="antares-section">
          <div className="antares-section-head">
            <h2>{content.aiModel.title}</h2>
          </div>
          <div className="antares-grid antares-grid-three">
            {content.aiModel.items.map((item) => (
              <Card key={item.title} className="antares-card antares-ai-card">
                <h3>{item.title}</h3>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="antares-result">
                  <strong>{content.aiModel.resultLabel}:</strong> {item.result}
                </div>
              </Card>
            ))}
          </div>
        </section>
        <section className="antares-section">
          <div className="antares-section-head">
            <h2>{content.portfolioScope.title}</h2>
          </div>
          <div className="antares-grid antares-grid-two">
            {[content.portfolioScope.insureds, content.portfolioScope.lines, content.portfolioScope.geography].map(
              (section) => (
                <Card key={section.title} className="antares-card antares-scope-card">
                  <h3>{section.title}</h3>
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Card>
              )
            )}
          </div>
        </section>
        <section className="antares-section">
          <div className="antares-section-head">
            <h2>{content.premiumOutlook.title}</h2>
          </div>
          <Card className="antares-card">
            <div className="antares-table">
              <div className="antares-table-row antares-table-header">
                <span>{content.labels.premiumTable.year}</span>
                <span>{content.labels.premiumTable.conservative}</span>
                <span>{content.labels.premiumTable.upside}</span>
              </div>
              {content.premiumOutlook.rows.map((row) => (
                <div key={row.year} className="antares-table-row">
                  <span>{row.year}</span>
                  <span>{row.conservative}</span>
                  <span>{row.upside}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="antares-card">
            <h3>{content.labels.premiumDrivers}</h3>
            <ul>
              {content.premiumOutlook.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </section>
        <section className="antares-section">
          <div className="antares-section-head">
            <h2>{content.economics.title}</h2>
          </div>
          <div className="antares-grid antares-grid-two">
            <Card className="antares-card">
              <div className="antares-metrics">
                {content.economics.metrics.map((metric) => (
                  <div key={metric.label} className="antares-metric">
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="antares-card antares-note-card">
              <p>{content.economics.note}</p>
            </Card>
          </div>
        </section>
        <section className="antares-section">
          <div className="antares-section-head">
            <h2>{content.claims.title}</h2>
          </div>
          <Card className="antares-card">
            <ul>
              {content.claims.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </section>
        <section className="antares-section">
          <div className="antares-section-head">
            <h2>{content.strategicValue.title}</h2>
          </div>
          <div className="antares-grid antares-grid-two">
            <Card className="antares-card">
              <ul>
                {content.strategicValue.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            <Card className="antares-card">
              <h3>{content.strategicValue.operatingTitle}</h3>
              <ul>
                {content.strategicValue.operatingBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </section>
        <section className="antares-section">
          <Card className="antares-card antares-core-card">
            <h2>{content.coreStatement.title}</h2>
            <p>{content.coreStatement.text}</p>
          </Card>
        </section>
      </div>
      <div className="framework-print">
        <div className="framework-print-header">
          <img src={InsurfoxLogo} alt="Insurfox" />
        </div>
        <h1>{content.title}</h1>
        <p className="framework-print-subtitle">{content.subtitle}</p>
        <p className="framework-print-subtitle">{content.model}</p>
        <div className="framework-print-section">
          <h2>{content.overview.title}</h2>
          {content.overview.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>{content.overview.emphasis}</p>
        </div>
        <div className="framework-print-section">
          <h2>{content.strategicRationale.title}</h2>
          <ul>
            {content.strategicRationale.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.strategicRationale.note}</p>
        </div>
        <div className="framework-print-section">
          <h2>{content.governance.title}</h2>
          <p>{content.governance.antares.title}</p>
          <ul>
            {content.governance.antares.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.governance.insurfox.title}</p>
          <ul>
            {content.governance.insurfox.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="framework-print-section">
          <h2>{content.aiModel.title}</h2>
          {content.aiModel.items.map((item) => (
            <div key={item.title}>
              <p>{item.title}</p>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <p>
                {content.aiModel.resultLabel}: {item.result}
              </p>
            </div>
          ))}
        </div>
        <div className="framework-print-section">
          <h2>{content.portfolioScope.title}</h2>
          <p>{content.portfolioScope.insureds.title}</p>
          <ul>
            {content.portfolioScope.insureds.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.portfolioScope.lines.title}</p>
          <ul>
            {content.portfolioScope.lines.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.portfolioScope.geography.title}</p>
          <ul>
            {content.portfolioScope.geography.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="framework-print-section">
          <h2>{content.premiumOutlook.title}</h2>
          <ul>
            {content.premiumOutlook.rows.map((row) => (
              <li key={row.year}>
                {row.year}: {row.conservative} / {row.upside}
              </li>
            ))}
          </ul>
          <p>{content.labels.premiumDrivers}</p>
          <ul>
            {content.premiumOutlook.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="framework-print-section">
          <h2>{content.economics.title}</h2>
          <ul>
            {content.economics.metrics.map((metric) => (
              <li key={metric.label}>
                {metric.label}: {metric.value}
              </li>
            ))}
          </ul>
          <p>{content.economics.note}</p>
        </div>
        <div className="framework-print-section">
          <h2>{content.claims.title}</h2>
          <ul>
            {content.claims.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="framework-print-section">
          <h2>{content.strategicValue.title}</h2>
          <ul>
            {content.strategicValue.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.strategicValue.operatingTitle}</p>
          <ul>
            {content.strategicValue.operatingBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="framework-print-section">
          <h2>{content.coreStatement.title}</h2>
          <p>{content.coreStatement.text}</p>
        </div>
      </div>
    </section>
  )
}
