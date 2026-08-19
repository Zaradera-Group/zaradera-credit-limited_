'use client'

import { useRef, type MouseEvent } from 'react'
import { Wallet, Building2, Globe2, Compass } from 'lucide-react'
import { solutions } from '@/lib/site.config'
import { Stagger, StaggerItem } from '@/components/motion'

const icons = {
  personal: Wallet,
  business: Building2,
  diaspora: Globe2,
  advisory: Compass,
} as const

function Card({
  id,
  index,
  title,
  summary,
  detail,
}: {
  id: keyof typeof icons
  index: number
  title: string
  summary: string
  detail: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const Icon = icons[id]

  function onMove(e: MouseEvent) {
    if (!ref.current || window.matchMedia('(pointer: coarse)').matches) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    ref.current.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateY(0) rotateX(0)'
  }

  return (
    <StaggerItem className="h-full">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-7 transition-[transform,box-shadow] duration-300 will-change-transform hover:shadow-[0_20px_50px_-24px_rgba(6,2,67,0.35)]"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-orange/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div>
          <div className="flex items-center justify-between">
            <span className="flex size-11 items-center justify-center rounded-xl bg-navy/5 text-navy">
              <Icon className="size-5" aria-hidden />
            </span>
            <span className="font-display text-sm font-semibold text-muted-foreground/50">
              0{index + 1}
            </span>
          </div>
          <h3 className="mt-6 font-display text-xl font-bold text-foreground">{title}</h3>
          <p className="mt-2 text-sm font-medium text-foreground/80">{summary}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{detail}</p>
        </div>
        <div className="zar-line mt-6 w-0 transition-all duration-500 group-hover:w-full" />
      </div>
    </StaggerItem>
  )
}

export function ServiceGrid() {
  return (
    <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {solutions.map((s, i) => (
        <Card
          key={s.id}
          id={s.id as keyof typeof icons}
          index={i}
          title={s.title}
          summary={s.summary}
          detail={s.detail}
        />
      ))}
    </Stagger>
  )
}
