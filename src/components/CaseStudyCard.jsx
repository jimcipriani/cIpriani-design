import FadeIn from './FadeIn'
import { Link } from '../router'

export default function CaseStudyCard({ study, index }) {
  const hasDetail = Boolean(study.longForm)
  const TitleWrap = hasDetail ? Link : 'div'
  const titleProps = hasDetail
    ? { to: `/work/${study.id}`, className: 'group block hover:text-ink transition-colors' }
    : {}

  return (
    <FadeIn delay={index * 0.05}>
      <div className="case-study-card">
        <div className="rule-top pt-4 mb-8 flex items-start justify-between">
          <span className="label">{String(index + 1).padStart(2, '0')}</span>
          <span className="label">{study.year}</span>
        </div>

        {hasDetail ? (
          <Link to={`/work/${study.id}`} className="block">
            <div className="overflow-hidden mb-4 bg-faint">
              <img
                src={study.image}
                alt={study.client}
                className="case-study-img w-full h-auto object-cover block"
                loading="lazy"
              />
            </div>
          </Link>
        ) : (
          <div className="overflow-hidden mb-4 bg-faint">
            <img
              src={study.image}
              alt={study.client}
              className="case-study-img w-full h-auto object-cover block"
              loading="lazy"
            />
          </div>
        )}
        <p className="fig-caption">{study.caption}</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          <div className="md:col-span-4">
            <TitleWrap {...titleProps}>
              <h3 className="font-display font-light text-3xl sm:text-4xl mb-2">{study.client}</h3>
            </TitleWrap>
            <p className="label mb-4">{study.role}</p>
            <div className="flex flex-wrap gap-2">
              {study.tags.map((t) => (
                <span key={t} className="label border border-stone/60 px-2.5 py-1 rounded-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="font-display font-light text-lg sm:text-xl leading-relaxed text-ink/80 mb-6">
              {study.tagline}
            </p>
            <p className="text-sm leading-relaxed text-muted font-light">{study.description}</p>

            {hasDetail && (
              <Link
                to={`/work/${study.id}`}
                className="mt-6 inline-flex items-center gap-3 group"
              >
                <span className="label group-hover:text-ink transition-colors">Read the case study</span>
                <span className="rule-bottom flex-1 min-w-[3rem]" />
                <span className="label group-hover:text-ink transition-colors">→</span>
              </Link>
            )}
          </div>
        </div>

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
