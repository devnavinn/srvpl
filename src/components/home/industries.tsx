import { useRef, useState } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { Plus } from 'lucide-react'
import { Eyebrow, Reveal } from './shared'
import { brands, industries } from './data'

const COPIES = 4 // repeat the categories so the loop never shows a gap on wide screens
const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

/**
 * Infinite category slider. It drifts on its own, speeds up while the page
 * scrolls, and reverses direction when you scroll back up. Pauses on hover.
 */
function IndustrySlider({ baseVelocity = -2.5 }: { baseVelocity?: number }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`)
  const direction = useRef(1)
  const [paused, setPaused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '100px' })

  useAnimationFrame((_, delta) => {
    if (paused || !inView) return
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    const f = velocityFactor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    moveBy += direction.current * moveBy * f
    baseX.set(baseX.get() + moveBy)
  })

  const items = Array.from({ length: COPIES }, () => industries).flat()

  return (
    <div
      ref={ref}
      className="relative overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div className="flex w-max" style={{ x }}>
        {items.map((item, i) => (
          <motion.figure
            key={i}
            className="w-44 shrink-0 cursor-pointer pr-1 sm:w-[232px]"
            whileHover={{ scale: 1.08, rotate: i % 2 ? 4 : -4, zIndex: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <img src={item.src} alt={item.name} className="w-full select-none" draggable={false} />
          </motion.figure>
        ))}
      </motion.div>
    </div>
  )
}

export function Industries() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const textX = useTransform(scrollYProgress, [0, 1], ['10%', '-40%'])

  return (
    <section id="industries" ref={ref} className="relative overflow-hidden bg-ink pt-24 text-white">
      <div className="bg-grid-dark pointer-events-none absolute top-[30%] left-0 h-[600px] w-[300px] [mask-image:linear-gradient(to_right,black,transparent)]" />

      <Reveal className="relative px-4 text-center">
        <Eyebrow className="justify-center">Industries we serve</Eyebrow>
        <h2 className="mt-3 text-3xl leading-tight font-semibold tracking-tight sm:text-[40px]">
          Industry Expertise.
          <br />
          Limitless Opportunities.
        </h2>
      </Reveal>

      <div className="relative mt-16">
        <motion.p
          style={{ x: textX }}
          className="text-outline pointer-events-none absolute top-1/2 left-0 -translate-y-[60%] text-[clamp(5rem,13vw,12rem)] leading-none font-bold tracking-tight whitespace-nowrap uppercase"
          aria-hidden
        >
          Industries we serve · Industries we serve
        </motion.p>
        <IndustrySlider />
      </div>

      <div className="mx-auto mt-20 h-px max-w-[1240px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <Brands />
    </section>
  )
}

function Corner({ className }: { className: string }) {
  return (
    <span className={`absolute z-10 grid size-5 place-items-center bg-white text-ink ${className}`}>
      <Plus className="size-3" strokeWidth={1.5} />
    </span>
  )
}

function Brands() {
  return (
    <div id="our-brands" className="relative px-4 py-20 sm:px-6">
      <Reveal className="text-center">
        <Eyebrow className="justify-center">Our brand portfolio</Eyebrow>
        <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-[40px]">Brands Launched From Our Platform</h2>
        <p className="mx-auto mt-5 max-w-3xl text-sm text-white/90">
          From international labels we&apos;ve brought to India, to owned brands built from the ground up, SRVPL&apos;s
          launchpad powers a growing portfolio across lifestyle, tech, and design-forward categories.
        </p>
      </Reveal>

      <div className="relative mx-auto mt-14 max-w-[1166px] border border-dashed border-white/70">
        <Corner className="-top-2.5 -left-2.5" />
        <Corner className="-top-2.5 -right-2.5" />
        <Corner className="-bottom-2.5 -left-2.5" />
        <Corner className="-right-2.5 -bottom-2.5" />

        <div className="grid grid-cols-2 lg:grid-cols-4">
          {brands.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`group flex h-40 items-center justify-center border-b border-dashed border-white/70 sm:h-52 lg:border-r ${
                i % 2 === 0 ? 'border-r' : ''
              } ${i >= 3 ? 'lg:border-b-0' : ''}`}
            >
              {b.src ? (
                <img
                  src={b.src}
                  alt={b.name}
                  className={`max-h-16 w-auto max-w-[60%] opacity-80 grayscale transition duration-300 group-hover:scale-110 group-hover:opacity-100 sm:max-h-[100px] ${"className" in b ? b.className : ""}`}
                />
              ) : (
                <span className="flex items-center gap-1 text-white/80 transition duration-300 group-hover:scale-110 group-hover:text-white">
                  <span className="grid size-9 place-items-center rounded-full border-[5px] border-current text-lg font-black">d</span>
                  <span className="text-xl font-bold">Cheerdots</span>
                </span>
              )}
            </motion.div>
          ))}
          <a
            href="#"
            className="col-span-2 flex h-28 items-center justify-center text-[15px] transition-colors hover:bg-white hover:text-ink lg:col-span-1 lg:col-start-4 lg:row-span-2 lg:row-start-1 lg:h-auto"
          >
            View all Brands
          </a>
        </div>
      </div>
    </div>
  )
}
