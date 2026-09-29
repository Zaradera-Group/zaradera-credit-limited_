'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Bot, LoaderCircle, MessageCircle, Send, Sparkles, X } from 'lucide-react'
import { chatRequestSchema } from '@/lib/validation'

type Message = { role: 'user' | 'assistant'; content: string }

const starters = ['Which product may suit my needs?', 'How can I contact Zaradera?', 'Tell me about the cooperative']

export function ChatAssistant() {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello. I’m Zara, Zaradera’s virtual assistant. How can I help you today?' },
  ])
  const scrollArea = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), reduce ? 0 : 220)
  }, [open, reduce])
  useEffect(() => {
    scrollArea.current?.scrollTo({ top: scrollArea.current.scrollHeight, behavior: reduce ? 'auto' : 'smooth' })
  }, [messages, sending, reduce])

  if (pathname.startsWith('/admin')) return null

  async function sendMessage(text: string) {
    const content = text.trim()
    if (!content || sending) return
    const next = [...messages, { role: 'user' as const, content }]
    const parsed = chatRequestSchema.safeParse({ messages: next.slice(-8) })
    if (!parsed.success) {
      setError('Please enter a shorter message and try again.')
      return
    }
    setMessages(next)
    setInput('')
    setError('')
    setSending(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.diagnostic || result.error || 'The assistant is temporarily unavailable.')
      setMessages(current => [...current, { role: 'assistant', content: result.reply }])
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The assistant is temporarily unavailable.')
    } finally {
      setSending(false)
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    void sendMessage(input)
  }

  return (
    <div className="fixed bottom-5 right-4 z-[80] sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-modal="false"
            aria-label="Chat with Zara"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: .96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: .97 }}
            transition={{ duration: reduce ? .12 : .28, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 flex h-[min(620px,calc(100dvh-7rem))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.6rem] border border-navy/10 bg-white shadow-[0_30px_90px_-28px_rgba(6,2,67,.55)]"
          >
            <header className="zar-dark relative overflow-hidden bg-navy-deep px-5 py-4 text-white">
              <div aria-hidden className="absolute -right-10 -top-12 size-36 rounded-full bg-orange/20 blur-3xl" />
              <div className="relative flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-2xl bg-orange text-white shadow-lg"><Bot className="size-5" aria-hidden /></div>
                <div className="min-w-0 flex-1"><h2 className="font-display text-base font-bold">Ask Zara</h2><p className="text-xs text-white/60">Zaradera virtual assistant</p></div>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="grid size-9 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"><X className="size-4" /></button>
              </div>
            </header>

            <div ref={scrollArea} className="flex-1 space-y-4 overflow-y-auto overscroll-contain bg-cream/55 px-4 py-5" aria-live="polite">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'rounded-br-md bg-navy text-white' : 'rounded-bl-md border border-navy/8 bg-white text-navy shadow-sm'}`}>{message.content}</div>
                </div>
              ))}
              {messages.length === 1 && <div className="grid gap-2 pt-1">{starters.map(starter => <button key={starter} type="button" onClick={() => void sendMessage(starter)} className="rounded-xl border border-navy/10 bg-white px-3 py-2 text-left text-xs font-semibold text-navy transition hover:border-orange/35 hover:text-orange">{starter}</button>)}</div>}
              {sending && <div className="flex justify-start"><div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-navy/8 bg-white px-4 py-3 text-xs text-muted-foreground"><LoaderCircle className="size-3.5 animate-spin text-orange" /> Zara is responding…</div></div>}
              {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-xs leading-5 text-red-700" role="alert">{error}</p>}
            </div>

            <form onSubmit={submit} className="border-t bg-white p-3">
              <div className="flex items-end gap-2 rounded-2xl border border-input bg-white p-1.5 transition focus-within:border-orange focus-within:ring-2 focus-within:ring-orange/15">
                <input ref={inputRef} value={input} onChange={event => setInput(event.target.value)} maxLength={1200} disabled={sending} aria-label="Message Zara" placeholder="Ask about Zaradera…" className="min-h-10 min-w-0 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground" />
                <button type="submit" disabled={sending || !input.trim()} aria-label="Send message" className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-45"><Send className="size-4" /></button>
              </div>
              <p className="mt-2 flex items-center justify-center gap-1 text-center text-[10px] leading-4 text-muted-foreground"><Sparkles className="size-3 text-orange" /> AI-generated answers. Please don’t share sensitive information.</p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button type="button" onClick={() => setOpen(value => !value)} aria-label={open ? 'Close Zara assistant' : 'Open Zara assistant'} aria-expanded={open} whileHover={reduce ? undefined : { scale: 1.06 }} whileTap={reduce ? undefined : { scale: .96 }} className="ml-auto grid size-14 place-items-center rounded-full border-4 border-white bg-orange text-white shadow-[0_16px_38px_-12px_rgba(6,2,67,.65)] transition hover:bg-navy sm:size-16">
        {open ? <X className="size-5" /> : <MessageCircle className="size-6" />}
      </motion.button>
    </div>
  )
}
