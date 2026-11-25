import { lazy, Suspense, useEffect, type ComponentType } from 'react'
import { usePath } from '@/lib/router'
import { HomePage } from '@/pages/home'

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
}

export default function App() {
  const path = usePath()
  const route = routes[path] ?? routes['/']

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
    if (window.location.hash) document.querySelector(window.location.hash)?.scrollIntoView()
  }, [])
  return null
}
