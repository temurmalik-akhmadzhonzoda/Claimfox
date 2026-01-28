import React, { useRef } from 'react'
import Card from '@/components/ui/Card'
import ClaimsfoxIcon from '@/assets/logos/Claimsfox_icon.png'

type ClaimData = {
  claimType: string
  when: string
  location: string
  injured: string
  description: string
  claimId: string
}

type ClaimStepProps = {
  claim: ClaimData
  showSubmitted: boolean
}

const layoutStyles = `
  .claim-process-chat-shell {
    background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(212,56,13,0.35));
    border-radius: 22px;
    padding: 1px;
  }
  .claim-process-chat-surface {
    background: rgba(255,255,255,0.96);
    border-radius: 22px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }
  .claim-process-messages {
    background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,247,255,0.98));
    border-radius: 18px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    min-height: 240px;
    max-height: 320px;
    overflow-y: auto;
    border: 1px solid rgba(8,0,40,0.06);
  }
  .claim-process-bubble {
    padding: 0.7rem 0.9rem;
    border-radius: 16px;
    box-shadow: 0 12px 20px rgba(8, 4, 50, 0.08);
    white-space: pre-line;
    font-size: 0.92rem;
  }
  .claim-process-user {
    background: linear-gradient(140deg, #ffe4db, #fff1ea);
  }
  .claim-process-bot {
    background: #f8f7ff;
  }
`

type Message = {
  id: string
  author: 'bot' | 'user'
  text: string
}

export default function ClaimStep({
  claim,
  showSubmitted
}: ClaimStepProps) {
  const messagesRef = useRef<HTMLDivElement | null>(null)
  const messages: Message[] = [
    { id: 'm-1', author: 'bot', text: 'Let’s capture the incident in a few clicks.' },
    { id: 'm-2', author: 'bot', text: 'What happened?' },
    { id: 'm-3', author: 'user', text: claim.claimType || 'Accident' },
    { id: 'm-4', author: 'bot', text: 'When did it happen?' },
    { id: 'm-5', author: 'user', text: claim.when || 'Today' },
    { id: 'm-6', author: 'bot', text: 'Where did it happen?' },
    { id: 'm-7', author: 'user', text: claim.location || 'Munich' },
    { id: 'm-8', author: 'bot', text: 'Is anyone injured?' },
    { id: 'm-9', author: 'user', text: claim.injured || 'No' },
    { id: 'm-10', author: 'bot', text: 'Thanks. You can start the claim now.' }
  ]

  return (
    <>
      <style>{layoutStyles}</style>
      <Card title="Claim intake (chat)" subtitle="Click to answer, no typing needed." variant="glass" className="demo-card">
        <div className="claim-process-chat-shell">
          <div className="claim-process-chat-surface">
            <div ref={messagesRef} className="claim-process-messages">
              {messages.map((message) => {
                const isUser = message.author === 'user'
                return (
                  <div
                    key={message.id}
                    style={{
                      display: 'flex',
                      justifyContent: isUser ? 'flex-end' : 'flex-start',
                      gap: '0.5rem'
                    }}
                  >
                    {!isUser && (
                      <img src={ClaimsfoxIcon} alt="Claimsfox" style={{ width: '24px', height: '24px' }} />
                    )}
                    <div
                      style={{
                        maxWidth: '78%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isUser ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <div
                        className={`claim-process-bubble ${isUser ? 'claim-process-user' : 'claim-process-bot'}`}
                        style={{
                          borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px'
                        }}
                      >
                        {message.text}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <span className="demo-progress">Ready to submit the claim.</span>
          </div>
        </div>
      </Card>

      {showSubmitted && (
        <Card variant="glass" className="demo-card">
          <div style={{ display: 'grid', gap: '0.35rem' }}>
            <strong>Claim reported: {claim.claimId}</strong>
            <span className="demo-badge">SLA: 24h initial response</span>
          </div>
        </Card>
      )}
    </>
  )
}
