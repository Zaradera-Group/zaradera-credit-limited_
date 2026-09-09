import type { Metadata } from 'next'
import { AdminLogin } from '@/components/admin-login'
export const metadata:Metadata={title:'Admin Login',robots:{index:false,follow:false}}
export default function LoginPage(){return <main className="flex min-h-screen items-center justify-center bg-navy-deep px-4"><section className="w-full max-w-md rounded-3xl bg-cream p-8 sm:p-10"><p className="eyebrow text-orange">Zaradera CMS</p><h1 className="mt-4 text-3xl font-bold text-navy">Admin sign in</h1><p className="mt-3 text-sm text-muted-foreground">Manage published updates securely.</p><AdminLogin /></section></main>}
