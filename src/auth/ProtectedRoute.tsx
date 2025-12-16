import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

type ProtectedRouteProps = {
  children: JSX.Element
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn } = useAuth()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
