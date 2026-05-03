import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react'

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const CASE_STUDIES = [
  {
    id: 'providertrust',
    client: 'ProviderTrust',
    year: '2024–Present',
    role: 'Product Manager',
    tagline: 'Automating medical license compliance at scale',
    description: 'On the product team at ProviderTrust, I work on a license automation system that transforms a deeply complex process — managing thousands of data points across clients, licensing boards, and platforms. The work spans self-service onboarding flows, drag-and-drop rules management, discipline mapping that bridges incompatible data vocabularies, and analytics that surface compliance risk before it becomes a problem.',
    image: '/images/license-composite.jpg',
    detail: '/images/license-rules.jpg',
    detail2: '/images/license-detail.jpg',
    tags: ['Product Management', 'Healthcare SaaS', 'Automation', 'AI Assist'],
    caption: 'Automation rules management — ProviderTrust, 2024',
  },
  {
    id: 'fairwhistle',
    client: 'FairWhistle',
    year: '2021–Present',
    role: 'Co-Founder & UX Lead',
    tagline: 'Reinventing game day operations for professional soccer',
    description: 'I co-founded FairWhistle and continue to lead UX for a platform improving compliance, communication, and relationships within professional soccer. The product covers referee assessments, match operations, TeamKit jersey coordination, and analytics — all designed mobile-first for use on fields, team buses, and in press boxes.',
    image: '/images/fairwhistle-banner.jpg',
    detail: '/images/fw-assessments.jpg',
    detail2: '/images/fw-mobile.png',
    tags: ['Co-Founder', 'UX Design', 'Sports Tech', 'Mobile-First'],
    caption: 'Referee assessment & match operations — FairWhistle, 2023',
  },
  {
    id: 'kirklands',
    client: 'Kirklands Home',
    year: '2017–2021',
    role: 'Ecommerce Design Lead',
    tagline: 'Modernizing a publicly traded home retailer\'s digital experience',
    description: 'I led ecommerce design for Kirklands Home, rethinking the shopping experience from the ground up. A visual refresh, mobile-first redesign, and personalization strategy that moved logged-in users from 3–4% to 15–18%. Omnichannel features — BOPIS, curbside pickup, shop-your-store — launched ahead of the 2020 pandemic.',
    image: '/images/kirklands-banner.jpg',
    detail: '/images/kirklands-2018.jpg',
    detail2: '/images/kirklands-2020.jpg',
    tags: ['Ecommerce', 'Omnichannel', 'Personalization', 'Public Co.'],
    caption: 'Homepage redesign before/after — Kirklands.com, 2018 → 2020',
  },
]

