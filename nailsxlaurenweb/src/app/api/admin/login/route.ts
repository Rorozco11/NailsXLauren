// app/api/admin/login/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '10h';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

export async function POST(req: Request) {
  const { password } = await req.json();

  if (!password || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, message: 'Invalid password' }, { status: 401 });
  }

  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);

  const cookie = serialize('nxla_admin', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60, // 1 hour (update to match JWT_EXPIRES_IN if you want)
  });

  const res = NextResponse.json({ ok: true });
  res.headers.set('Set-Cookie', cookie);
  return res;
}
