import React from 'react'
import { Link } from 'react-router-dom'
import { mockProducts } from '../../shared/api/mock/products'
import { useTranslation } from 'react-i18next'

export default function ProductsPage() {
  const { t } = useTranslation()
  return (
    <div className="page products">
      <h2>{t('products.title', 'Products')}</h2>
      <div className="list">
        {mockProducts.map((p) => (
          <Link key={p.id} to={`/products/${p.id}`} className="list-item">
            <div className="title">{p.title}</div>
            <div className="subtitle">{p.short}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
