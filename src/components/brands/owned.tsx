import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link2 } from 'lucide-react'
import { Eyebrow, Reveal } from '@/components/home/shared'
import { cn } from '@/lib/utils'
import { ownedBrands } from './data'

const EASE = [0.22, 1, 0.36, 1] as const
type Brand = (typeof ownedBrands)[number]

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
      <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm2.5 7v7.5h2.6V10Zm1.3-4.1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM11 10v7.5h2.6v-4c0-1.1.4-1.8 1.4-1.8s1.3.8 1.3 1.9v3.9H19v-4.6c0-2.3-1.2-3.1-2.8-3.1-1.2 0-2 .6-2.4 1.2V10Z" />
    </svg>
  )
}

function Socials() {
  const items = [
    { label: 'Website', icon: <Link2 className="size-5" strokeWidth={1.75} /> },
    { label: 'Instagram', icon: <InstagramIcon /> },
    { label: 'LinkedIn', icon: <LinkedinIcon /> },
  ]
  return (
    <span className="flex items-center gap-3 text-ink">
      {items.map((it) => (
        <a key={it.label} href="#" aria-label={it.label} className="transition-colors hover:text-brand" onClick={(e) => e.stopPropagation()}>
          {it.icon}
        </a>
      ))}
    </span>
  )
}

/** Text panel + product image shown when a brand card is open. */
function Detail({ b, stacked }: { b: Brand; stacked?: boolean }) {
  return (
    <div className={cn('flex h-full', stacked ? 'flex-col-reverse' : 'min-w-[740px]')}>
      <div className="flex flex-1 flex-col p-7">
        <p className="text-[15px] leading-snug text-ink/70">
          <span className="mr-1 text-2xl font-medium tracking-tight text-ink">{b.name}</span>
          {b.body}
        </p>
        <div className="mt-6">
          <Socials />
        </div>
        <div className="mt-6 flex items-end justify-between gap-4 sm:mt-auto">
          <img src={b.logo} alt={`${b.name} logo`} className="h-12 w-auto mix-blend-multiply sm:h-16" />
          <span className="rounded-md border border-ink/15 bg-white px-2 py-1.5 text-sm whitespace-nowrap text-ink">
            {b.tag}
          </span>
        </div>
      </div>
      <motion.img
        src={b.src}
        alt=""
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className={cn('object-cover', stacked ? 'aspect-[313/220] w-full' : 'h-full w-[313px] shrink-0')}
      />
    </div>
  )
}

export function OwnedBrands() {
  const [active, setActive] = useState(0)

  return (
    <section className="relative overflow-hidden bg-white px-4 pt-20 pb-24 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_100%_100%,rgb(51_85_184/0.26),transparent_70%),radial-gradient(ellipse_40%_40%_at_0%_0%,rgb(51_85_184/0.05),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1312px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <Reveal>
            <Eyebrow className="text-ink">Built from the ground up</Eyebrow>
            <h2 className="mt-3 text-3xl leading-[1.3] font-medium tracking-tight text-ink/85 sm:text-[40px]">
              Our Brands. Our Vision.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[450px] text-sm leading-snug text-ink/60 lg:mt-3">
              Brands created from our own ideas, category understanding, and consumer insight — developed through our
              platform from concept to market.
            </p>
          </Reveal>
        </div>

        {/* Desktop: hover a card to open it; the others shrink to their logo. */}
        <Reveal y={40} className="mt-12 hidden h-[290px] gap-2 lg:flex">
          {ownedBrands.map((b, i) => {
            const on = i === active
            return (
              <div
                key={b.name}
                role="button"
                tabIndex={0}
                aria-expanded={on}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{ flexGrow: on ? 4.5 : 1 }}
                className={cn(
                  'relative min-w-0 basis-0 cursor-pointer overflow-hidden rounded-lg border border-dashed outline-none [contain:layout_paint]',
                  'transition-[flex-grow,background-color,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  on ? 'border-ink/15 bg-white' : 'border-ink/10 bg-white hover:border-ink/25',
                )}
              >
                <AnimatePresence initial={false}>
                  {on ? (
                    <motion.div
                      key="open"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.4 } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      className="absolute inset-0"
                    >
                      <Detail b={b} />
                    </motion.div>
                  ) : (
                    <motion.img
                      key="logo"
                      src={b.logo}
                      alt={`${b.name} logo`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      className="absolute bottom-7 left-7 h-7 w-auto max-w-[calc(100%-3.5rem)] object-contain object-left mix-blend-multiply"
                    />
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </Reveal>

        {/* Mobile / tablet: every brand shown open, stacked. */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
          {ownedBrands.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.05} className="overflow-hidden rounded-lg border border-dashed border-ink/15 bg-white/80">
              <Detail b={b} stacked />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
