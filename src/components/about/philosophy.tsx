import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Eyebrow } from '@/components/home/shared'
import { philosophy } from './data'

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  )
}

/** Statement that "reads itself" — each word lights up as the section scrolls through the viewport. */
export function Philosophy() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = philosophy.split(' ')

  return (
    <section className="relative overflow-hidden bg-[#19191b] px-4 py-24 text-white sm:px-6 sm:py-28">
      <div className="pointer-events-none absolute top-0 right-0 h-80 w-64 bg-[linear-gradient(to_right,rgb(91_123_224/0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgb(91_123_224/0.14)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 bg-[linear-gradient(to_right,rgb(91_123_224/0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgb(91_123_224/0.14)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_bottom_left,black,transparent_70%)]" />

      <div className="relative mx-auto grid max-w-[1312px] gap-8 lg:grid-cols-[392px_1fr] lg:gap-x-0">
        <Eyebrow className="text-white">Our Philosophy</Eyebrow>
        <p ref={ref} className="text-3xl leading-[1.3] font-medium tracking-tight sm:text-[40px]">
          {words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>
      </div>
    </section>
  )
}
