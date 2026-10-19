import 'server-only'
import postgres from 'postgres'

export type Post = { id: string; title: string; slug: string; excerpt: string; content: string; coverImage: string; category: string; status: 'draft' | 'published'; author: string; publishedAt: string | null; createdAt: string; updatedAt: string }

function db() { const url = process.env.DATABASE_URL; if (!url) return null; try { return postgres(url, { max: 2, prepare: false }) } catch { return null } }
function map(row: Record<string, unknown>): Post { return { id: String(row.id), title: String(row.title), slug: String(row.slug), excerpt: String(row.excerpt), content: String(row.content), coverImage: String(row.cover_image || ''), category: String(row.category), status: row.status as Post['status'], author: String(row.author), publishedAt: row.published_at ? new Date(row.published_at as string).toISOString() : null, createdAt: new Date(row.created_at as string).toISOString(), updatedAt: new Date(row.updated_at as string).toISOString() } }

export async function getPosts({ category, page = 1, limit = 9, includeDrafts = false }: { category?: string; page?: number; limit?: number; includeDrafts?: boolean } = {}) {
  const sql = db(); if (!sql) return { posts: [] as Post[], total: 0 }
  try { const offset = Math.max(0, page - 1) * limit; const rows = includeDrafts ? await sql`select *, count(*) over()::int as total from blog_posts order by created_at desc limit ${limit} offset ${offset}` : category ? await sql`select *, count(*) over()::int as total from blog_posts where status='published' and published_at <= now() and category=${category} order by published_at desc limit ${limit} offset ${offset}` : await sql`select *, count(*) over()::int as total from blog_posts where status='published' and published_at <= now() order by published_at desc limit ${limit} offset ${offset}`; return { posts: rows.map(map), total: Number(rows[0]?.total || 0) } } catch { return { posts: [] as Post[], total: 0 } } finally { await sql.end() }
}
export async function getPost(slug: string) { const sql = db(); if (!sql) return null; try { const rows = await sql`select * from blog_posts where slug=${slug} and status='published' and published_at <= now() limit 1`; return rows[0] ? map(rows[0]) : null } catch { return null } finally { await sql.end() } }
export async function getPostById(id: string) { const sql = db(); if (!sql) return null; try { const rows = await sql`select * from blog_posts where id=${id} limit 1`; return rows[0] ? map(rows[0]) : null } finally { await sql.end() } }
export async function getCategories() { const sql = db(); if (!sql) return []; try { const rows = await sql`select distinct category from blog_posts where status='published' order by category`; return rows.map(r => String(r.category)) } catch { return [] } finally { await sql.end() } }

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
    ? `<div class="blog-image-gallery blog-image-gallery--${layout}">${galleryImages.map((image, index) => `<figure><img src="${image.src}" alt="${image.alt}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async"></figure>`).join('')}</div>`
    : ''

  return content + gallery
}
