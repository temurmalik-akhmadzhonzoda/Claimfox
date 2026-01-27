import React from 'react'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'
import HeroBlockBackground from '@/assets/images/hero_block_1.png'

export default function LegalRolePage() {
  const { lang } = useI18n()

  const copy = lang === 'en'
    ? {
        title: 'Legal',
        subtitle: 'Binder wording, delegated authority scope, and compliance controls aligned to carrier standards.',
        sections: [
          {
            title: 'Binder & Delegated Authority',
            items: ['Authority schedule alignment', 'Clear scope and exclusions', 'Audit-ready documentation']
          },
          {
            title: 'Regulatory & Compliance',
            items: ['Lloyd’s market standards', 'Local regulatory requirements', 'Policy documentation controls']
          },
          {
            title: 'Data & AI Governance',
            items: ['Data processing terms', 'Decision audit trail', 'Model risk oversight']
          }
        ]
      }
    : {
        title: 'Legal',
        subtitle: 'Binder-Wordings, Delegated-Authority-Umfang und Compliance-Kontrollen nach Carrier-Standards.',
        sections: [
          {
            title: 'Binder & Delegated Authority',
            items: ['Authority-Schedule-Abgleich', 'Klare Scope- und Exclusion-Definition', 'Audit-fähige Dokumentation']
          },
          {
            title: 'Regulatorik & Compliance',
            items: ['Lloyd’s Marktstandards', 'Lokale regulatorische Vorgaben', 'Kontrolle der Policen-Dokumentation']
          },
          {
            title: 'Daten- & KI-Governance',
            items: ['Data-Processing-Regelungen', 'Decision Audit Trail', 'Model-Risk-Überwachung']
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
