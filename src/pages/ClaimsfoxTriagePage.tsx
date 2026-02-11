import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ClaimsfoxLayout from '@/claimsfox/components/ClaimsfoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent, listClaims, updateClaimStatus } from '@/claimsfox/api/claimsfoxApi'
import type { Claim } from '@/claimsfox/types'

export default function ClaimsfoxTriagePage() {
  const { t } = useI18n()
  const ctx = useTenantContext()
  const [claims, setClaims] = useState<Claim[]>([])
  const [approvals, setApprovals] = useState<Record<string, boolean>>({})

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listClaims(ctx)
      if (!mounted) return
      setClaims(data)
      const next: Record<string, boolean> = {}
      data.forEach((claim) => { next[claim.id] = true })
      setApprovals(next)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const queue = useMemo(() => {
    return claims.filter((claim) => ['intake', 'triage'].includes(claim.status))
  }, [claims])

  async function approve(claimId: string) {
    if (!approvals[claimId]) return
    await updateClaimStatus(ctx, claimId, 'investigation')
    await addTimelineEvent(ctx, {
      entityType: 'claim',
      entityId: claimId,
      type: 'system',
      title: 'AI triage approved',
      message: 'AI triage recommendation accepted and moved to investigation.',
      actor: ctx.userId
    })
    const refreshed = await listClaims(ctx)
    setClaims(refreshed)
  }

  return (
    <ClaimsfoxLayout title={t('claimsfox.triage.title')} subtitle={t('claimsfox.triage.subtitle')}>
      <Card>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {queue.map((claim) => (
            <div key={claim.id} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr auto', gap: '0.75rem', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: 12, padding: '0.75rem 1rem' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{claim.claimNumber}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{claim.insured}</div>
                <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.25rem' }}>{t('claimsfox.triage.recommendation')}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{t('claimsfox.triage.sources')}</div>
              </div>
              <div style={{ fontSize: '0.85rem' }}>{claim.lineOfBusiness}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t('claimsfox.triage.score')}: {(claim.triageScore * 100).toFixed(0)}%</div>
              <div style={{ display: 'grid', gap: '0.4rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#475569' }}>
                  <input
                    type="checkbox"
                    checked={Boolean(approvals[claim.id])}
                    onChange={(event) => setApprovals({ ...approvals, [claim.id]: event.target.checked })}
                  />
                  {t('claimsfox.triage.needsApproval')}
                </label>
                <Button size="sm" onClick={() => approve(claim.id)} disabled={!approvals[claim.id]}>{t('claimsfox.triage.approve')}</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </ClaimsfoxLayout>
  )
}
