import { BadgeDollarSign, BriefcaseBusiness, Building2, HandCoins, Home, Landmark, Smile } from 'lucide-react'

export const products = [
  {
    slug: 'smile-loan', name: 'Smile Loan', tagline: 'Short-term microcredit for immediate liquidity needs.',
    description: 'A streamlined credit option designed to support cash-flow management with quick disbursement and flexible repayment options.',
    features: ['Loan amount: ₦2,000–₦100,000', 'Quick disbursement', 'Flexible repayment options', 'Minimal collateral requirements', 'Rapid underwriting for timely access to capital'],
    icon: Smile, featured: true,
  },
  {
    slug: 'easyrent', name: 'EasyRent', tagline: 'A PropTech-driven solution for easier rental payments.',
    description: 'Developed with property owners, EasyRent supports tenants with a seamless monthly payment process. Zaradera pays the accumulated rent to the property owner at the end of each rental year, helping owners receive rent while tenants manage a structured monthly commitment.',
    features: ['Monthly rent instalments for tenants', 'Accumulated annual rent paid to the property owner', 'Structured payment mechanism', 'Designed to strengthen trust between tenants and property owners'],
    icon: Home, featured: true,
  },
  {
    slug: 'fundme', name: 'FundMe', tagline: 'Acquire eligible assets without making a full upfront payment.',
    description: 'Zaradera purchases the asset in its name and transfers usage rights to the customer, when the agreed obligation is completed.',
    features: ['Eligible assets may include real estate, vehicles and equipment', 'Tenure: 3–12 months', 'Customer equity contribution: 30%', 'Ownership transfers after agreed payments are completed', 'Subject to financial-capacity assessment'],
    icon: HandCoins, featured: true,
  },
  {
    slug: 'sustain-loan', name: 'Sustain Loan', tagline: 'Accessible support for urgent salary-earner commitments.',
    description: 'A flexible repayment option for medium-income salary earners seeking financial support for urgent commitments.',
    features: ['Loan amount: ₦10,000–₦1,000,000', 'Tenure: 1–12 months', 'Monthly income eligibility: ₦200,000–₦400,000', 'Simplified application for quick access', 'Structured monthly or lump-sum repayment options', 'No hidden fees'],
    icon: BadgeDollarSign, featured: true,
  },
  {
    slug: 'minibiz-finance', name: 'MiniBiz Finance', tagline: 'Structured support for registered micro-business owners.',
    description: 'Financing from ₦200,000 to ₦500,000 for registered micro-businesses seeking liquidity for operational stability and growth.',
    features: ['Loan amount: ₦200,000–₦500,000', 'Business must be registered', 'Minimum six months in operation', 'Proof of consistent cash inflow', 'Tenure: 3–6 months, aligned with revenue cycles', 'Competitive rates subject to assessment'],
    icon: BriefcaseBusiness, featured: false,
  },
  {
    slug: 'capacity-loan', name: 'Capacity Loan', tagline: 'Short-term financing for high-net-worth individuals.',
    description: 'Designed for high-net-worth individuals requiring timely access to substantial short-term financing for individual needs.',
    features: ['Loan amount: ₦1,000,000–₦5,000,000', 'Tenure: 1–12 months', 'Flexible structured monthly or lump-sum repayment', 'Rates tailored to applicant profile', 'Collateral may be required following risk assessment'],
    icon: Landmark, featured: false,
  },
  {
    slug: 'boombiz-finance', name: 'BoomBiz Finance', tagline: 'Accessible funding for established SMEs with consistent cash flow.',
    description: 'Supports SMEs that have demonstrated consistent cash flow over the previous three years, helping sustain operations and measured growth.',
    features: ['Loan amount: ₦1,000,000–₦10,000,000', 'Tenure: 12 months', 'Monthly or quarterly repayment, subject to agreement', 'Business must have operated for at least three years', 'Collateral and acceptable business inventory/assets may be required', 'Pre-qualification, assessment, documentation, approval and disbursement process'],
    icon: Building2, featured: false,
  },
] as const
