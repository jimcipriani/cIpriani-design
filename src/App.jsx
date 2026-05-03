import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react'

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const CASE_STUDIES = [
  {
    id: 'fairwhistle',
    client: 'FairWhistle',
    year: '2021–2024',
    role: 'Co-Founder & UX Lead',
    tagline: 'Reinventing game day operations for professional soccer',
    description: 'Co-founded and led UX for a startup platform improving compliance, communication, and relationships within professional soccer. Built referee assessments, match operations, TeamKit jersey coordination, and analytics — all designed mobile-first for use on fields, team buses, and airplanes.',
    image: '/images/fairwhistle-banner.jpg',
    tags: ['Product Design', 'Startup', 'Mobile-First', 'Analytics'],
  },
  {
    id: 'kirklands',
    client: 'Kirklands Home',
    year: '2017–2021',
    role: 'Ecommerce Design Lead',
    tagline: 'Modernizing a publicly traded home retailer\'s digital experience',
    description: 'Led ecommerce design for Kirklands Home, rethinking the shopping experience from the ground up. Drove a visual refresh, mobile-first redesign, and personalization strategy that increased logged-in users from 3–4% to 15–18%. Launched omnichannel features including BOPIS and curbside pickup — ready when the pandemic hit.',
    image: '/images/kirklands-banner.jpg',
    tags: ['Ecommerce', 'Omnichannel', 'Personalization', 'Public Co.'],
  },
  {
    id: 'license-automation',
    client: 'License Automation',
    year: '2024',
    role: 'Product Designer',
    tagline: 'Simplifying medical license compliance at scale',
    description: 'Designed a medical license automation system that transforms a complicated process — managing thousands of data points across clients, licensing boards, and platforms. Created intuitive onboarding flows, visual drag-and-drop rules management, and discipline mapping interfaces that empower clients to self-serve.',
    image: '/images/license-banner.jpg',
    tags: ['Enterprise SaaS', 'Automation', 'Healthcare', 'Product-Led Growth'],
  },
]

function DotGrid() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let time = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const spacing = 28
      const cols = Math.floor(w / spacing)
      const rows = Math.floor(h / spacing)
      const offsetX = (w - cols * spacing) / 2
      const offsetY = (h - rows * spacing) / 2

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = offsetX + i * spacing
          const y = offsetY + j * spacing
          const dist = Math.sqrt(
            Math.pow(x - w / 2, 2) + Math.pow(y - h / 2, 2)
          )
          const wave = Math.sin(dist * 0.008 - time * 0.6) * 0.5 + 0.5
          const radius = 1 + wave * 1.5
          const alpha = 0.08 + wave * 0.14

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(10, 10, 10, ${alpha})`
          ctx.fill()
        }
      }

      time += 0.016
      animationRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-paper/90 backdrop-blur-md border-b border-stone/40'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className="font-display text-xl tracking-tight">
          Cipriani Design
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-muted hover:text-ink transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
          <span className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-paper/95 backdrop-blur-md border-b border-stone/40 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-wide text-muted hover:text-ink transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function FadeIn({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -60])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <DotGrid />
      <motion.div style={{ y }} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm tracking-[0.2em] uppercase text-muted mb-6"
        >
          AI-First Product Design
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8 text-balance"
        >
          I'm Jim Cipriani.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl text-muted leading-relaxed max-w-2xl mx-auto font-light"
        >
          I design web and mobile products for startup and growth technology ventures.
          <span className="block mt-3 text-base sm:text-lg">
            Product thinker. Designer. Builder.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex justify-center gap-6"
        >
          <a
            href="#work"
            className="text-sm tracking-wide border-b border-ink pb-1 hover:border-accent hover:text-accent transition-colors duration-300"
          >
            View work
          </a>
          <a
            href="#contact"
            className="text-sm tracking-wide text-muted hover:text-ink transition-colors duration-300"
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-transparent via-muted to-transparent"
        />
      </motion.div>
    </section>
  )
}

function CaseStudyCard({ study, index }) {
  return (
    <FadeIn delay={index * 0.1}>
      <a href={`#${study.id}`} className="group case-study-card block">
        <div className="relative overflow-hidden rounded-sm bg-surface-light aspect-[16/10] mb-6">
          <img
            src={study.image}
            alt={study.client}
            className="case-study-img w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-500" />
        </div>
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-display text-2xl sm:text-3xl">{study.client}</h3>
          <span className="text-xs tracking-wide text-muted mt-2 shrink-0">{study.year}</span>
        </div>
        <p className="text-muted text-sm leading-relaxed max-w-lg">{study.tagline}</p>
      </a>
    </FadeIn>
  )
}

