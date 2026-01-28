import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import MobileShell from '@/pages/driver-demo/MobileShell'
import RegisterStep from '@/pages/driver-demo/RegisterStep'
import ProfileStep from '@/pages/driver-demo/ProfileStep'
import ClaimStep from '@/pages/driver-demo/ClaimStep'
import UploadStep from '@/pages/driver-demo/UploadStep'
import ChatStep from '@/pages/driver-demo/ChatStep'
import SummaryStep from '@/pages/driver-demo/SummaryStep'
import '@/styles/underwriter-premium.css'
import '@/styles/driver-demo.css'

type DriverDemoState = {
  authMethod: 'email' | 'phone'
  contact: string
  password: string
  agreed: boolean
  accountCreated: boolean
  profile: {
    fullName: string
    dob: string
    licensePlate: string
    vehicleType: string
    policyNumber: string
    insurer: string
  }
  profileSkipped: boolean
  claim: {
    claimType: string
    when: string
    location: string
    injured: string
    description: string
    claimId: string
  }
  uploads: {
    photos: boolean
    report: boolean
    license: boolean
  }
  chatLog: { id: string; from: 'driver' | 'insurer'; text: string }[]
}

const STEP_IDS = ['register', 'profile', 'claim', 'upload', 'chat', 'summary'] as const

const STEP_TITLES: Record<(typeof STEP_IDS)[number], string> = {
  register: 'Registration',
  profile: 'Profile',
  claim: 'Report claim',
  upload: 'Upload evidence',
  chat: 'Chat support',
  summary: 'Summary'
}

const INITIAL_CHAT = [
  { id: 'm1', from: 'driver' as const, text: 'Hi, I reported an accident. What’s next?' },
  { id: 'm2', from: 'insurer' as const, text: 'Thanks. Please confirm location and if vehicle is drivable.' },
  { id: 'm3', from: 'driver' as const, text: 'Vehicle drivable, location Munich.' },
  { id: 'm4', from: 'insurer' as const, text: 'We assigned handler. Next step: repair partner or payout options.' },
  { id: 'm5', from: 'insurer' as const, text: 'Would you like a repair appointment?' }
]

const createInitialState = (): DriverDemoState => ({
  authMethod: 'email',
  contact: '',
  password: '',
  agreed: false,
  accountCreated: false,
  profile: {
    fullName: '',
    dob: '',
    licensePlate: '',
    vehicleType: '',
    policyNumber: '',
    insurer: ''
  },
  profileSkipped: false,
  claim: {
    claimType: '',
    when: '',
    location: '',
    injured: '',
    description: '',
    claimId: 'CLM-10421'
  },
  uploads: {
    photos: false,
    report: false,
    license: false
  },
  chatLog: INITIAL_CHAT
})

