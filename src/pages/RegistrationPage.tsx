import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Header from '@/components/ui/Header'
import { useI18n } from '@/i18n/I18nContext'

const STORAGE_KEY = 'cf_registration_draft'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Step = 'name' | 'email' | 'phone' | 'role' | 'privacy' | 'summary'

type BotMessage = {
  id: string
  author: 'bot'
  key: string
  vars?: Record<string, string>
  timestamp: number
}

type UserMessage = {
  id: string
  author: 'user'
  text: string
  timestamp: number
}

type ChatMessage = BotMessage | UserMessage

type Answers = {
  name?: string
  email?: string
  phone?: string
  role?: string
  privacyConsent?: boolean
}

type RegistrationState = {
  messages: ChatMessage[]
  step: Step
  answers: Answers
  isTyping: boolean
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
  | { type: 'RESET'; payload: RegistrationState }

const initialState: RegistrationState = {
  messages: [],
  step: 'name',
  answers: {},
  isTyping: false,
  blocked: false,
  completed: false
}

function isBrowser() {
  return typeof window !== 'undefined'
}

function createBotMessage(key: string, vars?: Record<string, string>): BotMessage {
  return {
    id: `bot-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    author: 'bot',
    key,
    vars,
    timestamp: Date.now()
  }
}

function createUserMessage(text: string): UserMessage {
  return {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    author: 'user',
    text,
    timestamp: Date.now()
  }
}

function registrationReducer(state: RegistrationState, action: Action): RegistrationState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] }
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload }
    case 'SET_STEP':
      return { ...state, step: action.payload }
    case 'SET_ANSWERS':
      return { ...state, answers: { ...state.answers, ...action.payload } }
    case 'SET_BLOCKED':
      return { ...state, blocked: action.payload }
    case 'SET_COMPLETED':
      return { ...state, completed: action.payload }
    case 'RESET':
      return action.payload
    default:
      return state
  }
}

function loadInitialState(): RegistrationState {
  if (!isBrowser()) {
    return initialState
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return initialState
    const parsed = JSON.parse(stored) as RegistrationState
    return {
      ...initialState,
      ...parsed,
      isTyping: false
    }
  } catch {
    return initialState
  }
}

export default function RegistrationPage() {
  const [state, dispatch] = useReducer(registrationReducer, undefined, loadInitialState)
  const [inputValue, setInputValue] = useState('')
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const timeoutsRef = useRef<number[]>([])
  const navigate = useNavigate()
  const { t } = useI18n()

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id))
      timeoutsRef.current = []
    }
  }, [])

  useEffect(() => {
    if (!isBrowser()) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [state.messages.length, state.isTyping])

  useEffect(() => {
    if (!state.messages.length && !state.isTyping) {
      queueBotMessages([
        { key: 'registration.bot.welcome' },
        { key: 'registration.bot.name' }
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.messages.length, state.isTyping])

  function queueBotMessages(items: Array<{ key: string; vars?: Record<string, string> }>) {
    if (!items.length) return
    dispatch({ type: 'SET_TYPING', payload: true })
    let delay = 0
    items.forEach((item, index) => {
      delay += 350 + Math.floor(Math.random() * 350)
      const timeoutId = window.setTimeout(() => {
        dispatch({ type: 'ADD_MESSAGE', payload: createBotMessage(item.key, item.vars) })
        if (index === items.length - 1) {
          dispatch({ type: 'SET_TYPING', payload: false })
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
    if (state.isTyping || state.blocked || state.completed) return
    const trimmed = value.trim()
    if (!trimmed) return
    dispatch({ type: 'ADD_MESSAGE', payload: createUserMessage(trimmed) })
    setInputValue('')
    processUserResponse(trimmed)
  }

  function processUserResponse(rawValue: string) {
    const trimmed = rawValue.trim()
    const normalized = trimmed.toLowerCase()

    switch (state.step) {
      case 'name': {
        if (trimmed.length < 3) {
          queueBotMessages([{ key: 'registration.bot.name' }])
          return
        }
        dispatch({ type: 'SET_ANSWERS', payload: { name: trimmed } })
        dispatch({ type: 'SET_STEP', payload: 'email' })
        queueBotMessages([{ key: 'registration.bot.email' }])
        return
      }
      case 'email': {
        if (!EMAIL_REGEX.test(trimmed)) {
          queueBotMessages([{ key: 'registration.bot.emailInvalid' }])
          return
        }
        dispatch({ type: 'SET_ANSWERS', payload: { email: trimmed } })
        dispatch({ type: 'SET_STEP', payload: 'phone' })
        queueBotMessages([{ key: 'registration.bot.phone' }])
        return
      }
      case 'phone': {
        const skipCommands = ['skip', 'überspringen', 'ueberspringen', 'auslassen']
        if (skipCommands.includes(normalized)) {
          dispatch({ type: 'SET_ANSWERS', payload: { phone: undefined } })
          dispatch({ type: 'SET_STEP', payload: 'role' })
          queueBotMessages([
            { key: 'registration.bot.skip' },
            { key: 'registration.bot.role' },
            { key: 'registration.bot.roleCustomer' },
            { key: 'registration.bot.rolePartner' },
            { key: 'registration.bot.roleInternal' }
          ])
          return
        }
        if (trimmed.length < 5) {
          queueBotMessages([{ key: 'registration.bot.phone' }])
          return
        }
        dispatch({ type: 'SET_ANSWERS', payload: { phone: trimmed } })
        dispatch({ type: 'SET_STEP', payload: 'role' })
        queueBotMessages([
          { key: 'registration.bot.role' },
          { key: 'registration.bot.roleCustomer' },
          { key: 'registration.bot.rolePartner' },
          { key: 'registration.bot.roleInternal' }
        ])
        return
      }
      case 'role': {
        if (trimmed.length < 3) {
          queueBotMessages([{ key: 'registration.bot.role' }])
          return
        }
        dispatch({ type: 'SET_ANSWERS', payload: { role: trimmed } })
        dispatch({ type: 'SET_STEP', payload: 'privacy' })
        queueBotMessages([{ key: 'registration.bot.privacy' }])
        return
      }
      case 'privacy': {
        const positive = ['yes', 'y', 'ja', 'j', 'ok', 'okay', 'accept', 'zustimme', 'zustimmen']
        const negative = ['no', 'n', 'nein']
        if (positive.includes(normalized)) {
          dispatch({ type: 'SET_ANSWERS', payload: { privacyConsent: true } })
          dispatch({ type: 'SET_BLOCKED', payload: false })
          dispatch({ type: 'SET_STEP', payload: 'summary' })
          queueBotMessages([
            { key: 'registration.bot.privacyYes' },
            {
              key: 'registration.bot.summary',
              vars: {
                name: state.answers.name ?? '–',
                email: state.answers.email ?? '–',
                phone: state.answers.phone ?? '–',
                role: state.answers.role ?? '–'
              }
            }
          ])
          return
        }
        if (negative.includes(normalized)) {
          dispatch({ type: 'SET_ANSWERS', payload: { privacyConsent: false } })
          dispatch({ type: 'SET_BLOCKED', payload: true })
          queueBotMessages([
            { key: 'registration.bot.privacyNo' },
            { key: 'registration.bot.privacyNoStop' }
          ])
          return
        }
        queueBotMessages([{ key: 'registration.bot.privacy' }])
        return
      }
      case 'summary': {
        const submitCommands = ['submit', 'abschicken', 'registrierung abschicken', t('registration.bot.submit').toLowerCase()]
        const editCommands = ['edit', 'bearbeiten', t('registration.bot.edit').toLowerCase()]
        if (submitCommands.includes(normalized)) {
          dispatch({ type: 'SET_COMPLETED', payload: true })
          queueBotMessages([{ key: 'registration.bot.success' }])
          return
        }
        if (editCommands.includes(normalized)) {
          dispatch({ type: 'SET_COMPLETED', payload: false })
          dispatch({ type: 'SET_STEP', payload: 'name' })
          queueBotMessages([{ key: 'registration.bot.name' }])
          return
        }
        queueBotMessages([{ key: 'registration.bot.summary', vars: {
          name: state.answers.name ?? '–',
          email: state.answers.email ?? '–',
          phone: state.answers.phone ?? '–',
          role: state.answers.role ?? '–'
        } }])
        return
      }
      default:
        return
    }
  }

  function handleRestart() {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id))
    timeoutsRef.current = []
    if (isBrowser()) {
      window.localStorage.removeItem(STORAGE_KEY)
    }
    setInputValue('')
    dispatch({ type: 'RESET', payload: initialState })
  }

  const inputDisabled = state.isTyping || state.blocked || state.completed
  const placeholder = state.blocked
    ? t('registration.bot.privacyNoStop')
    : t('registration.inputPlaceholder')

  return (
    <section className="page" style={{ gap: '1.5rem' }}>
      <Header
        title={t('registration.title')}
        subtitle={t('registration.subtitle')}
        actions={
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button variant="secondary" onClick={() => navigate('/roles')}>
              {t('registration.back')}
            </Button>
            <Button variant="secondary" onClick={handleRestart}>
              {t('registration.restart')}
            </Button>
          </div>
        }
      />
      <Card>
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
              {message.author === 'bot' ? t(message.key, message.vars) : message.text}
            </div>
          ))}
          {state.isTyping && (
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
            placeholder={placeholder}
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
            {t('registration.send')}
          </Button>
        </form>
        {state.step === 'summary' && !state.completed && !state.blocked && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button variant="secondary" type="button" onClick={() => sendUserInput(t('registration.bot.submit'))}>
              {t('registration.bot.submit')}
            </Button>
            <Button variant="secondary" type="button" onClick={() => sendUserInput(t('registration.bot.edit'))}>
              {t('registration.bot.edit')}
            </Button>
          </div>
        )}
        {state.completed && (
          <div style={{ marginTop: '1rem' }}>
            <Button onClick={() => navigate('/roles')}>{t('registration.back')}</Button>
          </div>
        )}
      </Card>
    </section>
  )
}
