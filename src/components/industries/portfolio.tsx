import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Eyebrow, Reveal } from '@/components/home/shared'
import { onLinkClick } from '@/lib/router'
import { cn } from '@/lib/utils'
import { brandsBottom, brandsTop } from './data'

type Brand = (typeof brandsTop)[number]

function BrandCell({ b, i, className, imgClass }: { b: Brand; i: number; className?: string; imgClass?: string }) {
  return (
    <motion.a
      href="/brands"
      onClick={onLinkClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('group block border-dashed border-ink/15 p-5 xl:p-7', className)}
    >
      <div className="overflow-hidden rounded-xl">
        <img
          src={b.src}
          alt={b.name}
          className={cn('w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105', imgClass)}
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <img src={b.logo} alt={`${b.name} logo`} className="h-5 w-auto max-w-[90px] min-w-0 shrink object-contain object-left sm:h-7" />
        <span className="shrink-0 rounded-md border border-ink/15 bg-white px-2 py-1.5 text-sm whitespace-nowrap text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
          {b.tag}
        </span>
      </div>
    </motion.a>
  )
}

export function BrandPortfolio() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_100%_0%,rgb(51_85_184/0.1),transparent_70%),radial-gradient(ellipse_45%_50%_at_0%_100%,rgb(51_85_184/0.1),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1312px]">
        <Reveal>
          <Eyebrow className="text-ink">Our Brand Portfolio</Eyebrow>
          <h2 className="mt-3 max-w-[660px] text-3xl leading-[1.3] font-medium tracking-tight text-ink/85 sm:text-[40px]">
            Global Brands. Diverse Categories. One Platform.
          </h2>
        </Reveal>

        <div className="mt-12 border border-dashed border-ink/15 bg-white/70 backdrop-blur-sm">
          <div className="grid md:grid-cols-2">
            {brandsTop.map((b, i) => (
              <BrandCell
                key={b.src}
                b={b}
                i={i}
                imgClass="aspect-[596/259]"
                className={cn('border-b', i === 0 && 'md:border-r')}
              />
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-[1.98fr_1fr_1fr_1.1fr]">
            {brandsBottom.map((b, i) => (
              <BrandCell
                key={b.src}
                b={b}
                i={i + 2}
                imgClass={i === 0 ? 'aspect-[444/258]' : 'aspect-[220/258]'}
                className="border-b lg:border-r lg:border-b-0"
              />
            ))}
            <a
              href="/brands"
              onClick={onLinkClick}
              className="group flex min-h-[120px] items-center justify-center gap-2 text-[15px] text-ink transition-colors hover:bg-ink hover:text-white"
            >
              View all Brands
              <ArrowRight className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
