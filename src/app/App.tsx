import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/features/auth/AuthContext'
import AppRouter from '@/router/AppRouter'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-shell">
          <main className="app-main">
            <AppRouter />
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
