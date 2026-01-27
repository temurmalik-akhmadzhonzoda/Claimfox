import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'
import { useNavigate } from 'react-router-dom'

export default function FinanceRolePage() {
  const { lang } = useI18n()
  const navigate = useNavigate()

  const copy = lang === 'en'
    ? {
        title: 'Finance',
        subtitle: 'Capital efficiency, KPI transparency and disciplined portfolio economics.',
        rolesTitle: 'Finance roles',
        roles: [
          {
            title: 'Finance Analyst',
            body: 'Portfolio & performance analytics with governance checks.',
            route: '/roles/finance/analyst'
          },
          {
            title: 'Premium & Billing Operations',
            body: 'Receivables, billing accuracy, and collections controls.',
            route: '/roles/finance/premium-billing'
          },
          {
            title: 'Claims Finance',
            body: 'Reserving discipline and payment control oversight.',
            route: '/roles/finance/claims'
          },
          {
            title: 'Reinsurance Finance',
            body: 'Cessions, bordereaux and recoveries monitoring.',
            route: '/roles/finance/reinsurance'
          },
          {
            title: 'Financial Controller',
            body: 'Close, GL integrity and reporting governance.',
            route: '/roles/finance/controller'
          },
          {
            title: 'CFO / Carrier Finance Final Authority',
            body: 'Final finance approvals and governance authority.',
            route: '/roles/finance/cfo-final-authority'
          }
        ],
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
        rolesTitle: 'Finance Rollen',
        roles: [
          {
            title: 'Finance Analyst',
            body: 'Portfolio- & Performance-Analysen mit Governance-Checks.',
            route: '/roles/finance/analyst'
          },
          {
            title: 'Premium & Billing Operations',
            body: 'Receivables, Billing-Genauigkeit und Collections-Kontrollen.',
            route: '/roles/finance/premium-billing'
          },
          {
            title: 'Claims Finance',
            body: 'Reserving-Disziplin und Payment-Control.',
            route: '/roles/finance/claims'
          },
          {
            title: 'Reinsurance Finance',
            body: 'Cessions, Bordereaux und Recoveries Monitoring.',
            route: '/roles/finance/reinsurance'
          },
          {
            title: 'Financial Controller',
            body: 'Close, GL-Integrität und Reporting-Governance.',
            route: '/roles/finance/controller'
          },
          {
            title: 'CFO / Carrier Finance Final Authority',
            body: 'Finale Finance-Freigaben und Governance-Authority.',
            route: '/roles/finance/cfo-final-authority'
          }
        ],
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
          gap: '1.5rem'
        }}
      >
        <div style={{ display: 'grid', gap: '1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.35rem', color: '#0e0d1c' }}>{copy.rolesTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {copy.roles.map((role) => (
              <Card
                key={role.title}
                title={role.title}
                variant="glass"
                interactive
                onClick={() => navigate(role.route)}
                style={{ display: 'flex', flexDirection: 'column', minHeight: '170px' }}
              >
                <p style={{ margin: 0, color: '#475569', lineHeight: 1.5 }}>{role.body}</p>
              </Card>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
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
      </div>
    </section>
  )
}
