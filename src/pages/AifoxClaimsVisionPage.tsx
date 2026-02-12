import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import AifoxLayout from '@/aifox/components/AifoxLayout'
import { useI18n } from '@/i18n/I18nContext'
import { useTenantContext } from '@/brokerfox/hooks/useTenantContext'
import { addTimelineEvent, listClaims } from '@/aifox/api/aifoxApi'
import type { AifoxClaim } from '@/aifox/types'
import ClaimDamageImage from '@/assets/images/claim_damage_1.png'

export default function AifoxClaimsVisionPage() {
  const { t, lang } = useI18n()
  const ctx = useTenantContext()
  const [claims, setClaims] = useState<AifoxClaim[]>([])
  const [selected, setSelected] = useState<AifoxClaim | null>(null)
  const [decision, setDecision] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await listClaims(ctx)
      if (!mounted) return
      setClaims(data)
      setSelected(data[0] ?? null)
    }
    load()
    return () => { mounted = false }
  }, [ctx])

  const parts = useMemo(() => (
    lang === 'de'
      ? ['Frontstoßfänger', 'Scheinwerfer links', 'Motorhaube', 'Kühlergrill']
      : ['Front bumper', 'Left headlight', 'Hood panel', 'Radiator grille']
  ), [lang])
  const cropTitle = lang === 'de' ? 'Erkannte Bildausschnitte' : 'Detected image crops'
  const cropLabels = lang === 'de'
    ? ['Stoßfänger', 'Scheinwerfer', 'Kühlergrill']
    : ['Bumper', 'Headlight', 'Radiator grille']
  const overlayInfo = lang === 'de'
    ? 'Claimfox AI markiert erkannte Schadenbereiche im Gesamtbild. Darunter werden die jeweiligen Bildausschnitte für die Fachprüfung dargestellt.'
    : 'Claimfox AI marks detected damage regions on the full image. The dedicated image crops are shown below for specialist review.'

  async function submitDecision(action: 'approve' | 'override') {
    if (!selected) return
    const actionLabel = action === 'approve' ? t('aifox.claimsVision.approve') : t('aifox.claimsVision.override')
    setDecision(actionLabel)
    await addTimelineEvent(ctx, {
      entityType: 'claim',
      entityId: selected.id,
      type: 'statusUpdate',
      title: t('aifox.claimsVision.events.decisionTitle'),
      message: t('aifox.claimsVision.events.decisionMessage', { action: actionLabel, claimNumber: selected.claimNumber }),
      actor: ctx.userId
    })
  }

  return (
    <AifoxLayout title={t('aifox.claimsVision.title')} subtitle={t('aifox.claimsVision.subtitle')}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '1.5rem' }}>
        <Card title={t('aifox.claimsVision.uploadTitle')} subtitle={t('aifox.claimsVision.uploadSubtitle')}>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              <div style={{ border: '1px dashed #cbd5f5', borderRadius: 14, padding: '0.55rem 0.8rem', textAlign: 'center', color: '#64748b' }}>
                {t('aifox.claimsVision.uploadHint')}
              </div>
              <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid #e2e8f0', height: 180, background: '#e2e8f0' }}>
                <img
                  src={ClaimDamageImage}
                  alt="Demo Unfallbild"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
            <div style={{ position: 'relative', height: 220, borderRadius: 14, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
              <img
                src={ClaimDamageImage}
                alt="Claimfox AI overlay"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.9) contrast(1.05)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.45), rgba(15,23,42,0.2))' }} />
              <div style={{ position: 'absolute', top: 20, left: 24, width: 132, height: 86, border: '2px solid #f97316', borderRadius: 8, animation: 'aifoxPulse 2s ease-in-out infinite' }} />
              <div style={{ position: 'absolute', bottom: 30, right: 40, width: 148, height: 94, border: '2px solid #38bdf8', borderRadius: 8, animation: 'aifoxPulse 2.4s ease-in-out infinite' }} />
              <div style={{ position: 'absolute', top: 24, left: 30, background: 'rgba(15,23,42,0.72)', color: '#fde68a', fontSize: '0.72rem', padding: '0.2rem 0.45rem', borderRadius: 999 }}>
                {cropLabels[0]} · 0.87
              </div>
              <div style={{ position: 'absolute', bottom: 34, right: 46, background: 'rgba(15,23,42,0.72)', color: '#bae6fd', fontSize: '0.72rem', padding: '0.2rem 0.45rem', borderRadius: 999 }}>
                {cropLabels[1]} · 0.81
              </div>
              <div style={{ position: 'absolute', top: 0, left: '-35%', width: '35%', height: '100%', background: 'linear-gradient(90deg, rgba(56,189,248,0), rgba(56,189,248,0.28), rgba(56,189,248,0))', animation: 'aifoxScan 2.8s linear infinite' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 20, color: '#fff', fontSize: '0.85rem' }}>{t('aifox.claimsVision.overlayLabel')}</div>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{overlayInfo}</div>
            <div style={{ display: 'grid', gap: '0.45rem' }}>
              <strong>{cropTitle}</strong>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.5rem' }}>
                <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #e2e8f0', background: '#0f172a' }}>
                  <img src={ClaimDamageImage} alt={cropLabels[0]} style={{ width: '100%', height: 72, objectFit: 'cover', objectPosition: '26% 64%', display: 'block' }} />
                  <div style={{ fontSize: '0.75rem', padding: '0.3rem 0.4rem', color: '#475569', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{cropLabels[0]}</span>
                    <span>0.87</span>
                  </div>
                </div>
                <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #e2e8f0', background: '#0f172a' }}>
                  <img src={ClaimDamageImage} alt={cropLabels[1]} style={{ width: '100%', height: 72, objectFit: 'cover', objectPosition: '73% 56%', display: 'block' }} />
                  <div style={{ fontSize: '0.75rem', padding: '0.3rem 0.4rem', color: '#475569', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{cropLabels[1]}</span>
                    <span>0.81</span>
                  </div>
                </div>
                <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #e2e8f0', background: '#0f172a' }}>
                  <img src={ClaimDamageImage} alt={cropLabels[2]} style={{ width: '100%', height: 72, objectFit: 'cover', objectPosition: '58% 72%', display: 'block' }} />
                  <div style={{ fontSize: '0.75rem', padding: '0.3rem 0.4rem', color: '#475569', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{cropLabels[2]}</span>
                    <span>0.79</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '0.4rem' }}>
              <strong>{t('aifox.claimsVision.detectedParts')}</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {parts.map((part) => (
                  <span key={part} style={{ border: '1px solid #e2e8f0', borderRadius: 999, padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>{part}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>
        <Card title={t('aifox.claimsVision.analysisTitle')} subtitle={t('aifox.claimsVision.analysisSubtitle')}>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <label style={{ display: 'grid', gap: '0.35rem', fontSize: '0.85rem', color: '#64748b' }}>
              {t('aifox.claimsVision.claimSelect')}
              <select value={selected?.id ?? ''} onChange={(event) => setSelected(claims.find((c) => c.id === event.target.value) ?? null)} style={{ padding: '0.5rem', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                {claims.map((claim) => (
                  <option key={claim.id} value={claim.id}>{claim.claimNumber}</option>
                ))}
              </select>
            </label>
            <div style={{ display: 'grid', gap: '0.35rem', fontSize: '0.9rem' }}>
              <div><strong>{t('aifox.claimsVision.estimate')}:</strong> € 4,850</div>
              <div><strong>{t('aifox.claimsVision.severity')}:</strong> {lang === 'de' ? 'Mittel' : 'Medium'}</div>
              <div><strong>{t('aifox.claimsVision.confidence')}:</strong> 0.87</div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: '0.75rem', color: '#475569' }}>
              {t('aifox.claimsVision.explainability')}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button size="sm" onClick={() => submitDecision('approve')}>{t('aifox.claimsVision.approve')}</Button>
              <Button size="sm" variant="secondary" onClick={() => submitDecision('override')}>{t('aifox.claimsVision.override')}</Button>
            </div>
            {decision ? (
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{t('aifox.claimsVision.decisionSaved')} {decision}</div>
            ) : null}
          </div>
        </Card>
      </div>
      <style>{`
        @keyframes aifoxPulse {
          0% { transform: scale(1); opacity: 0.88; }
          50% { transform: scale(1.02); opacity: 1; }
          100% { transform: scale(1); opacity: 0.88; }
        }
        @keyframes aifoxScan {
          0% { left: -35%; }
          100% { left: 100%; }
        }
      `}</style>
    </AifoxLayout>
  )
}
