import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Eyebrow, Reveal } from '@/components/home/shared'
import { cn } from '@/lib/utils'
import { values } from './data'

/** Two halftone chevrons "<<" built from a dot grid; mirrored for the right side. */
function DotChevrons({ className, flip }: { className?: string; flip?: boolean }) {
  const W = 270
  const H = 150
  const step = 9
  const dots: { x: number; y: number; r: number; o: number }[] = []
  for (const offset of [0, 120]) {
    for (let x = 0; x <= 150; x += step) {
      for (let y = 0; y <= H; y += step) {
        // distance from the chevron's diagonal edge (apex at x=0, mid-height)
        const d = x - Math.abs(y - H / 2)
        if (d < 0 || d > 70) continue
        const t = d / 70
        dots.push({ x: x + offset, y, r: 2.2 * (1 - t) + 0.5, o: 1 - t * 0.75 })
      }
    }
  }
  return (
    <svg viewBox={`-4 -4 ${W + 8} ${H + 8}`} className={cn(className, flip && '-scale-x-100')} aria-hidden>
      {dots.map((d, i) => (
        <rect
          key={i}
          x={d.x - d.r}
          y={d.y - d.r}
          width={d.r * 2}
          height={d.r * 2}
          fill="#3355b8"
          opacity={d.o}
          transform={`rotate(45 ${d.x} ${d.y})`}
        />
      ))}
    </svg>
  )
}

const GAP = 16
const N = values.length

/**
 * Pinned while scrolling (desktop). Phase 1: the cards start stacked like a deck
 * on the left and fan out into a row. Phase 2: a blue progress line fills under
 * each card in turn. Same choreography as zarion.webflow.io/about "built around control".
 */
function PinnedValues() {
  const section = useRef<HTMLElement>(null)
  const row = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(1200)
  const { scrollYProgress: p } = useScroll({ target: section, offset: ['start start', 'end end'] })

  useLayoutEffect(() => {
    const el = row.current
    if (!el) return
    const ro = new ResizeObserver(() => setWidth(el.clientWidth))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const cardW = (width - GAP * (N - 1)) / N
  const chevronsIn = useTransform(p, [0, 0.15], [0, 1])

  return (
    <section ref={section} className="relative hidden h-[300vh] bg-white lg:block">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_60%_60%,rgb(51_85_184/0.13),transparent_70%)]" />

        <div className="relative mx-auto w-full max-w-[1312px]">
          <div className="relative flex items-center justify-center">
            <motion.div style={{ opacity: chevronsIn }} className="absolute left-[6%]">
              <DotChevrons className="w-[220px]" />
            </motion.div>
            <Reveal className="text-center">
              <Eyebrow className="justify-center text-ink">Core Values</Eyebrow>
              <h2 className="mt-3 text-[40px] leading-[1.3] font-medium tracking-tight text-ink">
                The Values That
                <br />
                Drive Us
              </h2>
            </Reveal>
            <motion.div style={{ opacity: chevronsIn }} className="absolute right-[6%]">
              <DotChevrons className="w-[220px]" flip />
            </motion.div>
          </div>

          <div ref={row} className="relative mt-16 h-[307px]">
            {values.map((_, i) => (
              <DeckCard key={i} index={i} p={p} cardW={cardW} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function DeckCard({ index, p, cardW }: { index: number; p: MotionValue<number>; cardW: number }) {
  // Phase 1 (0.08 → 0.42): from a fanned stack to the final column.
  const stackX = index * 52
  const finalX = index * (cardW + GAP)
  const x = useTransform(p, [0.08, 0.42], [stackX, finalX])
  const scale = useTransform(p, [0.08, 0.42], [1 - index * 0.05, 1])
  const y = useTransform(p, [0.08, 0.42], [index * 8, 0])
  // Phase 2 (0.48 → 0.92): each card's line fills one after another.
  const slot = 0.44 / N
  const start = 0.48 + index * slot
  const fill = useTransform(p, [start, start + slot], [0, 1])

  return (
    <motion.div
      style={{ x, y, scale, width: cardW, zIndex: N - index }}
      className="absolute top-0 left-0 flex h-full origin-left flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-22px_rgb(15_23_42/0.35)] will-change-transform"
    >
      <ValueCardBody index={index} fill={fill} />
    </motion.div>
  )
}

/** Mobile / tablet: plain grid; each line fills as its card scrolls into view. */
function StackedValues() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_60%_60%,rgb(51_85_184/0.12),transparent_70%)]" />
      <Reveal className="relative text-center">
        <Eyebrow className="justify-center text-ink">Core Values</Eyebrow>
        <h2 className="mt-3 text-3xl leading-[1.3] font-medium tracking-tight text-ink sm:text-[40px]">
          The Values That Drive Us
        </h2>
      </Reveal>
      <div className="relative mt-12 grid gap-4 sm:grid-cols-2">
        {values.map((_, i) => (
          <MobileValueCard key={i} index={i} />
        ))}
      </div>
    </section>
  )
}

function MobileValueCard({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'start 45%'] })
  const y = useTransform(scrollYProgress, [0, 0.6], [40, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  return (
    <motion.div ref={ref} style={{ y, opacity }} className="flex min-h-[280px] flex-col overflow-hidden rounded-2xl bg-white shadow-md">
      <ValueCardBody index={index} fill={scrollYProgress} />
    </motion.div>
  )
}

function ValueCardBody({ index, fill }: { index: number; fill: MotionValue<number> }) {
  const v = values[index]
  const Icon = v.icon
  return (
    <>
      <div className="flex flex-1 flex-col px-7 pt-7">
        <div className="flex items-start justify-between">
          <span className="font-mono text-base tracking-widest text-ink/70">{String(index + 1).padStart(3, '0')}</span>
          <Icon className="size-11 text-brand" strokeWidth={1.25} />
        </div>
        <h3 className="mt-auto pb-6 text-xl font-semibold tracking-tight text-ink">{v.title}</h3>
      </div>
      <div className="relative h-1 bg-neutral-200">
        <motion.div style={{ scaleX: fill }} className="absolute inset-0 origin-left bg-brand" />
      </div>
      <p className="min-h-[102px] px-7 pt-7 pb-6 text-[15px] leading-snug text-ink/70">{v.body}</p>
    </>
  )
}

export function CoreValues() {
  return (
    <>
      <PinnedValues />
      <StackedValues />
    </>
  )
}
