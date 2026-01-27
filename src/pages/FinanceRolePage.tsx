import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

export default function FinanceRolePage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Finance',
        subtitle: 'Capital efficiency, KPI transparency and disciplined portfolio economics.',
        sections: [
          {
            title: 'Capital Efficiency',
            items: ['Capital allocation view', 'Reinsurance structure alignment', 'Risk-adjusted return lens']
          },
          {
            title: 'Performance Monitoring',
            items: ['Loss ratio and KPI tracking', 'Expense and commission visibility', 'Monthly steering pack']
          },
          {
            title: 'Exposure & Aggregation',
            items: ['Aggregate caps', 'Concentration alerts', 'Scenario sensitivities']
          }
        ]
      }
    : {
        title: 'Finance',
        subtitle: 'Kapital-Effizienz, KPI-Transparenz und disziplinierte Portfolio-Ökonomie.',
        sections: [
          {
            title: 'Kapital-Effizienz',
            items: ['Sicht auf Kapitalallokation', 'Abgleich der Rückversicherungsstruktur', 'Risikojustierte Renditeperspektive']
          },
          {
            title: 'Performance-Monitoring',
            items: ['Loss-Ratio- und KPI-Tracking', 'Kosten- und Provisions-Transparenz', 'Monatlicher Steering Pack']
          },
          {
            title: 'Exposure & Aggregation',
            items: ['Aggregat-Caps', 'Konzentrations-Alerts', 'Szenario-Sensitivitäten']
          }
        ]
      }

  return (
    <section style={{ minHeight: '100vh', width: '100%', color: '#0e0d1c' }}>
      <div
        className="roles-hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(7, 20, 74, 0.9) 0%, rgba(11, 45, 122, 0.9) 100%), url(${HeroBlockBackground})`
        }}
      >
        <div className="roles-hero-inner">
          <Header
            title={copy.title}
            subtitle={copy.subtitle}
            subtitleColor="rgba(255,255,255,0.82)"
          />
        </div>
      </div>
      <div
        style={{
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '32px 1.25rem 4rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {copy.sections.map((section) => (
          <Card
            key={section.title}
            title={section.title}
            variant="glass"
            style={{ display: 'flex', flexDirection: 'column', minHeight: '180px' }}
          >
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', lineHeight: 1.55 }}>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  )
}
