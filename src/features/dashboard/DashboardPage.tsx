import React from 'react'
import TileGrid from './components/TileGrid'
import DamageReportCard from './components/DamageReportCard'
import TopProductsCard from './components/TopProductsCard'
import { useTranslation } from 'react-i18next'

export default function DashboardPage() {
  const { t } = useTranslation()
  return (
    <div className="page dashboard">
      <h2>{t('dashboard.title', 'My Insurfox')}</h2>
      <TileGrid />
      <DamageReportCard />
      <TopProductsCard />
    </div>
  )
}
