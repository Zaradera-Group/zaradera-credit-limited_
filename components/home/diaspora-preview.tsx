'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowUpRight, Globe2 } from 'lucide-react'
import { Reveal } from '@/components/motion'
import { Cta } from '@/components/cta'

export function DiasporaPreview() {
  return (
    <section id="diaspora" className="zar-dark scroll-mt-20 bg-navy py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src="/images/diaspora-lifestyle-v2.png"
                alt="A Nigerian professional working abroad, staying connected to home"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -right-3 bottom-8 rounded-2xl border border-white/10 bg-navy-deep/90 p-5 backdrop-blur sm:-right-6"
            >
              <Globe2 className="size-6 text-orange" strokeWidth={1.5} />
              <p className="mt-3 max-w-[12rem] text-sm leading-relaxed text-white/80">
                Serving clients all over the world.
              </p>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow text-orange">06 For the Diaspora</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-xl mt-4 font-display font-bold text-balance text-white">
                Home is never far from your finances.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md leading-relaxed text-white/70">
                Whether you are supporting family, planning investments back home, or exploring
                Zaradera&apos;s services from abroad, our diaspora desk gives you a direct, secure
                line to our team. Send an enquiry and we&apos;ll respond personally.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8">
                <Cta href="/diaspora" withArrow={false}>
                  Visit the Diaspora Desk
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Cta>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
