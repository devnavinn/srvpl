import type { ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { Header, PartnerStrip, WaveBackground } from '@/components/home/hero'
import { cn } from '@/lib/utils'

/** Dark wave hero used by inner pages: label row, 3-line headline, intro copy, partner strip. */
export function PageHero({
  label,
  lines,
  intro,
  next,
  introPosition = 'bottom',
}: {
  label: string
  /** Each line with its colour; typically brand / white / brand. */
  lines: { text: string; className: string }[]
  intro: ReactNode
  /** id of the section "Scroll to discover" jumps to */
  next: string
  /** top/bottom: beside the headline on desktop; below: under it, left-aligned */
  introPosition?: 'top' | 'bottom' | 'below'
}) {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], [0, 200])

  return (
    <section className="relative overflow-hidden bg-navy px-4 text-white sm:px-6">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <WaveBackground />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/80" />

      <Header />

      <div className="relative z-10 mx-auto max-w-[1312px] pt-28 sm:pt-36">
        <div className="flex items-center justify-between border-t border-white/15 pt-6 text-sm">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            {label}
          </motion.p>
          <a href={`#${next}`} className="hidden items-center gap-3 sm:flex">
            Scroll to discover
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
              <ArrowDown className="size-4" />
            </motion.span>
          </a>
        </div>

        <div
          className={cn(
            'mt-6 flex flex-col gap-10 pb-16 sm:pb-24',
            introPosition !== 'below' && 'lg:flex-row lg:justify-between',
            introPosition === 'bottom' && 'lg:items-end',
            introPosition === 'top' && 'lg:items-start',
          )}
        >
          <h1
            className={cn(
              'text-[clamp(2.5rem,5.2vw,4.25rem)] leading-[1.12] font-semibold tracking-tight',
              introPosition === 'below' && 'w-full',
            )}
          >
            {lines.map((line, i) => (
              <span key={line.text} className="block overflow-hidden">
                <motion.span
                  className={`block ${line.className}`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.35 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className={cn(
              'text-[15px] leading-snug font-medium text-white/90',
              introPosition === 'below' ? 'max-w-[500px] lg:-mt-14' : 'max-w-[412px]',
              introPosition === 'bottom' && 'lg:mb-3',
              introPosition === 'top' && 'lg:mt-6',
            )}
          >
            {intro}
          </motion.p>
        </div>
      </div>

      <PartnerStrip delay={1} />
    </section>
  )
}
