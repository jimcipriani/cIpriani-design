import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import { useRoute, matchCaseStudy } from './router'

export default function App() {
  const { pathname, hash } = useRoute()
  const slug = matchCaseStudy(pathname)

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    })
  }, [pathname, hash])

  return (
    <>
      <Nav />
      {slug ? <CaseStudy slug={slug} /> : <Home />}
      <Footer />
    </>
  )
}
