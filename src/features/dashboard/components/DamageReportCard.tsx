import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function DamageReportCard() {
  const { t } = useTranslation()
  return (
    <Link to="/damage-report" className="cta-card damage-report-card">
      <div>
        <p className="eyebrow">{t('dashboard.damageReportLabel', 'Claims assistant')}</p>
        <h3>{t('dashboard.damageReport', 'Damage Report')}</h3>
        <p>{t('dashboard.damageReportSubtitle', 'Submit a damage report online in 3 minutes.')}</p>
      </div>
      <span className="ghost-button">{t('dashboard.startReport', 'Start report')}</span>
    </Link>
  )
}
