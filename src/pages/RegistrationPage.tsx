import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'

type Step = 'language' | 'fullName' | 'email' | 'phone' | 'roleType' | 'privacy' | 'summary'

type ChatMessage = {
  id: string
  author: 'bot' | 'user'
  text: string
  timestamp: number
}

type Answers = {
  language?: 'de' | 'en'
  fullName?: string
  email?: string
  phone?: string
  roleType?: string
  privacyConsent?: 'yes' | 'no'
}

type RegistrationState = {
  messages: ChatMessage[]
  currentStep: Step
  answers: Answers
  isBotTyping: boolean
  blocked: boolean
  completed: boolean
}

type Action =
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_STEP'; payload: Step }
  | { type: 'SET_ANSWERS'; payload: Partial<Answers> }
  | { type: 'SET_BLOCKED'; payload: boolean }
  | { type: 'SET_COMPLETED'; payload: boolean }
  | { type: 'RESET' }

const STORAGE_KEY = 'cf_registration_draft'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialState: RegistrationState = {
  messages: [],
  currentStep: 'language',
  answers: {},
  isBotTyping: false,
  blocked: false,
  completed: false
}

const START_SEQUENCE = [
  '👋 Willkommen bei Claimfox. Ich begleite dich Schritt für Schritt durch die Registrierung. Das dauert nur wenige Minuten.',
  '👋 Welcome to Claimfox. I’ll guide you step by step through the registration process. It only takes a few minutes.',
  'Bevor wir starten: Welche Sprache möchtest du verwenden?',
  'Before we begin: Which language would you like to use?'
]

const COPY = {
  de: {
    namePrompt: 'Wie lautet dein vollständiger Name?',
    emailPrompt:
      'Bitte gib deine E-Mail-Adresse an. Wir nutzen sie ausschließlich für die Registrierung und wichtige Informationen.',
    emailInvalid: 'Diese E-Mail-Adresse sieht leider nicht korrekt aus. Bitte prüfe sie noch einmal.',
    phonePrompt: 'Möchtest du zusätzlich eine Telefonnummer angeben? (optional – kann auch später ergänzt werden)',
    rolePrompt: 'Wofür möchtest du Claimfox nutzen?',
    privacyPrompt:
      'Bevor wir fortfahren, benötigen wir deine Zustimmung zu unserer Datenschutzerklärung. Deine Daten werden vertraulich behandelt.',
    privacyDeclined:
      'Ohne deine Zustimmung können wir die Registrierung leider nicht abschließen. Du kannst den Prozess jederzeit neu starten.',
    summary: (answers: Answers) =>
      `Perfekt 👍 Hier ist eine kurze Zusammenfassung deiner Angaben: Name: ${answers.fullName ?? '–'}, E-Mail: ${answers.email ?? '–'}, Telefon: ${answers.phone || '–'}, Rolle: ${answers.roleType ?? '–'}. Möchtest du die Registrierung jetzt abschicken?`,
    success: '🎉 Vielen Dank! Deine Registrierung wurde erfolgreich erfasst. Wir melden uns in Kürze bei dir.',
    restartNotice: 'Alles klar, wir starten den Prozess neu. Bitte sag mir zuerst, welche Sprache du verwenden möchtest.',
    editNotice: 'Kein Problem, wir können deine Angaben anpassen. Lass uns erneut mit deinem vollständigen Namen beginnen.',
    languageRetry: 'Bitte antworte mit „Deutsch“ oder „English“. / Please answer with "Deutsch" or "English".',
    yesOptions: ['ja', 'ja, ich stimme zu', 'j']
  },
  en: {
    namePrompt: 'What is your full name?',
    emailPrompt:
      'Please enter your email address. We’ll only use it for registration and important information.',
    emailInvalid: 'This email address doesn’t look quite right. Please check it again.',
    phonePrompt: 'Would you like to provide a phone number? (optional – can also be added later)',
    rolePrompt: 'What would you like to use Claimfox for?',
    privacyPrompt:
      'Before we continue, we need your consent to our privacy policy. Your data will be handled confidentially.',
    privacyDeclined:
      'Without your consent, we can’t complete the registration. You can restart the process at any time.',
    summary: (answers: Answers) =>
      `Great 👍 Here’s a short summary of your information: Name: ${answers.fullName ?? '–'}, Email: ${answers.email ?? '–'}, Phone: ${answers.phone || '–'}, Role: ${answers.roleType ?? '–'}. Would you like to submit your registration now?`,
    success: '🎉 Thank you! Your registration has been successfully recorded. We’ll get back to you shortly.',
    restartNotice: 'Got it, restarting the flow. Please tell me which language you would like to use.',
    editNotice: 'No worries, we can adjust your information. Let’s start again with your full name.',
    languageRetry: 'Bitte antworte mit „Deutsch“ oder „English“. / Please answer with "Deutsch" or "English".',
    yesOptions: ['yes', 'y', 'yeah']
  }
}

