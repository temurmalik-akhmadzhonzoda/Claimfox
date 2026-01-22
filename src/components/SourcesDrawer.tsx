import React from 'react'

type Source = {
  id: string
  title: string
  publisher: string
  year: number
  documentType: string
  lastVerified: string
  url: string
}

type Props = {
  open: boolean
  sources: Source[]
  onClose: () => void
}

export default function SourcesDrawer({ open, sources, onClose }: Props) {
  return (
    <aside className={`ix-drawer ix-sources ${open ? 'is-open' : ''}`} aria-live="polite">
      <div className="ix-drawer-header">
        <div>
          <h3>Sources & Verification</h3>
          <p>Audit-ready sources</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>
      <div className="ix-drawer-body">
        {sources.map((source) => (
          <div key={source.id} className="ix-source-row">
            <strong>{source.title}</strong>
            <span>{source.publisher}</span>
            <span>{source.documentType}</span>
            <span>{source.year}</span>
            <span>Last verified: {source.lastVerified}</span>
            <span>URL: {source.url || 'TBD'}</span>
          </div>
        ))}
      </div>
    </aside>
  )
}
