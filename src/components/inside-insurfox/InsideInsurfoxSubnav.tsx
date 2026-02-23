import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { useI18n } from '@/i18n/I18nContext'

export type InsideSectionKey =
  | 'home'
  | 'app-architecture'
  | 'vision'
  | 'roles'
  | 'lifecycle'
  | 'data-model'
  | 'ai-core'
  | 'modules'
  | 'reporting'
  | 'renewal-loop'
  | 'mvp-roadmap'

type SectionDef = {
  key: InsideSectionKey
  route: string
  labelKey: string
}

const sectionDefs: SectionDef[] = [
  { key: 'home', route: '/inside-insurfox', labelKey: 'insideInsurfox.nav.home' },
  { key: 'app-architecture', route: '/inside-insurfox/app-architecture', labelKey: 'insideInsurfox.nav.appArchitecture' },
  { key: 'vision', route: '/inside-insurfox/vision', labelKey: 'insideInsurfox.nav.vision' },
  { key: 'roles', route: '/inside-insurfox/roles', labelKey: 'insideInsurfox.nav.roles' },
  { key: 'lifecycle', route: '/inside-insurfox/lifecycle', labelKey: 'insideInsurfox.nav.lifecycle' },
  { key: 'data-model', route: '/inside-insurfox/data-model', labelKey: 'insideInsurfox.nav.dataModel' },
  { key: 'ai-core', route: '/inside-insurfox/ai-core', labelKey: 'insideInsurfox.nav.aiCore' },
  { key: 'modules', route: '/inside-insurfox/modules', labelKey: 'insideInsurfox.nav.modules' },
  { key: 'reporting', route: '/inside-insurfox/reporting', labelKey: 'insideInsurfox.nav.reporting' },
  { key: 'renewal-loop', route: '/inside-insurfox/renewal-loop', labelKey: 'insideInsurfox.nav.renewalLoop' },
  { key: 'mvp-roadmap', route: '/inside-insurfox/mvp-roadmap', labelKey: 'insideInsurfox.nav.mvpRoadmap' }
]

export function InsideInsurfoxSubnav({ current }: { current: InsideSectionKey }) {
  const navigate = useNavigate()
  const { t } = useI18n()

  return (
    <div className="print-hide" style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
      {sectionDefs.map((item) => (
        <Button
          key={item.key}
          size="sm"
          variant={current === item.key ? 'primary' : 'secondary'}
          onClick={() => navigate(item.route)}
        >
          {t(item.labelKey)}
        </Button>
      ))}
    </div>
  )
}
