'use client'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { UnderlineLink } from '@/components/cta'
import { products } from '@/lib/products'

const grid: Variants = { hidden: {}, visible: { transition: { staggerChildren: .12, delayChildren: .08 } } }
const card: Variants = { hidden: { opacity: 0, y: 52, scale: .965, clipPath: 'inset(12% 0 12% 0 round 1.5rem)' }, visible: { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0 0% 0 round 1.5rem)', transition: { duration: .82, ease: [0.16, 1, 0.3, 1] } } }

export function ProductShowcase({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion()
  const list = compact ? products.filter(product => product.featured).slice(0, 4) : products
  return <motion.div variants={reduce ? undefined : grid} initial={reduce ? undefined : 'hidden'} whileInView={reduce ? undefined : 'visible'} viewport={{ once: true, amount: .08 }} className="grid gap-5 md:grid-cols-2">{list.map((product,index)=>{const Icon=product.icon;return <motion.article key={product.slug} id={compact?undefined:product.slug} variants={reduce?undefined:card} whileHover={reduce?undefined:{y:-8}} transition={{type:'spring',stiffness:250,damping:24}} className="group relative isolate scroll-mt-28 overflow-hidden rounded-3xl border bg-white p-7 shadow-[0_24px_70px_-55px_rgba(6,2,67,.55)] transition-[border-color,box-shadow] duration-500 hover:border-orange/35 hover:shadow-[0_30px_75px_-48px_rgba(6,2,67,.48)] sm:p-9">
    <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-orange via-orange-soft to-transparent transition-transform duration-700 group-hover:scale-x-100"/><span aria-hidden className="absolute -right-3 -top-10 -z-10 font-display text-[9rem] font-black leading-none text-navy/[.025] transition duration-700 group-hover:-translate-x-2 group-hover:text-orange/[.045]">{String(index+1).padStart(2,'0')}</span>
    <motion.div whileHover={reduce?undefined:{rotate:[0,-7,6,0],scale:1.1}} transition={{duration:.55}} className="flex size-12 items-center justify-center rounded-2xl bg-navy text-white shadow-[0_14px_30px_-16px_rgba(6,2,67,.8)]"><Icon className="size-5" aria-hidden/></motion.div>
    <div aria-hidden className="mt-8 h-4"/><h2 className="mt-3 text-2xl font-bold text-navy sm:text-[1.7rem]">{product.name}</h2><p className="mt-3 font-semibold leading-6 text-navy/75">{product.tagline}</p>
    {!compact&&<><p className="mt-5 leading-7 text-muted-foreground">{product.description}</p><div className="my-7 h-px origin-left bg-gradient-to-r from-orange/35 via-border to-transparent transition-transform duration-700 group-hover:scale-x-[1.03]"/><p className="text-xs font-bold uppercase tracking-[.18em] text-navy/45">Key information</p><ul className="mt-5 grid gap-3 text-sm leading-6 text-navy/70">{product.features.map((feature,i)=><motion.li key={feature} initial={reduce?undefined:{opacity:0,x:-12}} whileInView={reduce?undefined:{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.45,delay:i*.045}} className="flex gap-3"><span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-orange shadow-[0_0_0_4px_rgba(242,76,33,.08)]"/>{feature}</motion.li>)}</ul></>}
    {compact&&<div className="mt-8"><UnderlineLink href={`/products#${product.slug}`}>View product information</UnderlineLink></div>}
  </motion.article>})}</motion.div>
}
