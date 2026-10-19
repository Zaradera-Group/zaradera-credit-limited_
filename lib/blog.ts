import 'server-only'
import postgres from 'postgres'
import { unstable_cache } from 'next/cache'

export type Post = { id: string; title: string; slug: string; excerpt: string; content: string; coverImage: string; category: string; status: 'draft' | 'published'; author: string; publishedAt: string | null; createdAt: string; updatedAt: string }

let database: ReturnType<typeof postgres> | null | undefined
function db() {
  if (database !== undefined) return database
  const url = process.env.DATABASE_URL
  if (!url) return (database = null)
  try {
    database = postgres(url, { max: 2, prepare: false, idle_timeout: 20, connect_timeout: 10, max_lifetime: 60 * 30 })
  } catch {
    database = null
  }
  return database
}
function map(row: Record<string, unknown>): Post { return { id: String(row.id), title: String(row.title), slug: String(row.slug), excerpt: String(row.excerpt), content: String(row.content), coverImage: String(row.cover_image || ''), category: String(row.category), status: row.status as Post['status'], author: String(row.author), publishedAt: row.published_at ? new Date(row.published_at as string).toISOString() : null, createdAt: new Date(row.created_at as string).toISOString(), updatedAt: new Date(row.updated_at as string).toISOString() } }

async function queryPosts({ category, page = 1, limit = 9, includeDrafts = false }: { category?: string; page?: number; limit?: number; includeDrafts?: boolean } = {}) {
  const sql = db(); if (!sql) return { posts: [] as Post[], total: 0 }
  try { const offset = Math.max(0, page - 1) * limit; const rows = includeDrafts ? await sql`select *, count(*) over()::int as total from blog_posts order by created_at desc limit ${limit} offset ${offset}` : category ? await sql`select *, count(*) over()::int as total from blog_posts where status='published' and published_at <= now() and category=${category} order by published_at desc limit ${limit} offset ${offset}` : await sql`select *, count(*) over()::int as total from blog_posts where status='published' and published_at <= now() order by published_at desc limit ${limit} offset ${offset}`; return { posts: rows.map(map), total: Number(rows[0]?.total || 0) } } catch { return { posts: [] as Post[], total: 0 } }
}
export async function getPosts(options: { category?: string; page?: number; limit?: number; includeDrafts?: boolean } = {}) {
  if (options.includeDrafts) return queryPosts(options)
  const key = JSON.stringify({ category: options.category || '', page: options.page || 1, limit: options.limit || 9 })
  return unstable_cache(() => queryPosts(options), ['blog-posts', key], { revalidate: 60, tags: ['blog-posts'] })()
}
export async function getPost(slug: string) {
  return unstable_cache(async () => { const sql = db(); if (!sql) return null; try { const rows = await sql`select * from blog_posts where slug=${slug} and status='published' and published_at <= now() limit 1`; return rows[0] ? map(rows[0]) : null } catch { return null } }, ['blog-post', slug], { revalidate: 60, tags: ['blog-posts'] })()
}
export async function getPostById(id: string) { const sql = db(); if (!sql) return null; try { const rows = await sql`select * from blog_posts where id=${id} limit 1`; return rows[0] ? map(rows[0]) : null } catch { return null } }
export async function getCategories() {
  return unstable_cache(async () => { const sql = db(); if (!sql) return []; try { const rows = await sql`select distinct category from blog_posts where status='published' order by category`; return rows.map(r => String(r.category)) } catch { return [] } }, ['blog-categories'], { revalidate: 300, tags: ['blog-posts'] })()
}

export function contentHtml(markdown: string, coverImage = '') {
  // Force every uploaded image onto its own content block, even when it was
  // inserted at a cursor beside existing text.
  const normalized = markdown
    .replace(/\r\n?/g, '\n')
    .replace(/(!\[[^\]]*\]\(https?:\/\/[^\s)]+\))/g, '\n\n$1\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  const safe = normalized.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

  const images: { alt: string; src: string }[] = []
  const content = safe.split(/\n{2,}/).map(block => {
    const image = block.trim().match(/^!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)$/)
    if (image) {
      if (!images.some(item => item.src === image[2])) images.push({ alt: image[1], src: image[2] })
      return ''
    }
    if (block.startsWith('### ')) return `<h3>${block.slice(4)}</h3>`
    if (block.startsWith('## ')) return `<h2>${block.slice(3)}</h2>`
    if (block.startsWith('# ')) return `<h2>${block.slice(2)}</h2>`
    if (block.split('\n').every(line => line.startsWith('- '))) return `<ul>${block.split('\n').map(line => `<li>${line.slice(2)}</li>`).join('')}</ul>`
    return `<p>${block.replace(/\n/g, '<br>')}</p>`
  }).join('')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // The negative lookbehind prevents image syntax from becoming a link if
    // an invalid image URL is ever entered manually.
    .replace(/(?<!!)\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  // The cover belongs to the blog listing/card and must never be repeated in
  // the article gallery, even if it was also pasted into the content field.
  const safeCover = coverImage.trim().replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const galleryImages = images.filter(image => !safeCover || image.src !== safeCover)
  const layout = galleryImages.length > 4 ? 'many' : String(galleryImages.length)
  const gallery = galleryImages.length
    ? `<div class="blog-image-gallery blog-image-gallery--${layout}">${galleryImages.map(image => `<figure><img src="${image.src}" alt="${image.alt}" loading="lazy" decoding="async"></figure>`).join('')}</div>`
    : ''

  return content + gallery
}
