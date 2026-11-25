import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
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

const CARD = 310
const PEEK = 94

export function CoreValues() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % values.length), 3500)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_60%_60%,rgb(51_85_184/0.13),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1312px]">
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute left-[6%] hidden lg:block"
          >
            <DotChevrons className="w-[270px]" />
          </motion.div>
          <Reveal className="text-center">
            <Eyebrow className="justify-center text-ink">Core Values</Eyebrow>
            <h2 className="mt-3 text-3xl leading-[1.3] font-medium tracking-tight text-ink sm:text-[40px]">
              The Values That
              <br />
              Drive Us
            </h2>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute right-[6%] hidden lg:block"
          >
            <DotChevrons className="w-[270px]" flip />
          </motion.div>
        </div>

        {/* Desktop: overlapping deck; the active card rises to the top. */}
        <Reveal y={30} className="mt-24 hidden sm:block">
          <div
            className="relative h-[307px]"
            style={{ width: CARD + PEEK * (values.length - 1) }}
            onMouseLeave={() => setPaused(false)}
          >
            {values.map((v, i) => {
              const isActive = i === active
              return (
                <motion.button
                  key={v.title}
                  type="button"
                  onMouseEnter={() => {
                    setPaused(true)
                    setActive(i)
                  }}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  animate={{ y: isActive ? -8 : 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                  className="absolute top-0 flex h-full flex-col overflow-hidden rounded-2xl bg-white text-left shadow-[-18px_0_40px_-12px_rgb(15_23_42/0.18)] outline-none"
                  style={{ left: i * PEEK, width: CARD, zIndex: 10 - Math.abs(i - active) }}
                  aria-pressed={isActive}
                >
                  <ValueCardBody index={i} active={isActive} />
                </motion.button>
              )
            })}
          </div>
        </Reveal>

        {/* Mobile: simple stack */}
        <div className="mt-14 grid gap-4 sm:hidden">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05} className="overflow-hidden rounded-2xl bg-white shadow-md">
              <ValueCardBody index={i} active />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ValueCardBody({ index, active }: { index: number; active: boolean }) {
  const v = values[index]
  const Icon = v.icon
  return (
    <>
      <div className="flex flex-1 flex-col px-9 pt-9">
        <div className="flex items-start justify-between">
          <span className="text-lg text-ink/70">/{String(index + 1).padStart(3, '0')}</span>
          <Icon className="size-11 text-brand" strokeWidth={1.25} />
        </div>
        <h3 className="mt-auto pb-6 text-xl font-semibold tracking-tight text-ink">{v.title}</h3>
      </div>
      <div className="relative h-1 bg-neutral-200">
        <motion.div
          className="absolute inset-y-0 left-0 bg-brand"
          initial={false}
          animate={{ width: active ? '100%' : '0%' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      <p className="h-[102px] max-w-[240px] px-9 pt-8 text-[15px] leading-snug text-ink/70">{v.body}</p>
    </>
  )
}
