import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/admin-auth'
import { getPostById } from '@/lib/blog'
import { AdminShell } from '@/components/admin-shell'
import { PostEditorForm } from '@/components/post-editor-form'
export default async function EditPost({params}:{params:Promise<{id:string}>}){await requireAdmin();const post=await getPostById((await params).id);if(!post)notFound();return <AdminShell><div className="mx-auto w-full max-w-4xl"><p className="eyebrow text-orange">Editor</p><h1 className="mt-3 text-4xl font-bold">Edit post</h1><PostEditorForm post={post}/></div></AdminShell>}
