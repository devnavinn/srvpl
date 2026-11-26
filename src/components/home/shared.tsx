import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { onLinkClick } from '@/lib/router'

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-center gap-2 text-sm uppercase tracking-tight', className)}>
      <span className="size-3.5 bg-brand" aria-hidden />
      {children}
    </p>
  )
}

/** Fades + lifts content in when it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      // opacity + transform only: both run on the compositor, unlike a blur filter
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <a href="/" onClick={onLinkClick} className={cn('flex items-center gap-2 text-white', className)}>
      <span className="text-[13px] leading-tight font-medium">
        SMITH RETAIL
        <br />
        VENTURES
      </span>
      <LogoMark className="h-[34px] w-[49px]" />
    </a>
  )
}

/** Brand mark from Figma (49×34, with @2x for retina). Size it with h-/w- classes. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      srcSet="/logo.png 1x, /logo@2x.png 2x"
      alt=""
      aria-hidden
      className={cn('object-contain', className)}
    />
  )
}

export function ArrowButton({
  children,
  variant = 'dark',
  href = '/contact',
  className,
}: {
  children: ReactNode
  variant?: 'dark' | 'light'
  href?: string
  className?: string
}) {
  return (
    <motion.a
      href={href}
      onClick={onLinkClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-sm px-3.5 py-2.5 text-sm shadow-sm',
        variant === 'dark' ? 'bg-ink text-white' : 'bg-white text-ink',
        className,
      )}
    >
      {children}
      <span
        className={cn(
          'grid size-4 place-items-center rounded-full transition-transform group-hover:translate-x-0.5',
          variant === 'dark' ? 'bg-white text-ink' : 'bg-ink text-white',
        )}
      >
        <ArrowRight className="size-3" strokeWidth={2.5} />
      </span>
    </motion.a>
  )
}
