import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import ProtectedRoute from '../auth/ProtectedRoute'
import LoginPage from '../features/auth/LoginPage'
import ProfilePage from '../features/profile/ProfilePage'
import StubPage from '../features/stubs/StubPage'

const stub = (title: string) => <StubPage title={title} />

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/exec-login" replace />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="profile" element={<Navigate to="/my-profile" replace />} />

        <Route
          path="chat"
          element={<ProtectedRoute>{stub('Chat')}</ProtectedRoute>}
        />
        <Route
          path="templates"
          element={<ProtectedRoute>{stub('Templates')}</ProtectedRoute>}
        />
        <Route
          path="vehicles"
          element={<ProtectedRoute>{stub('Vehicles')}</ProtectedRoute>}
        />

        <Route path="my-fleet" element={stub('My Fleet')} />
        <Route path="exec-login" element={stub('Executive Login')} />
        <Route path="exec-select" element={stub('Executive Select')} />
        <Route path="exec-summary" element={stub('Executive Summary')} />
        <Route path="exec-detailed" element={stub('Executive Detailed')} />
        <Route path="exec-pitch" element={stub('Executive Pitch')} />
        <Route path="fleet-report" element={stub('Fleet Report')} />
        <Route path="my-profile" element={<ProfilePage />} />
        <Route path="profile-details" element={stub('Profile Details')} />
        <Route path="company" element={stub('Company')} />
        <Route path="insurances" element={stub('Insurances')} />
        <Route path="locations" element={stub('Locations')} />
        <Route path="get-quote" element={stub('Get Quote')} />

        <Route path="*" element={<Navigate to="/exec-login" replace />} />
      </Route>
    </Routes>
  )
}
