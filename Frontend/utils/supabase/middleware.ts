import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  try {
    // Create initial response
    const response = NextResponse.next({
      request,
    })

    // Check if required environment variables are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables')
      return response
    }

    // Create supabase client with simplified cookie handling
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) {
            try {
              return request.cookies.get(name)?.value
            } catch (error) {
              console.error('Cookie get error:', error)
              return undefined
            }
          },
          set(name: string, value: string, options: any) {
            try {
              response.cookies.set({
                name,
                value,
                ...options,
              })
            } catch (error) {
              console.error('Cookie set error:', error)
            }
          },
          remove(name: string, options: any) {
            try {
              response.cookies.delete({
                name,
                ...options,
              })
            } catch (error) {
              console.error('Cookie remove error:', error)
            }
          },
        },
      }
    )

    try {
      // Attempt to get session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      if (sessionError) {
        console.error('Session error:', sessionError.message)
        return response
      }

      // List of public routes that don't require authentication
      const publicRoutes = [
        '/login',
        '/auth',
        '/sign-up',
        '/how-it-works',
        '/blog',
        '/'
      ]

      // Check if current path is public
      const isPublicRoute = publicRoutes.some(route => 
        request.nextUrl.pathname === route || 
        request.nextUrl.pathname.startsWith(route + '/')
      )

      // Redirect to login if not authenticated and not on a public route
      if (!session && !isPublicRoute) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
      }

      return response
    } catch (error) {
      console.error('Auth check error:', error)
      return response
    }
  } catch (error) {
    console.error('Middleware error:', error)
    // Return a basic response in case of critical error
    return NextResponse.next({
      request,
    })
  }
}