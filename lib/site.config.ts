/**
 * ZARADERA CREDIT LIMITED central configuration layer.
 * Edit values here rather than scattering them through components.
 *
 * Environment placeholders (set in your Vercel Project Settings → Environment Variables):
 *   NEXT_PUBLIC_LOAN_APP_URL   → the existing Nigerian lending platform URL
 *   COMPANY_EMAIL              → destination inbox for diaspora enquiries (server-side only)
 *   RESEND_API_KEY             → transactional email provider key (server-side only)
 *   ENQUIRY_FROM_EMAIL         → verified "from" address for outgoing mail (server-side only)
 */

export const siteConfig = {
  name: 'Zaradera Credit Limited',
  shortName: 'Zaradera',
  tagline: 'Financial opportunity, connected.',
  description:
    'Zaradera Credit Limited provides accessible, responsible financial solutions for individuals and businesses in Nigeria and across international markets.',
  url: 'https://zaraderagroup.com',

  // Public destination for the Nigerian lending platform.
  // Falls back to a safe placeholder anchor if the env var is not yet configured.
  loanAppUrl:
    process.env.NEXT_PUBLIC_LOAN_APP_URL && process.env.NEXT_PUBLIC_LOAN_APP_URL.length > 0
      ? process.env.NEXT_PUBLIC_LOAN_APP_URL
      : '#loan-platform-not-configured',

  // Public-facing contact details (safe to expose). The enquiry destination
  // inbox (COMPANY_EMAIL) is intentionally NOT referenced client-side.
  email: 'support@zaraderagroup.com',
  phone: '+234 701 768 3590',
  phoneUk: '+44 0733 7086511',

  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/107362364/' },
  ],

  whatsapp: [
    { label: 'WhatsApp Nigeria', number: '+234 701 768 3590', href: 'https://wa.me/2347017683590' },
    { label: 'WhatsApp UK', number: '+44 7337 086511', href: 'https://wa.me/447337086511' },
  ],

  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Products', href: '/products' },
    { label: 'Nigeria', href: '/#nigeria' },
    { label: 'Diaspora', href: '/diaspora' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
} as const

export type EnquiryCategory =
  | 'Personal finance'
  | 'Business finance'
  | 'Property / real-estate related enquiry'
  | 'Investment-related enquiry'
  | 'Partnership'
  | 'General enquiry'
  | 'Other'

export const enquiryCategories: EnquiryCategory[] = [
  'Personal finance',
  'Business finance',
  'Property / real-estate related enquiry',
  'Investment-related enquiry',
  'Partnership',
  'General enquiry',
  'Other',
]

export const contactMethods = ['Email', 'Phone', 'WhatsApp'] as const

export const trustedByHeading = 'Trusted By'

export const trustedByLogos = [
  { src: '/assets/Screenshot-from-2025-11-15-10-47-07.png', alt: 'Money Lenders Association', href: 'https://moneylenders.ng/' },
  { src: '/assets/0b8c5487-02b6-4a9e-bf8e-b5f82477e2ad-removebg-preview.png', alt: 'Periculum', href: 'https://www.periculum.io/' },
  { src: '/assets/WhatsApp_Image_2025-11-11_at_11.23.34_PM-removebg-preview-e1763199888705.png', alt: 'CreditRegistry', href: 'https://www.creditregistry.ng/' },
  { src: '/assets/WhatsApp_Image_2025-11-11_at_11.12.52_PM-removebg-preview-e1763199972521.png', alt: 'Lendsqr', href: 'https://lendsqr.com/' },
  { src: '/assets/WhatsApp_Image_2025-11-14_at_10.51.20_AM-removebg-preview-e1763199800934.png', alt: 'Remita', href: 'https://www.remita.net/' },
  { src: '/assets/WhatsApp_Image_2025-11-14_at_3.38.35_PM-removebg-preview.png', alt: 'FirstCentral Credit Bureau', href: 'https://firstcentralcreditbureau.com/' },
  { src: '/assets/WhatsApp_Image_2025-11-14_at_3.29.35_PM-removebg-preview-e1763199751205.png', alt: 'Pink Health Foundation', href: 'https://pinkhealthng.org/' },
] as const

export const loanProducts = [
  'Personal finance',
  'Business finance',
  'Property-related finance',
  'Asset finance',
  'Other / Not sure',
] as const

export const loanTenures = [
  'Less than 6 months',
  '6 months',
  '12 months',
  '18 months',
  '24 months',
  'More than 24 months',
  'Not sure yet',
] as const

export const supportedCurrencies = ['USD', 'GBP', 'EUR', 'CAD', 'AED'] as const

