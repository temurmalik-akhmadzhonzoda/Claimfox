import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import HomePage from '@/pages/HomePage'
import RegistrationPage from '@/pages/RegistrationPage'
import RolesPage from '@/pages/RolesPage'
import BrokerPortalLandingPage from '@/pages/BrokerPortalLandingPage'
import ProtectedRoute from '@/router/ProtectedRoute'
import ProtectedLayout from '@/layouts/ProtectedLayout'
import { useAuth } from '@/features/auth/AuthContext'
import BrokerCrmPage from '@/pages/BrokerCrmPage'
import FleetReportingPage from '@/pages/FleetReportingPage'
import FleetManagementPage from '@/pages/FleetManagementPage'
import MarketingLandingPage from '@/pages/MarketingLandingPage'
import ClaimManagerMarketingPage from '@/pages/ClaimManagerMarketingPage'
import ClaimManagerPage from '@/pages/ClaimManagerPage'

function NotFoundRedirect() {
  const { isAuthenticated } = useAuth()
  return <Navigate to={isAuthenticated ? '/roles' : '/home'} replace />
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/broker-portal" element={<BrokerPortalLandingPage />} />
        <Route path="/marketing" element={<MarketingLandingPage />} />
        <Route path="/broker-crm" element={<BrokerCrmPage />} />
        <Route path="/fleet-reporting" element={<FleetReportingPage />} />
        <Route path="/fleet-management" element={<FleetManagementPage />} />
        <Route path="/claim-manager" element={<ClaimManagerMarketingPage />} />
        <Route path="/claim-manager-app" element={<ClaimManagerPage />} />
      </Route>
      <Route path="*" element={<NotFoundRedirect />} />
    </Routes>
  )
}
