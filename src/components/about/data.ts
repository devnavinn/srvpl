import { CalendarClock, ChartNoAxesCombined, Gauge, Network, type LucideIcon } from 'lucide-react'

export const missionVision = [
  {
    tag: 'Mission',
    title: 'Empowering Global Growth',
    body: 'We help global brands enter new markets and grow through seamless commerce, marketing, and technology.',
    src: '/home/about/team.png',
  },
  {
    tag: 'Vision',
    title: 'Leading Beyond Borders',
    body: 'To be the trusted launchpad for global brands entering and growing across India and the Middle East.',
    src: '/home/about/notebook.png',
  },
]

export const philosophy =
  'We don’t sell services. We take ownership of outcomes — treating every brand we launch as if it were our own, and staying with it long after day one.'

export const values: { title: string; body: string; icon: LucideIcon }[] = [
  { title: 'Driving Progress', body: 'We move brands forward, fast.', icon: ChartNoAxesCombined },
  { title: 'Speed With Purpose', body: 'Quick launches, carefully executed.', icon: Gauge },
  { title: 'Built to Connect', body: 'Fluent across tech, lifestyle and consumer categories.', icon: Network },
  { title: 'Transparency', body: 'We speak in real numbers, on time, every time.', icon: CalendarClock },
]

export const leaders = [
  { name: 'Emma Johnson', role: 'Co-founder', avatar: '/about/avatar-emma.png', photo: '/about/leader-emma.png' },
  { name: 'Anna Hopkins', role: 'CEO', avatar: '/about/avatar-anna.png' },
  { name: 'Jane Doe', role: 'COO', avatar: '/about/avatar-jane.png' },
  { name: 'Oaklynn Duran', role: 'CTO', avatar: '/about/avatar-oaklynn.png' },
].map((l) => ({
  ...l,
  quote:
    'SRVPL began with a vision to make global expansion simpler and faster. Today, we connect international brands with new opportunities through distribution, technology, and commerce expertise.',
}))

export const timeline = [
  {
    year: '2022',
    tag: 'Founding',
    title: 'The Beginning',
    body: 'SRVPL was founded in Kolkata with a vision to connect global brands with the Indian market.',
  },
  { year: '2023', tag: 'Launched', title: 'Global Partnerships', body: 'Launched the first international brand in India.' },
  {
    year: '2024',
    tag: 'Expanding',
    title: 'Expanding Digital Reach',
    body: 'Expanded marketplace operations across multiple e-commerce platforms.',
  },
  {
    year: '2025',
    tag: 'In-house Platform',
    title: 'Technology Built In-House',
    body: 'Developed in-house tools to connect and automate commerce operations end to end.',
  },
  {
    year: '2026',
    tag: 'Middle East',
    title: 'Crossing Into The Gulf',
    body: 'Extended our launch runway to the UAE and the wider Middle East.',
  },
]

export const reasons = [
  { title: 'Market Expertise', body: 'Simplifying market entry through compliance, distribution.', icon: 'check' },
  { title: 'Integrated Capabilities', body: 'Connecting commerce, marketing, and technology seamlessly.', icon: 'lens' },
  { title: 'End-to-End Execution', body: 'Managing every stage from development to growth.', icon: 'check' },
  { title: 'Technology-Driven Growth', body: 'Powering brand launches with smart tools and technology.', icon: 'lens' },
] as const
