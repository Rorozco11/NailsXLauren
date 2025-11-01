import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Check if accessing adminpage
  if (request.nextUrl.pathname.startsWith('/adminpage')) {
    const adminSession = request.cookies.get('admin_session')?.value
    
    // Debug logging
    console.log('[Middleware] Admin page access:', {
      pathname: request.nextUrl.pathname,
      hasCookie: !!adminSession,
      cookieValue: adminSession ? 'present' : 'missing',
      allCookies: request.cookies.getAll().map(c => c.name)
    })
    
    if (!adminSession) {
      // No session, redirect to home
      console.log('[Middleware] No admin session, redirecting to home')
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}