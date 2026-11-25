import { useSyncExternalStore } from 'react'
import { scrollToTarget } from './smooth-scroll'

const subscribe = (cb: () => void) => {
  window.addEventListener('popstate', cb)
  return () => window.removeEventListener('popstate', cb)
}

export function usePath() {
  return useSyncExternalStore(subscribe, () => window.location.pathname.replace(/\/+$/, '') || '/')
}

/** Client-side navigation for same-origin paths; leaves hash-only links to the browser. */
export function navigate(href: string) {
  const url = new URL(href, window.location.href)
  const samePage = url.pathname === window.location.pathname
  window.history.pushState({}, '', url)
  window.dispatchEvent(new PopStateEvent('popstate'))
  if (url.hash) {
    requestAnimationFrame(() => {
      const el = document.querySelector(url.hash)
      if (el) scrollToTarget(el)
    })
  } else if (!samePage) {
    scrollToTarget(0, { immediate: true })
  }
}

export function onLinkClick(e: React.MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute('href')
  if (!href || !href.startsWith('/') || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  e.preventDefault()
  navigate(href)
}
