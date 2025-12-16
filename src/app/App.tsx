import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import { AuthProvider } from '../auth/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  )
}
