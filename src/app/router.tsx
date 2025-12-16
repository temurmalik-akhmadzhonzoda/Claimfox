import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './AppShell'
import ProtectedRoute from '../auth/ProtectedRoute'
import DashboardPage from '../features/dashboard/DashboardPage'
import ProductsPage from '../features/products/ProductsPage'
import ProductDetailPage from '../features/products/ProductDetailPage'
import DamagesPage from '../features/damages/DamagesPage'
import ClaimDetailPage from '../features/damages/ClaimDetailPage'
import DamageReportPage from '../features/damages/DamageReportPage'
import ProfilePage from '../features/profile/ProfilePage'
import StubPage from '../features/stubs/StubPage'
import LoginPage from '../features/auth/LoginPage'

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/my-profile" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="damages" element={<DamagesPage />} />
        <Route path="damages/:id" element={<ClaimDetailPage />} />
        <Route path="damage-report" element={<DamageReportPage />} />
        <Route path="my-profile" element={<ProfilePage />} />
        <Route path="my-company" element={<StubPage title="My Company" />} />
        <Route path="my-fleet" element={<StubPage title="My Fleet" />} />
        <Route path="my-insurance" element={<StubPage title="My Insurance" />} />
        <Route path="my-locations" element={<StubPage title="My Locations" />} />
        <Route path="my-reporting" element={<StubPage title="My Reporting" />} />
        <Route path="get-a-quote" element={<StubPage title="Get a quote" />} />
        <Route path="presentations" element={<StubPage title="Presentations" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
