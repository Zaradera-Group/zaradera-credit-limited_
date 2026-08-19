import { Reveal } from '@/components/motion'

export function InnerHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="zar-dark relative overflow-hidden bg-navy-deep pb-20 pt-32 sm:pb-24 sm:pt-40">
      <div className="absolute -right-24 top-10 size-96 rounded-full bg-orange/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal><p className="eyebrow text-orange">{eyebrow}</p></Reveal>
        <Reveal delay={0.08}>
          <h1 className="display-xl mt-5 max-w-4xl font-bold text-balance text-white">{title}</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">{description}</p>
        </Reveal>
      </div>
    </section>
  )
}