export default function DemoDriverStepPage() {
  const { stepId } = useParams()
  const navigate = useNavigate()
  const [state, setState] = useState<DriverDemoState>(createInitialState)
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)
  const [claimSubmitted, setClaimSubmitted] = useState(false)
  const [lastUpload, setLastUpload] = useState<string | null>(null)
  const [queuedResponse, setQueuedResponse] = useState(false)

  const stepIndex = useMemo(
    () => STEP_IDS.findIndex((step) => step === stepId),
    [stepId]
  )

  useEffect(() => {
    setRegisterSuccess(false)
    setProfileSaved(false)
    setClaimSubmitted(false)
    setQueuedResponse(false)
    setLastUpload(null)
  }, [stepId])

  if (stepIndex === -1) {
    return <Navigate to="/demo-driver" replace />
  }

  const currentStep = STEP_IDS[stepIndex]
  const stepLabel = `Step ${stepIndex + 1} of ${STEP_IDS.length}`

  const goBack = () => {
    if (stepIndex === 0) {
      navigate('/demo-driver')
      return
    }
    navigate(`/demo-driver/step/${STEP_IDS[stepIndex - 1]}`)
  }

  const resetTransient = () => {
    setRegisterSuccess(false)
    setProfileSaved(false)
    setClaimSubmitted(false)
    setQueuedResponse(false)
    setLastUpload(null)
  }

  const handleRegister = () => {
    resetTransient()
    setRegisterSuccess(true)
    setState((prev) => ({ ...prev, accountCreated: true }))
    window.setTimeout(() => {
      navigate('/demo-driver/step/profile')
    }, 600)
  }

  const handleProfileSave = () => {
    resetTransient()
    setProfileSaved(true)
    setState((prev) => ({ ...prev, profileSkipped: false }))
    window.setTimeout(() => {
      navigate('/demo-driver/step/claim')
    }, 600)
  }

  const handleProfileSkip = () => {
    resetTransient()
    setState((prev) => ({ ...prev, profileSkipped: true }))
    navigate('/demo-driver/step/claim')
  }

  const handleClaim = () => {
    resetTransient()
    setClaimSubmitted(true)
    setState((prev) => ({
      ...prev,
      claim: {
        ...prev.claim,
        claimId: prev.claim.claimId || 'CLM-10421'
      }
    }))
    window.setTimeout(() => {
      navigate('/demo-driver/step/upload')
    }, 600)
  }

  const handleUploadNext = () => {
    resetTransient()
    navigate('/demo-driver/step/chat')
  }

  const handleQuickReply = (reply: string) => {
    setQueuedResponse(true)
    setState((prev) => ({
      ...prev,
      chatLog: [
        ...prev.chatLog,
        { id: `reply-${prev.chatLog.length + 1}`, from: 'driver', text: reply }
      ]
    }))
  }

  const handleFinish = () => {
    resetTransient()
    navigate('/demo-driver/step/summary')
  }

  const handleRestart = () => {
    resetTransient()
    setState(createInitialState())
    navigate('/demo-driver/step/register')
  }

  const primaryAction = (() => {
    switch (currentStep) {
      case 'register':
        return { label: 'Create account (demo)', onClick: handleRegister }
      case 'profile':
        return { label: 'Save profile (demo)', onClick: handleProfileSave }
      case 'claim':
        return { label: 'Start claim (demo)', onClick: handleClaim }
      case 'upload':
        return { label: 'Continue to chat', onClick: handleUploadNext }
      case 'chat':
        return { label: 'Finish demo', onClick: handleFinish }
      case 'summary':
        return { label: 'Restart driver demo', onClick: handleRestart }
      default:
        return { label: 'Continue', onClick: handleFinish }
    }
  })()

  return (
    <MobileShell
      title={STEP_TITLES[currentStep]}
      stepLabel={stepLabel}
      onBack={goBack}
      primaryAction={primaryAction}
    >
      {currentStep === 'register' && (
        <RegisterStep
          authMethod={state.authMethod}
          contact={state.contact}
          password={state.password}
          agreed={state.agreed}
          showSuccess={registerSuccess}
          onAuthMethodChange={(method) => setState((prev) => ({ ...prev, authMethod: method }))}
          onContactChange={(value) => setState((prev) => ({ ...prev, contact: value }))}
          onPasswordChange={(value) => setState((prev) => ({ ...prev, password: value }))}
          onAgreedChange={(value) => setState((prev) => ({ ...prev, agreed: value }))}
        />
      )}

      {currentStep === 'profile' && (
        <ProfileStep
          profile={state.profile}
          showSaved={profileSaved}
          onProfileChange={(updates) => setState((prev) => ({ ...prev, profile: { ...prev.profile, ...updates } }))}
          onSkip={handleProfileSkip}
        />
      )}

      {currentStep === 'claim' && (
        <ClaimStep
          claim={state.claim}
          showSubmitted={claimSubmitted}
          onClaimChange={(updates) => setState((prev) => ({ ...prev, claim: { ...prev.claim, ...updates } }))}
        />
      )}

      {currentStep === 'upload' && (
        <UploadStep
          uploads={state.uploads}
          lastUpload={lastUpload}
          onUploadChange={(updates) => {
            const label = updates.photos ? 'Photos of damage' : updates.report ? 'Police report' : 'Driver license'
            setLastUpload(label)
            setState((prev) => ({ ...prev, uploads: { ...prev.uploads, ...updates } }))
          }}
        />
      )}

      {currentStep === 'chat' && (
        <ChatStep
          chatLog={state.chatLog}
          queuedResponse={queuedResponse}
          onQuickReply={handleQuickReply}
        />
      )}

      {currentStep === 'summary' && (
        <SummaryStep
          profileSkipped={state.profileSkipped}
          claimId={state.claim.claimId}
          uploadsComplete={state.uploads.photos && state.uploads.report && state.uploads.license}
          onRestart={handleRestart}
        />
      )}
    </MobileShell>
  )
}
