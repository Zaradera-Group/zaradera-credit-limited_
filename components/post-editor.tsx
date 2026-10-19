'use client'

import { useRef, useState } from 'react'
import { Link2 } from 'lucide-react'
import type { Post } from '@/lib/blog'

export function PostEditorFields({ post, pending = false }: { post?: Post | null; pending?: boolean }) {
  const [slug, setSlug] = useState(post?.slug || '')
  const [cover, setCover] = useState(post?.coverImage || '')
  const [content, setContent] = useState(post?.content || '')
  const [coverUploading, setCoverUploading] = useState(false)
  const [inlineUploading, setInlineUploading] = useState(false)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const input = 'rounded-xl border bg-white px-4 py-3'

  async function uploadFile(file: File) {
    const data = new FormData()
    data.set('file', file)
    const response = await fetch('/api/admin/upload', { method: 'POST', body: data })
    const body = await response.json()
    if (!response.ok) throw new Error(body.error || 'Upload failed.')
    return String(body.url)
  }

  async function uploadCover(file?: File) {
    if (!file) return
    setCoverUploading(true)
    try { setCover(await uploadFile(file)) } catch (error) { alert(error instanceof Error ? error.message : 'Upload failed.') } finally { setCoverUploading(false) }
  }

  async function uploadInlineImages(files: FileList | null) {
    if (!files?.length) return
    setInlineUploading(true)
    try {
      const urls = await Promise.all(Array.from(files).map(async file => ({ url: await uploadFile(file), alt: file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ') })))
      const snippet = urls.map(image => `![${image.alt}](${image.url})`).join('\n\n')
      const cursor = contentRef.current?.selectionStart ?? content.length
      setContent(value => `${value.slice(0, cursor)}${cursor > 0 ? '\n\n' : ''}${snippet}\n\n${value.slice(cursor)}`)
    } catch (error) { alert(error instanceof Error ? error.message : 'One or more images could not be uploaded.') } finally { setInlineUploading(false) }
  }

  function insertLink() {
    const textarea = contentRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.slice(start, end).trim()
    const url = window.prompt('Paste the complete website address, beginning with https://')
    if (!url) return

    try {
      const parsed = new URL(url.trim())
      if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('Unsupported protocol')
      const label = selectedText || window.prompt('Enter the text viewers should click:', 'Read the full story')?.trim()
      if (!label) return
      const markdown = `[${label.replace(/[\[\]]/g, '')}](${parsed.toString()})`
      setContent(value => `${value.slice(0, start)}${markdown}${value.slice(end)}`)
      window.requestAnimationFrame(() => {
        textarea.focus()
        textarea.setSelectionRange(start + markdown.length, start + markdown.length)
      })
    } catch {
      window.alert('Please enter a valid website address beginning with https:// or http://.')
    }
  }

  return <>
    <input type="hidden" name="id" value={post?.id || ''} />
    <label className="grid gap-2 font-semibold">Title<input name="title" required defaultValue={post?.title} className={input} onChange={event => { if (!post) setSlug(event.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')) }} /></label>
    <label className="grid gap-2 font-semibold">Slug<input name="slug" required value={slug} onChange={event => setSlug(event.target.value)} className={input} /></label>
    <div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 font-semibold">Category<input name="category" required defaultValue={post?.category || 'News'} list="categories" className={input} /><datalist id="categories"><option>Activities</option><option>News</option><option>Announcements</option><option>CSR / Campaigns</option></datalist></label><label className="grid gap-2 font-semibold">Author<input name="author" required defaultValue={post?.author || 'Zaradera Credit Limited'} className={input} /></label></div>
    <label className="grid gap-2 font-semibold">Excerpt<textarea name="excerpt" required maxLength={500} rows={3} defaultValue={post?.excerpt} className={input} /></label>
    <label className="grid gap-2 font-semibold">Cover image URL<input name="coverImage" value={cover} onChange={event => setCover(event.target.value)} className={input} /><span className="text-xs font-normal text-muted-foreground">Paste a URL or upload an image below.</span></label>
    <label onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); void uploadCover(event.dataTransfer.files[0]) }} className="grid cursor-pointer place-items-center rounded-2xl border border-dashed border-navy/25 bg-white p-8 text-center"><span className="font-semibold">{coverUploading ? 'Uploading…' : 'Drop a cover image here or choose a file'}</span><input type="file" accept="image/*" disabled={coverUploading} className="mt-3 text-sm" onChange={event => void uploadCover(event.target.files?.[0])} /></label>
    {cover && <img src={cover} alt="Cover preview" className="max-h-56 rounded-2xl object-cover" />}
    <div className="grid gap-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label htmlFor="post-content" className="font-semibold">Content</label>
        <button type="button" onClick={insertLink} className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
          <Link2 className="size-4" aria-hidden="true" />
          Insert link
        </button>
      </div>
      <p className="text-xs leading-5 text-muted-foreground">Select words in the article, choose “Insert link”, then paste the complete news or website address.</p>
      <textarea id="post-content" ref={contentRef} name="content" required rows={18} value={content} onChange={event => setContent(event.target.value)} className={`${input} font-mono text-sm leading-6`} />
    </div>
    <label className="grid cursor-pointer place-items-center rounded-2xl border border-dashed border-orange/35 bg-orange/[.035] p-7 text-center"><span className="font-semibold text-navy">{inlineUploading ? 'Uploading article images…' : 'Add images inside this post'}</span><span className="mt-1 text-xs font-normal text-muted-foreground">Select one or multiple images. They will be inserted at the current position in the content.</span><input type="file" accept="image/*" multiple disabled={inlineUploading} className="mt-3 text-sm" onChange={event => void uploadInlineImages(event.target.files)} /></label>
    <div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 font-semibold">Status<select name="status" defaultValue={post?.status || 'draft'} className={input}><option value="draft">Draft</option><option value="published">Published</option></select></label><label className="grid gap-2 font-semibold">Publication date<input name="publishedAt" type="datetime-local" defaultValue={post?.publishedAt?.slice(0, 16)} className={input} /></label></div>
    <button disabled={pending} className="rounded-full bg-orange px-7 py-3 font-semibold text-white disabled:cursor-wait disabled:opacity-60">{pending ? 'Saving post…' : 'Save post'}</button>
  </>
}
