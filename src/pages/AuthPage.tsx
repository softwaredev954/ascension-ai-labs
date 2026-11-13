import { useState, type FormEvent } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'

type AuthMode = 'sign-in' | 'sign-up' | 'forgot-password' | 'update-password'

interface AuthPageProps {
  client: SupabaseClient
  recoveryMode: boolean
  onPasswordUpdated: () => void
}

export function AuthPage({ client, recoveryMode, onPasswordUpdated }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>('sign-in')
  const [fullName, setFullName] = useState('')
  const [workspaceName, setWorkspaceName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const currentMode = recoveryMode ? 'update-password' : mode
  const titles: Record<AuthMode, string> = {
    'sign-in': 'Welcome back',
    'sign-up': 'Create your workspace',
    'forgot-password': 'Reset your password',
    'update-password': 'Choose a new password',
  }

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode)
    setMessage('')
    setError('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    setError('')

    if ((currentMode === 'sign-up' || currentMode === 'update-password') && password.length < 8) {
      setError('Use a password with at least 8 characters.')
      return
    }

    if (currentMode === 'sign-up' && password !== confirmPassword) {
      setError('The passwords do not match.')
      return
    }

    setBusy(true)
    try {
      if (currentMode === 'sign-in') {
        const { error: authError } = await client.auth.signInWithPassword({ email, password })
        if (authError) throw authError
      } else if (currentMode === 'sign-up') {
        const { data, error: authError } = await client.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              full_name: fullName.trim(),
              workspace_name: workspaceName.trim(),
            },
          },
        })
        if (authError) throw authError
        if (!data.session) {
          setMessage('Check your email to confirm your account, then sign in to your new workspace.')
        }
      } else if (currentMode === 'forgot-password') {
        const { error: authError } = await client.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        })
        if (authError) throw authError
        setMessage('If an account exists for that email, a password reset link is on its way.')
      } else {
        const { error: authError } = await client.auth.updateUser({ password })
        if (authError) throw authError
        onPasswordUpdated()
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'The request could not be completed. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-brand">
          <div className="brand-mark" aria-hidden="true">✦</div>
          <div><strong>ASCENSION</strong><span>AI LABS</span></div>
        </div>
        <p className="auth-eyebrow">YOUR BUSINESS, IN GOOD HANDS</p>
        <h1 id="auth-title">{titles[currentMode]}</h1>
        <p className="auth-description">
          {currentMode === 'sign-up'
            ? 'Start with a private workspace for your business.'
            : currentMode === 'forgot-password' || currentMode === 'update-password'
              ? 'We’ll help you securely get back into your account.'
              : 'Sign in to manage your AI business assistant.'}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {currentMode === 'sign-up' && (
            <>
              <label>
                Your name
                <input autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} required maxLength={100} />
              </label>
              <label>
                Business name
                <input autoComplete="organization" value={workspaceName} onChange={(event) => setWorkspaceName(event.target.value)} required minLength={2} maxLength={80} />
              </label>
            </>
          )}

          {currentMode !== 'update-password' && (
            <label>
              Email address
              <input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
          )}

          {currentMode !== 'forgot-password' && (
            <label>
              {currentMode === 'update-password' ? 'New password' : 'Password'}
              <input
                type="password"
                autoComplete={currentMode === 'sign-in' ? 'current-password' : 'new-password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={currentMode === 'sign-in' ? undefined : 8}
              />
            </label>
          )}

          {currentMode === 'sign-up' && (
            <label>
              Confirm password
              <input type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required minLength={8} />
            </label>
          )}

          {currentMode === 'sign-in' && (
            <button type="button" className="auth-link forgot-link" onClick={() => changeMode('forgot-password')}>
              Forgot password?
            </button>
          )}

          {error && <p className="auth-message auth-error" role="alert">{error}</p>}
          {message && <p className="auth-message auth-success" role="status">{message}</p>}

          <button className="auth-submit" type="submit" disabled={busy}>
            {busy ? 'Please wait…' : currentMode === 'sign-in' ? 'Sign in' : currentMode === 'sign-up' ? 'Create account' : currentMode === 'forgot-password' ? 'Send reset link' : 'Update password'}
          </button>
        </form>

        {!recoveryMode && currentMode !== 'forgot-password' && (
          <p className="auth-switch">
            {currentMode === 'sign-in' ? 'New to Ascension AI Labs?' : 'Already have an account?'}{' '}
            <button className="auth-link" onClick={() => changeMode(currentMode === 'sign-in' ? 'sign-up' : 'sign-in')}>
              {currentMode === 'sign-in' ? 'Create an account' : 'Sign in'}
            </button>
          </p>
        )}
        {currentMode === 'forgot-password' && (
          <p className="auth-switch"><button className="auth-link" onClick={() => changeMode('sign-in')}>Back to sign in</button></p>
        )}
      </section>
    </main>
  )
}