export const solutions = [
  {
    id: 'personal',
    title: 'Personal Finance',
    summary: 'Flexible lending solutions built around real life and real timelines.',
    detail:
      'Access financing designed to meet everyday and milestone needs, structured around clear, responsible terms.',
  },
  {
    id: 'business',
    title: 'Business Finance',
    summary: 'Financing designed to support genuine business requirements and momentum.',
    detail:
      'Support for working capital, growth and operational needs for businesses at different stages.',
  },
  {
    id: 'diaspora',
    title: 'Diaspora Services',
    summary: 'Financial pathways for clients connecting with Nigeria from abroad.',
    detail:
      'Start a conversation with our team about opportunities, planning and support while you are based overseas.',
  },
  {
    id: 'advisory',
    title: 'Financial Advisory',
    summary: 'Professional guidance for qualified clients navigating decisions.',
    detail:
      'Considered, relationship-led guidance to help you weigh options with clarity and confidence.',
  },
] as const

export const trustPillars = [
  {
    title: 'Responsible Finance',
    body: 'Solutions designed around sustainable, long-term financial relationships without short-term pressure.',
  },
  {
    title: 'Security First',
    body: 'Modern safeguards protecting customer interactions and the information you share with us.',
  },
  {
    title: 'Clear Communication',
    body: 'Every financial relationship should begin with clarity. We keep the language plain and honest.',
  },
  {
    title: 'Human Support',
    body: 'Technology supported by real people, ready to help when customers need assistance.',
  },
] as const

export const faqCategories = [
  {
    category: 'General',
    items: [
      {
        q: 'What is Zaradera Credit Limited?',
        a: 'Zaradera Credit Limited is a Nigeria-rooted financial services company focused on making financial opportunities easier to understand and access. We support customers in Nigeria through our dedicated lending journey and provide a direct enquiry route for individuals and businesses outside Nigeria.',
      },
      {
        q: 'Who can use Zaradera?',
        a: 'Our website serves people in Nigeria who want to explore our lending services and people outside Nigeria who want to discuss diaspora, business, property-related, investment-related, partnership, or general financial enquiries. Availability and eligibility depend on the service requested and the outcome of the appropriate review process.',
      },
    ],
  },
  {
    category: 'Nigeria Services',
    items: [
      {
        q: 'How do I apply for a loan in Nigeria?',
        a: 'Select “I’m in Nigeria” or “Access Loans in Nigeria” anywhere on this website. You will be directed to Zaradera’s dedicated lending platform, where you can review the current process, provide the required information, and continue your application securely.',
      },
      {
        q: 'What do I need to get started?',
        a: 'The exact information required depends on the product and your circumstances. Our lending platform will show the current requirements before you submit an application. Only provide accurate information and documents requested through an authorised Zaradera channel.',
      },
    ],
  },
  {
    category: 'Diaspora',
    items: [
      {
        q: 'I live abroad. How does Zaradera help me?',
        a: 'Our Diaspora Services page gives you a direct way to explain what you are working towards in Nigeria. After you submit an enquiry, our team reviews the information and contacts you through your preferred channel to clarify your needs and discuss an appropriate next step. An enquiry is not an application, approval, or offer of finance.',
      },
      {
        q: 'Does Zaradera have offices in my city?',
        a: 'The international city names shown in our website visuals represent the global communities that may connect with Nigeria through Zaradera; they do not indicate physical Zaradera offices in those cities. You can contact our team from wherever you live through the Diaspora enquiry form.',
      },
    ],
  },
  {
    category: 'Privacy & Security',
    items: [
      {
        q: 'How is my information handled?',
        a: 'We request only the information needed to understand and respond to your enquiry. Submitted details are processed through our server-side enquiry system and handled in accordance with our Privacy Policy. Do not include passwords, PINs, card details, bank login credentials, or identity-document numbers in a website enquiry.',
      },
      {
        q: 'Is my enquiry secure?',
        a: 'Website enquiries are submitted through a protected server-side process with validation, abuse prevention, and server-only delivery credentials. Although we take reasonable measures to protect submitted information, sensitive financial or identity information should only be shared when specifically requested through a verified Zaradera process.',
      },
    ],
  },
] as const

export const diasporaNodes = [
  { city: 'London', x: 46, y: 30 },
  { city: 'Toronto', x: 22, y: 33 },
  { city: 'New York', x: 27, y: 40 },
  { city: 'Dubai', x: 63, y: 47 },
  { city: 'Johannesburg', x: 56, y: 78 },
] as const

// Lagos / Nigeria origin node on the same abstract coordinate field.
export const nigeriaNode = { city: 'Lagos', x: 50, y: 55 }
