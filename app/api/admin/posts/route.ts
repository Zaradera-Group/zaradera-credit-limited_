import postgres from 'postgres'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin-auth'

function clean(value: FormDataEntryValue | null, max = 10000) { return String(value || '').trim().slice(0, max) }
function databaseError(error: unknown) {
  const detail = error instanceof Error ? error.message : ''
  if (detail.includes('duplicate key')) return 'That slug is already used by another post. Please choose a different slug.'
  if (detail.includes('authentication') || detail.includes('ECIRCUITBREAKER')) return 'Supabase rejected the database login. Check DATABASE_URL and wait a few minutes if the connection was temporarily blocked.'
  if (detail.includes('ENOTFOUND') || detail.includes('getaddrinfo')) return 'The Supabase database host could not be reached. Use the complete Transaction Pooler connection string, including its pooler host and port 6543.'
  if (detail.includes('blog_posts') && detail.includes('does not exist')) return 'The blog database table does not exist. Run database/blog-cms.sql in the Supabase SQL Editor.'
  return 'The post could not be saved. Please check the database connection and try again.'
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Your admin session has expired. Please sign in again.' }, { status: 401 })
  const form = await request.formData()
  const url = process.env.DATABASE_URL
  if (!url) return NextResponse.json({ error: 'The database connection is not configured.' }, { status: 503 })
  const id = clean(form.get('id'), 100)
  const title = clean(form.get('title'), 180)
  const slug = clean(form.get('slug'), 180).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const excerpt = clean(form.get('excerpt'), 500)
  const content = clean(form.get('content'), 100000)
  const category = clean(form.get('category'), 80)
  const author = clean(form.get('author'), 100)
  const cover = clean(form.get('coverImage'), 1000)
  const status = clean(form.get('status')) === 'published' ? 'published' : 'draft'
  const missing = [[title, 'Title'], [slug, 'Slug'], [excerpt, 'Excerpt'], [content, 'Content'], [category, 'Category'], [author, 'Author']].filter(([value]) => !value).map(([, label]) => label)
  if (missing.length) return NextResponse.json({ error: `Complete the following required ${missing.length === 1 ? 'field' : 'fields'}: ${missing.join(', ')}.` }, { status: 400 })
  const published = clean(form.get('publishedAt'), 50)
  let sql: ReturnType<typeof postgres> | null = null
  try {
    sql = postgres(url, { max: 1, prepare: false })
    if (id) await sql`update blog_posts set title=${title},slug=${slug},excerpt=${excerpt},content=${content},category=${category},author=${author},cover_image=${cover},status=${status},published_at=${status === 'published' ? (published || new Date().toISOString()) : null},updated_at=now() where id=${id}`
    else await sql`insert into blog_posts(title,slug,excerpt,content,category,author,cover_image,status,published_at) values(${title},${slug},${excerpt},${content},${category},${author},${cover},${status},${status === 'published' ? (published || new Date().toISOString()) : null})`
  } catch (error) { return NextResponse.json({ error: databaseError(error) }, { status: 500 }) }
  finally { if (sql) await sql.end() }
  revalidatePath('/blog'); revalidatePath('/'); revalidatePath('/admin/posts')
  return NextResponse.json({ ok: true })
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Your admin session has expired.' }, { status: 401 })
  const { id } = await request.json().catch(() => ({ id: '' }))
  const url = process.env.DATABASE_URL
  if (!url || typeof id !== 'string' || !id) return NextResponse.json({ error: 'Unable to identify the post.' }, { status: 400 })
  const sql = postgres(url, { max: 1, prepare: false })
  try { await sql`delete from blog_posts where id=${id}` }
  catch (error) { return NextResponse.json({ error: databaseError(error) }, { status: 500 }) }
  finally { await sql.end() }
  revalidatePath('/blog'); revalidatePath('/'); revalidatePath('/admin/posts')
  return NextResponse.json({ ok: true })
}
