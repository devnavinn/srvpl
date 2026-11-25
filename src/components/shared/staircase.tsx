import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { ArrowButton, Eyebrow, Reveal } from '@/components/home/shared'
import { cn } from '@/lib/utils'

const CARD_H = 248
const STEP_Y = 270 // vertical distance between stair steps
const STEP_X = 228 // horizontal distance between stair steps
const CARD_W = 619 // pill (73) + gap (19) + card (527)

export type StaircaseConfig = {
  id: string
  eyebrow: string
  heading: string
  body: string
  /** Where each step card links to */
  href: string
  cta?: { label: string; href: string }
  steps: { title: string; body: string }[]
  /** Show the 3D wireframe shapes on the right */
  shapes?: boolean
}

function Intro({ c, mobile }: { c: StaircaseConfig; mobile?: boolean }) {
  return (
    <>
      <Eyebrow className="text-ink">{c.eyebrow}</Eyebrow>
      <h2 className={cn('mt-3 leading-[1.3] font-medium tracking-tight text-ink', mobile ? 'text-3xl sm:text-[40px]' : 'text-[40px]')}>
        {c.heading}
      </h2>
      <p className={cn('max-w-[480px] text-[15px] leading-snug text-ink/70', mobile ? 'mt-6' : 'mt-12')}>{c.body}</p>
      {c.cta && (
        <ArrowButton variant="light" href={c.cta.href} className={mobile ? 'mt-8' : 'mt-10'}>
          {c.cta.label}
        </ArrowButton>
      )}
    </>
  )
}

function DiamondCheck({ className }: { className?: string }) {
  return (
    <span className={cn('grid size-[58px] shrink-0 place-items-center rounded-lg bg-ink text-white', className)}>
      <svg viewBox="0 0 32 32" className="size-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden>
        <path d="M16 3 29 16 16 29 3 16Z" />
        <path d="m10.5 16 4 4 7-8" strokeLinecap="round" />
      </svg>
    </span>
  )
}

/** Three short bars; they darken one by one as this step becomes the current one. */
function StepBars({ lit }: { lit: MotionValue<number> }) {
  return (
    <span className="flex w-[22px] flex-col gap-[5px]" aria-hidden>
      {[0, 1, 2].map((b) => (
        <Bar key={b} lit={lit} index={b} />
      ))}
    </span>
  )
}

function Bar({ lit, index }: { lit: MotionValue<number>; index: number }) {
  const bg = useTransform(lit, [index / 3, (index + 1) / 3], ['#d4d4d8', '#0c0c0f'])
  return <motion.span style={{ backgroundColor: bg }} className="h-[2px] w-full rounded-full" />
}

function StepCard({ c, index, lit }: { c: StaircaseConfig; index: number; lit: MotionValue<number> }) {
  const s = c.steps[index]
  return (
    <a href={c.href} className="group flex h-full gap-[19px]">
      <span className="flex w-[60px] shrink-0 flex-col items-center justify-between rounded-full bg-white pt-7 pb-8 sm:w-[73px] sm:pt-9 sm:pb-10 shadow-[0_10px_40px_-20px_rgb(15_23_42/0.25)]">
        <span className="text-xl font-medium text-ink">{String(index + 1).padStart(2, '0')}</span>
        <StepBars lit={lit} />
      </span>
      <span className="flex flex-1 flex-col rounded-[28px] bg-white p-6 sm:p-9 shadow-[0_10px_40px_-20px_rgb(15_23_42/0.25)] transition-shadow duration-300 group-hover:shadow-[0_24px_60px_-24px_rgb(51_85_184/0.45)]">
        <span className="flex items-start gap-5">
          <DiamondCheck />
          <span className="max-w-[180px] text-[22px] leading-tight font-medium tracking-tight text-ink">{s.title}</span>
          <ArrowUpRight
            className="ml-auto size-7 text-ink transition-transform duration-300 group-hover:rotate-45"
            strokeWidth={2.5}
          />
        </span>
        <span className="mt-auto max-w-[420px] text-[15px] leading-snug text-ink/70">{s.body}</span>
      </span>
    </a>
  )
}

/**
 * Desktop: the section pins to the viewport while the user scrolls through it.
 * Each stair-step card rises up into place in turn, and the whole staircase
 * slides upward so the newest card is always on screen.
 */
