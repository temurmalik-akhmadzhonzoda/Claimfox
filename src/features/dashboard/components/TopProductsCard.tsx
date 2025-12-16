import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { mockProducts } from '../../../shared/api/mock/products'

export default function TopProductsCard() {
  const { t } = useTranslation()
  const top = mockProducts.slice(0, 3)

  return (
    <div className="card top-products-card">
      <div className="card-title-row">
        <div>
          <p className="eyebrow">{t('dashboard.topProductsLabel', 'Recommended')}</p>
          <h3>{t('dashboard.topProducts', 'Top Products')}</h3>
        </div>
        <span className="ghost-button small">{t('dashboard.viewAll', 'View all')}</span>
      </div>
      <div className="product-list">
        {top.map((product) => (
          <Link to={`/products/${product.id}`} className="product-row" key={product.id}>
            <div>
              <div className="product-title">{product.title}</div>
              <div className="product-meta">
                {product.rating} ★ · {product.reviews} {t('dashboard.reviews', 'reviews')}
              </div>
            </div>
            <span className="chevron" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
