import { NextRequest, NextResponse } from 'next/server'
import { createSession, COOKIE_NAME, SESSION_TTL } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  const { password } = await request.json().catch(() => ({ password: '' }))
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  const response = NextResponse.json({ success: true })
  response.cookies.set(COOKIE_NAME, createSession(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: SESSION_TTL, path: '/' })
  return response
}
