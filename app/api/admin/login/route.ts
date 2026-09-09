import { NextResponse } from 'next/server'
import { createAdminSession, verifyPassword } from '@/lib/admin-auth'

export async function POST(request: Request) { const body = await request.json().catch(() => null); if (!body || body.email !== process.env.ADMIN_EMAIL || typeof body.password !== 'string' || !verifyPassword(body.password)) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 }); await createAdminSession(); return NextResponse.json({ ok: true }) }
