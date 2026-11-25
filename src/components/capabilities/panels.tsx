import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { Reveal } from '@/components/home/shared'
import { cn } from '@/lib/utils'
import { capabilities } from './data'

const EASE = [0.22, 1, 0.36, 1] as const

function DiamondCheck() {
  return (
    <svg viewBox="0 0 32 32" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden>
      <path d="M16 3 29 16 16 29 3 16Z" />
      <path d="m10.5 16 4 4 7-8" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Seven capability columns. The active one widens, turns blue and reveals its
 * description and image; hover or focus picks a column, otherwise they cycle.
 */
export function CapabilityPanels() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % capabilities.length), 4000)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section id="capabilities-list" className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 sm:py-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_100%_100%,rgb(51_85_184/0.28),transparent_70%),radial-gradient(ellipse_50%_45%_at_25%_20%,rgb(51_85_184/0.08),transparent_70%)]" />
      <div className="bg-grid-light pointer-events-none absolute top-0 left-0 h-56 w-72 [mask-image:radial-gradient(circle_at_top_left,black,transparent_70%)]" />
      <div className="bg-grid-light pointer-events-none absolute top-0 right-0 h-56 w-72 [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]" />

      <Reveal y={40} className="relative mx-auto max-w-[1312px]">
        <div
          className="flex flex-col gap-1 lg:h-[600px] lg:flex-row"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {capabilities.map((c, i) => {
            const isActive = i === active
            return (
              <button
                key={c.title}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={isActive}
                style={{ flexGrow: isActive ? 2.4 : 1 }}
                className={cn(
                  'relative flex min-w-0 flex-col lg:basis-0 overflow-hidden rounded-md p-4 text-left outline-none',
                  'transition-[flex-grow,background-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  isActive
                    ? 'bg-[#d6dffa] shadow-[0_20px_50px_-30px_rgb(51_85_184/0.6)]'
                    : 'bg-[#f3f5fb]/90 hover:bg-[#eaeefa]',
                )}
              >
                {/* number with arrow that tilts to ↗ when open */}
                <span className="inline-flex items-center gap-1.5 self-start border-b border-ink/25 pb-1.5 text-[40px] leading-none font-light tracking-tight text-ink/80">
                  <motion.span animate={{ rotate: isActive ? 45 : 0 }} transition={{ duration: 0.5, ease: EASE }}>
                    <ArrowUp className="size-7" strokeWidth={1.5} />
                  </motion.span>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <motion.span
                  layout="position"
                  className={cn(
                    'mt-6 block text-lg leading-tight text-ink transition-[font-weight] lg:mt-7',
                    isActive ? 'max-w-[260px] text-[22px] font-semibold tracking-tight' : 'max-w-[150px]',
                  )}
                >
                  {c.title}
                </motion.span>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.span
                      key="detail"
                      initial={{ opacity: 0, y: 16, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: 8, height: 0, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
                      className="block w-full min-w-[220px] overflow-hidden lg:min-w-[300px]"
                    >
                      <span className="mt-3 block max-w-[330px] text-[15px] leading-snug text-ink/75">{c.body}</span>
                      <motion.img
                        src={c.src}
                        alt=""
                        initial={{ scale: 1.12 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.9, ease: EASE }}
                        className="mt-10 aspect-[351/197] w-full max-w-[360px] rounded-md object-cover"
                      />
                    </motion.span>
                  )}
                </AnimatePresence>

                <span className="mt-8 flex items-end justify-between gap-3 lg:mt-auto">
                  <span className="max-w-[170px] text-xs leading-snug font-semibold tracking-wide text-ink/85 uppercase">
                    {c.tagline}
                  </span>
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
                        className="grid size-10 shrink-0 place-items-center rounded-md bg-white/80 text-brand"
                      >
                        <DiamondCheck />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>

                {/* autoplay progress */}
                {isActive && !paused && (
                  <motion.span
                    key={`p-${active}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4, ease: 'linear' }}
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand/60"
                  />
                )}
              </button>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
