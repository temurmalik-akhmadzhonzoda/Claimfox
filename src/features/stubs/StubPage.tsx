import React from 'react'

export default function StubPage({ title }: { title?: string }) {
  return (
    <div className="page stub">
      <h2>{title || 'Coming soon'}</h2>
      <p>This section is scaffolded as a stub.</p>
    </div>
  )
}
