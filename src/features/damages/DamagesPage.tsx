import React from 'react'
import { Link } from 'react-router-dom'
import { mockClaims } from '../../shared/api/mock/claims'
import { useTranslation } from 'react-i18next'

export default function DamagesPage() {
  const { t } = useTranslation()
  return (
    <div className="page damages">
      <h2>{t('damages.title', 'Damages')}</h2>
      <div className="list">
        {mockClaims.map((c) => (
          <Link key={c.id} to={`/damages/${c.id}`} className="list-item">
            <div className="title">{c.title}</div>
            <div className="meta">{c.status} · {c.amount}€</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
