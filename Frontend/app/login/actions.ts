'use server'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const headersList = headers()
  const host = headersList.get('host')
  const protocol = process?.env?.NODE_ENV === 'development' ? 'http' : 'https'

  const email = formData.get('email') as string

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${protocol}://${host}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { 
    success: true,
    message: 'Check your email for the link!'
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const headersList = headers()
  const host = headersList.get('host')
  const protocol = process?.env?.NODE_ENV === 'development' ? 'http' : 'https'

  const email = formData.get('email') as string

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${protocol}://${host}/auth/callback`,
      data: {
        source: 'signup'
      }
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { 
    success: true,
    message: 'Check your email for the magic link to complete your signup!'
  }
} 