import { createClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
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

  if (code) {
    const supabase = await createClient()
    
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!exchangeError) {
      // Always redirect to dashboard after successful authentication
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    const loginUrl = new URL('/login', request.url)
    loginUrl.hash = new URLSearchParams({
      error: 'exchange_failed',
      error_description: exchangeError.message
    }).toString()
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.redirect(new URL('/login', request.url))
} 