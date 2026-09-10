import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin-auth'

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await request.formData()
  const file = data.get('file')
  if (!(file instanceof File) || !file.type.startsWith('image/') || file.size > 8_000_000) {
    return NextResponse.json({ error: 'Choose an image smaller than 8 MB.' }, { status: 400 })
  }

  const configuredUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!configuredUrl) return NextResponse.json({ error: 'The Supabase project URL is missing. Add SUPABASE_URL in Netlify and redeploy.' }, { status: 503 })
  if (!key) return NextResponse.json({ error: 'The Supabase server key is not available to this deployed function. Add SUPABASE_SECRET_KEY (recommended) or SUPABASE_SERVICE_ROLE_KEY to this Netlify site’s Production context, then redeploy.' }, { status: 503 })

  let base: string
  try {
    const url = new URL(configuredUrl.trim())
    if (url.protocol !== 'https:') throw new Error('Invalid protocol')
    base = url.origin
  } catch {
    return NextResponse.json({ error: 'The configured Supabase project URL is invalid. It must look like https://PROJECT_REF.supabase.co.' }, { status: 503 })
  }

  const ext = file.name.split('.').pop()?.replace(/[^a-z0-9]/gi, '').toLowerCase() || 'webp'
  const path = `blog/${crypto.randomUUID()}.${ext}`
  try {
    const response = await fetch(`${base}/storage/v1/object/blog-media/${path}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key.trim()}`, apikey: key.trim(), 'Content-Type': file.type, 'x-upsert': 'false' },
      body: file,
    })
    if (!response.ok) {
      const detail = await response.text()
      console.error('Supabase blog image upload failed', response.status, detail)
      if (response.status === 401 || response.status === 403) return NextResponse.json({ error: 'Supabase rejected the Storage key. Confirm that SUPABASE_SECRET_KEY contains a secret key or SUPABASE_SERVICE_ROLE_KEY contains the legacy service-role key, then redeploy.' }, { status: 502 })
      if (response.status === 404 || /bucket not found/i.test(detail)) return NextResponse.json({ error: 'The Supabase Storage bucket “blog-media” was not found. Create it and make it public.' }, { status: 502 })
      return NextResponse.json({ error: 'Supabase could not store this image. Check the function log for the response from Storage.' }, { status: 502 })
    }
  } catch (error) {
    console.error('Supabase blog image upload request failed', error)
    return NextResponse.json({ error: 'The website could not reach Supabase Storage. Confirm the project URL and try again.' }, { status: 502 })
  }

  return NextResponse.json({ url: `${base}/storage/v1/object/public/blog-media/${path}` })
}
