import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Eyebrow, Reveal } from '@/components/home/shared'
import { cn } from '@/lib/utils'
import { leaders } from './data'

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 122 96" className={className} aria-hidden>
      <path d="M0 0h50v52L33 96H12l14-44H0zM72 0h50v52l-17 44H84l14-44H72z" fill="currentColor" />
    </svg>
  )
}

export function Leadership() {
  const [active, setActive] = useState(0)
  const leader = leaders[active]

  return (
    <section className="relative overflow-hidden bg-[#19191b] px-4 py-24 text-white sm:px-6">
      <div className="mx-auto max-w-[1312px]">
        <div className="grid gap-4 border-b border-white/20 pb-12 lg:grid-cols-[392px_1fr] lg:gap-x-0">
          <Reveal>
            <Eyebrow className="text-white">Leadership</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-[520px] text-3xl leading-[1.3] font-medium tracking-tight sm:text-[40px]">
              Leadership That Drives Our Vision Forward
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[360px_1fr] lg:gap-8">
          <Reveal delay={0.1} className="order-2 lg:order-1 lg:mt-[82px]">
            <ul className="space-y-1">
              {leaders.map((l, i) => (
                <li key={l.name}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      'relative flex w-full items-center gap-6 rounded-2xl px-4 py-3.5 text-left transition-colors',
                      i !== active && 'hover:bg-white/[0.03]',
                    )}
                    aria-pressed={i === active}
                  >
                    {i === active && (
                      <motion.span
                        layoutId="leader-active"
                        className="absolute inset-0 rounded-2xl bg-white/[0.07]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <img
                      src={l.avatar}
                      alt=""
                      className={cn(
                        'relative size-16 rounded-md object-cover grayscale transition',
                        i === active ? 'opacity-100' : 'opacity-70',
                      )}
                    />
                    <span className="relative">
                      <span className="block text-xl">{l.name}</span>
                      <span className="mt-1 block text-white/50">{l.role}</span>
                    </span>
                    {i !== active && i + 1 !== active && (
                      <span className="absolute inset-x-4 -bottom-0.5 h-px bg-white/15" aria-hidden />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal delay={0.1}>
              <p className="max-w-[370px] text-[15px] leading-snug text-white/75">
                Meet the leaders driving our vision, strategy, and continued growth.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-10 md:grid-cols-[323px_1fr] md:gap-11">
              <div className="relative aspect-[323/366] overflow-hidden rounded-2xl bg-white/5">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={leader.name}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    {leader.photo ? (
                      <img src={leader.photo} alt={leader.name} className="size-full object-cover grayscale" />
                    ) : (
                      // Placeholder until a full portrait is supplied: blurred backdrop + crisp avatar.
                      <div className="relative grid size-full place-items-center">
                        <img src={leader.avatar} alt="" className="absolute inset-0 size-full scale-125 object-cover blur-2xl grayscale opacity-60" />
                        <img src={leader.avatar} alt={leader.name} className="relative size-32 rounded-full object-cover grayscale ring-4 ring-white/10" />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col">
                <QuoteMark className="ml-auto w-[122px] text-[#2c3f87] md:mr-24" />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={leader.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    className="mt-auto pt-10"
                  >
                    <p className="max-w-[460px] text-base leading-snug text-white/50">{leader.quote}</p>
                    <div className="mt-10 max-w-[460px] border-t border-white/20 pt-6">
                      <p className="text-xl">{leader.name}</p>
                      <p className="mt-1.5 text-white/50">{leader.role}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
