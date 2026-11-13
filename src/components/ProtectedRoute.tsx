import { Navigate, Route, Routes } from 'react-router-dom'
import { type AuthSession, supabase } from '../lib/supabase'
import { AuthPage } from '../pages/AuthPage'
import { DashboardPage } from '../pages/DashboardPage'

interface ProtectedRouteProps {
  authenticated: boolean
  session: AuthSession
  loading: boolean
  children: JSX.Element
}

export function ProtectedRoute({ authenticated, session, loading, children }: ProtectedRouteProps) {
  if (loading) {
    return <div className="status-shell"><div className="status-card"><div className="spinner" aria-label="Loading page" /><p>Loading your workspace…</p></div></div>
  }

  if (!authenticated || !session) {
    return <Navigate to="/auth" replace />
  }

  return children
}

interface AppRoutesProps {
  loading: boolean
  session: AuthSession
}

export function AppRoutes({ loading, session }: AppRoutesProps) {
  const authenticated = Boolean(session)

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute authenticated={authenticated} session={session} loading={loading}>
            <DashboardPage session={session} />
          </ProtectedRoute>
        }
      />
      <Route path="/auth" element={authenticated ? <Navigate to="/" replace /> : <AuthPage />} />
      <Route path="*" element={<Navigate to={authenticated ? '/' : '/auth'} replace />} />
    </Routes>
  )
}

export function AppAuthStateNotice() {
  if (supabase) {
    return null
  }

  return (
    <div className="auth-warning">
      Add your Supabase credentials in <strong>.env.local</strong> to enable login and protected routes.
    </div>
  )
}
