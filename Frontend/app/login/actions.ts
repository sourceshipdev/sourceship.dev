'use server'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const headersList = headers()
  const host = headersList.get('host')
  // Use VERCEL_URL for production, fallback to host header
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : `${process?.env?.NODE_ENV === 'development' ? 'http' : 'https'}://${host}`

  const email = formData.get('email') as string

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${baseUrl}/auth/confirm`,
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
  // Use VERCEL_URL for production, fallback to host header
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : `${process?.env?.NODE_ENV === 'development' ? 'http' : 'https'}://${host}`

  const email = formData.get('email') as string

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${baseUrl}/auth/confirm`,
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
    message: 'Check your email for the link to complete your signup!'
  }
} 