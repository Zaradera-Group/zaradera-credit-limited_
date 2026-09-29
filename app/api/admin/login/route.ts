import { NextResponse } from 'next/server'
import { createAdminSession, verifyPassword } from '@/lib/admin-auth'
import { adminLoginSchema } from '@/lib/validation'

export async function POST(request: Request) { const parsed = adminLoginSchema.safeParse(await request.json().catch(() => null)); if (!parsed.success || parsed.data.email !== process.env.ADMIN_EMAIL || !verifyPassword(parsed.data.password)) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 }); await createAdminSession(); return NextResponse.json({ ok: true }) }
