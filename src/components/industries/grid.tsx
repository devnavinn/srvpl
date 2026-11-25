import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Eyebrow, Reveal } from '@/components/home/shared'
import { cn } from '@/lib/utils'
import { industryCards } from './data'

/** Horizontal track of industry cards; hovering a card "lights it up" with its product photo. */
export function IndustryGrid() {
  const [active, setActive] = useState(0)
  const track = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  // Track whether the row can scroll further, to enable/disable the arrows.
  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () =>
      setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const scrollByCard = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.querySelector('article')
    if (el && card) el.scrollBy({ left: dir * (card.clientWidth + 8), behavior: 'smooth' })
  }

  return (
    <section id="industry-grid" className="relative overflow-hidden bg-white pt-20 pb-20 sm:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_100%_100%,rgb(51_85_184/0.2),transparent_70%)]" />
      <div className="bg-grid-light pointer-events-none absolute top-0 left-0 h-72 w-80 [mask-image:radial-gradient(circle_at_top_left,black,transparent_70%)]" />
      <div className="bg-grid-light pointer-events-none absolute top-0 right-0 h-72 w-80 [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]" />

      <div className="relative mx-auto flex max-w-[1360px] flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
        <Reveal>
          <Eyebrow className="text-ink">Industry Grid</Eyebrow>
          <h2 className="mt-3 max-w-[620px] text-3xl leading-[1.3] font-medium tracking-tight text-ink/85 sm:text-[40px]">
            Where Category Expertise Meets Market Opportunity.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-6 lg:items-end">
          <p className="max-w-[550px] text-sm leading-snug text-ink/55 lg:mt-12">
            From emerging lifestyle trends to established consumer categories, we understand the products, people and
            market dynamics that shape each industry.
          </p>
          <div className="flex gap-2">
            {([-1, 1] as const).map((dir) => {
              const disabled = dir === -1 ? edge.start : edge.end
              const Icon = dir === -1 ? ArrowLeft : ArrowRight
              return (
                <button
                  key={dir}
                  type="button"
                  onClick={() => scrollByCard(dir)}
                  disabled={disabled}
                  aria-label={dir === -1 ? 'Previous industries' : 'Next industries'}
                  className="grid size-10 place-items-center border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30"
                >
                  <Icon className="size-4" />
                </button>
              )
            })}
          </div>
        </Reveal>
      </div>

      <motion.div
        ref={track}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: '-80px' }}
        className="no-scrollbar relative mt-10 flex snap-x snap-mandatory gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain pr-4 [--gutter:1rem] sm:pr-6 sm:[--gutter:1.5rem]"
        style={{
          paddingLeft: 'max(var(--gutter), calc((100% - 1312px) / 2))',
          scrollPaddingLeft: 'max(var(--gutter), calc((100% - 1312px) / 2))',
        }}
      >
        {industryCards.map((c, i) => {
          const on = i === active
          return (
            <motion.article
              key={c.title}
              variants={{
                hidden: { opacity: 0, y: 40 },
                shown: { opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
              className={cn(
                'relative flex h-[400px] w-[80vw] max-w-[322px] shrink-0 snap-start flex-col overflow-hidden rounded-lg outline-none',
                'transition-colors duration-500',
                on ? 'bg-[#9c9891] text-white' : 'bg-[#f3f5fb] text-ink',
              )}
            >
              {/* product photo fades / zooms in when active */}
              <motion.img
                src={c.src}
                alt=""
                initial={false}
                animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 1.12 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 bottom-0 h-[70%] w-full object-cover [mask-image:linear-gradient(to_bottom,transparent,black_30%)]"
              />
              <div
                className={cn(
                  'pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-transparent transition-opacity duration-500',
                  on ? 'opacity-100' : 'opacity-0',
                )}
              />

              <div className="relative flex items-start justify-between gap-4 px-5 pt-5">
                <h3 className={cn('font-light tracking-tight transition-all duration-500', on ? 'text-2xl' : 'max-w-[160px] text-2xl')}>
                  {c.title}
                </h3>
                <span className={cn('text-lg font-light transition-all duration-500', !on && 'mt-4')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div
                className={cn(
                  'relative mx-2 mt-4 h-px transition-colors duration-500',
                  on ? 'bg-white/30' : 'bg-ink/15',
                )}
              />
              <p className={cn('relative px-5 pt-5 text-sm leading-snug', on ? 'text-white/90' : 'text-ink/80')}>{c.body}</p>

              <motion.a
                href="/#industries"
                initial={false}
                animate={{ opacity: on ? 1 : 0, y: on ? 0 : 16 }}
                transition={{ duration: 0.4, delay: on ? 0.2 : 0 }}
                className={cn(
                  'group absolute bottom-6 left-5 flex items-center gap-3 border border-white/70 py-1 pr-1 pl-4 text-[15px] text-white backdrop-blur-sm',
                  !on && 'pointer-events-none',
                )}
                tabIndex={on ? 0 : -1}
              >
                Know more
                <span className="grid size-8 place-items-center bg-[#2c4aa6] transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" />
                </span>
              </motion.a>
            </motion.article>
          )
        })}
      </motion.div>
    </section>
  )
}
