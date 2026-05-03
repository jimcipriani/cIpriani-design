import FadeIn from '../components/FadeIn'

function SectionHeader({ label, heading, lede }) {
  if (!label && !heading) return null
  return (
    <div className="rule-top pt-4 mb-10">
      {label && <span className="label">{label}</span>}
      {heading && (
        <h2 className="font-display font-light text-3xl sm:text-5xl leading-[1.05] mt-4 max-w-3xl">
          {heading}
        </h2>
      )}
      {lede && (
        <p className="font-display font-light text-lg sm:text-xl leading-relaxed text-ink/75 mt-6 max-w-2xl">
          {lede}
        </p>
      )}
    </div>
  )
}

function NarrativeBlock({ block }) {
  const fig = block.figure
  const side = fig?.side === 'left' ? 'left' : 'right'
  const prose = (
    <div className="max-w-2xl space-y-5">
      {(block.body || []).map((p, i) => (
        <p key={i} className="font-display font-light text-lg sm:text-xl leading-relaxed text-ink/80">
          {p}
        </p>
      ))}
    </div>
  )
  const figure = fig && (
    <figure className="m-0">
      <div className="overflow-hidden bg-faint">
        <img
          src={fig.src}
          alt={fig.alt || ''}
          className="case-study-img w-full h-auto object-cover block"
          loading="lazy"
        />
      </div>
      {fig.caption && <figcaption className="fig-caption text-left ml-0">{fig.caption}</figcaption>}
    </figure>
  )

  return (
    <FadeIn>
      <SectionHeader label={block.label} heading={block.heading} lede={block.lede} />
      {fig ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className={side === 'left' ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-7 lg:order-1'}>
            {side === 'left' ? figure : prose}
          </div>
          <div className={side === 'left' ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-5 lg:order-2'}>
            {side === 'left' ? prose : figure}
          </div>
        </div>
      ) : (
        prose
      )}
    </FadeIn>
  )
}

function ListBlock({ block }) {
  return (
    <FadeIn>
      <SectionHeader label={block.label} heading={block.heading} />
      <ol className="space-y-10 max-w-3xl">
        {block.items.map((item, i) => (
          <li key={i} className="grid grid-cols-12 gap-6 rule-top-muted pt-6">
            <span className="label col-span-12 md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
            <div className="col-span-12 md:col-span-11">
              <h3 className="font-display font-light text-2xl sm:text-3xl mb-3">{item.title}</h3>
              <p className="text-base leading-relaxed text-muted font-light">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </FadeIn>
  )
}

function StatsBlock({ block }) {
  return (
    <FadeIn>
      <SectionHeader label={block.label} heading={block.heading} />
      <div className="rule-top pt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
        {block.items.map((s, i) => (
          <div key={i}>
            <p className="font-display font-light text-[clamp(2.5rem,6vw,4.5rem)] leading-none mb-3 tracking-tight">
              {s.value}
            </p>
            <p className="label">{s.label}</p>
            {s.note && <p className="fig-caption text-left mt-2 ml-0">{s.note}</p>}
          </div>
        ))}
      </div>
    </FadeIn>
  )
}

function PullquoteBlock({ block }) {
  return (
    <FadeIn>
      <figure className="my-6 max-w-3xl mx-auto rule-top rule-bottom py-10">
        <blockquote className="font-display italic font-light text-3xl sm:text-4xl leading-tight text-ink/90 text-center">
          “{block.text}”
        </blockquote>
        {block.attribution && (
          <figcaption className="label text-right mt-6">— {block.attribution}</figcaption>
        )}
      </figure>
    </FadeIn>
  )
}

function ImageGridBlock({ block }) {
  const cols = block.columns === 3 ? 'sm:grid-cols-3' : block.columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1'
  return (
    <FadeIn>
      <SectionHeader label={block.label} heading={block.heading} />
      <div className={`grid grid-cols-1 ${cols} gap-4`}>
        {block.items.map((it, i) => (
          <figure key={i} className="m-0">
            {it.placeholder ? (
              <div className="bg-faint border border-stone/40 aspect-[4/3] flex items-center justify-center">
                <span className="label">{it.label || 'Placeholder'}</span>
              </div>
            ) : (
              <div className="overflow-hidden bg-faint">
                <img
                  src={it.src}
                  alt={it.alt || ''}
                  className="case-study-img w-full h-auto object-cover block"
                  loading="lazy"
                />
              </div>
            )}
            {it.caption && <figcaption className="fig-caption">{it.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </FadeIn>
  )
}

function BeforeAfterBlock({ block }) {
  return (
    <FadeIn>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { ...block.before, tag: 'Before' },
          { ...block.after, tag: 'After' },
        ].map((it, i) => (
          <figure key={i} className="m-0">
            <div className="rule-top pt-3 mb-3 flex items-center justify-between">
              <span className="label">{it.tag}</span>
              {it.caption && <span className="label">{it.caption}</span>}
            </div>
            <div className="overflow-hidden bg-faint">
              <img
                src={it.src}
                alt={it.tag}
                className="case-study-img w-full h-auto object-cover block"
                loading="lazy"
              />
            </div>
          </figure>
        ))}
      </div>
      {block.note && <p className="fig-caption text-left mt-4 ml-0 max-w-2xl">{block.note}</p>}
    </FadeIn>
  )
}

const RENDERERS = {
  narrative: NarrativeBlock,
  list: ListBlock,
  stats: StatsBlock,
  pullquote: PullquoteBlock,
  imageGrid: ImageGridBlock,
  beforeAfter: BeforeAfterBlock,
}

export default function CaseStudySection({ block }) {
  const R = RENDERERS[block.kind]
  if (!R) return null
  return (
    <section id={block.id} className="cs-section py-12 sm:py-16">
      <R block={block} />
    </section>
  )
}