function registrationReducer(state: RegistrationState, action: Action): RegistrationState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] }
    case 'SET_TYPING':
      return { ...state, isBotTyping: action.payload }
    case 'SET_STEP':
      return { ...state, currentStep: action.payload }
    case 'SET_ANSWERS':
      return { ...state, answers: { ...state.answers, ...action.payload } }
    case 'SET_BLOCKED':
      return { ...state, blocked: action.payload }
    case 'SET_COMPLETED':
      return { ...state, completed: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

function createMessage(author: ChatMessage['author'], text: string): ChatMessage {
  return {
    id: `${author}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    author,
    text,
    timestamp: Date.now()
  }
}

function loadInitialState(): RegistrationState {
  if (typeof window === 'undefined') {
    return initialState
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return initialState
    const parsed = JSON.parse(stored) as RegistrationState
    return {
      ...initialState,
      ...parsed,
      isBotTyping: false
    }
  } catch {
    return initialState
  }
}

function RegistrationPage() {
  const [state, dispatch] = useReducer(registrationReducer, undefined, loadInitialState)
  const [inputValue, setInputValue] = useState('')
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const timeoutsRef = useRef<number[]>([])
  const navigate = useNavigate()

  const activeLanguage: 'de' | 'en' = state.answers.language ?? 'de'

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id))
      timeoutsRef.current = []
    }
  }, [])

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [state.messages.length, state.isBotTyping])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...state, isBotTyping: false })
    )
  }, [state])

  useEffect(() => {
    if (state.messages.length === 0 && !state.isBotTyping && state.currentStep === 'language') {
      queueBotMessages(START_SEQUENCE)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.messages.length, state.isBotTyping, state.currentStep])

  function queueBotMessages(texts: string[], onComplete?: () => void) {
    if (!texts.length) return
    dispatch({ type: 'SET_TYPING', payload: true })
    let delay = 0
    texts.forEach((text, index) => {
      const nextDelay = 300 + Math.floor(Math.random() * 300)
      delay += nextDelay
      const timeoutId = window.setTimeout(() => {
        dispatch({ type: 'ADD_MESSAGE', payload: createMessage('bot', text) })
        if (index === texts.length - 1) {
          dispatch({ type: 'SET_TYPING', payload: false })
          onComplete?.()
        }
      }, delay)
      timeoutsRef.current.push(timeoutId)
    })
  }

  function handleUserSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    sendUserInput(inputValue)
  }

  function sendUserInput(value: string) {
    if (state.isBotTyping || state.blocked || state.completed) {
      return
    }
    const trimmed = value.trim()
    if (!trimmed) {
      return
    }
    dispatch({ type: 'ADD_MESSAGE', payload: createMessage('user', trimmed) })
    setInputValue('')
    processUserResponse(trimmed)
  }

  function processUserResponse(rawValue: string) {
    const normalized = rawValue.trim().toLowerCase()

    switch (state.currentStep) {
      case 'language': {
        if (['de', 'deutsch', 'german', 'deutschland'].includes(normalized)) {
          dispatch({ type: 'SET_ANSWERS', payload: { language: 'de' } })
          dispatch({ type: 'SET_STEP', payload: 'fullName' })
          queueBotMessages([COPY.de.namePrompt])
          return
        }
        if (['en', 'english', 'englisch'].includes(normalized)) {
          dispatch({ type: 'SET_ANSWERS', payload: { language: 'en' } })
          dispatch({ type: 'SET_STEP', payload: 'fullName' })
          queueBotMessages([COPY.en.namePrompt])
          return
        }
        queueBotMessages([COPY.de.languageRetry])
        return
      }
      case 'fullName': {
        if (rawValue.trim().length < 3) {
          queueBotMessages([
            state.answers.language === 'en'
              ? 'Please share your full name so I can personalize the process.'
              : 'Bitte teile mir deinen vollständigen Namen mit, damit ich dich richtig ansprechen kann.'
          ])
          return
        }
        dispatch({ type: 'SET_ANSWERS', payload: { fullName: rawValue.trim() } })
        dispatch({ type: 'SET_STEP', payload: 'email' })
        queueBotMessages([COPY[activeLanguage].emailPrompt])
        return
      }
      case 'email': {
        if (!EMAIL_REGEX.test(rawValue.trim())) {
          queueBotMessages([COPY[activeLanguage].emailInvalid])
          return
        }
        dispatch({ type: 'SET_ANSWERS', payload: { email: rawValue.trim() } })
        dispatch({ type: 'SET_STEP', payload: 'phone' })
        queueBotMessages([COPY[activeLanguage].phonePrompt])
        return
      }
      case 'phone': {
        const skipWords = ['skip', 'überspringen', 'ueberspringen']
        const phoneValue = skipWords.includes(normalized) ? undefined : rawValue.trim()
        if (phoneValue && phoneValue.length < 5) {
          queueBotMessages([
            activeLanguage === 'en'
              ? 'That number looks quite short. Please share a full phone number or type "Skip".'
              : 'Diese Nummer ist sehr kurz. Bitte gib eine vollständige Telefonnummer an oder schreibe „Überspringen“.'
          ])
          return
        }
        dispatch({ type: 'SET_ANSWERS', payload: { phone: phoneValue } })
        dispatch({ type: 'SET_STEP', payload: 'roleType' })
        queueBotMessages([COPY[activeLanguage].rolePrompt])
        return
      }
      case 'roleType': {
        if (rawValue.trim().length < 3) {
          queueBotMessages([
            activeLanguage === 'en'
              ? 'Give me a quick hint about how you plan to use Claimfox.'
              : 'Gib mir bitte kurz an, wofür du Claimfox nutzen möchtest.'
          ])
          return
        }
        dispatch({ type: 'SET_ANSWERS', payload: { roleType: rawValue.trim() } })
        dispatch({ type: 'SET_STEP', payload: 'privacy' })
        queueBotMessages([COPY[activeLanguage].privacyPrompt])
        return
      }
      case 'privacy': {
        const yesList = [...COPY[activeLanguage].yesOptions, 'ja, ich stimme zu']
        if (yesList.includes(normalized)) {
          const updatedAnswers = { ...state.answers, privacyConsent: 'yes' as const }
          dispatch({ type: 'SET_ANSWERS', payload: { privacyConsent: 'yes' } })
          dispatch({ type: 'SET_STEP', payload: 'summary' })
          dispatch({ type: 'SET_BLOCKED', payload: false })
          queueBotMessages([COPY[activeLanguage].summary(updatedAnswers)])
          return
        }
        if (['no', 'nein', 'n'].includes(normalized)) {
          dispatch({ type: 'SET_ANSWERS', payload: { privacyConsent: 'no' } })
          dispatch({ type: 'SET_BLOCKED', payload: true })
          queueBotMessages([COPY[activeLanguage].privacyDeclined])
          return
        }
        queueBotMessages([
          activeLanguage === 'en'
            ? 'Please answer with Yes or No.'
            : 'Bitte antworte mit Ja oder Nein.'
        ])
        return
      }
      case 'summary': {
        const positiveOptions = [
          'registrierung abschicken',
          'abschicken',
          'ja',
          'yes',
          'submit',
          'ok'
        ]
        const editOptions = ['edit', 'bearbeiten', 'änderung', 'ändern']
        if (positiveOptions.includes(normalized)) {
          dispatch({ type: 'SET_COMPLETED', payload: true })
          queueBotMessages([COPY[activeLanguage].success])
          return
        }
        if (editOptions.includes(normalized)) {
          dispatch({ type: 'SET_STEP', payload: 'fullName' })
          queueBotMessages([
            activeLanguage === 'en' ? COPY.en.editNotice : COPY.de.editNotice,
            COPY[activeLanguage].namePrompt
          ])
          return
        }
        queueBotMessages([
          activeLanguage === 'en'
            ? 'Please type “Registrierung abschicken” or “Edit”.'
            : 'Bitte antworte mit „Registrierung abschicken“ oder „Edit“.'
        ])
        return
      }
      default:
        return
    }
  }

  function handleRestart() {
    const previousLanguage: 'de' | 'en' = state.answers.language ?? 'de'
    dispatch({ type: 'RESET' })
    setInputValue('')
    timeoutsRef.current.forEach((id) => window.clearTimeout(id))
    timeoutsRef.current = []
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
    }
    queueBotMessages([
      previousLanguage === 'en' ? COPY.en.restartNotice : COPY.de.restartNotice
    ])
  }

  const inputDisabled = state.isBotTyping || state.blocked || state.completed
  const placeholder =
    activeLanguage === 'en' ? 'Type your reply...' : 'Nachricht eingeben...'

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <Header
        title="Registrierungsassistent"
        subtitle="Unser KI-Bot begleitet dich durch alle Schritte der Registrierung und speichert deinen Fortschritt lokal."
        actions={
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button variant="secondary" onClick={() => navigate('/roles')}>
              Zurück zur Übersicht
            </Button>
            <Button variant="secondary" onClick={handleRestart}>
              Neu starten
            </Button>
          </div>
        }
      />
      <Card title="Dein Chat mit Claimfox" subtitle="Alle Eingaben bleiben lokal gespeichert (Draft).">
        <div
          ref={chatContainerRef}
          style={{
            background: '#f8f8ff',
            borderRadius: '18px',
            padding: '1.25rem',
            minHeight: '420px',
            maxHeight: '420px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}
        >
          {state.messages.map((message) => (
            <div
              key={message.id}
              style={{
                alignSelf: message.author === 'user' ? 'flex-end' : 'flex-start',
                background:
                  message.author === 'user'
                    ? 'linear-gradient(135deg, #5b2d8b, #ee6a7c)'
                    : '#ffffff',
                color: message.author === 'user' ? '#fff' : '#0e0d1c',
                padding: '0.85rem 1.1rem',
                borderRadius:
                  message.author === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                boxShadow: '0 12px 25px rgba(8, 4, 50, 0.08)',
                whiteSpace: 'pre-line',
                maxWidth: '80%'
              }}
            >
              {message.text}
            </div>
          ))}
          {state.isBotTyping && (
            <div
              style={{
                alignSelf: 'flex-start',
                background: '#ffffff',
                color: '#0e0d1c',
                padding: '0.85rem 1.1rem',
                borderRadius: '18px 18px 18px 4px',
                boxShadow: '0 12px 25px rgba(8, 4, 50, 0.08)',
                display: 'flex',
                gap: '0.35rem'
              }}
            >
              <span style={{ animation: 'chatPulse 1.2s infinite', opacity: 0.8 }}>•</span>
              <span style={{ animation: 'chatPulse 1.2s infinite 0.2s', opacity: 0.8 }}>•</span>
              <span style={{ animation: 'chatPulse 1.2s infinite 0.4s', opacity: 0.8 }}>•</span>
            </div>
          )}
        </div>
        <form
          onSubmit={handleUserSubmit}
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={
              state.blocked
                ? activeLanguage === 'en'
                  ? 'Consent required – please restart'
                  : 'Datenschutz benötigt – bitte neu starten'
                : placeholder
            }
            disabled={inputDisabled}
            style={{
              flex: 1,
              minWidth: '240px',
              borderRadius: '999px',
              border: '1px solid #d6d6f2',
              padding: '0.85rem 1.1rem',
              fontSize: '1rem'
            }}
          />
          <Button type="submit" disabled={inputDisabled}>
            {activeLanguage === 'en' ? 'Send' : 'Senden'}
          </Button>
        </form>
        {state.currentStep === 'summary' && !state.completed && !state.blocked && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button
              variant="secondary"
              type="button"
              onClick={() => sendUserInput('Registrierung abschicken')}
            >
              Registrierung abschicken
            </Button>
            <Button variant="secondary" type="button" onClick={() => sendUserInput('Edit')}>
              Edit
            </Button>
          </div>
        )}
        {state.completed && (
          <div style={{ marginTop: '1rem' }}>
            <Button onClick={() => navigate('/roles')}>Zur Übersicht</Button>
          </div>
        )}
      </Card>
    </section>
  )
}

export default RegistrationPage
