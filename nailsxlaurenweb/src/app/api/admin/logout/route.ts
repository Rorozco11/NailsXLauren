// app/api/admin/logout/route.ts
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  const cookie = serialize('nxla_admin', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: -1,
  });

  const res = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
  res.headers.set('Set-Cookie', cookie);
  return res;
}
