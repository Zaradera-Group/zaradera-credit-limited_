'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { diasporaNodes, nigeriaNode } from '@/lib/site.config'

/**
 * The signature Zaradera network motif.
 * An abstract coordinate field where fine orange light-paths converge on Lagos.
 * Reacts gently to the pointer with layered parallax. Restrained by design,
 * this is financial infrastructure, not a game.
 */
export function GlobalConnectionVisual({
  showLabels = true,
  className,
}: {
  showLabels?: boolean
  className?: string
}) {
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduce || !wrapRef.current) return
      const rect = wrapRef.current.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      setParallax({ x: px, y: py })
    },
    [reduce],
  )
  const onLeave = useCallback(() => setParallax({ x: 0, y: 0 }), [])

  // Build a gentle curved path between two points on the 0-100 field.
  const curve = (ax: number, ay: number, bx: number, by: number) => {
    const mx = (ax + bx) / 2
    const my = (ay + by) / 2 - 10
    return `M ${ax} ${ay} Q ${mx} ${my} ${bx} ${by}`
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      aria-hidden
    >
      <motion.svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        animate={{ x: parallax.x * -6, y: parallax.y * -6 }}
        transition={{ type: 'spring', stiffness: 60, damping: 18 }}
      >
        <defs>
          <radialGradient id="zar-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f24c21" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#f24c21" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="zar-path" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f24c21" stopOpacity="0.05" />
            <stop offset="55%" stopColor="#ff6a42" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f24c21" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* faint coordinate graticule */}
        <g stroke="#ffffff" strokeOpacity="0.05" strokeWidth="0.15">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v${i}`} x1={(i + 1) * 10} y1="0" x2={(i + 1) * 10} y2="100" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={(i + 1) * 10} x2="100" y2={(i + 1) * 10} />
          ))}
        </g>

        {/* glow behind origin */}
        <circle cx={nigeriaNode.x} cy={nigeriaNode.y} r="26" fill="url(#zar-glow)" />

        {/* converging light-paths */}
        {diasporaNodes.map((node, i) => {
          const d = curve(node.x, node.y, nigeriaNode.x, nigeriaNode.y)
          return (
            <g key={node.city}>
              <path d={d} fill="none" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.25" />
              <motion.path
                d={d}
                fill="none"
                stroke="url(#zar-path)"
                strokeWidth="0.5"
                strokeLinecap="round"
                initial={reduce ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, delay: 0.3 + i * 0.25, ease: 'easeInOut' }}
              />
              {/* travelling pulse */}
              {!reduce && (
                <motion.circle
                  r="0.7"
                  fill="#ff6a42"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0], offsetDistance: ['0%', '100%'] }}
                  transition={{
                    duration: 3.5,
                    delay: 1.2 + i * 0.4,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: 'easeInOut',
                  }}
                  style={{ offsetPath: `path("${d}")` } as React.CSSProperties}
                />
              )}
            </g>
          )
        })}

        {/* diaspora nodes */}
        {diasporaNodes.map((node, i) => (
          <g key={`n-${node.city}`}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="0.9"
              fill="#f4f2ff"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.25 }}
            />
            <circle cx={node.x} cy={node.y} r="2" fill="none" stroke="#f4f2ff" strokeOpacity="0.25" strokeWidth="0.15" />
            {showLabels && (
              <text
                x={node.x + 2.4}
                y={node.y + 0.6}
                fill="#c9c8ec"
                fontSize="2.1"
                fontFamily="var(--font-inter), sans-serif"
                letterSpacing="0.05"
              >
                {node.city}
              </text>
            )}
          </g>
        ))}

        {/* origin node: Lagos */}
        <g>
          {!reduce && (
            <motion.circle
              cx={nigeriaNode.x}
              cy={nigeriaNode.y}
              r="2"
              fill="none"
              stroke="#f24c21"
              strokeWidth="0.3"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: [1, 3.5], opacity: [0.7, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <circle cx={nigeriaNode.x} cy={nigeriaNode.y} r="1.5" fill="#f24c21" />
          {showLabels && (
            <text
              x={nigeriaNode.x + 3}
              y={nigeriaNode.y + 0.8}
              fill="#ffffff"
              fontSize="2.4"
              fontWeight="700"
              fontFamily="var(--font-manrope), sans-serif"
            >
              {nigeriaNode.city}
            </text>
          )}
        </g>
      </motion.svg>
    </div>
  )
}
