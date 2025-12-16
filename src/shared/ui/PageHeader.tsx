import React from 'react'

type PageHeaderProps = {
  title: string
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-header-text">
        <p className="eyebrow">ClaimFox</p>
        <h1>{title}</h1>
        <p className="subtitle">Your digital cockpit for policies, damages and fleet.</p>
      </div>
      <div className="search">
        <input placeholder="Search policies, reports, contacts…" aria-label="Search" />
      </div>
    </div>
  )
}
