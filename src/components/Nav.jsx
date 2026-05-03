import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link, useRoute } from '../router'

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useRoute()
  const onHome = pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const renderLink = (link) => {
    if (onHome) {
      return (
        <a
          key={link.href}
          href={link.href}
          className="font-sc text-sm tracking-[0.12em] text-ink/70 hover:text-ink transition-colors duration-300"
          onClick={() => setMenuOpen(false)}
        >
          {link.label}
        </a>
      )
    }
    return (
      <Link
        key={link.href}
        to={`/${link.href}`}
        className="font-sc text-sm tracking-[0.12em] text-ink/70 hover:text-ink transition-colors duration-300"
        onClick={() => setMenuOpen(false)}
      >
        {link.label}
      </Link>
    )
  }

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !onHome ? 'bg-paper/92 backdrop-blur-md border-b border-stone/50' : ''
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
        <Link to="/" className="font-sc text-base tracking-[0.18em] font-medium select-none text-ink">
          CIPRIANI DESIGN
        </Link>

        <div className="hidden md:flex items-center gap-10">{NAV_LINKS.map(renderLink)}</div>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-ink transition-all duration-300 mb-1.5 ${menuOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
          <span className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[2px]' : ''}`} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-paper/96 backdrop-blur-md border-b border-stone/50 overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-5">{NAV_LINKS.map(renderLink)}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
