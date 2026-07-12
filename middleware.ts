import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.includes('/auth/signin') || 
                       req.nextUrl.pathname.includes('/auth/error')

    // If trying to access auth pages while logged in, redirect to dashboard
    if (isAuth && isAuthPage) {
      const lang = req.nextUrl.pathname.split('/')[1] || 'fa'
      return NextResponse.redirect(new URL(`/${lang}/dashboard`, req.url))
    }

    // If trying to access protected pages while not logged in, redirect to signin
    if (!isAuth && !isAuthPage) {
      const lang = req.nextUrl.pathname.split('/')[1] || 'fa'
      const signinUrl = new URL(`/${lang}/auth/signin`, req.url)
      signinUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
      return NextResponse.redirect(signinUrl)
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    '/:lang/dashboard/:path*',
    '/:lang/studio/:path*',
    '/:lang/gallery/:path*',
    '/:lang/api/generations/:path*',
  ],
}
