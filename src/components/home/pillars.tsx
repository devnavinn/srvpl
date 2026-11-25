import { motion } from 'motion/react'
import { Eyebrow, Reveal } from './shared'
import { pillars } from './data'

// Stepped staircase offsets for desktop (01 low → 03 high)
const offsets = ['lg:mt-[300px]', 'lg:mt-[150px]', 'lg:mt-0']

export function Pillars() {
  return (
    <section id="capabilities" className="relative overflow-hidden bg-ink px-4 py-20 text-white sm:px-6 sm:py-24">
      <div className="bg-grid-dark pointer-events-none absolute right-0 bottom-0 h-[500px] w-[400px] [mask-image:radial-gradient(circle_at_bottom_right,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-[1312px]">
        {/* Staircase line, drawn when it scrolls into view */}
        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          viewBox="0 0 1312 760"
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.path
            d="M-60 760 L40 660 H250 L430 480 H700 L870 310 H1180 L1320 160"
            fill="none"
            stroke="rgb(255 255 255 / 0.22)"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '-150px' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
        </svg>

        <Reveal className="lg:absolute lg:top-0 lg:left-0">
          <Eyebrow>Our three business pillars</Eyebrow>
          <h2 className="mt-3 text-3xl leading-tight font-semibold tracking-tight sm:text-[40px]">
            One Launchpad.
            <br />
            Three Engines.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:mt-0 lg:grid-cols-3 lg:gap-0">
          {pillars.map((p, i) => (
            <motion.div
              key={p.no}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`${offsets[i]} ${i === 0 ? 'lg:ml-10' : 'lg:ml-0'} border-l border-white/10 pl-4 lg:h-[300px]`}
            >
              <p className="text-3xl font-bold text-white/35">{p.no}</p>
              <h3 className="mt-10 max-w-[260px] text-lg leading-snug font-medium lg:mt-24">{p.title}</h3>
              <p className="mt-3 max-w-[290px] text-[13px] leading-relaxed tracking-tight text-white/85">{p.body}</p>
            </motion.div>
          ))}
        </div>

        <Reveal className="mt-14 lg:mt-10 lg:ml-[66%]">
          <p className="max-w-md text-[15px] text-white/60">
            Commerce and marketing get a brand moving.
            <br />
            Technology is the third engine that keeps it accelerating.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
