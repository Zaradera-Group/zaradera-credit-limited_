import type { Metadata } from 'next'
import { PageShell } from '@/components/page-shell'
import { InnerHero } from '@/components/inner-hero'
import { ProductShowcase } from '@/components/product-showcase'
import { ProductsIntro } from '@/components/products-intro'

export const metadata: Metadata = { title: 'Financial Products', description: 'Explore Zaradera Credit Limited products for personal, business, property-related, and international financial needs.' }
export default function ProductsPage() { return <PageShell heroTone="dark"><InnerHero eyebrow="Our products" title="Finance designed around a clear purpose." description="Explore our product pathways, understand the essential features, and choose the right conversation for your circumstances." /><ProductsIntro/><section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><ProductShowcase /></section></PageShell> }
