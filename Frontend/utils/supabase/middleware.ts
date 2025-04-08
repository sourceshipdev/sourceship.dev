import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  try {
    let supabaseResponse = NextResponse.next({
      request,
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            request.cookies.set({
              name,
              value,
              ...options,
            })
            supabaseResponse.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name: string, options: any) {
            request.cookies.delete({
              name,
              ...options,
            })
            supabaseResponse.cookies.delete({
              name,
              ...options,
            })
          },
        },
      }
    )

    // Refresh session if it exists
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      console.error('Auth error:', error.message)
      return supabaseResponse
    }

    if (
      !session &&
      !request.nextUrl.pathname.startsWith('/login') &&
      !request.nextUrl.pathname.startsWith('/auth') &&
      !request.nextUrl.pathname.startsWith('/sign-up') &&
      !request.nextUrl.pathname.startsWith('/how-it-works') &&
      !request.nextUrl.pathname.startsWith('/blog') &&
      request.nextUrl.pathname !== '/'
    ) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    return supabaseResponse
  } catch (e) {
    // If there's an error, allow the request to continue but log the error
    console.error('Middleware error:', e)
    return NextResponse.next({
      request,
    })
  }
}