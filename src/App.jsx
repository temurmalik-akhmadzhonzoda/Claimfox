import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/auth/AuthProvider'
import { I18nProvider } from '@/i18n/I18nContext'
import AppRouter from '@/router/AppRouter'

export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </I18nProvider>
  )
}
