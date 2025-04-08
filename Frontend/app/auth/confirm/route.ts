import { type EmailOtpType } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null
  const error = requestUrl.searchParams.get('error')
  const error_description = requestUrl.searchParams.get('error_description')

  if (error) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.hash = new URLSearchParams({
      error,
      error_description: error_description || 'Authentication failed'
    }).toString()
    return NextResponse.redirect(loginUrl)
  }

  if (token_hash && type) {
    const supabase = await createClient()

    const { error: verifyError } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    
    if (!verifyError) {
      // Successful verification - redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Handle verification error
    const loginUrl = new URL('/login', request.url)
    loginUrl.hash = new URLSearchParams({
      error: 'verification_failed',
      error_description: verifyError.message
    }).toString()
    return NextResponse.redirect(loginUrl)
  }

  // If no token_hash or type, redirect to login
  return NextResponse.redirect(new URL('/login', request.url))
}