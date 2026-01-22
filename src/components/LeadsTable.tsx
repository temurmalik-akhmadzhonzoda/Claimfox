import React from 'react'
import { LeadItem } from '@/data/leads'
import { formatMoneyCompact, formatPercent } from '@/lib/format'

type Props = {
  leads: LeadItem[]
  locale: string
  region: 'de' | 'eu'
  marketValue: number
  onSelect: (lead: LeadItem) => void
}

function formatExposure(value: number | undefined, locale: string) {
  return value === undefined ? 'TBD' : formatMoneyCompact(value, locale)
}

function formatShare(value: number | undefined, locale: string) {
  return value === undefined ? 'TBD' : formatPercent(value, locale)
}

export default function LeadsTable({ leads, locale, region, marketValue, onSelect }: Props) {
  return (
    <div className="ix-card ix-table-card">
      <table className="ix-table">
        <thead>
          <tr>
            <th>Lead</th>
            <th>Category</th>
            <th>Exposure {region.toUpperCase()}</th>
            <th>Share {region.toUpperCase()}</th>
            <th>Exposure Type</th>
            <th>Notes</th>
            <th aria-label="Details" />
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const share = region === 'de' ? lead.shareDE : lead.shareEU
            const exposure = share ? marketValue * share : undefined
            return (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.category}</td>
                <td className="ix-num">{formatExposure(exposure, locale)}</td>
                <td className="ix-num">{formatShare(share, locale)}</td>
                <td>{lead.exposureType}</td>
                <td>{lead.notes[locale === 'de-DE' ? 'de' : 'en']}</td>
                <td>
                  <button type="button" className="ix-icon-btn" onClick={() => onSelect(lead)}>
                    i
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {leads.length === 0 && <div className="ix-empty">No data / adjust filters</div>}
    </div>
  )
}
