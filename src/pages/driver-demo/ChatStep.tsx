import React, { useState } from 'react'
import Card from '@/components/ui/Card'

type ChatMessage = {
  id: string
  from: 'driver' | 'insurer'
  text: string
}

type ChatStepProps = {
  chatLog: ChatMessage[]
  onQuickReply: (reply: string) => void
  queuedResponse: boolean
}

export default function ChatStep({
  chatLog,
  onQuickReply,
  queuedResponse
}: ChatStepProps) {
  const [isOpen, setIsOpen] = useState(true)

  const replies = ['Book repair', 'Prefer payout', 'Need a call']

  return (
    <>
      <Card variant="glass" className="demo-card">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          style={{ background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer' }}
        >
          Chat explainer {isOpen ? '▲' : '▼'}
        </button>
        {isOpen && (
          <ul style={{ margin: '0.5rem 0 0 1rem' }}>
            <li>This chat is connected to your claim</li>
            <li>Messages are stored in audit trail</li>
            <li>AI helps triage, humans respond</li>
          </ul>
        )}
      </Card>

      <Card title="Chat" subtitle="Driver vs Insurance" variant="glass" className="demo-card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {chatLog.map((message) => (
            <div
              key={message.id}
              className={`chat-bubble ${message.from === 'driver' ? 'chat-bubble--driver' : 'chat-bubble--insurer'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </Card>

      <Card variant="glass" className="demo-card">
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {replies.map((reply) => (
            <button
              key={reply}
              type="button"
              onClick={() => onQuickReply(reply)}
              style={{
                padding: '0.5rem 0.75rem',
                border: '1px solid var(--ix-border)',
                background: 'transparent',
                cursor: 'pointer'
              }}
            >
              {reply}
            </button>
          ))}
        </div>
      </Card>

      {queuedResponse && (
        <Card variant="glass" className="demo-card">
          <strong>Handler response queued (demo)</strong>
        </Card>
      )}
    </>
  )
}
