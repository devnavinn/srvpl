import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react'
import { Logo } from './shared'
import { navLinks, partners } from './data'
import { onLinkClick, usePath } from '@/lib/router'
import { cn } from '@/lib/utils'

const PERIOD = 400
const WIDTH = 1600

/** A periodic wave path, so translating it by one PERIOD loops seamlessly. */
function wavePath(y: number, amp: number) {
  let d = `M0 ${y} Q${PERIOD / 4} ${y - amp} ${PERIOD / 2} ${y}`
  for (let x = PERIOD; x <= WIDTH + PERIOD * 2; x += PERIOD / 2) d += ` T${x} ${y}`
  return d
}

const COLORS = ['#5b7be0', '#7dd3c0', '#a78bfa', '#94a3b8', '#60a5fa']
const lines = Array.from({ length: 46 }, (_, i) => ({
  y: 120 + i * 15 + Math.sin(i * 1.7) * 30,
  amp: 40 + Math.sin(i * 0.6) * 35,
  color: COLORS[i % COLORS.length],
  opacity: 0.12 + ((i * 37) % 10) / 40,
  duration: 14 + (i % 7) * 3,
  reverse: i % 3 === 0,
}))

export function WaveBackground() {
  const ref = useRef<SVGSVGElement>(null)
  const visible = useInView(ref, { margin: '100px' })
  return (
    <svg
      ref={ref}
      data-paused={!visible || undefined}
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${WIDTH} 900`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g style={{ transform: 'skewY(-6deg)', transformOrigin: 'center' }}>
        {lines.map((l, i) => (
          // CSS keyframes instead of per-frame JS: 46 lines animate without touching the main thread
          <path
            key={i}
            d={wavePath(l.y, l.amp)}
            fill="none"
            stroke={l.color}
            strokeOpacity={l.opacity}
            strokeWidth={1}
            className="wave-line"
            style={{
              animationDuration: `${l.duration}s`,
              animationDirection: l.reverse ? 'reverse' : 'normal',
            }}
          />
        ))}
      </g>
    </svg>
  )
}

/** A nav link is current on its own page and on any page below it (e.g. /insights/<slug>). */
const isCurrent = (path: string, href: string) => path === href || (href !== '/' && path.startsWith(`${href}/`))

export function Header() {
  const [open, setOpen] = useState(false)
  const path = usePath()
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative z-20 mx-auto mt-6 flex max-w-[1312px] items-center justify-between rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-4 backdrop-blur-md lg:px-12"
    >
      <Logo />
      <nav className="hidden items-center gap-7 text-[15px] text-white/90 lg:flex">
        {navLinks.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={onLinkClick}
            aria-current={isCurrent(path, l.href) ? 'page' : undefined}
            className={cn(
              'underline-offset-4 transition-colors hover:text-white hover:underline',
              isCurrent(path, l.href) && 'text-white underline',
            )}
          >
            {l.label}
          </a>
        ))}
      </nav>
      <a href="/contact" onClick={onLinkClick} className="hidden items-center gap-1 border-b border-white pb-1 text-[15px] text-white lg:flex">
        CONTACT <ArrowUpRight className="size-4" />
      </a>
      <button className="text-white lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
        {open ? <X /> : <Menu />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-0 top-full mt-2 flex flex-col gap-3 rounded-2xl border border-white/15 bg-navy/95 p-6 text-white backdrop-blur-md lg:hidden"
          >
            {[...navLinks, { label: 'Contact', href: '/contact' }].map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => {
                  setOpen(false)
                  onLinkClick(e)
                }}
              >
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

const headline = [
  { text: 'The Launchpad Is Ready.', className: 'text-brand', align: 'justify-start' },
  { text: 'Your Brand Takes The Spotlight.', className: 'text-white', align: 'justify-center lg:pl-24' },
  { text: 'We Take The Pressure.', className: 'text-brand', align: 'justify-end' },
]

export function Hero() {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], [0, 200])

  return (
    <section id="home" className="relative overflow-hidden bg-navy px-4 text-white sm:px-6">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <WaveBackground />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/80" />

      <Header />

      <div className="relative z-10 mx-auto max-w-[1312px] pt-28 sm:pt-32">
        <div className="flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-start sm:justify-between">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-sm text-[13px] leading-snug tracking-tight text-white/90"
          >
            You bring the product. We take care of the entire go-to-market across India, the USA and the
            Middle East, so you can focus on what you love.
          </motion.p>
          <a href="#about-us" className="hidden items-center gap-3 text-sm sm:flex">
            Scroll to discover
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
              <ArrowDown className="size-4" />
            </motion.span>
          </a>
        </div>

        <h1 className="mt-4 space-y-1 text-[clamp(2rem,5.2vw,4.25rem)] leading-[1.1] font-semibold tracking-tight">
          {headline.map((line, i) => (
            <span key={line.text} className={`flex overflow-hidden ${line.align}`}>
              <motion.span
                className={line.className}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center text-sm font-medium text-white/85 sm:mt-20"
        >
          100+ Trusted Growth Partner for Global &amp; Indian Brands
        </motion.p>
      </div>

      <PartnerStrip className="mt-8" />
    </section>
  )
}

export function PartnerStrip({ className, delay = 1.1 }: { className?: string; delay?: number }) {
  return (
    <div className={cn('relative z-10 -mx-4 border-t border-white/15 sm:-mx-6', className)}>
      <div className="no-scrollbar mx-auto flex max-w-[1420px] overflow-x-auto">
        {partners.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + i * 0.08 }}
            className="flex h-28 min-w-[160px] flex-1 items-center justify-center border-r border-white/15 first:border-l sm:h-36"
          >
            <img src={p.src} alt={p.name} className="max-h-8 w-auto opacity-80 transition-opacity hover:opacity-100 sm:max-h-10" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
