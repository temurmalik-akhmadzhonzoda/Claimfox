import React, { useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '@/styles/demo-shell.css'

type StepId = 'register' | 'onboarding' | 'profile' | 'identification' | 'quote' | 'purchase' | 'claims' | 'chat'

type DemoState = {
  verified: boolean
  quoteReady: boolean
  policyActive: boolean
  claimSubmitted: boolean
  handlerAssigned: boolean
  slaRunning: boolean
}

type AuditEntry = { id: string; label: string; time: string }

type SnapshotBadge = { label: string; active: boolean; tone: 'green' | 'blue' | 'orange' | 'indigo' | 'red' }

type ChatMessage = { id: string; from: 'driver' | 'insurer'; text: string }

const stateKey = 'driverDemoState'
const auditKey = 'driverDemoAudit'
const chatKey = 'driverDemoChat'

const demoDefaults = {
  email: 'alex.driver@demo.insurfox',
  driver: 'Alex Driver',
  vehicle: 'M-IF 421 · Car',
  policyNumber: 'PL-204889',
  insurer: 'Atlas Insurance',
  claimId: 'CLM-10421',
  location: 'Munich'
}

const STEP_META: Array<{ id: StepId; label: string; short: string; subtitle: string }> = [
  { id: 'register', label: 'Registration', short: 'Register', subtitle: 'Capture email in one click' },
  { id: 'onboarding', label: 'Onboarding', short: 'Onboard', subtitle: 'Wizard with progress' },
  { id: 'profile', label: 'Profile', short: 'Profile', subtitle: 'Driver + company overview' },
  { id: 'identification', label: 'Identification', short: 'ID Check', subtitle: 'ID + selfie match' },
  { id: 'quote', label: 'Quote', short: 'Quote', subtitle: 'Liability + vehicle quote' },
  { id: 'purchase', label: 'Purchase', short: 'Purchase', subtitle: 'Checkout & payment' },
  { id: 'claims', label: 'Claims', short: 'Claims', subtitle: 'FNOL chatbot intake' },
  { id: 'chat', label: 'Chat', short: 'Chat', subtitle: 'Insurer communication' }
]

const INITIAL_CHAT: ChatMessage[] = [
  { id: 'c1', from: 'driver', text: 'Hi, I need help with my claim.' },
  { id: 'c2', from: 'insurer', text: 'Thanks. I can see your FNOL. Can you confirm the location?' },
  { id: 'c3', from: 'driver', text: 'Munich, Leopoldstrasse 14.' },
  { id: 'c4', from: 'insurer', text: 'Got it. A handler will review. Do you prefer repair or payout?' }
]

const defaultState: DemoState = {
  verified: false,
  quoteReady: false,
  policyActive: false,
  claimSubmitted: false,
  handlerAssigned: false,
  slaRunning: false
}

const safeParse = <T,>(value: string | null, fallback: T): T => {
  if (!value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

const readDemoState = (): DemoState => safeParse(sessionStorage.getItem(stateKey), defaultState)
const writeDemoState = (next: DemoState) => sessionStorage.setItem(stateKey, JSON.stringify(next))
const resetDemoState = () => sessionStorage.removeItem(stateKey)

const readAudit = (): AuditEntry[] => safeParse(sessionStorage.getItem(auditKey), [])
const appendAudit = (label: string) => {
  const now = new Date()
  const time = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  const next = [{ id: `${Date.now()}-${Math.random()}`, label, time }, ...readAudit()]
  sessionStorage.setItem(auditKey, JSON.stringify(next))
}
const clearAudit = () => sessionStorage.removeItem(auditKey)

const readChat = (): ChatMessage[] => safeParse(sessionStorage.getItem(chatKey), INITIAL_CHAT)
const writeChat = (messages: ChatMessage[]) => sessionStorage.setItem(chatKey, JSON.stringify(messages))

export default function DemoDriverStepPage() {
  const { stepId } = useParams()
  const navigate = useNavigate()

  const stepIndex = useMemo(
    () => STEP_META.findIndex((step) => step.id === stepId),
    [stepId]
  )

  if (stepIndex === -1) {
    return <Navigate to="/demo-driver" replace />
  }

  const step = STEP_META[stepIndex]
  const [demoState, setDemoState] = useState<DemoState>(() => readDemoState())
  const [auditLog, setAuditLog] = useState<AuditEntry[]>(() => readAudit())
  const [chatLog, setChatLog] = useState<ChatMessage[]>(() => readChat())
  const [adminOpen, setAdminOpen] = useState(false)

  const persistState = (next: DemoState) => {
    setDemoState(next)
    writeDemoState(next)
  }

  const pushAudit = (label: string) => {
    appendAudit(label)
    setAuditLog(readAudit())
  }

  const goBack = () => {
    if (stepIndex === 0) {
      navigate('/demo-driver')
      return
    }
    navigate(`/demo-driver/step/${STEP_META[stepIndex - 1].id}`)
  }

  const goNext = () => {
    if (stepIndex >= STEP_META.length - 1) {
      navigate('/demo-driver')
      return
    }
    navigate(`/demo-driver/step/${STEP_META[stepIndex + 1].id}`)
  }

  const handleJump = (target: StepId) => {
    navigate(`/demo-driver/step/${target}`)
  }

  const addChatMessage = (text: string) => {
    const nextMessages = [
      ...chatLog,
      { id: `c${chatLog.length + 1}`, from: 'driver', text },
      { id: `c${chatLog.length + 2}`, from: 'insurer', text: 'Handler response queued (demo).' }
    ]
    setChatLog(nextMessages)
    writeChat(nextMessages)
    pushAudit('Driver sent quick reply')
  }

  const snapshotBadges: SnapshotBadge[] = [
    { label: 'Verified', active: demoState.verified, tone: 'green' },
    { label: 'Quote Ready', active: demoState.quoteReady, tone: 'blue' },
    { label: 'Policy Active', active: demoState.policyActive, tone: 'indigo' },
    { label: 'Claim Submitted', active: demoState.claimSubmitted, tone: 'orange' },
    { label: 'Handler Assigned', active: demoState.handlerAssigned, tone: 'green' },
    { label: 'SLA Running', active: demoState.slaRunning, tone: 'red' }
  ]

  const aiHints: Record<StepId, string[]> = {
    register: ['AI checks domain risk score', 'Auto-approves low risk signup', 'No decision without human override'],
    onboarding: ['AI suggests completion order', 'Flags missing vehicle info', 'Human review required for exceptions'],
    profile: ['AI validates company match', 'Detects policy overlap', 'Human review for overrides'],
    identification: ['AI runs ID + selfie match', 'Confidence score shown', 'Human approval required'],
    quote: ['AI recommends liability limits', 'Uses fleet exposure data', 'Human review before bind'],
    purchase: ['AI checks payment anomalies', 'Flags policy conflicts', 'Human review required'],
    claims: ['AI triages FNOL severity', 'Detects injury risk', 'Human handler approves'],
    chat: ['AI drafts responses', 'Human handler approves', 'Audit trail stored']
  }

  const stepCards: Record<StepId, React.ReactNode> = {
    register: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">Welcome to Insurfox</div>
            <div className="hint">1-tap registration</div>
          </div>
          <div className="phone-card-body">
            <div>
              <div className="text-muted">Email</div>
              <strong>{demoDefaults.email}</strong>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-blue-lt text-blue">Auto-verified</span>
              <span className="badge bg-green-lt text-green">Consent stored</span>
            </div>
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              pushAudit('Email captured')
              goNext()
            }}
          >
            Confirm email
          </button>
        </div>
      </>
    ),
    onboarding: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">Onboarding wizard</div>
            <div className="hint">55% complete</div>
          </div>
          <div className="phone-card-body">
            <div className="progress">
              <div className="progress-bar bg-indigo" style={{ width: '55%' }} />
            </div>
            <div className="d-flex flex-wrap gap-2">
              {['Account', 'Vehicle', 'Coverage', 'Support'].map((item, index) => (
                <span key={item} className={`badge ${index < 2 ? 'bg-green-lt text-green' : 'bg-blue-lt text-blue'}`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              pushAudit('Onboarding wizard completed')
              goNext()
            }}
          >
            Continue onboarding
          </button>
        </div>
      </>
    ),
    profile: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">Profile overview</div>
            <div className="hint">Prefilled</div>
          </div>
          <div className="phone-card-body">
            <div>
              <div className="text-muted">Driver</div>
              <strong>{demoDefaults.driver}</strong>
            </div>
            <div>
              <div className="text-muted">Company</div>
              <strong>Insurfox Fleet GmbH</strong>
            </div>
            <div>
              <div className="text-muted">Vehicle</div>
              <strong>{demoDefaults.vehicle}</strong>
            </div>
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              pushAudit('Profile confirmed')
              goNext()
            }}
          >
            Confirm profile
          </button>
        </div>
      </>
    ),
    identification: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">Identification</div>
            <div className="hint">ID + selfie match</div>
          </div>
          <div className="phone-card-body">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <div className="text-muted">ID document</div>
                <strong>German ID · OCR matched</strong>
              </div>
              <span className="badge bg-blue-lt text-blue">Captured</span>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <div className="text-muted">Selfie match</div>
                <strong>{demoState.verified ? 'Match verified' : 'Pending review'}</strong>
              </div>
              <span className={`badge ${demoState.verified ? 'bg-green-lt text-green' : 'bg-yellow-lt text-yellow'}`}>
                {demoState.verified ? 'Verified' : 'Pending'}
              </span>
            </div>
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              const next = { ...demoState, verified: true }
              persistState(next)
              pushAudit('Identity verified')
              goNext()
            }}
          >
            Verify identity
          </button>
        </div>
      </>
    ),
    quote: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">Quote builder</div>
            <div className="hint">Carrier liability</div>
          </div>
          <div className="phone-card-body">
            <div className="d-flex flex-wrap gap-2">
              {['Carrier liability', '3 vehicles', 'EU coverage'].map((item) => (
                <span key={item} className="badge bg-indigo-lt text-indigo">{item}</span>
              ))}
            </div>
            <div>
              <div className="text-muted">Estimated premium</div>
              <strong>€ 1,420 / month</strong>
            </div>
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              const next = { ...demoState, quoteReady: true }
              persistState(next)
              pushAudit('Quote generated')
              goNext()
            }}
          >
            Generate quote
          </button>
        </div>
      </>
    ),
    purchase: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">Checkout</div>
            <div className="hint">Policy binding</div>
          </div>
          <div className="phone-card-body">
            <div className="d-flex align-items-center justify-content-between">
              <span>Policy</span>
              <strong>{demoDefaults.policyNumber}</strong>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <span>Payment method</span>
              <strong>SEPA</strong>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <span>Total</span>
              <strong>€ 1,420 / month</strong>
            </div>
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              const next = { ...demoState, policyActive: true }
              persistState(next)
              pushAudit('Policy activated')
              goNext()
            }}
          >
            Activate policy
          </button>
        </div>
      </>
    ),
    claims: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">FNOL chatbot</div>
            <div className="hint">Structured intake</div>
          </div>
          <div className="phone-card-body">
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-blue-lt text-blue">Location: {demoDefaults.location}</span>
              <span className="badge bg-indigo-lt text-indigo">Time: 29 Jan 2026, 08:42</span>
            </div>
            <div>
              <div className="text-muted">Incident</div>
              <strong>Rear-end collision</strong>
            </div>
            <div>
              <div className="text-muted">Driver status</div>
              <strong>No injuries</strong>
            </div>
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              const next = { ...demoState, claimSubmitted: true, slaRunning: true }
              persistState(next)
              pushAudit('FNOL submitted')
              goNext()
            }}
          >
            Submit FNOL
          </button>
        </div>
      </>
    ),
    chat: (
      <>
        <div className="phone-card">
          <div className="phone-card-header">
            <div className="title">Chat with insurer</div>
            <div className="hint">HITL enabled</div>
          </div>
          <div className="phone-card-body">
            <div className="phone-chat">
              {chatLog.map((msg) => (
                <div key={msg.id} className={`phone-bubble ${msg.from === 'driver' ? 'driver' : 'insurer'}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="phone-quick-replies">
              {['Book repair', 'Prefer payout', 'Need a call'].map((reply) => (
                <button key={reply} type="button" className="phone-chip" onClick={() => addChatMessage(reply)}>
                  {reply}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="phone-cta-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              const next = { ...demoState, handlerAssigned: true }
              persistState(next)
              pushAudit('Handler assigned')
              goNext()
            }}
          >
            Finish demo
          </button>
        </div>
      </>
    )
  }

  const auditDisplay = auditLog.length === 0 ? [{ id: 'seed', label: 'No events yet', time: '—' }] : auditLog

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">Driver demo</div>
                <h2 className="page-title">{step.label}</h2>
                <div className="text-muted">{step.subtitle}</div>
              </div>
              <div className="col-auto ms-auto">
                <div className="btn-list">
                  <button type="button" className="btn btn-outline-primary" onClick={goBack}>
                    Back
                  </button>
                  <button type="button" className="btn btn-primary" onClick={goNext}>
                    {stepIndex === STEP_META.length - 1 ? 'Finish demo' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="demo-shell">
            <div className="demo-driver">
              <div className="phone-frame">
                <div className="phone-statusbar">
                  <span>09:41</span>
                  <span>LTE · 88%</span>
                </div>
                <div className="phone-appbar">
                  <div className="phone-appbar-title">
                    <strong>{step.label}</strong>
                    <span>{step.subtitle}</span>
                  </div>
                  <span className="badge bg-blue-lt text-blue">{stepIndex + 1}/8</span>
                </div>
                <div className="phone-body">{stepCards[step.id]}</div>
              </div>
            </div>

            <aside className="demo-admin">
              <button
                type="button"
                className="btn btn-outline-primary admin-collapse"
                aria-expanded={adminOpen}
                onClick={() => setAdminOpen((prev) => !prev)}
              >
                {adminOpen ? 'Hide admin view' : 'Show admin view'}
              </button>
              <div className="demo-admin-inner">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Step navigation</h3>
                  </div>
                  <div className="list-group list-group-flush">
                    {STEP_META.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between ${item.id === step.id ? 'active' : ''}`}
                        onClick={() => handleJump(item.id)}
                      >
                        <span>{item.label}</span>
                        <span className="badge bg-blue-lt text-blue">{item.short}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">AI & HITL</h3>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled m-0 d-grid gap-2">
                      {aiHints[step.id].map((hint) => (
                        <li key={hint} className="d-flex align-items-center gap-2">
                          <span className="badge bg-orange-lt text-orange">AI</span>
                          <span>{hint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <h3 className="card-title mb-0">Audit log</h3>
                      <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => {
                        clearAudit()
                        setAuditLog([])
                      }}>
                        Clear
                      </button>
                    </div>
                  </div>
                  <div className="card-body d-grid gap-2">
                    {auditDisplay.map((entry) => (
                      <div key={entry.id} className="d-flex align-items-center justify-content-between">
                        <span>{entry.label}</span>
                        <span className="text-muted">{entry.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Snapshot</h3>
                  </div>
                  <div className="card-body d-flex flex-wrap gap-2">
                    {snapshotBadges.map((badge) => (
                      <span
                        key={badge.label}
                        className={`badge ${badge.active ? `bg-${badge.tone}-lt text-${badge.tone}` : 'bg-gray-lt text-muted'}`}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
