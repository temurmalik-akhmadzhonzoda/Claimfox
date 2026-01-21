import React, { useMemo } from 'react'
import Card from '@/components/ui/Card'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'
import { useI18n } from '@/i18n/I18nContext'

function getModelContent(lang: 'de' | 'en') {
  const enContent = {
    title: 'Insurfox x Antares',
    subtitle: 'European Logistics Insurance Portfolio',
    model: 'Managing General Agent Partnership Model',
    overview: {
      title: 'Executive Partnership Overview',
      paragraphs: [
        'Insurfox proposes a long-term MGA partnership with Antares to originate, underwrite and manage a scalable European logistics insurance portfolio, with Antares acting as sole risk carrier and lead underwriter.',
        "The partnership is designed to deliver controlled growth, predictable loss performance and full portfolio transparency, aligned with Lloyd's underwriting discipline and capital efficiency requirements."
      ],
      emphasis: 'This initiative represents a portfolio underwriting opportunity, not a technology initiative.'
    },
    strategicRationale: {
      title: 'Strategic Rationale',
      bullets: [
        'Recurring and predictable risk patterns',
        'High claims frequency with manageable severity',
        'Strong demand from professional insureds',
        'Fragmented broker submissions and inconsistent data quality',
        'Insurfox aggregates and standardizes logistics risks into a unified portfolio'
      ]
    },
    governance: {
      title: 'Role Definition and Governance Structure',
      antares: {
        title: 'Antares - Risk Carrier and Underwriting Authority',
        bullets: [
          'Risk capacity provision',
          'Underwriting framework and risk appetite',
          'Pricing parameters and underwriting guidelines',
          'Reinsurance strategy',
          'Final claims authority',
          'Complete, structured portfolio reporting and final decision on risk and capital deployment'
        ]
      },
      insurfox: {
        title: 'Insurfox - Managing General Agent (MGA)',
        bullets: [
          'Portfolio construction and risk aggregation',
          'Broker onboarding and distribution management',
          'Policy issuance and contract administration',
          'Delegated underwriting within agreed authority',
          'Delegated claims handling within defined thresholds',
          'Portfolio monitoring and performance reporting',
          'Operates strictly within underwriting and claims authority defined by Antares'
        ]
      }
    },
    portfolioScope: {
      title: 'Portfolio Scope',
      insureds: {
        title: 'Target Insureds',
        bullets: [
          'Logistics companies and freight forwarders',
          'Transport operators and fleet owners',
          'Mobility platforms and subcontractor networks'
        ]
      },
      lines: {
        title: 'Lines of Business',
        bullets: [
          'Motor fleet insurance',
          "Carrier's liability",
          'Cargo insurance',
          'Logistics combined policies',
          'Ancillary covers (cyber, D&O, legal expenses, equipment)'
        ]
      },
      geography: {
        title: 'Geographic Focus',
        bullets: ['Launch: Germany', "Expansion: European Union via Lloyd's Europe"]
      },
      risk: {
        title: 'Risk Characteristics',
        bullets: [
          'Professional insureds with high operational maturity',
          'Repetitive exposure profiles',
          'High data availability',
          'Lower volatility compared to SME retail portfolios',
          'Limited tail exposure'
        ]
      },
      statement: 'The portfolio is designed to deliver stable loss development and predictable capital performance.'
    },
    premiumOutlook: {
      title: 'Premium Development Outlook (GWP)',
      rows: [
        { year: 'Year 1', conservative: 'EUR 3-5 million', upside: 'EUR 7 million' },
        { year: 'Year 2', conservative: 'EUR 10-15 million', upside: 'EUR 20 million' },
        { year: 'Year 3', conservative: 'EUR 25-40 million', upside: 'EUR 50+ million' }
      ],
      bullets: [
        'Broker aggregation',
        'Embedded fleet onboarding',
        'Standardized underwriting logic',
        'High renewal retention',
        'Premium income is recurring and compounding, not transactional'
      ]
    },
    economics: {
      title: 'Target Portfolio Economics',
      metrics: [
        { label: 'Gross Loss Ratio', value: '45-55%' },
        { label: 'Expense Ratio', value: '20-25%' },
        { label: 'Combined Ratio', value: '<= 80%' }
      ],
      driversTitle: 'Underlying Drivers',
      drivers: [
        'Frequent but predictable claims behavior',
        'Predominance of small to mid-size claims',
        'Early FNOL and structured claims data',
        'Portfolio-level risk balancing'
      ]
    },
    claims: {
      title: 'Claims Governance Framework',
      bullets: [
        'Antares remains final claims authority',
        'Optional delegated claims authority up to EUR 10,000, subject to complete digital claim data',
        'Structured FNOL and predefined governance rules',
        'Large or complex claims handled with loss adjusters'
      ],
      impactTitle: 'Operational Impact',
      impact: [
        'Accelerated settlement for attritional claims',
        'Reduced handling cost',
        'Improved broker and client retention',
        'Controlled severity development'
      ]
    },
    quality: {
      title: 'Portfolio Quality Advantage',
      traditional: {
        title: 'Traditional Market Reality',
        bullets: [
          'Inconsistent submissions',
          'PDF-based risk information',
          'Limited transparency',
          'Volatile loss ratios'
        ]
      },
      model: {
        title: 'Insurfox MGA Model',
        bullets: [
          'Standardized risk objects',
          'Clean, structured exposure data',
          'Unified underwriting logic',
          'Continuous portfolio monitoring',
          'Regular KPI-based reporting'
        ]
      },
      result: 'Antares underwrites a transparent, controllable portfolio, not isolated risks.'
    },
    strategicValue: {
      title: 'Strategic Value for Antares',
      bullets: [
        'Sole capacity provider',
        'Lead underwriting position',
        'Full portfolio transparency',
        'Predictable capital deployment',
        'Scalable premium pipeline',
        'Long-term MGA partnership'
      ],
      alignmentTitle: 'This structure aligns directly with',
      alignment: [
        "Lloyd's portfolio steering methodology",
        'Specialty underwriting strategy',
        'Capital efficiency objectives'
      ]
    },
    decision: {
      title: 'Decision Framework',
      antares: {
        title: 'Antares',
        bullets: ['Capacity allocation', 'Underwriting parameters', 'Loss ratio corridor', 'Reporting cadence']
      },
      insurfox: {
        title: 'Insurfox',
        bullets: ['Portfolio build-out', 'Broker onboarding', 'Operational execution', 'Ongoing portfolio management']
      }
    },
    coreStatement: {
      title: 'Core Statement',
      text: 'Insurfox, acting as Managing General Agent, delivers a scalable, transparent and profitable European logistics insurance portfolio, fully aligned with Antares underwriting and capital objectives.'
    }
  }

  if (lang === 'de') {
    return {
      title: 'Insurfox x Antares',
      subtitle: 'European Logistics Insurance Portfolio',
      model: 'Managing General Agent Partnership Model',
      overview: {
        title: 'Executive Partnership Overview',
        paragraphs: [
          'Insurfox schlägt eine langfristige MGA-Partnerschaft mit Antares vor, um ein skalierbares europäisches Logistik-Versicherungsportfolio zu originieren, zu zeichnen und zu managen, wobei Antares als alleiniger Risikoträger und Lead Underwriter agiert.',
          "Die Partnerschaft ist darauf ausgelegt, kontrolliertes Wachstum, vorhersehbare Schadenentwicklung und vollständige Portfolio-Transparenz zu liefern - im Einklang mit der Underwriting-Disziplin und den Kapitaleffizienz-Anforderungen von Lloyd's."
        ],
        emphasis: 'Diese Initiative ist eine Portfolio-Underwriting-Chance, keine Technologie-Initiative.'
      },
      strategicRationale: {
        title: 'Strategische Begründung',
        bullets: [
          'Wiederkehrende und vorhersehbare Risikomuster',
          'Hohe Schadenfrequenz mit beherrschbarer Schadenhöhe',
          'Hohe Nachfrage von professionellen Versicherungsnehmern',
          'Fragmentierte Maklereinreichungen und uneinheitliche Datenqualität',
          'Insurfox bündelt und standardisiert Logistikrisiken zu einem einheitlichen, steuerbaren Portfolio'
        ]
      },
      governance: {
        title: 'Rollen- und Governance-Struktur',
        antares: {
          title: 'Antares - Risikoträger und Underwriting Authority',
          bullets: [
            'Bereitstellung von Risikokapazität',
            'Underwriting-Framework und Risikoappetit',
            'Pricing-Parameter und Underwriting-Guidelines',
            'Rückversicherungsstrategie',
            'Finale Claims Authority',
            'Vollständiges, strukturiertes Portfolio-Reporting und finale Entscheidung über Risiko- und Kapitalallokation'
          ]
        },
        insurfox: {
          title: 'Insurfox - Managing General Agent (MGA)',
          bullets: [
            'Portfolioaufbau und Risikoaggregation',
            'Broker-Onboarding und Distribution-Management',
            'Policierung und Vertragsadministration',
            'Delegiertes Underwriting im vereinbarten Rahmen',
            'Delegierte Schadenbearbeitung innerhalb definierter Schwellenwerte',
            'Portfoliomonitoring und Performance-Reporting',
            'Operiert strikt innerhalb der von Antares definierten Underwriting- und Claims-Authority'
          ]
        }
      },
      portfolioScope: {
        title: 'Portfolio Scope',
        insureds: {
          title: 'Zielkundensegmente',
          bullets: [
            'Logistikunternehmen und Spediteure',
            'Transportunternehmen und Flottenbetreiber',
            'Mobilitätsplattformen und Subunternehmernetzwerke'
          ]
        },
        lines: {
          title: 'Versicherungslinien',
          bullets: [
            'Kfz-Flottenversicherung',
            'Frachtführerhaftpflicht',
            'Transportversicherung',
            'Logistik-Kompositpolicen',
            'Zusatzdeckungen (Cyber, D&O, Rechtsschutz, Equipment)'
          ]
        },
        geography: {
          title: 'Geografischer Fokus',
          bullets: ['Start: Deutschland', "Expansion: Europäische Union über Lloyd's Europe"]
        },
        risk: {
          title: 'Risikoprofil',
          bullets: [
            'Professionelle Versicherungsnehmer mit hoher operativer Reife',
            'Repetitive Exposures',
            'Hohe Datenverfügbarkeit',
            'Geringere Volatilität im Vergleich zu KMU-Retail-Portfolios',
            'Begrenzte Tail-Exposure'
          ]
        },
        statement: 'Das Portfolio ist auf stabile Schadenentwicklung und vorhersehbare Kapitalperformance ausgelegt.'
      },
      premiumOutlook: {
        title: 'Prämienentwicklung (GWP)',
        rows: [
          { year: 'Jahr 1', conservative: 'EUR 3-5 Mio.', upside: 'EUR 7 Mio.' },
          { year: 'Jahr 2', conservative: 'EUR 10-15 Mio.', upside: 'EUR 20 Mio.' },
          { year: 'Jahr 3', conservative: 'EUR 25-40 Mio.', upside: 'EUR 50+ Mio.' }
        ],
        bullets: [
          'Broker-Aggregation',
          'Embedded Fleet Onboarding',
          'Standardisierte Underwriting-Logik',
          'Hohe Renewal-Retention',
          'Prämienerträge sind wiederkehrend und kumulativ, nicht transaktional'
        ]
      },
      economics: {
        title: 'Zielportfolio-Ökonomie',
        metrics: [
          { label: 'Gross Loss Ratio', value: '45-55%' },
          { label: 'Expense Ratio', value: '20-25%' },
          { label: 'Combined Ratio', value: '<= 80%' }
        ],
        driversTitle: 'Treiber',
        drivers: [
          'Häufige, aber vorhersehbare Schadenverläufe',
          'Überwiegend kleine bis mittlere Schäden',
          'Frühe FNOL und strukturierte Schadendaten',
          'Portfolioübergreifender Risikoausgleich'
        ]
      },
      claims: {
        title: 'Claims Governance Framework',
        bullets: [
          'Antares bleibt finale Claims Authority',
          'Optionale delegierte Claims Authority bis EUR 10.000, vorbehaltlich vollständiger digitaler Schadenunterlagen',
          'Strukturierte FNOL und vordefinierte Governance-Regeln',
          'Große oder komplexe Schäden mit Loss Adjusters'
        ],
        impactTitle: 'Operativer Impact',
        impact: [
          'Beschleunigte Regulierung von Attritional Claims',
          'Reduzierte Handling-Kosten',
          'Verbesserte Broker- und Kundenbindung',
          'Kontrollierte Severity-Entwicklung'
        ]
      },
      quality: {
        title: 'Portfolio Quality Advantage',
        traditional: {
          title: 'Traditionelle Marktrealität',
          bullets: [
            'Inkonsequente Submissions',
            'PDF-basierte Risikoinformationen',
            'Begrenzte Transparenz',
            'Volatile Loss Ratios'
          ]
        },
        model: {
          title: 'Insurfox MGA Modell',
          bullets: [
            'Standardisierte Risk Objects',
            'Saubere, strukturierte Exposure-Daten',
            'Einheitliche Underwriting-Logik',
            'Kontinuierliches Portfolio-Monitoring',
            'Regelmäßiges KPI-basiertes Reporting'
          ]
        },
        result: 'Antares zeichnet ein transparentes, steuerbares Portfolio - nicht isolierte Einzelrisiken.'
      },
      strategicValue: {
        title: 'Strategischer Wert für Antares',
        bullets: [
          'Alleiniger Kapazitätsgeber',
          'Lead Underwriting Position',
          'Vollständige Portfolio-Transparenz',
          'Vorhersehbare Kapitalallokation',
          'Skalierbare Prämien-Pipeline',
          'Langfristige MGA-Partnerschaft'
        ],
        alignmentTitle: 'Diese Struktur entspricht direkt',
        alignment: [
          "Lloyd's Portfolio-Steering-Methodik",
          'Specialty-Underwriting-Strategie',
          'Kapitaleffizienz-Zielen'
        ]
      },
      decision: {
        title: 'Decision Framework',
        antares: {
          title: 'Antares',
          bullets: ['Kapazitätsallokation', 'Underwriting-Parameter', 'Loss Ratio Corridor', 'Reporting-Kadenz']
        },
        insurfox: {
          title: 'Insurfox',
          bullets: ['Portfolio-Aufbau', 'Broker-Onboarding', 'Operative Umsetzung', 'Laufendes Portfoliomanagement']
        }
      },
    coreStatement: {
      title: 'Core Statement',
      text: 'Insurfox agiert als Managing General Agent und liefert ein skalierbares, transparentes und profitables europäisches Logistik-Versicherungsportfolio - vollständig ausgerichtet an den Underwriting- und Kapitalzielen von Antares.'
    },
    labels: {
      premiumTable: {
        year: 'Jahr',
        conservative: 'Konservatives Szenario',
        upside: 'Upside-Szenario'
      },
      premiumDrivers: 'Prämienwachstum wird getrieben durch'
    }
  }
  }

  return {
    ...enContent,
    labels: {
      premiumTable: {
        year: 'Year',
        conservative: 'Conservative Scenario',
        upside: 'Upside Scenario'
      },
      premiumDrivers: 'Premium growth is driven by'
    }
  }
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
            <h2>{content.portfolioScope.title}</h2>
          </div>
          <div className="antares-grid antares-grid-two">
            {[content.portfolioScope.insureds, content.portfolioScope.lines, content.portfolioScope.geography, content.portfolioScope.risk].map(
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
          <Card className="antares-card antares-statement-card">
            <p>{content.portfolioScope.statement}</p>
          </Card>
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
            <Card className="antares-card">
              <h3>{content.economics.driversTitle}</h3>
              <ul>
                {content.economics.drivers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </section>
        <section className="antares-section">
          <div className="antares-section-head">
            <h2>{content.claims.title}</h2>
          </div>
          <div className="antares-grid antares-grid-two">
            <Card className="antares-card">
              <ul>
                {content.claims.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            <Card className="antares-card">
              <h3>{content.claims.impactTitle}</h3>
              <ul>
                {content.claims.impact.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </section>
        <section className="antares-section">
          <div className="antares-section-head">
            <h2>{content.quality.title}</h2>
          </div>
          <div className="antares-grid antares-grid-two">
            <Card className="antares-card">
              <h3>{content.quality.traditional.title}</h3>
              <ul>
                {content.quality.traditional.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            <Card className="antares-card">
              <h3>{content.quality.model.title}</h3>
              <ul>
                {content.quality.model.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
          <Card className="antares-card antares-statement-card">
            <p>{content.quality.result}</p>
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
              <h3>{content.strategicValue.alignmentTitle}</h3>
              <ul>
                {content.strategicValue.alignment.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </section>
        <section className="antares-section">
          <div className="antares-section-head">
            <h2>{content.decision.title}</h2>
          </div>
          <div className="antares-grid antares-grid-two">
            <Card className="antares-card">
              <h3>{content.decision.antares.title}</h3>
              <ul>
                {content.decision.antares.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            <Card className="antares-card">
              <h3>{content.decision.insurfox.title}</h3>
              <ul>
                {content.decision.insurfox.bullets.map((item) => (
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
          <p>{content.portfolioScope.risk.title}</p>
          <ul>
            {content.portfolioScope.risk.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.portfolioScope.statement}</p>
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
          <p>{content.economics.driversTitle}</p>
          <ul>
            {content.economics.drivers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="framework-print-section">
          <h2>{content.claims.title}</h2>
          <ul>
            {content.claims.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.claims.impactTitle}</p>
          <ul>
            {content.claims.impact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="framework-print-section">
          <h2>{content.quality.title}</h2>
          <p>{content.quality.traditional.title}</p>
          <ul>
            {content.quality.traditional.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.quality.model.title}</p>
          <ul>
            {content.quality.model.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.quality.result}</p>
        </div>
        <div className="framework-print-section">
          <h2>{content.strategicValue.title}</h2>
          <ul>
            {content.strategicValue.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.strategicValue.alignmentTitle}</p>
          <ul>
            {content.strategicValue.alignment.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="framework-print-section">
          <h2>{content.decision.title}</h2>
          <p>{content.decision.antares.title}</p>
          <ul>
            {content.decision.antares.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.decision.insurfox.title}</p>
          <ul>
            {content.decision.insurfox.bullets.map((item) => (
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
