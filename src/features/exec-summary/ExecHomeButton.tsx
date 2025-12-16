import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import './execHomeButton.css'

const ALLOWED_PREFIXES = ['/exec-summary', '/exec-detailed', '/fleet-report']
const HIDDEN_PREFIXES = [
  '/exec-login',
  '/exec-select',
  '/chat',
  '/claim',
  '/login',
  '/vehicle',
  '/vehicles',
  '/template',
  '/templates'
]

export default function ExecHomeButton() {
  const { isLoggedIn } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location.pathname

  const isOnAllowedRoute = ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  const isExplicitlyHidden = HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))

  if (!isLoggedIn || !isOnAllowedRoute || isExplicitlyHidden) {
    return null
  }

  function handleClick() {
    if (pathname.startsWith('/exec-select')) {
      navigate('/profile')
      return
    }
    navigate('/exec-select')
  }

  return (
    <button type="button" className="exec-home-button" onClick={handleClick} aria-label="Exec Home">
      <span className="sr-only">Exec Home</span>
      <svg
        className="exec-home-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 10L12 3l9 7v9.5a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 19.5V10z" />
        <path d="M9.5 21V13h5v8" />
      </svg>
    </button>
  )
}