function DotGrid() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

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
      const spacing = 30
      const cols = Math.floor(w / spacing)
      const rows = Math.floor(h / spacing)
      const ox = (w - cols * spacing) / 2
      const oy = (h - rows * spacing) / 2

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = ox + i * spacing
          const y = oy + j * spacing
          const dist = Math.sqrt((x - w / 2) ** 2 + (y - h / 2) ** 2)
          const wave = Math.sin(dist * 0.007 - time * 0.5) * 0.5 + 0.5
          const r = 0.8 + wave * 1.4
          const a = 0.10 + wave * 0.16
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(15,15,14,${a})`
          ctx.fill()
        }
      }
      time += 0.016
      animRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-paper/92 backdrop-blur-md border-b border-stone/50' : ''
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
        {/* Logo — all caps Cormorant SC, Bodoni-style */}
        <a href="#" className="font-sc text-base tracking-[0.18em] font-medium select-none text-ink">
          CIPRIANI DESIGN
        </a>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sc text-sm tracking-[0.12em] text-ink/70 hover:text-ink transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

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
            <div className="px-6 py-5 flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="label hover:text-ink" onClick={() => setMenuOpen(false)}>
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
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.25], [0, -50])

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
      <DotGrid />
      <motion.div style={{ y }} className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 pt-24 pb-16">
        {/* Tufte-style top rule with small caps label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="rule-top pb-3 mb-10 flex items-center justify-between"
        >
          <span className="label">Product Management · Design · AI</span>
          <span className="label">Nashville, TN</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light text-[clamp(3rem,8vw,7.5rem)] leading-[0.92] tracking-tight mb-10"
        >
          Jim Cipriani.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12"
        >
          <p className="font-display font-light text-xl sm:text-2xl leading-snug text-ink/80">
            I design and build web and mobile products for startup and growth technology ventures.
          </p>
          <p className="font-display italic font-light text-lg sm:text-xl leading-snug text-muted">
            Product manager. Designer. Builder. AI-native.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="rule-bottom pt-6 flex items-center gap-8"
        >
          <a href="#work" className="label hover:text-ink transition-colors">View work ↓</a>
          <a href="#contact" className="label hover:text-ink transition-colors">Get in touch →</a>
        </motion.div>
      </motion.div>
    </section>
  )
}

function CaseStudyCard({ study, index }) {
  return (
    <FadeIn delay={index * 0.05}>
      <div className="case-study-card">
        {/* Tufte-style rule + number */}
        <div className="rule-top pt-4 mb-8 flex items-start justify-between">
          <div>
            <span className="label">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <span className="label">{study.year}</span>
        </div>

        {/* Main image */}
        <div className="overflow-hidden mb-4 bg-faint">
          <img
            src={study.image}
            alt={study.client}
            className="case-study-img w-full h-auto object-cover block"
            loading="lazy"
          />
        </div>
        <p className="fig-caption">{study.caption}</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          <div className="md:col-span-4">
            <h3 className="font-display font-light text-3xl sm:text-4xl mb-2">{study.client}</h3>
            <p className="label mb-4">{study.role}</p>
            <div className="flex flex-wrap gap-2">
              {study.tags.map((t) => (
                <span key={t} className="label border border-stone/60 px-2.5 py-1 rounded-sm">{t}</span>
              ))}
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="font-display font-light text-lg sm:text-xl leading-relaxed text-ink/80 mb-6">
              {study.tagline}
            </p>
            <p className="text-sm leading-relaxed text-muted font-light">{study.description}</p>
          </div>
        </div>

        {/* Detail images — Tufte small multiples style */}
        {study.detail && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="overflow-hidden bg-faint">
                <img src={study.detail} alt={`${study.client} detail`} className="case-study-img w-full h-auto" loading="lazy" />
              </div>
            </div>
            {study.detail2 && (
              <div>
                <div className="overflow-hidden bg-faint">
                  <img src={study.detail2} alt={`${study.client} detail 2`} className="case-study-img w-full h-auto" loading="lazy" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </FadeIn>
  )
}

function WorkSection() {
  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <FadeIn>
          <div className="rule-top pt-4 mb-16 flex items-start justify-between">
            <span className="label">Selected Work</span>
            <span className="label">{CASE_STUDIES.length} Projects</span>
          </div>
        </FadeIn>
        <div className="flex flex-col gap-20 sm:gap-28">
          {CASE_STUDIES.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="relative py-20 sm:py-28 bg-surface text-paper overflow-hidden">
      <div className="grain absolute inset-0" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10">
        <FadeIn>
          <div className="rule-top border-paper/15 pt-4 mb-16 flex items-start justify-between">
            <span className="label text-paper/40">About</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-20">
            <div className="md:col-span-4">
              <h2 className="font-display font-light text-4xl sm:text-5xl text-paper/90 leading-tight">
                Decades of
                <br />
                <em className="italic">design, strategy,</em>
                <br />
                and development.
              </h2>
            </div>
            <div className="md:col-span-8 space-y-5">
              <p className="font-display font-light text-lg leading-relaxed text-paper/70">
                I'm an AI-native product manager and designer based in Nashville, TN. I bring decades of experience in strategy, design, and development — spanning startups, publicly traded companies, and everything in between.
              </p>
              <p className="font-display font-light text-lg leading-relaxed text-paper/70">
                I'm on the product team at <span className="text-paper/90">ProviderTrust</span>, working on healthcare compliance automation tools, and I continue as co-founder and UX lead at <span className="text-paper/90">FairWhistle</span>, a sports technology platform for professional soccer.
              </p>
              <p className="font-display font-light text-lg leading-relaxed text-paper/70">
                I use AI as a design and product multiplier — accelerating research synthesis, prototyping, and solution-space exploration. My approach is informed by data, shaped by user empathy, and executed with precision.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rule-top border-paper/15 pt-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { value: '20+', label: 'Years in design & strategy' },
                { value: '2', label: 'Current roles' },
                { value: 'M+', label: 'Users impacted' },
                { value: 'AI', label: 'Native workflow' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display font-light text-3xl sm:text-4xl text-paper/90 mb-1">{s.value}</p>
                  <p className="label text-paper/35">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Photography section — Tufte small multiples */}
        <FadeIn delay={0.2}>
          <div className="rule-top border-paper/15 pt-10 mt-14">
            <div className="mb-6 flex items-center justify-between">
              <span className="label text-paper/40">Photography</span>
              <a
                href="https://instagram.com/jimcipriani"
                target="_blank"
                rel="noopener noreferrer"
                className="label text-paper/40 hover:text-paper/80 transition-colors"
              >
                Instagram →
              </a>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['/images/photo-mountains.jpg', '/images/photo-lake.jpg', '/images/photo-harbor.jpg'].map((src, i) => (
                <div key={i} className="overflow-hidden bg-surface">
                  <img src={src} alt="Photography" className="case-study-img w-full h-40 sm:h-52 object-cover" loading="lazy" />
                </div>
              ))}
            </div>
            <p className="fig-caption text-paper/30 mt-2">Shot on Hasselblad · Alaska · New Zealand</p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <FadeIn>
          <div className="rule-top pt-4 mb-16">
            <span className="label">Contact</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-7">
              <h2 className="font-display font-light text-4xl sm:text-5xl md:text-6xl leading-[0.95] mb-8">
                Let's build
                <br />
                <em className="italic">something great.</em>
              </h2>
              <p className="font-display font-light text-lg text-muted leading-relaxed max-w-md">
                Available for product design engagements, startup advisory, and creative collaboration. If you're building something ambitious, I'd love to hear about it.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col justify-end gap-4">
              <a
                href="mailto:jimcipriani@gmail.com"
                className="flex items-center gap-3 group"
              >
                <span className="label group-hover:text-ink transition-colors">Email</span>
                <span className="rule-bottom flex-1" />
                <span className="label group-hover:text-ink transition-colors">jimcipriani@gmail.com →</span>
              </a>
              <a
                href="https://linkedin.com/in/jimcipriani"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <span className="label group-hover:text-ink transition-colors">LinkedIn</span>
                <span className="rule-bottom flex-1" />
                <span className="label group-hover:text-ink transition-colors">jimcipriani →</span>
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
    <footer className="bg-ink py-8">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        <span className="font-sc text-paper/50 text-xs tracking-[0.18em]">CIPRIANI DESIGN</span>
        <span className="label text-paper/30">Nashville, TN · {new Date().getFullYear()}</span>
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
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
