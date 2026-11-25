import { ChartLine, Globe, ShoppingBag, Target, TrendingUp, Users, type LucideIcon } from 'lucide-react'

export const industryCards = [
  {
    title: 'Lifestyle',
    body: 'Products that elevate everyday living, personal expression and modern lifestyles.',
    src: '/industries/lifestyle.png',
  },
  {
    title: 'Home & Kitchen',
    body: 'Thoughtfully designed products for contemporary homes, kitchens and daily routines.',
    src: '/industries/brand-pan.png',
  },
  {
    title: 'Babies & Kids',
    body: 'Products designed for learning, creativity, play and growing families.',
    src: '/industries/brand-kids.png',
  },
  {
    title: 'Health & Wellness',
    body: 'Products that support active living, personal care, recovery and everyday well-being.',
    src: '/industries/brand-bottle.png',
  },
  {
    title: 'Office Products',
    body: 'Products that make work smarter, from desk setups and accessories to everyday tools.',
    src: '/industries/brand-divoom.png',
  },
  {
    title: '3C & Gadgets',
    body: 'Consumer electronics, creator gear and smart accessories for a connected life.',
    src: '/industries/brand-bag.png',
  },
]

export const knowledgeIcons: { label: string; icon: LucideIcon }[] = [
  { label: 'Consumers', icon: Users },
  { label: 'Positioning', icon: Target },
  { label: 'Products', icon: ShoppingBag },
  { label: 'Growth', icon: TrendingUp },
  { label: 'Markets', icon: Globe },
  { label: 'Performance', icon: ChartLine },
]

export const knowledge = [
  {
    title: 'Understanding Consumers',
    body: 'Audiences, buying behaviour, expectations and purchasing motivations.',
    points: ['Consumer Insights', 'Audience Expectations', 'Purchase Drivers', 'Emerging Trends'],
    src: '/industries/consumers.png',
  },
  {
    title: 'Understanding Products',
    body: 'Category positioning, pricing, assortment and how a product earns its place on the shelf.',
    points: ['Category Positioning', 'Pricing Strategy', 'Assortment Planning', 'Product Compliance'],
  },
  {
    title: 'Understanding Markets',
    body: 'Channels, competition and regulation across India and the Middle East.',
    points: ['Competitive Landscape', 'Channel Mix', 'Regulatory Readiness', 'Regional Nuances'],
  },
]

export const brandsTop = [
  { name: 'Divoom', logo: '/industries/logo-divoom.png', tag: '3C Products', src: '/industries/brand-divoom.png' },
  { name: 'Kids brand', logo: '/industries/logo-kids.png', tag: 'Babies & kids', src: '/industries/brand-kids.png' },
]

export const brandsBottom = [
  { name: 'VSGO', logo: '/industries/logo-vsgo.png', tag: '3C Products', src: '/industries/brand-bag.png' },
  { name: 'VSGO', logo: '/industries/logo-vsgo.png', tag: '3C Products', src: '/industries/brand-pan.png' },
  { name: 'VSGO', logo: '/industries/logo-vsgo.png', tag: '3C Products', src: '/industries/brand-bottle.png' },
]

export const advantages = [
  {
    title: 'Category Understanding',
    body: 'A category-first approach that recognizes the different consumers, products and commercial dynamics shaping each industry.',
  },
  {
    title: 'Connected Capabilities',
    body: 'Strategy, commerce, marketing, technology and supply chain working together rather than in isolated functions.',
  },
  {
    title: 'Market-Ready Execution',
    body: 'The infrastructure, expertise and operational support required to move from market opportunity to everyday business.',
  },
  {
    title: 'Built for Growth',
    body: 'A platform designed to support brands as they establish their presence, expand their reach and scale their operations.',
  },
]
