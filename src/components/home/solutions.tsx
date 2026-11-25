import { motion } from 'motion/react'
import { BarChart3, MonitorSmartphone, Rocket, ShoppingBag, Store, Zap } from 'lucide-react'
import { Eyebrow, LogoMark, Reveal } from './shared'
import { solutions } from './data'

function SolutionsGrid() {
  return (
    <div className="mt-16 grid grid-cols-1 border-t border-l border-dashed border-ink/15 sm:grid-cols-2 lg:grid-cols-3">
      {solutions.map((s, i) => (
        <motion.a
          key={s}
          href="#"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="group relative flex h-36 items-center justify-center overflow-hidden border-r border-b border-dashed border-ink/15 sm:h-52"
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-y-100" />
          <span className="relative max-w-[160px] text-center text-lg leading-snug font-medium text-ink uppercase transition-colors duration-300 group-hover:text-white">
            {s}
          </span>
        </motion.a>
      ))}
    </div>
  )
}

const nodes = [
  { x: 228, y: 36, Icon: ShoppingBag, color: '#ec4899', ring: '#fce7f3', size: 58 },
  { x: 560, y: 30, Icon: MonitorSmartphone, color: '#f97316', ring: '#ffedd5', size: 44 },
  { x: 515, y: 190, Icon: Zap, color: '#db2777', ring: '#fce7f3', size: 58 },
  { x: 655, y: 185, Icon: Rocket, color: '#f59e0b', ring: '#fef3c7', size: 70 },
  { x: 625, y: 305, Icon: BarChart3, color: '#16a34a', ring: '#dcfce7', size: 58 },
  { x: 96, y: 238, Icon: Store, color: '#3355b8', ring: '#dbeafe', size: 44 },
]
const dots = [
  [90, 38], [226, 101], [258, 134], [160, 155], [216, 212], [436, 157], [504, 97], [576, 199], [424, 239], [516, 303],
]
const CENTER = { x: 350, y: 156 }

function Ecosystem() {
  return (
    <div className="relative mx-auto aspect-[700/360] w-full max-w-[700px]">
      <svg viewBox="0 0 700 360" className="absolute inset-0 h-full w-full" aria-hidden>
        {[...nodes.map((n) => [n.x, n.y]), ...dots].map(([x, y], i) => (
          <motion.path
            key={i}
            d={`M${CENTER.x} ${CENTER.y} L${(CENTER.x + x) / 2} ${y} L${x} ${y}`}
            fill="none"
            stroke="#3355b8"
            strokeOpacity={0.15}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: i * 0.05 }}
          />
        ))}
        {dots.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={3.5}
            fill="#3355b8"
            stroke="white"
            strokeWidth={2}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </svg>

      {/* Hub */}
      <motion.div
        className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-blue-200/70 p-3"
        style={{ left: `${(CENTER.x / 700) * 100}%`, top: `${(CENTER.y / 360) * 100}%` }}
        animate={{ boxShadow: ['0 0 0 0 rgb(51 85 184 / .25)', '0 0 0 22px rgb(51 85 184 / 0)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="grid size-14 place-items-center rounded-full bg-white sm:size-[70px]">
          <LogoMark className="h-6 w-9 text-brand sm:h-8 sm:w-12" />
        </span>
      </motion.div>

      {nodes.map(({ x, y, Icon, color, ring, size }, i) => (
        <motion.div
          key={i}
          className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
          style={{ left: `${(x / 700) * 100}%`, top: `${(y / 360) * 100}%`, background: ring, padding: size * 0.12 }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', delay: 0.3 + i * 0.1 }}
        >
          <motion.span
            className="grid place-items-center rounded-full bg-white"
            style={{ width: size * 0.62, height: size * 0.62 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon style={{ color }} className="size-3.5 sm:size-4" />
          </motion.span>
        </motion.div>
      ))}
    </div>
  )
}

export function Solutions() {
  return (
    <section id="solutions" className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-indigo-50/60 px-4 py-24 sm:px-6">
      <div className="bg-grid-light pointer-events-none absolute top-[45%] left-0 h-80 w-60 [mask-image:linear-gradient(to_right,black,transparent)]" />
      <div className="relative mx-auto max-w-[1312px]">
        <Reveal className="text-center">
          <Eyebrow className="justify-center text-ink">Our solutions</Eyebrow>
          <h2 className="mt-3 text-3xl leading-tight font-medium tracking-tight text-ink sm:text-[40px]">
            Wherever You Are on Your Launch Journey,
            <br />
            We&apos;re Ready.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm text-ink">
            From strategy to execution, we provide integrated business solutions that help brands enter new markets,
            strengthen operations, and achieve scalable, long-term growth.
          </p>
        </Reveal>

        <SolutionsGrid />

        <div className="mt-20 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <Eyebrow className="text-ink">Platform ecosystem</Eyebrow>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-ink sm:text-[40px]">
              One Inventory. Every Channel.
            </h2>
            <p className="mt-5 max-w-[540px] text-sm text-ink">
              Marketplace, D2C, quick commerce, and offline retail — run from a single, connected operating layer,
              giving every brand on our launchpad one clear, unified view of stock and data at all times.
            </p>
          </Reveal>
          <Ecosystem />
        </div>
      </div>
    </section>
  )
}
