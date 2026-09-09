'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { teamMembers } from '@/lib/team'

const ease = [0.16, 1, 0.3, 1] as const

export function TeamSwiper() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const locked = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reduce = useReducedMotion()
  const member = teamMembers[activeIndex]
  const [bioOpening = '', ...bioDetails] = (member.bio || 'Biography coming soon.').split('\n\n')

  const navigate = useCallback((next: number) => {
    if (locked.current || next === activeIndex) return
    locked.current = true
    setDirection(next > activeIndex || (activeIndex === teamMembers.length - 1 && next === 0) ? 1 : -1)
    setActiveIndex((next + teamMembers.length) % teamMembers.length)
    timer.current = setTimeout(() => { locked.current = false }, reduce ? 180 : 680)
  }, [activeIndex, reduce])

  const step = useCallback((amount: number) => navigate((activeIndex + amount + teamMembers.length) % teamMembers.length), [activeIndex, navigate])

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  useEffect(() => {
    const nearby = [(activeIndex + 1) % teamMembers.length, (activeIndex - 1 + teamMembers.length) % teamMembers.length]
    nearby.forEach(index => { const preload = new window.Image(); preload.src = teamMembers[index].photo })
  }, [activeIndex])

  function onDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (Math.abs(info.offset.x) > 70 || Math.abs(info.velocity.x) > 500) step(info.offset.x < 0 ? 1 : -1)
  }

  return (
    <motion.section initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .85, ease }} aria-roledescription="carousel" aria-label="Zaradera team" tabIndex={0} onKeyDown={event => { if (event.key === 'ArrowLeft') step(-1); if (event.key === 'ArrowRight') step(1) }} className="relative overflow-hidden rounded-[2rem] border bg-white shadow-[0_34px_90px_-65px_rgba(6,2,67,.65)] focus-visible:outline-orange">
      <div aria-live="polite" className="sr-only">Showing {member.name}, {member.role}. Slide {activeIndex + 1} of {teamMembers.length}.</div>
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div key={activeIndex} custom={direction} initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction * 44 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction * -36 }} transition={{ duration: reduce ? .18 : .58, ease }} className="grid lg:grid-cols-[.92fr_1.08fr]">
          <motion.div drag={reduce ? false : 'x'} dragConstraints={{ left: 0, right: 0 }} dragElastic={.13} onDragEnd={onDragEnd} className="relative aspect-[4/4.5] cursor-grab overflow-hidden bg-navy active:cursor-grabbing sm:aspect-[16/12] lg:min-h-[580px] lg:aspect-auto">
            <motion.div initial={reduce ? { opacity: 0 } : { scale: .92 }} animate={reduce ? { opacity: 1 } : { scale: 1 }} exit={reduce ? { opacity: 0 } : { scale: .94 }} transition={{ duration: .58, ease }} className="absolute inset-0">
              <Image src={member.photo} alt={`${member.name}, ${member.role}`} fill priority={activeIndex === 0} className="pointer-events-none select-none object-contain object-bottom" sizes="(min-width:1024px) 46vw, 100vw" />
            </motion.div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent" />
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: reduce ? 0 : .22, ease }} className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10">
              <p className="eyebrow text-orange">{member.role}</p><p className="mt-3 font-display text-3xl font-bold sm:text-4xl">{member.name}</p>
            </motion.div>
          </motion.div>

          <div className="relative flex min-h-[430px] flex-col justify-center overflow-hidden p-7 sm:p-12 lg:min-h-[580px] lg:p-16">
            <span aria-hidden className="absolute right-4 top-0 font-display text-[9rem] font-black leading-none text-navy/[.035] sm:text-[13rem]">{String(activeIndex + 1).padStart(2, '0')}</span>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: reduce ? 0 : .12, ease }} className="eyebrow relative text-orange">Meet the team</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: reduce ? 0 : .18, ease }} className="relative mt-5 text-4xl font-bold text-navy sm:text-5xl">{member.name}</motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: reduce ? 0 : .25, ease }} className="relative mt-4 font-semibold text-navy/65">{member.role}</motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: reduce ? 0 : .32, ease }} className="relative mt-7 max-w-xl text-base leading-7 text-muted-foreground">
              <p>{bioOpening}</p>
              {bioDetails.length > 0 && <details className="group/bio mt-5 rounded-2xl border border-navy/10 bg-cream/70 p-4 open:pb-5">
                <summary className="cursor-pointer list-none font-semibold text-navy transition hover:text-orange">Read full biography <span aria-hidden className="ml-1 inline-block transition-transform group-open/bio:rotate-45">+</span></summary>
                <div className="team-bio-scroll mt-4 max-h-64 space-y-4 overflow-y-auto overscroll-contain pr-3 text-sm leading-6">{bioDetails.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
              </details>}
            </motion.div>
            {(member.linkedin || member.twitter) && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduce ? 0 : .4 }} className="mt-7 flex gap-3">{member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`} className="grid size-10 place-items-center rounded-full border text-sm font-bold hover:border-orange hover:text-orange">in</a>}{member.twitter && <a href={member.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on X`} className="grid size-10 place-items-center rounded-full border text-sm font-bold hover:border-orange hover:text-orange">X</a>}</motion.div>}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3 sm:bottom-8 sm:right-8">
        <button type="button" onClick={() => step(-1)} aria-label="Previous team member" className="grid size-11 place-items-center rounded-full border border-navy/15 bg-white/90 text-navy backdrop-blur transition hover:border-orange hover:text-orange"><ArrowLeft className="size-4"/></button>
        <div className="flex gap-1.5" role="tablist" aria-label="Choose team member">{teamMembers.map((person,index)=><button key={person.name} type="button" role="tab" aria-selected={index===activeIndex} aria-label={`Show ${person.name}`} onClick={()=>navigate(index)} className={`h-2 rounded-full transition-all duration-300 ${index===activeIndex?'w-7 bg-orange':'w-2 bg-navy/20 hover:bg-navy/40'}`}/>)}</div>
        <button type="button" onClick={() => step(1)} aria-label="Next team member" className="grid size-11 place-items-center rounded-full bg-navy text-white transition hover:bg-orange"><ArrowRight className="size-4"/></button>
      </div>
    </motion.section>
  )
}
