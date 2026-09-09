import { requireAdmin } from '@/lib/admin-auth'
import { AdminShell } from '@/components/admin-shell'
import { PostEditorForm } from '@/components/post-editor-form'
export default async function NewPost(){await requireAdmin();return <AdminShell><div className="mx-auto w-full max-w-4xl"><p className="eyebrow text-orange">Editor</p><h1 className="mt-3 text-4xl font-bold">Create post</h1><PostEditorForm/></div></AdminShell>}
