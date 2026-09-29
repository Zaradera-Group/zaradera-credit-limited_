import { z } from 'zod'
import {
  contactMethods,
  enquiryCategories,
  loanProducts,
  loanTenures,
  supportedCurrencies,
} from '@/lib/site.config'

const trimmed = (max: number) => z.string().trim().max(max)
const optionalText = (max: number) => trimmed(max).optional().default('')
const allowed = <T extends readonly string[]>(values: T, message: string) =>
  z.string().refine((value): value is T[number] => values.includes(value as T[number]), message)

export const adminLoginSchema = z.object({
  email: z.string().trim().email().max(160),
  password: z.string().min(1).max(256),
}).strict()

export const enquirySchema = z.object({
  name: trimmed(100).min(2),
  email: z.string().trim().email().max(160),
  phone: optionalText(40),
  whatsapp: optionalText(40),
  country: trimmed(80).min(2),
  category: allowed(enquiryCategories, 'Invalid enquiry type.'),
  contactMethod: allowed(contactMethods, 'Invalid contact method.'),
  message: trimmed(3000).min(10),
  loanProduct: optionalText(80).refine(value => !value || loanProducts.includes(value as never), 'Invalid loan product.'),
  tenure: optionalText(40).refine(value => !value || loanTenures.includes(value as never), 'Invalid tenor.'),
  currency: optionalText(8).refine(value => !value || supportedCurrencies.includes(value as never), 'Invalid currency.'),
  amount: optionalText(30),
  consent: z.literal('yes'),
  website: optionalText(200),
}).strict().superRefine((data, context) => {
  if (!data.amount) return
  const amount = data.amount.replace(/,/g, '')
  if (!data.currency) context.addIssue({ code: z.ZodIssueCode.custom, path: ['currency'], message: 'Select a currency.' })
  if (!/^\d+(\.\d{1,2})?$/.test(amount) || Number(amount) <= 0) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['amount'], message: 'Enter a valid amount.' })
  }
})

export const chatRequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: trimmed(1200).min(1),
  }).strict()).min(1).max(8),
}).strict().refine(data => data.messages.at(-1)?.role === 'user', {
  message: 'The last message must come from the user.',
  path: ['messages'],
})

const safeId = trimmed(100).min(1).regex(/^[a-zA-Z0-9-]+$/, 'Invalid identifier.')
const safeUrl = optionalText(1000).refine(value => {
  if (!value) return true
  try { return ['https:', 'http:'].includes(new URL(value).protocol) } catch { return false }
}, 'Enter a valid HTTP or HTTPS URL.')

export const postSchema = z.object({
  id: z.union([z.literal(''), safeId]).default(''),
  title: trimmed(180).min(1),
  slug: trimmed(180).min(1).transform(value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
    .refine(Boolean, 'Enter a valid slug.'),
  excerpt: trimmed(500).min(1),
  content: trimmed(100_000).min(1),
  category: trimmed(80).min(1),
  author: trimmed(100).min(1),
  coverImage: safeUrl,
  status: z.enum(['draft', 'published']),
  publishedAt: optionalText(50).refine(value => !value || !Number.isNaN(Date.parse(value)), 'Invalid publication date.'),
}).strict()

export const deletePostSchema = z.object({ id: safeId }).strict()

export const uploadSchema = z.object({
  file: z.custom<File>(value => value instanceof File, 'Choose an image file.')
    .refine(file => file.size > 0 && file.size <= 8_000_000, 'Choose an image smaller than 8 MB.')
    .refine(file => ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type), 'Use a JPEG, PNG, WebP, or GIF image.'),
}).strict()

export function validationMessage(error: z.ZodError) {
  return error.issues[0]?.message || 'Please check the submitted information and try again.'
}
