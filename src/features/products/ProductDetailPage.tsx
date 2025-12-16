import React from 'react'
import { useParams } from 'react-router-dom'
import { mockProducts } from '../../shared/api/mock/products'
import { useTranslation } from 'react-i18next'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { t } = useTranslation()
  const product = mockProducts.find((p) => p.id === id)
  if (!product) return <div className="page">{t('products.notfound', 'Product not found')}</div>
  return (
    <div className="page product-detail">
      <h2>{product.title}</h2>
      <p>{product.description}</p>
    </div>
  )
}
