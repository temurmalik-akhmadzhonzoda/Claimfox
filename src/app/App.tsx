import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/features/auth/AuthContext'
import AppRouter from '@/router/AppRouter'
import { I18nProvider } from '@/i18n/I18nContext'

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
