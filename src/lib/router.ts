import { useSyncExternalStore } from 'react'

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
    requestAnimationFrame(() => document.querySelector(url.hash)?.scrollIntoView({ behavior: 'smooth' }))
  } else if (!samePage) {
    window.scrollTo({ top: 0 })
  }
}

export function onLinkClick(e: React.MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute('href')
  if (!href || !href.startsWith('/') || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  e.preventDefault()
  navigate(href)
}
