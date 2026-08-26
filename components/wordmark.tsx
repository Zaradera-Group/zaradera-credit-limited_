import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Zaradera wordmark. The orange dot is the smallest expression of the
 * "Zaradera line" motif, a single node of connection.
 */
export function Wordmark({
  className,
  showSub = false,
  onClick,
}: {
  className?: string
  showSub?: boolean
  onClick?: () => void
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn('group inline-flex shrink-0 items-center gap-2.5', className)}
      aria-label="Zaradera Credit Limited home"
    >
      <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/95 p-1 shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105 sm:size-11">
        <Image src="/images/zaradera-logo.png" alt="" width={44} height={44} priority className="size-full object-contain" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-base font-extrabold tracking-[0.04em] sm:text-lg">ZARADERA</span>
        {showSub && <span className="mt-1 hidden text-[0.55rem] font-semibold uppercase tracking-[0.2em] opacity-60 sm:block">Credit Limited</span>}
      </span>
    </Link>
  )
}
