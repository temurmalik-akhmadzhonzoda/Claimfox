import React from 'react'
import { LeadItem } from '@/data/leads'
import { formatMoneyCompact, formatPercent } from '@/lib/format'

type Props = {
  lead?: LeadItem
  locale: string
  region: 'de' | 'eu'
  marketValue: number
  onClose: () => void
}

export default function LeadDrawer({ lead, locale, region, marketValue, onClose }: Props) {
  if (!lead) return null
  const share = region === 'de' ? lead.shareDE : lead.shareEU
  const exposure = share ? marketValue * share : undefined
  const note = locale === 'de-DE'
    ? lead.notes.de
    : lead.notes.en
  const methodologyNote = lead.category === 'Operator'
    ? 'Operators = Direct asset-based exposure.'
    : lead.category === 'Platform'
      ? 'Platforms = Indirect / platform-based exposure.'
      : 'Brokers = Brokered / structured exposure.'

  return (
    <aside className="ix-drawer" aria-live="polite">
      <div className="ix-drawer-header">
        <div>
          <h3>{lead.name}</h3>
          <span className="ix-badge">{lead.category}</span>
        </div>
        <button type="button" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>
      <div className="ix-drawer-body">
        <div className="ix-mini-grid">
          <div>
            <span>Exposure {region.toUpperCase()}</span>
            <strong>{exposure ? formatMoneyCompact(exposure, locale) : 'TBD'}</strong>
          </div>
          <div>
            <span>Share {region.toUpperCase()}</span>
            <strong>{share ? formatPercent(share, locale) : 'TBD'}</strong>
          </div>
          <div>
            <span>Exposure Type</span>
            <strong>{lead.exposureType}</strong>
          </div>
        </div>
        <p>{note}</p>
        <p className="ix-muted">{methodologyNote}</p>
        <div className="ix-drawer-section">
          <h4>Sources & Assumptions</h4>
          <ul>
            <li>Source: TBD</li>
            <li>Assumptions: TBD</li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
