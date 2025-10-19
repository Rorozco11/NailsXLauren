// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // only protect pages under /adminpage
  if (!pathname.startsWith('/adminpage')) return NextResponse.next();

  const token = req.cookies.get('nxla_admin')?.value;
  if (!token) {
    // redirect to home (or to a public /admin-login page)
    const url = req.nextUrl.clone();
    url.pathname = '/'; // or '/admin-login'
    return NextResponse.redirect(url);
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
}

// apply middleware to routes starting with /adminpage
export const config = {
  matcher: ['/adminpage/:path*'],
};
