import postgres from 'postgres'
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin-auth'
import { deletePostSchema, postSchema, validationMessage } from '@/lib/validation'

function databaseError(error: unknown) {
  const detail = error instanceof Error ? error.message : String(error)
  const code = typeof error === 'object' && error !== null && 'code' in error ? String(error.code) : ''
  console.error('CMS database operation failed', { code, detail })
  if (code === '23505' || detail.includes('duplicate key')) return 'That slug is already used by another post. Please choose a different slug.'
  if (code === '28P01' || /authentication|password authentication|ECIRCUITBREAKER/i.test(detail)) return 'Supabase rejected the database login. Confirm the Transaction Pooler username and password in DATABASE_URL, then redeploy.'
  if (/ENOTFOUND|getaddrinfo|ECONNREFUSED|ETIMEDOUT|fetch failed/i.test(detail)) return 'The Supabase database host could not be reached. Use the complete Transaction Pooler connection string, including its pooler host and port 6543.'
  if (code === '42P01' || (detail.includes('blog_posts') && detail.includes('does not exist'))) return 'The blog database table does not exist. Run database/blog-cms.sql in the Supabase SQL Editor.'
  if (code === '42703') return 'The blog database structure is outdated. Run the latest database/blog-cms.sql setup in Supabase.'
  if (code === '22007' || code === '22008') return 'The publication date is invalid. Choose a valid date and time, then try again.'
  if (/certificate|SSL|TLS/i.test(detail)) return 'The secure database connection failed. Copy a fresh Transaction Pooler DATABASE_URL from Supabase and redeploy.'
  return 'The post could not be saved. Please check the database connection and try again.'
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Your admin session has expired. Please sign in again.' }, { status: 401 })
  const form = await request.formData()
  const parsed = postSchema.safeParse(Object.fromEntries(form))
  if (!parsed.success) return NextResponse.json({ error: validationMessage(parsed.error) }, { status: 400 })
  const url = process.env.DATABASE_URL
  if (!url) return NextResponse.json({ error: 'The database connection is not configured.' }, { status: 503 })
  const { id, title, slug, excerpt, content, category, author, coverImage: cover, status, publishedAt: published } = parsed.data
  let sql: ReturnType<typeof postgres> | null = null
  try {
    sql = postgres(url, { max: 1, prepare: false })
    if (id) await sql`update blog_posts set title=${title},slug=${slug},excerpt=${excerpt},content=${content},category=${category},author=${author},cover_image=${cover},status=${status},published_at=${status === 'published' ? (published || new Date().toISOString()) : null},updated_at=now() where id=${id}`
    else await sql`insert into blog_posts(title,slug,excerpt,content,category,author,cover_image,status,published_at) values(${title},${slug},${excerpt},${content},${category},${author},${cover},${status},${status === 'published' ? (published || new Date().toISOString()) : null})`
  } catch (error) { return NextResponse.json({ error: databaseError(error) }, { status: 500 }) }
  finally { if (sql) await sql.end() }
  revalidateTag('blog-posts', 'max'); revalidatePath('/blog'); revalidatePath('/'); revalidatePath('/admin/posts')
  return NextResponse.json({ ok: true })
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Your admin session has expired.' }, { status: 401 })
  const parsed = deletePostSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Unable to identify the post.' }, { status: 400 })
  const { id } = parsed.data
  const url = process.env.DATABASE_URL
  if (!url) return NextResponse.json({ error: 'The database connection is not configured.' }, { status: 503 })
  const sql = postgres(url, { max: 1, prepare: false })
  try { await sql`delete from blog_posts where id=${id}` }
  catch (error) { return NextResponse.json({ error: databaseError(error) }, { status: 500 }) }
  finally { await sql.end() }
  revalidateTag('blog-posts', 'max'); revalidatePath('/blog'); revalidatePath('/'); revalidatePath('/admin/posts')
  return NextResponse.json({ ok: true })
}
