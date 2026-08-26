import { Reveal } from '@/components/motion'
import { UnderlineLink } from '@/components/cta'

export function IntroStatement() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-2">
            <Reveal>
              <p className="eyebrow text-orange">01 Our Promise</p>
            </Reveal>
          </div>
          <div className="lg:col-span-10">
            <Reveal>
              <h2 className="display-xl max-w-4xl font-display font-bold text-foreground text-balance">
                Financial solutions built around where life takes you.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Zaradera Credit Limited provides accessible, responsible financial solutions,
                  creating clear pathways for customers at home in Nigeria and for those building
                  their lives internationally.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We believe a financial relationship should move with you. Wherever you are, the
                  door to opportunity in Nigeria should stay open.
                </p>
                <div className="mt-6">
                  <UnderlineLink href="/about">Discover Zaradera</UnderlineLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
