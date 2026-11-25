import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { scrollToTarget } from '@/lib/smooth-scroll'
import { Eyebrow, Reveal } from '@/components/home/shared'
import { cn } from '@/lib/utils'
import { timeline } from './data'

function TimelineIntro() {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <Reveal>
        <Eyebrow className="text-ink">Timeline</Eyebrow>
        <h2 className="mt-3 text-3xl leading-[1.3] font-medium tracking-tight text-ink sm:text-[40px]">
          Our Journey Through
          <br />
          The Years
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="max-w-[470px] text-[15px] leading-snug text-ink/60 md:mb-2">
          SRVPL was founded in <span className="text-ink">Kolkata</span> with a vision to connect global brands with the
          Indian market.
        </p>
      </Reveal>
    </div>
  )
}

function CardContent({ t }: { t: (typeof timeline)[number] }) {
  return (
    <>
      <span className="flex w-full items-center justify-between text-lg">
        <span className="font-mono text-sm tracking-widest text-brand uppercase">{t.tag}</span>
        <span className="font-mono text-sm tracking-widest text-ink/70">{t.year}</span>
      </span>
      <span className="mt-auto pt-14 text-[22px] font-semibold tracking-tight text-ink">{t.title}</span>
      <span className="mt-4 text-[15px] leading-snug text-ink/70">{t.body}</span>
    </>
  )
}

// Left inset matching the 1312px content column used by every other section.
const GUTTER = 'max(var(--gutter), calc((100% - 1312px) / 2))'

/** Mobile / tablet: swipeable row with snap points and synced year pills. */
function SwipeTimeline() {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // Keep the year pills in sync with whichever card is snapped to the left edge.
  useEffect(() => {
    const el = track.current
    if (!el) return
    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[]
      const left = el.scrollLeft
      const maxed = left + el.clientWidth >= el.scrollWidth - 4
      if (maxed) return setActive(cards.length - 1)
      let best = 0
      cards.forEach((c, i) => {
        if (Math.abs(c.offsetLeft - cards[0].offsetLeft - left) < Math.abs(cards[best].offsetLeft - cards[0].offsetLeft - left)) best = i
      })
      setActive(best)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (i: number) => {
    const el = track.current
    if (!el) return
    const cards = Array.from(el.children) as HTMLElement[]
    el.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft, behavior: 'smooth' })
    setActive(i)
  }

  return (
    <section className="bg-white py-24 sm:py-28 lg:hidden">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
        <TimelineIntro />
      </div>

      <div
        ref={track}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pr-4 [--gutter:1rem] sm:pr-6 sm:[--gutter:1.5rem]"
        style={{ paddingLeft: GUTTER, scrollPaddingLeft: GUTTER }}
      >
        {timeline.map((t, i) => (
          <motion.button
            key={t.year}
            type="button"
            onClick={() => goTo(i)}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className={cn(
              'flex min-h-[258px] w-[85vw] max-w-[403px] shrink-0 snap-start flex-col rounded-2xl p-9 text-left transition-colors duration-500',
              i === active ? 'bg-[#e6f3ff]' : 'bg-[#f0efe6] hover:bg-[#e9e8dc]',
            )}
          >
            <CardContent t={t} />
          </motion.button>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-[1360px] px-4 sm:px-6">
        <div className="relative flex items-center justify-between gap-2 sm:justify-end sm:gap-8">
          <div className="absolute inset-x-0 top-1/2 h-px bg-ink/15" aria-hidden />
          {timeline.map((t, i) => (
            <button
              key={t.year}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                'relative rounded-xl px-3 py-2.5 text-sm font-medium transition-colors sm:px-7 sm:py-5 sm:text-lg',
                // The first year sits at the far left on wide screens, as in the design.
                i === 0 && 'sm:mr-auto sm:ml-12',
                i === active ? 'text-white' : 'bg-[#f0efe6] text-ink hover:bg-[#e6e4d6]',
              )}
            >
              {i === active && (
                <motion.span
                  layoutId="year-pill"
                  className="absolute inset-0 rounded-xl bg-[#2c4aa6]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{t.year}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

const PILL_W = 96

/**
 * Desktop: the section pins while you scroll; vertical scroll drives the cards
 * sideways, a progress line fills between the years and the current year lights
 * up (zarion.webflow.io/about "Our Journey" choreography).
 */
function PinnedTimeline() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [travel, setTravel] = useState(0)
  const [active, setActive] = useState(0)
  const n = timeline.length

  // How far the card row must slide so the last card ends at the right edge.
  useLayoutEffect(() => {
    const el = track.current
    const row = el?.firstElementChild as HTMLElement | null
    if (!el || !row) return
    // row.clientWidth is the padded content box, so the last card stops at the content edge.
    const measure = () => setTravel(Math.max(0, row.scrollWidth - row.clientWidth))
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    measure()
    return () => ro.disconnect()
  }, [])

  const { scrollYProgress: p } = useScroll({ target: section, offset: ['start start', 'end end'] })
  // Hold briefly at both ends so the first and last year get a moment on screen.
  const progress = useTransform(p, [0.06, 0.94], [0, 1], { clamp: true })
  const x = useTransform(progress, (v) => -v * travel)
  useMotionValueEvent(progress, 'change', (v) => setActive(Math.round(v * (n - 1))))

  const goTo = (i: number) => {
    const el = section.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const scrollable = el.offsetHeight - window.innerHeight
    scrollToTarget(top + scrollable * (0.06 + (i / (n - 1)) * 0.88))
  }

  return (
    <section ref={section} id="timeline" className="relative hidden bg-white lg:block" style={{ height: `calc(100vh + ${travel * 1.6}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1360px] px-6">
          <TimelineIntro />
        </div>

        <div
          ref={track}
          className="mt-12 overflow-hidden"
          style={{ paddingInline: 'max(1.5rem, calc((100% - 1312px) / 2))' }}
        >
          <motion.div style={{ x }} className="flex gap-6 will-change-transform">
            {timeline.map((t, i) => (
              <button
                key={t.year}
                type="button"
                onClick={() => goTo(i)}
                className={cn(
                  'flex min-h-[258px] w-[403px] shrink-0 flex-col rounded-2xl p-9 text-left transition-colors duration-700 ease-out',
                  i === active ? 'bg-[#e6f3ff]' : 'bg-[#f0efe6] hover:bg-[#e9e8dc]',
                )}
              >
                <CardContent t={t} />
              </button>
            ))}
          </motion.div>
        </div>

        <div className="mx-auto mt-12 w-full max-w-[1360px] px-6">
          <div className="relative flex items-center justify-between">
            {/* track + fill run between the first and last pill centres */}
            <div className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-ink/10" style={{ left: PILL_W / 2, right: PILL_W / 2 }} aria-hidden>
              <motion.div style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-brand" />
            </div>
            {timeline.map((t, i) => (
              <button
                key={t.year}
                type="button"
                onClick={() => goTo(i)}
                style={{ width: PILL_W }}
                className={cn(
                  'relative rounded-xl py-5 text-lg font-medium transition-[background-color,color,transform] duration-500 ease-out',
                  i === active
                    ? 'bg-[#2c4aa6] text-white shadow-[0_10px_24px_-10px_rgb(44_74_166/0.7)]'
                    : i < active
                      ? 'bg-[#c9d4f2] text-ink'
                      : 'bg-[#f0efe6] text-ink hover:bg-[#e6e4d6]',
                )}
              >
                {t.year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Timeline() {
  return (
    <>
      <PinnedTimeline />
      <SwipeTimeline />
    </>
  )
}
