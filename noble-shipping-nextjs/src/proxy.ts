import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isApiRoute = req.nextUrl.pathname.startsWith('/api/')

    // Check if user is active (if active status is available in token)
    // Note: We might need to add active status to token in auth.ts if not present

    // Admin-only routes
    const isAdminRoute =
      req.nextUrl.pathname.startsWith('/admin/users') ||
      req.nextUrl.pathname.startsWith('/api/admin/users')

    if (isAdminRoute && !token?.roles?.includes('Admin')) {
      if (isApiRoute) {
        return NextResponse.json(
          { success: false, error: 'Permission denied: Admin access required' },
          { status: 403 }
        )
      }
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect /admin routes and /api/admin routes
        if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/api/admin')) {
          // Check if authenticated
          if (!token) return false

          // Check for roles (Admin or Staff)
          const hasRole = token.roles?.includes('Admin') || token.roles?.includes('Staff')
          return !!hasRole
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
}