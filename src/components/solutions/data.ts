import { Compass, Network, Rocket, Store, Target, TrendingUp, type LucideIcon } from 'lucide-react'

export const solutionSteps = [
  { title: 'Market Entry', body: 'Simplifying market expansion through strategy and expertise.' },
  { title: 'Marketplace Growth', body: 'Scaling brands across leading e-commerce platforms.' },
  { title: 'Brand Incubation', body: 'Turning innovative ideas into successful brands.' },
  { title: 'Digital Growth', body: 'Accelerating growth through digital marketing.' },
]

export const processSteps: { title: string; body: string; icon: LucideIcon }[] = [
  { title: 'Discover', body: 'We understand your brand, goals, challenges, and market opportunities.', icon: Compass },
  { title: 'Strategize', body: 'We build a roadmap covering market entry, positioning, and execution.', icon: Target },
  { title: 'Execute', body: 'We bring the strategy to life through commerce, marketing, and technology.', icon: Rocket },
  { title: 'Scale', body: 'We optimize performance, unlock opportunities, and drive long-term growth.', icon: TrendingUp },
]

export const channels: {
  title: string
  summary: string
  tag: string
  headline: string
  body: string
  services: string[]
  image?: string
  icon: LucideIcon
}[] = [
  {
    title: 'Quick Commerce',
    summary:
      'From rapid delivery to direct sales and unified operations, we build connected commerce experiences that help brands reach more customers and grow faster.',
    tag: 'E-Commerce',
    headline: 'Win in the 10-Minute Delivery Race',
    body: 'Expand your presence across leading quick-commerce platforms with seamless operations and smarter inventory management.',
    services: [
      'Assortment Strategy',
      'Catalog Management',
      'Inventory Synchronization',
      'Promotions & Campaigns',
      'Performance Analytics',
    ],
    image: '/solutions/quick-commerce.png',
    icon: Rocket,
  },
  {
    title: 'D2C Commerce',
    summary:
      'Own the customer relationship end to end — from storefront and checkout to fulfilment, retention, and repeat purchase.',
    tag: 'Direct-to-Consumer',
    headline: 'Build a Storefront Customers Return To',
    body: 'Launch and scale your own brand website with conversion-focused design, reliable fulfilment, and data you own.',
    services: ['Storefront Setup', 'Checkout & Payments', 'Fulfilment Operations', 'CRM & Retention', 'Conversion Analytics'],
    icon: Store,
  },
  {
    title: 'Omnichannel Commerce',
    summary:
      'Unify marketplaces, quick commerce, D2C, and offline retail into one operation with a single view of stock, pricing, and performance.',
    tag: 'Unified Operations',
    headline: 'One Brand, Every Channel, One View',
    body: 'Keep inventory, pricing, and campaigns consistent across every channel your customers shop on.',
    services: ['Channel Strategy', 'Unified Inventory', 'Pricing Governance', 'Retail Distribution', 'Cross-Channel Reporting'],
    icon: Network,
  },
]
