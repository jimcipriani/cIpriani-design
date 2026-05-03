import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { getCaseStudy, getNextCaseStudy } from '../data/caseStudies'
import { Link, navigate } from '../router'
import FadeIn from '../components/FadeIn'
import usePageMeta from '../components/usePageMeta'
import CaseStudySection from './CaseStudySections'

function Cover({ cover }) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 80])

  return (
    <section className="relative min-h-[88vh] flex items-end overflow-hidden bg-ink">
      <motion.img
        src={cover.heroImage}
        alt={cover.heroAlt}
        loading="eager"
        fetchPriority="high"
        style={{ y }}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/10" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 pt-32 pb-16 w-full">
        <FadeIn>
          <div className="rule-top border-paper/30 pb-3 mb-8 flex items-center justify-between">
            <span className="label text-paper/70">{cover.eyebrow}</span>
            <span className="label text-paper/70">{cover.company}</span>
          </div>
          <h1 className="font-display font-light text-paper text-[clamp(3rem,9vw,8rem)] leading-[0.92] tracking-tight mb-8">
            {cover.title}.
          </h1>
          <p className="font-display font-light text-xl sm:text-2xl leading-snug text-paper/85 max-w-2xl mb-10">
            {cover.sub}
          </p>
          <div className="rule-bottom border-paper/30 pt-4 flex items-center gap-8">
            <span className="label text-paper/70">{cover.role}</span>
            <span className="label text-paper/70">{cover.year}</span>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function MetaStrip({ meta }) {
  return (
    <section className="bg-faint/40">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 rule-top pt-6">
          {meta.map((m) => (
            <div key={m.label}>
              <p className="label mb-2">{m.label}</p>
              <p className="font-display font-light text-lg leading-snug text-ink/85">{m.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionNav({ sections, activeId }) {
  return (
    <nav className="hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 z-30 max-w-[12rem]">
      <ul className="space-y-3 border-l border-stone/40 pl-4">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`label block transition-colors ${
                activeId === s.id ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {s.label || s.id}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sectionIds.join('|')])
  return active
}

export default function CaseStudy({ slug }) {
  const study = getCaseStudy(slug)
  const next = getNextCaseStudy(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  usePageMeta({
    title: study?.longForm
      ? `${study.client} — Case Study · Cipriani Design`
      : 'Cipriani Design',
    description: study?.tagline,
    image: study?.longForm?.cover?.heroImage || study?.image,
  })

  const sections = study?.longForm?.sections || []
  const navSections = sections.filter((s) => s.label)
  const activeId = useActiveSection(navSections.map((s) => s.id))

  if (!study) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="label mb-4">404</p>
          <p className="font-display font-light text-3xl mb-6">Case study not found.</p>
          <button
            onClick={() => navigate('/')}
            className="label hover:text-ink transition-colors"
          >
            ← Back to home
          </button>
        </div>
      </main>
    )
  }

  if (!study.longForm) {
    return (
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <p className="label mb-4">Coming soon</p>
          <h1 className="font-display font-light text-5xl mb-6">{study.client}</h1>
          <p className="font-display font-light text-xl text-muted mb-10">{study.tagline}</p>
          <Link to="/#work" className="label hover:text-ink transition-colors">
            ← Back to work
          </Link>
        </div>
      </main>
    )
  }

  const lf = study.longForm

  return (
    <main>
      <Cover cover={lf.cover} />
      <MetaStrip meta={lf.meta} />
      <SectionNav sections={navSections} activeId={activeId} />

      <div className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-6 sm:px-10 py-10 sm:py-16">
        {sections.map((block) => (
          <CaseStudySection key={block.id} block={block} />
        ))}

        {lf.reflection && (
          <section id="reflection" className="cs-section py-12 sm:py-16">
            <FadeIn>
              <div className="rule-top pt-4 mb-8">
                {lf.reflection.label && <span className="label">{lf.reflection.label}</span>}
              </div>
              <div className="max-w-2xl space-y-5">
                {lf.reflection.body.map((p, i) => (
                  <p
                    key={i}
                    className="font-display font-light text-lg sm:text-xl leading-relaxed text-ink/80"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </FadeIn>
          </section>
        )}

        {next && (
          <section className="py-16 sm:py-24">
            <FadeIn>
              <Link
                to={`/work/${next.slug || next.id}`}
                className="flex items-center gap-3 group"
              >
                <span className="label group-hover:text-ink transition-colors">Next case</span>
                <span className="rule-bottom flex-1" />
                <span className="font-display font-light text-2xl sm:text-3xl group-hover:text-ink transition-colors">
                  {next.client} →
                </span>
              </Link>
            </FadeIn>
          </section>
        )}
      </div>
    </main>
  )
}