function PinnedStaircase({ c }: { c: StaircaseConfig }) {
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [travel, setTravel] = useState(0)

  // Lenis already eases the scroll itself, so the scroll position drives the cards directly.
  const { scrollYProgress: progress } = useScroll({ target: section, offset: ['start start', 'end end'] })

  // How far the staircase must move up so the last card ends fully in view.
  useLayoutEffect(() => {
    const measure = () => {
      const el = stage.current
      if (!el) return
      const stackH = CARD_H + STEP_Y * (c.steps.length - 1)
      setTravel(Math.max(0, stackH - el.clientHeight + 40))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [c.steps.length])

  const stackY = useTransform(progress, [0.05, 0.95], [0, -travel])
  const shapesY = useTransform(progress, [0, 1], [120, -220])
  const n = c.steps.length

  return (
    <section
      ref={section}
      id={c.id}
      className="relative hidden lg:block"
      style={{ height: `${100 + n * 60}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-br from-white via-slate-50 to-[#dfe4f3]">
        <div className="bg-grid-light pointer-events-none absolute top-0 left-0 h-64 w-72 [mask-image:radial-gradient(circle_at_top_left,black,transparent_70%)]" />
        <div className="bg-grid-light pointer-events-none absolute top-0 right-0 h-64 w-72 [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]" />
        <div className="pointer-events-none absolute -right-40 bottom-[-10%] size-[720px] rounded-full bg-[#c3cbe8]/70 blur-3xl" />
        {c.shapes && (
        <motion.div
          style={{ y: shapesY }}
          className="pointer-events-none absolute top-[22%] right-0 w-[276px] [mask-image:linear-gradient(to_right,transparent,black_35%)]"
        >
          <img
            src="/solutions/shapes.png"
            alt=""
            className="w-full mix-blend-multiply [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]"
          />
        </motion.div>
        )}

        <div className="relative mx-auto h-full max-w-[1312px] pt-20">
          <motion.div style={{ y: stackY }} className="relative z-20 max-w-[540px]">
            <Intro c={c} />
          </motion.div>

          <div ref={stage} className="absolute inset-x-0 top-20 bottom-0">
            <motion.div style={{ y: stackY }} className="relative">
              {c.steps.map((_, i) => (
                <RisingCard key={i} c={c} index={i} n={n} progress={progress} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function RisingCard({ c, index, n, progress }: { c: StaircaseConfig; index: number; n: number; progress: MotionValue<number> }) {
  // Card 0 is in place from the start; the others rise in evenly over the scroll.
  // Ranges must stay inside 0–1 and increase, or the browser rejects the animation.
  const first = index === 0
  const start = first ? 0 : 0.05 + ((index - 1) / (n - 1)) * 0.8
  const end = Math.min(1, start + 0.22)
  const y = useTransform(progress, [start, end], first ? [0, 0] : [260, 0])
  const opacity = useTransform(progress, [start, start + 0.12], first ? [1, 1] : [0, 1])
  const scale = useTransform(progress, [start, end], first ? [1, 1] : [0.92, 1])
  // Bars fill while the card arrives, so the newest step reads as "current".
  const lit = useTransform(progress, first ? [0, 0.15] : [start + 0.05, end], [0, 1])

  return (
    <motion.div
      style={{
        y,
        opacity,
        scale,
        top: index * STEP_Y,
        right: index * STEP_X,
        width: CARD_W,
        height: CARD_H,
        zIndex: 10 + index,
      }}
      className="absolute origin-bottom"
    >
      <StepCard c={c} index={index} lit={lit} />
    </motion.div>
  )
}

/** Mobile / tablet: a plain list where each card rises in as it scrolls into view. */
function StackedSteps({ c }: { c: StaircaseConfig }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-[#e4e8f5] px-4 py-20 sm:px-6 lg:hidden">
      <Reveal>
        <Intro c={c} mobile />
      </Reveal>
      <div className="mt-12 grid gap-5">
        {c.steps.map((_, i) => (
          <MobileCard key={i} c={c} index={i} />
        ))}
      </div>
    </section>
  )
}

function MobileCard({ c, index }: { c: StaircaseConfig; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 55%'] })
  const y = useTransform(scrollYProgress, [0, 1], [120, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])
  return (
    <motion.div ref={ref} style={{ y, opacity }} className="min-h-[220px]">
      <StepCard c={c} index={index} lit={scrollYProgress} />
    </motion.div>
  )
}

/** Staircase of numbered cards that rise into place on scroll (pinned on desktop). */
export function Staircase(c: StaircaseConfig) {
  return (
    <>
      <PinnedStaircase c={c} />
      <StackedSteps c={c} />
    </>
  )
}
