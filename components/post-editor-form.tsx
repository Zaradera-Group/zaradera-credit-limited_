'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { PostEditorFields } from '@/components/post-editor'
import type { Post } from '@/lib/blog'
import { postSchema, validationMessage } from '@/lib/validation'

export function PostEditorForm({ post }: { post?: Post | null }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError('')
    const data = new FormData(event.currentTarget)
    const parsed = postSchema.safeParse(Object.fromEntries(data))
    if (!parsed.success) { setError(validationMessage(parsed.error)); return }
    setPending(true)
    try {
      const response = await fetch('/api/admin/posts', { method: 'POST', body: data })
      const result = await response.json()
      if (!response.ok) { setError(result.error || 'The post could not be saved.'); return }
      router.push('/admin/posts'); router.refresh()
    } catch { setError('The post could not be saved because the request failed. Please try again.') }
    finally { setPending(false) }
  }
  return <form onSubmit={submit} className="mt-10 grid gap-6 text-left">
    {error && <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-800">{error}</div>}
    <PostEditorFields post={post} pending={pending} />
  </form>
}
