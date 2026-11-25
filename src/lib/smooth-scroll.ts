import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/**
 * Site-wide smooth wheel scrolling (same feel as zarion.webflow.io: 0.9s, ease-out-cubic).
 * Desktop pointers only — touch devices keep their native momentum scrolling.
 * Motion's useScroll reads the real scroll position, so scroll-linked animations stay in sync.
 */
let lenis: Lenis | null = null

export function startSmoothScroll() {
  if (lenis || typeof window === 'undefined') return
  const fine = window.matchMedia('(pointer: fine) and (min-width: 768px)').matches
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!fine || reduced) return

  lenis = new Lenis({
    duration: 0.9,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    anchors: true, // in-page "#section" links glide too
  })
  const raf = (time: number) => {
    lenis?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}

/** Scroll to an element or y offset, smoothly when Lenis is running. */
export function scrollToTarget(target: Element | number, opts: { immediate?: boolean } = {}) {
  if (lenis) {
    lenis.scrollTo(target as HTMLElement | number, { immediate: opts.immediate, duration: 1.1 })
    return
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: opts.immediate ? 'auto' : 'smooth' })
  else target.scrollIntoView({ behavior: opts.immediate ? 'auto' : 'smooth' })
}
