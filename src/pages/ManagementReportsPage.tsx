import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

type ReportItem = {
  label: string
  route: string
}

type ReportGroup = {
  key: string
  title: { de: string; en: string }
  subtitle: { de: string; en: string }
  items: ReportItem[]
}

export default function ManagementReportsPage() {
  const navigate = useNavigate()
  const { lang } = useI18n()
  const l = lang === 'de' ? 'de' : 'en'

  const groups: ReportGroup[] = [
    {
      key: 'insurance',
      title: { de: 'Versicherungen', en: 'Insurers' },
      subtitle: { de: 'Carrier-/Capacity-nahe Marktanalysen', en: 'Carrier and capacity-oriented market analyses' },
      items: [
        { label: 'Allianz / VHV', route: '/transport-market-report' },
        { label: 'Nordic MIP', route: '/strategy/nmip-analysis' },
        { label: 'Kairos RS', route: '/analysis/kairos' }
      ]
    },
    {
      key: 'broker-mga',
      title: { de: 'Makler und MGA', en: 'Brokers and MGA' },
      subtitle: { de: 'Distributions-, Maklerpool- und MGA-Vergleiche', en: 'Distribution, broker-pool, and MGA comparisons' },
      items: [
        { label: 'WTW', route: '/strategy/wtw-analysis' },
        { label: 'Loadsure', route: '/strategy/loadsure-analysis' },
        { label: 'Hypoport SE', route: '/analysis/hypoport' },
        { label: 'blau direkt', route: '/analysis/blaudirekt' }
      ]
    },
    {
      key: 'insurtech',
      title: { de: 'InsurTec', en: 'InsurTech' },
      subtitle: { de: 'Plattform-, SaaS- und Prozessanbieter im Vergleich', en: 'Platform, SaaS, and process provider analyses' },
      items: [
        { label: 'Smart InsurTech', route: '/analysis/smartinsurtech' },
        { label: 'Corify', route: '/analysis/corify' },
        { label: 'Claimsforce', route: '/analysis/claimsforce' },
        { label: 'FBSPL', route: '/analysis/fbspl' }
      ]
    }
  ]

  return (
    <section className="page" style={{ gap: '1.25rem' }}>
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', display: 'grid', gap: '1rem' }}>
        <Card
          title={l === 'de' ? 'Marktanalysen' : 'Market Analyses'}
          subtitle={l === 'de' ? 'Übersicht aller strategischen Wettbewerbs- und Marktanalysen' : 'Overview of all strategic competitor and market analyses'}
        >
          <div style={{ display: 'grid', gap: '0.9rem' }}>
            <p style={{ margin: 0, color: '#475569' }}>
              {l === 'de'
                ? 'Wähle eine Analyse nach Marktsegment. Alle Reports sind als Executive-Entscheidungsgrundlage strukturiert.'
                : 'Select an analysis by market segment. All reports are structured as executive decision support.'}
            </p>
            {groups.map((group) => (
              <Card key={group.key} title={group.title[l]} subtitle={group.subtitle[l]}>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {group.items.map((item) => (
                    <Button key={item.route} size="sm" variant="secondary" onClick={() => navigate(item.route)}>
                      {item.label}
                    </Button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