function WorkSection() {
  return (
    <section id="work" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted mb-3">Selected Work</p>
              <h2 className="font-display text-4xl sm:text-5xl">Case Studies</h2>
            </div>
            <div className="hidden sm:block w-24 h-px bg-stone" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-16 sm:gap-20">
          {CASE_STUDIES.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseStudyDetail({ study }) {
  return (
    <section id={study.id} className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="border-t border-stone/60 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-4">
                <p className="text-xs tracking-[0.2em] uppercase text-muted mb-2">{study.year}</p>
                <h3 className="font-display text-3xl sm:text-4xl mb-3">{study.client}</h3>
                <p className="text-sm text-muted mb-4">{study.role}</p>
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] tracking-wide uppercase px-2.5 py-1 rounded-full border border-stone/60 text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-8">
                <p className="text-base sm:text-lg leading-relaxed text-ink/80">{study.description}</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-ink text-paper overflow-hidden">
      <div className="grain absolute inset-0" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-5">
              <p className="text-xs tracking-[0.2em] uppercase text-paper/40 mb-3">About</p>
              <h2 className="font-display text-4xl sm:text-5xl text-paper/90 mb-2">
                Design with
                <br />
                <em className="italic">intelligence.</em>
              </h2>
            </div>
            <div className="md:col-span-7 space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-paper/70 font-light">
                I'm an AI-first product designer based in Nashville, TN. I've spent over a decade shaping digital experiences for startups, growth-stage ventures, and public companies — always at the intersection of design thinking and emerging technology.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-paper/70 font-light">
                Today, I leverage AI as a design multiplier — using it to accelerate research, prototype faster, and explore solution spaces that would be impossible to navigate manually. My work spans ecommerce, SaaS platforms, healthcare compliance, and sports technology.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-paper/70 font-light">
                I believe the best products come from pairing deep user empathy with bold technical execution. I've co-founded startups, led design teams, and shipped products used by millions.
              </p>
              <div className="pt-4 flex items-center gap-6 text-sm">
                <span className="text-paper/40">Previously at</span>
                <span className="text-paper/70">Kirklands Home</span>
                <span className="text-paper/30">·</span>
                <span className="text-paper/70">FairWhistle</span>
                <span className="text-paper/30">·</span>
                <span className="text-paper/70">ProviderTrust</span>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-20 pt-16 border-t border-paper/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              {[
                { value: '10+', label: 'Years in product design' },
                { value: '3', label: 'Startups co-founded or led' },
                { value: 'M+', label: 'Users impacted' },
                { value: 'AI', label: 'Native workflow' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl sm:text-4xl text-paper/90 mb-2">{stat.value}</p>
                  <p className="text-xs tracking-wide text-paper/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.2em] uppercase text-muted mb-3">Contact</p>
            <h2 className="font-display text-4xl sm:text-5xl mb-6">
              Let's build
              <br />
              <em className="italic">something great.</em>
            </h2>
            <p className="text-muted text-base sm:text-lg leading-relaxed mb-10 font-light">
              I'm available for product design engagements, startup advisory, and creative collaboration. If you're building something ambitious, I'd love to hear about it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <a
                href="mailto:jimcipriani@gmail.com"
                className="inline-flex items-center gap-2 text-sm tracking-wide border-b border-ink pb-1 hover:border-accent hover:text-accent transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                jimcipriani@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/jimcipriani"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm tracking-wide text-muted hover:text-ink transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper/40 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display text-paper/60 text-lg">Cipriani Design</p>
        <p className="text-xs tracking-wide">Nashville, TN · {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WorkSection />
        {CASE_STUDIES.map((study) => (
          <CaseStudyDetail key={study.id} study={study} />
        ))}
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
