import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })

    // Refresh session if expired
    await supabase.auth.getSession()

    // List of public routes that don't require authentication
    const publicRoutes = ['/', '/login', '/auth/confirm', '/how-it-works', '/blog']
    const isPublicRoute = publicRoutes.some(route => 
      request.nextUrl.pathname === route || 
      request.nextUrl.pathname.startsWith(route + '/')
    )

    const { data: { session } } = await supabase.auth.getSession()

    // If user is not authenticated and trying to access a protected route, redirect to login
    if (!session && !isPublicRoute) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return res
  } catch (e) {
    // Handle any errors
    console.error('Middleware error:', e)
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}