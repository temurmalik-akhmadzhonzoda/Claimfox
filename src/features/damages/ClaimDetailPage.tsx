import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockClaims } from '../../shared/api/mock/claims'
import { useTranslation } from 'react-i18next'

export default function ClaimDetailPage() {
  const { id } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const claim = mockClaims.find((c) => c.id === id)
  if (!claim) return <div className="page">{t('damages.notfound', 'Claim not found')}</div>
  return (
    <div className="page claim-detail">
      <h2>{claim.title}</h2>
      <div>Status: {claim.status}</div>
      <div>Amount: {claim.amount} €</div>
      <div>Date: {claim.date}</div>
      <button onClick={() => navigate(-1)}>{t('common.back', 'Back')}</button>
    </div>
  )
}
