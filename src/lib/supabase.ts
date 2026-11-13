import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

export const supabaseConfigurationError = (() => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return 'Supabase is not configured. Add the project URL and anon key to .env.local.'
  }

  try {
    const url = new URL(supabaseUrl)
    const isLocalhost = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)
    if (url.protocol !== 'https:' && !isLocalhost) {
      return 'The Supabase URL must use HTTPS (localhost is allowed for development).'
    }
  } catch {
    return 'The Supabase project URL is invalid.'
  }

  return null
})()

export const supabase =
  !supabaseConfigurationError && supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: true,
          detectSessionInUrl: true,
          persistSession: true,
        },
      })
    : null
