'use client'

import { motion } from 'motion/react'
import { ShieldCheck, ScrollText, Lock, Users } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Licensed & compliant',
    body: 'Operating as a registered credit provider, structured around Nigerian financial regulation and responsible-lending principles.',
  },
  {
    icon: ScrollText,
    title: 'Transparent terms',
    body: 'Clear rates, clear repayment schedules, and no hidden charges. You always know exactly what you are agreeing to.',
  },
  {
    icon: Lock,
    title: 'Data protected',
    body: 'Enquiries and personal information are handled securely, in line with NDPR data-protection standards.',
  },
  {
    icon: Users,
    title: 'People-first support',
    body: 'A real team, reachable across channels, whether you are in Lagos or living abroad.',
  },
]

export function TrustSection() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow text-orange">05 Why Zaradera</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-xl mt-4 font-display font-bold text-balance text-foreground">
                Built on trust, not just transactions.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                Zaradera Credit Limited exists to give customers in Nigeria and people worldwide a financial
                partner they can rely on. Every product is designed to be understood, not just
                signed.
              </p>
            </Reveal>
          </div>

          <Stagger className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
            {pillars.map((p) => (
              <StaggerItem key={p.title}>
                <motion.div className="flex h-full flex-col bg-card p-7">
                  <p.icon className="size-7 text-orange" strokeWidth={1.5} />
                  <h3 className="mt-5 font-display text-lg font-bold text-card-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
