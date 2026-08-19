import { ServiceGrid } from '@/components/service-grid'
import { Reveal } from '@/components/motion'
import { UnderlineLink } from '@/components/cta'

export function SolutionsSection() {
  return (
    <section id="solutions" className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow text-orange">03 — Solutions</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-4 max-w-2xl font-display font-bold text-foreground text-balance">
                Considered solutions for real financial moments.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <UnderlineLink href="/solutions">View all solutions</UnderlineLink>
          </Reveal>
        </div>

        <div className="mt-12">
          <ServiceGrid />
        </div>
      </div>
    </section>
  )
}
