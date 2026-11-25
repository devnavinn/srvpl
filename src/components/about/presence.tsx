import { motion } from 'motion/react'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Eyebrow, Reveal } from '@/components/home/shared'

export function GlobalPresence() {
  return (
    <section className="relative bg-white px-4 pt-16 pb-8 sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-[1312px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <Reveal>
            <Eyebrow className="text-ink">Global Presence</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl leading-[1.3] font-medium tracking-tight text-ink/85 sm:text-right sm:text-[40px]">
              Rooted In <span className="bg-gradient-to-r from-brand to-[#1e2a5a] bg-clip-text text-transparent">India</span>.
              <br />
              Ready For The{' '}
              <span className="bg-gradient-to-r from-brand to-[#1e2a5a] bg-clip-text text-transparent">Middle East</span>.
            </h2>
          </Reveal>
        </div>

        {/* The map PNG is transparent with lots of empty canvas; crop to just the continents. */}
        <Reveal y={40} className="relative mx-auto mt-6 aspect-[1512/420] max-w-[1312px] overflow-hidden sm:mt-2">
          <img
            src="/home/about/world-map.png"
            alt="Map showing USA, India and Japan connected"
            className="w-full"
            style={{ marginTop: '-15.5%' }}
          />
        </Reveal>

        <div className="relative z-10 -mt-4 flex justify-center sm:-mt-10">
          <Reveal className="relative">
            <motion.span
              initial={{ rotate: 0, opacity: 0 }}
              whileInView={{ rotate: -16, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="absolute -top-6 -left-12 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm whitespace-nowrap text-ink shadow-md sm:-top-4 sm:-left-14"
            >
              <span className="size-2 rounded-full bg-brand" /> Total Global Users
            </motion.span>
            <p className="bg-gradient-to-r from-brand to-ink bg-clip-text text-6xl font-semibold tracking-tight text-transparent sm:text-8xl">
              <NumberTicker value={68000} className="tracking-tight text-transparent" />+
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-[480px] text-center text-[15px] leading-snug text-ink/60">
            Headquartered in <span className="text-ink">Kolkata</span>, with operations spanning India and the Middle
            East. Our teams work across time zones to support brands launching and scaling in both markets.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
