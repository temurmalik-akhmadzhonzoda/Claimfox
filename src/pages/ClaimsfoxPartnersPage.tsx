import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ClaimsfoxLayout from '@/claimsfox/components/ClaimsfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { listClaims, listPartners, requestPartner, updatePartnerStatus } from '@/claimsfox/api/claimsfoxApi'
import type { Claim, Partner } from '@/claimsfox/types'

export default function ClaimsfoxPartnersPage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [partners, setPartners] = useState<Partner[]>([])
  const [claims, setClaims] = useState<Claim[]>([])
  const [selectedClaim, setSelectedClaim] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      const [partnerData, claimData] = await Promise.all([
        listPartners(ctx),
        listClaims(ctx)
      ])
      if (!mounted) return
      setPartners(partnerData)
      setClaims(claimData)
      setSelectedClaim(claimData[0]?.id ?? '')
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  async function assignPartner(partnerId: string) {
    if (!selectedClaim) return
    await requestPartner(ctx, selectedClaim, partnerId, 'Assigned via partner roster.')
  }

  async function toggleStatus(partner: Partner) {
    const next = partner.status === 'active' ? 'standby' : 'active'
    await updatePartnerStatus(ctx, partner.id, next)
    const data = await listPartners(ctx)
    setPartners(data)
  }

  return (
    <ClaimsfoxLayout title={t('claimsfox.partners.title')} subtitle={t('claimsfox.partners.subtitle')}>
      <Card>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{t('claimsfox.partners.assignTo')}</span>
          <select value={selectedClaim} onChange={(event) => setSelectedClaim(event.target.value)} style={{ padding: '0.5rem', borderRadius: 10, border: '1px solid #e2e8f0' }}>
            {claims.map((claim) => (
              <option key={claim.id} value={claim.id}>{claim.claimNumber}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {partners.map((partner) => (
            <div key={partner.id} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 0.6fr 0.6fr auto auto', gap: '0.75rem', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: 12, padding: '0.75rem 1rem' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{partner.name}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{partner.role}</div>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{partner.contactEmail}</div>
              <div style={{ fontSize: '0.85rem', color: '#475569' }}>{partner.rating.toFixed(1)}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t(`claimsfox.partners.status.${partner.status}`)}</div>
              <Button size="sm" variant="secondary" onClick={() => toggleStatus(partner)}>{t('claimsfox.partners.updateStatus')}</Button>
              <Button size="sm" onClick={() => assignPartner(partner.id)}>{t('claimsfox.partners.request')}</Button>
            </div>
          ))}
        </div>
      </Card>
    </ClaimsfoxLayout>
  )
}
