import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Eyebrow, Reveal } from '@/components/home/shared'
import { cn } from '@/lib/utils'
import { timeline } from './data'

// Left inset matching the 1312px content column used by every other section.
const GUTTER = 'max(var(--gutter), calc((100% - 1312px) / 2))'

export function Timeline() {
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
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-end md:justify-between">
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
            SRVPL was founded in <span className="text-ink">Kolkata</span> with a vision to connect global brands with
            the Indian market.
          </p>
        </Reveal>
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
            <span className="flex w-full items-center justify-between text-lg">
              <span className="text-brand">{t.tag}</span>
              <span className="text-ink/70">{t.year}</span>
            </span>
            <span className="mt-14 text-[22px] font-semibold tracking-tight text-ink">{t.title}</span>
            <span className="mt-6 text-[15px] leading-snug text-ink/70">{t.body}</span>
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
