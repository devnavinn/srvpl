import { lazy, Suspense, useEffect, type ComponentType } from 'react'
import { usePath } from '@/lib/router'
import { scrollToTarget } from '@/lib/smooth-scroll'
import { HomePage } from '@/pages/home'
import { findArticle } from '@/components/insights/data'

// Inner pages load on demand so the home page bundle stays small.
const page = (load: () => Promise<Record<string, ComponentType>>, name: string) =>
  lazy(() => load().then((m) => ({ default: m[name] })))

const routes: Record<string, { page: ComponentType; title: string }> = {
  '/': { page: HomePage, title: 'Smith Retail Ventures' },
  '/about': { page: page(() => import('@/pages/about'), 'AboutPage'), title: 'About Us — Smith Retail Ventures' },
  '/solutions': {
    page: page(() => import('@/pages/solutions'), 'SolutionsPage'),
    title: 'Solutions — Smith Retail Ventures',
  },
  '/capabilities': {
    page: page(() => import('@/pages/capabilities'), 'CapabilitiesPage'),
    title: 'Capabilities — Smith Retail Ventures',
  },
  '/brands': { page: page(() => import('@/pages/brands'), 'BrandsPage'), title: 'Our Brands — Smith Retail Ventures' },
  '/industries': {
    page: page(() => import('@/pages/industries'), 'IndustriesPage'),
    title: 'Industries — Smith Retail Ventures',
  },
  '/insights': {
    page: page(() => import('@/pages/insights'), 'InsightsPage'),
    title: 'Insights — Smith Retail Ventures',
  },
  '/careers': { page: page(() => import('@/pages/careers'), 'CareersPage'), title: 'Careers — Smith Retail Ventures' },
  '/contact': { page: page(() => import('@/pages/contact'), 'ContactPage'), title: 'Contact Us — Smith Retail Ventures' },
}

const insightPage = page(() => import('@/pages/insight'), 'InsightPage')

function resolve(path: string) {
  if (routes[path]) return routes[path]
  const article = findArticle(path)
  if (article) return { page: insightPage, title: `${article.title.join(' ')} — Smith Retail Ventures` }
  if (path.startsWith('/insights/')) return routes['/insights']
  return routes['/']
}

export default function App() {
  const path = usePath()
  const route = resolve(path)

  useEffect(() => {
    document.title = route.title
  }, [route])

  const Page = route.page
  return (
    <main key={path} className="min-h-screen overflow-x-clip bg-white">
      <Suspense fallback={null}>
        <Page />
        <HashScroll />
      </Suspense>
    </main>
  )
}

/** After a (possibly lazy) page mounts, land on the section named in the URL hash. */
function HashScroll() {
  useEffect(() => {
    const el = window.location.hash && document.querySelector(window.location.hash)
    if (el) scrollToTarget(el, { immediate: true })
  }, [])
  return null
}
