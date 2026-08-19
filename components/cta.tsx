'use client'

import Link from 'next/link'
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'outline' | 'ghost'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-tight transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange min-h-11 px-6 py-3'

const variants: Record<Variant, string> = {
  primary:
    'bg-orange text-white shadow-[0_8px_30px_-8px_rgba(242,76,33,0.6)] hover:bg-[color-mix(in_oklab,var(--orange)_88%,black)]',
  outline:
    'border border-current/25 text-foreground hover:border-orange hover:text-orange bg-transparent',
  ghost: 'text-foreground hover:text-orange bg-transparent',
}

/**
 * Magnetic, arrow-aware CTA. Works as a link (href) or button (onClick).
 * Cursor attraction and arrow shift are disabled for reduced-motion / touch.
 */
export function Cta({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  withArrow = true,
  external = false,
  ariaLabel,
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: Variant
  className?: string
  withArrow?: boolean
  external?: boolean
  ariaLabel?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()

  function handleMove(e: MouseEvent) {
    if (reduce || !ref.current) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    ref.current.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`
  }
  function handleLeave() {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)'
  }

  const inner = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-[4px]"
          aria-hidden
        />
      )}
    </>
  )

  const classes = cn(base, variants[variant], className)

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-block will-change-transform"
      style={{ transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)' }}
    >
      {href ? (
        external ? (
          <a
            href={href}
            onClick={onClick}
            className={classes}
            aria-label={ariaLabel}
            target="_blank"
            rel="noopener noreferrer"
          >
            {inner}
          </a>
        ) : (
          <Link href={href} onClick={onClick} className={classes} aria-label={ariaLabel}>
            {inner}
          </Link>
        )
      ) : (
        <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel}>
          {inner}
        </button>
      )}
    </motion.span>
  )
}

/** Text link with an animated underline that travels left-to-right. */
export function UnderlineLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
}) {
  const cls = cn(
    'group relative inline-flex items-center gap-1.5 font-medium text-foreground',
    className,
  )
  const content = (
    <>
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-orange transition-transform duration-300 group-hover:scale-x-100" />
      </span>
      <ArrowRight
        className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden
      />
    </>
  )
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  )
}
