import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { NumberTicker } from '@/components/ui/number-ticker'
import { ArrowButton, Eyebrow, Reveal } from './shared'

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const smallY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const bigY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section id="about-us" className="relative overflow-hidden bg-white px-4 pt-16 sm:px-6 sm:pt-20">
      <div className="bg-grid-light pointer-events-none absolute top-0 left-0 h-72 w-64 [mask-image:radial-gradient(circle_at_top_left,black,transparent_70%)]" />
      <div className="pointer-events-none absolute top-1/3 -left-40 size-[600px] rounded-full bg-brand/10 blur-3xl" />

      <div ref={ref} className="relative mx-auto max-w-[1116px]">
        <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-9">
          <Eyebrow className="shrink-0 text-ink/80">Who we are</Eyebrow>
          <h2 className="text-3xl leading-tight font-semibold tracking-tight text-ink sm:text-[40px]">
            Building Brands. Expanding Markets.
            <br />
            Creating Long-Term Growth.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_440px] lg:gap-10">
          <div className="relative">
            <Reveal>
              <p className="text-7xl font-medium tracking-tighter text-ink sm:text-8xl">
                <NumberTicker value={40} className="tracking-tighter text-ink" />+
              </p>
              <p className="mt-1 text-[15px] text-ink">Years of Building What Matters</p>
            </Reveal>

            <motion.img
              style={{ y: smallY }}
              src="/home/about/team.png"
              alt="Team discussing outdoors"
              className="mt-8 mb-16 aspect-square w-40 object-cover sm:absolute sm:mb-0 sm:top-0 sm:right-0 sm:mt-0 sm:w-[186px]"
            />

            <Reveal delay={0.1} className="mt-10 max-w-[450px] sm:mt-24">
              <p className="text-sm leading-relaxed text-ink">
                SRVPL is a commerce, marketing, and technology platform — not an agency, not a distributor. We own
                brands ourselves, build brands for founders starting from scratch, and run the marketplace, D2C, and
                quick-commerce operations behind all of it, powered by technology we built in-house.
              </p>
              <ArrowButton href="/about" className="mt-7">About Us</ArrowButton>
            </Reveal>
          </div>

          <motion.div style={{ y: bigY }} className="overflow-hidden">
            <motion.img
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              src="/home/about/notebook.png"
              alt="Planning in a notebook"
              className="aspect-square w-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Global reach */}
      <div className="relative mx-auto mt-20 max-w-[1312px]">
        <div className="relative z-10 flex justify-center">
          <Reveal className="relative">
            <motion.span
              initial={{ rotate: 0, opacity: 0 }}
              whileInView={{ rotate: -16, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="absolute -top-8 -left-10 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm whitespace-nowrap text-ink shadow-md"
            >
              <span className="size-2 rounded-full bg-brand" /> Total Global Users
            </motion.span>
            <p className="bg-gradient-to-r from-brand to-ink bg-clip-text text-6xl font-semibold tracking-tight text-transparent sm:text-8xl">
              <NumberTicker value={68000} className="tracking-tight text-transparent" />+
            </p>
          </Reveal>
        </div>
        <Reveal y={40}>
          <img src="/home/about/world-map.png" alt="Map showing USA, India and Japan" className="-mt-2 w-full sm:-mt-40" />
        </Reveal>

        <Reveal className="relative -mt-6 pb-20 text-center sm:-mt-72">
          <Eyebrow className="justify-center text-ink/80">Go global, launch local</Eyebrow>
          <h3 className="mt-2 text-3xl font-medium tracking-tight text-ink/85 sm:text-[40px]">
            A Local Team, Ready From Day One.
          </h3>
          <p className="mx-auto mt-6 max-w-3xl text-sm text-ink">
            The rulebook changes from India to the USA to the Middle East: compliance, pricing, platform rules, consumer
            behavior. We take the pressure of learning each one. You take the spotlight. Our repeatable, proven runway
            gets every brand to market faster.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
