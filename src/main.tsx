import { useEffect, useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import type { Session } from '@supabase/supabase-js'
import App from './App'
import { AuthPage } from './pages/AuthPage'
import { supabase, supabaseConfigurationError } from './lib/supabase'
import './index.css'

function metadataText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function AppRoot() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(Boolean(supabase))
  const [recoveryMode, setRecoveryMode] = useState(false)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    if (!supabase) return

    let active = true
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (!active) return
      setSession(nextSession)
      setAuthError('')
      if (event === 'PASSWORD_RECOVERY') setRecoveryMode(true)
      if (event === 'SIGNED_OUT') setRecoveryMode(false)
    })

    void supabase.auth.getSession()
      .then(({ data, error }) => {
        if (!active) return
        if (error) {
          setAuthError(error.message)
        } else {
          setSession(data.session)
        }
        setLoading(false)
      })
      .catch((error: unknown) => {
        if (!active) return
        setAuthError(error instanceof Error ? error.message : 'Your session could not be restored.')
        setLoading(false)
      })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  if (supabaseConfigurationError || !supabase) {
    return (
      <main className="auth-shell">
        <section className="auth-card config-card">
          <div className="auth-brand"><div className="brand-mark" aria-hidden="true">✦</div><div><strong>ASCENSION</strong><span>AI LABS</span></div></div>
          <p className="auth-eyebrow">ONE LAST SETUP STEP</p>
          <h1>Connect your Supabase project</h1>
          <p className="auth-description">{supabaseConfigurationError}</p>
          <ol className="config-steps">
            <li>Create a Supabase project and run the SQL migration in <code>supabase/migrations</code>.</li>
            <li>Copy <code>.env.example</code> to <code>.env.local</code> and add your project URL and public anon key.</li>
            <li>Restart the development server with <code>npm run dev</code>.</li>
          </ol>
          <p className="auth-footnote">Never use a service-role key in this browser app. Gemini keys belong in a trusted server environment.</p>
        </section>
      </main>
    )
  }

  const client = supabase

  if (loading) {
    return <main className="auth-shell"><section className="auth-card auth-loading" role="status">Loading your secure session…</section></main>
  }

  if (!session || recoveryMode) {
    return (
      <>
        {authError && <div className="auth-global-error" role="alert">{authError}</div>}
        <AuthPage
          client={client}
          recoveryMode={recoveryMode}
          onPasswordUpdated={() => setRecoveryMode(false)}
        />
      </>
    )
  }

  const user = session.user
  const fullName = metadataText(user.user_metadata.full_name)
  const workspaceName = metadataText(user.user_metadata.workspace_name)

  return (
    <>
      {authError && <div className="auth-global-error" role="alert">{authError}</div>}
      <App
        email={user.email ?? ''}
        fullName={fullName}
        workspaceName={workspaceName}
        onSignOut={async () => {
          setAuthError('')
          const { error } = await client.auth.signOut()
          if (error) setAuthError(error.message)
        }}
      />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>,
)
