'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export type TrustedLogo = { src: string; alt: string; href?: string }

function LogoCard({ logo, duplicate = false }: { logo: TrustedLogo; duplicate?: boolean }) {
  const image = (
    <Image src={logo.src} alt={duplicate ? '' : logo.alt} width={230} height={86} loading="lazy" className="max-h-16 w-auto max-w-[178px] object-contain transition duration-500 ease-out group-hover:scale-[1.04] sm:max-h-[72px] sm:max-w-[205px]" />
  )
  const content = logo.href ? (
    <a href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={duplicate ? undefined : `Visit ${logo.alt}`} tabIndex={duplicate ? -1 : undefined} className="flex size-full items-center justify-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange">{image}</a>
  ) : image

  return (
    <motion.div aria-hidden={duplicate || undefined} whileHover={{ y: -7, scale: 1.02 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }} className="group relative flex h-36 w-[220px] shrink-0 items-center justify-center px-5 sm:h-40 sm:w-[250px] lg:w-[270px]">
      <span className="pointer-events-none absolute bottom-5 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-orange transition-all duration-500 group-hover:w-12" />
      <span className="relative flex size-full items-center justify-center">{content}</span>
    </motion.div>
  )
}

function LogoGroup({ logos, duplicate = false }: { logos: readonly TrustedLogo[]; duplicate?: boolean }) {
  return <div className="trusted-marquee-group" aria-hidden={duplicate || undefined}>{logos.map((logo) => <LogoCard key={`${duplicate ? 'copy-' : ''}${logo.src}`} logo={logo} duplicate={duplicate} />)}</div>
}

export function TrustedBy({ heading, logos, className }: { heading: string; logos: readonly TrustedLogo[]; className?: string }) {
  return (
    <section aria-labelledby="trusted-by-heading" className={cn('bg-cream px-3 py-10 sm:px-5 sm:py-14 lg:px-8', className)}>
      <motion.div initial={{ opacity: 0, y: 42, scale: 0.985, clipPath: 'inset(8% 0 8% 0 round 2rem)' }} whileInView={{ opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0 0% 0 round 2rem)' }} viewport={{ once: false, amount: 0.28 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="relative mx-auto flex min-h-[340px] max-w-[1440px] flex-col overflow-hidden rounded-[2rem] border border-navy/[0.06] bg-[#f2f1f3] shadow-[0_28px_80px_-58px_rgba(11,8,60,.45)] sm:min-h-[360px] lg:min-h-[330px] lg:flex-row lg:items-center">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_9%_18%,rgba(242,76,33,.07),transparent_23%),radial-gradient(circle_at_92%_78%,rgba(11,8,60,.055),transparent_26%)]" />
        <div aria-hidden className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(11,8,60,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(11,8,60,.5)_1px,transparent_1px)] [background-size:54px_54px]" />
        <motion.div aria-hidden initial={{ x: '-130%', opacity: 0 }} whileInView={{ x: '160%', opacity: [0, 0.55, 0] }} viewport={{ once: false, amount: 0.35 }} transition={{ duration: 1.35, delay: 0.12, ease: [0.16, 1, 0.3, 1] }} className="pointer-events-none absolute inset-y-0 z-20 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/70 to-transparent motion-reduce:hidden" />
        <motion.span aria-hidden className="absolute right-[8%] top-8 size-1.5 rounded-full bg-orange shadow-[0_0_18px_4px_rgba(242,76,33,.3)]" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }} />

        <div className="relative z-10 flex shrink-0 flex-col items-center px-7 pb-2 pt-12 text-center sm:px-10 sm:pt-14 lg:min-h-[210px] lg:w-[270px] lg:items-start lg:justify-center lg:border-r lg:border-navy/10 lg:py-8 lg:pl-12 lg:pr-8 lg:text-left">
          <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false, amount: 0.8 }} transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="mb-5 h-0.5 w-12 origin-left rounded-full bg-orange" />
          <motion.h2 id="trusted-by-heading" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.8 }} transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }} className="font-display text-2xl font-bold tracking-[-0.03em] text-navy sm:text-3xl">{heading}</motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.8 }} transition={{ duration: 0.65, delay: 0.34, ease: [0.16, 1, 0.3, 1] }} className="mt-3 max-w-[190px] text-sm leading-6 text-navy/60">Relationships built on confidence.</motion.p>
        </div>

        <motion.div initial={{ opacity: 0, x: 52 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 flex min-w-0 flex-1 items-center overflow-hidden pb-8 pt-2 motion-reduce:overflow-x-auto sm:pb-10 lg:py-8">
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-[#f2f1f3] to-transparent sm:w-20" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-[#f2f1f3] to-transparent sm:w-20" />
          <div className="trusted-marquee-track flex w-max hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] active:[animation-play-state:paused]">
            <LogoGroup logos={logos} />
            <LogoGroup logos={logos} duplicate />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
