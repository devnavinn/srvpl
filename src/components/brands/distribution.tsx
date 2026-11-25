import { motion } from 'motion/react'
import { Eyebrow, Reveal } from '@/components/home/shared'
import { partnerBrands } from './data'

/** Logo wall of international brands we distribute, with dashed cell borders. */
export function BrandDistribution() {
  return (
    <section id="brand-distribution" className="relative overflow-hidden bg-white px-4 pt-20 pb-12 sm:px-6 sm:pt-24">
      <div className="bg-grid-light pointer-events-none absolute top-0 left-0 h-72 w-80 [mask-image:radial-gradient(circle_at_top_left,black,transparent_70%)]" />
      <div className="bg-grid-light pointer-events-none absolute top-0 right-0 h-72 w-80 [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-[1312px]">
        <Reveal className="text-center">
          <Eyebrow className="justify-center text-ink">Global Brand Distribution</Eyebrow>
          <h2 className="mt-3 text-3xl leading-[1.3] font-medium tracking-tight text-ink/85 sm:text-[40px]">
            Bringing Global Brands Closer.
          </h2>
          <p className="mx-auto mt-5 max-w-[830px] text-sm leading-snug text-ink/60">
            International brands we introduce and grow across India and the Middle East — from market entry and
            regulatory readiness to distribution, retail, and long-term brand building.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 overflow-hidden rounded-xl border border-dashed border-ink/20 bg-white sm:grid-cols-4 lg:grid-cols-7">
          {partnerBrands.map((b, i) => (
            <motion.a
              key={b.name}
              href="#"
              title={b.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (i % 7) * 0.05 + Math.floor(i / 7) * 0.12, duration: 0.5 }}
              className="group relative grid h-[114px] place-items-center border-r border-b border-dashed border-ink/20 transition-colors hover:bg-[#f3f5fb]"
            >
              <img
                src={b.src}
                alt={b.name}
                className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
