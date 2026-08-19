import { PageShell } from '@/components/page-shell'
import { InnerHero } from '@/components/inner-hero'
export type LegalSection={title:string;body:string}
export function LegalPage({title,description,sections}:{title:string;description:string;sections:LegalSection[]}){return <PageShell heroTone="dark"><InnerHero eyebrow="Legal" title={title} description={description}/><article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:py-28"><p className="mb-10 text-sm text-muted-foreground">Last updated: 18 August 2026</p>{sections.map(s=><section key={s.title} className="mb-10"><h2 className="text-xl font-bold">{s.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{s.body}</p></section>)}</article></PageShell>}
