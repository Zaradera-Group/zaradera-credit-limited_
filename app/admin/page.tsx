import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/admin-auth'
import { getPosts } from '@/lib/blog'
import { AdminShell } from '@/components/admin-shell'
export const metadata:Metadata={title:'CMS Dashboard',robots:{index:false,follow:false}}
export default async function AdminPage(){await requireAdmin();const {posts,total}=await getPosts({includeDrafts:true,limit:100});const published=posts.filter(p=>p.status==='published').length;return <AdminShell><p className="eyebrow text-orange">Overview</p><h1 className="mt-3 text-4xl font-bold">Content dashboard</h1><div className="mt-10 grid gap-5 sm:grid-cols-3">{[['All posts',total],['Published',published],['Drafts',total-published]].map(([label,value])=><div key={label} className="rounded-2xl border bg-white p-7"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-3 text-4xl font-bold text-navy">{value}</p></div>)}</div><Link href="/admin/posts/new" className="mt-8 inline-flex rounded-full bg-orange px-6 py-3 font-semibold text-white">Create a post</Link></AdminShell>}
