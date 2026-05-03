/**
 * Long-form case study content for Kirkland's Home.
 *
 * Schema (see CaseStudySections.jsx for renderers):
 *   cover     — hero block with title, eyebrow, role line, hero image
 *   meta      — at-a-glance Tufte sidebar (role, team, timeline, scope, stack)
 *   sections  — array of typed blocks dispatched on `kind`
 *   reflection — closing paragraphs
 *   next      — pointer to the next case study
 */

export const kirklandsLongForm = {
  cover: {
    eyebrow: 'Case Study · 2017–2021',
    title: "Kirkland's Home",
    sub: 'Modernizing a publicly traded home retailer for a mobile, omnichannel world.',
    role: 'Ecommerce Design Lead',
    year: '2017–2021',
    company: "Kirkland's Home (NASDAQ: KIRK)",
    heroImage: '/images/kirklands-banner.jpg',
    heroAlt: "Kirkland's Home redesigned ecommerce experience",
  },

  meta: [
    { label: 'Role', value: 'Ecommerce Design Lead' },
    { label: 'Timeline', value: '2017 – 2021' },
    { label: 'Scope', value: 'Site-wide redesign · Omnichannel · Personalization' },
    { label: 'Stack', value: 'Mobile-first · Design + Front-end · A/B' },
  ],

  sections: [
    {
      id: 'starting-state',
      kind: 'narrative',
      label: '01 · The 2017 starting state',
      heading: 'A 50-year-old home brand with a desktop-shaped digital business.',
      lede: "When I joined as Ecommerce Design Lead, Kirkland's was a beloved physical retailer with a digital experience that hadn't kept up with how its customers actually shopped.",
      body: [
        'The site was built for desktop. More than half of traffic was already arriving on phones, but the templates, image crops, and merchandising flows were all sized for a 1280px monitor. Mobile shoppers got a pinched, scaled-down version of a desktop site — with the conversion rate to match.',
        'Personalization barely existed. Logged-in sessions sat at 3–4% of traffic, which meant the site had almost no signal to tailor anything to anyone. Merchandising decisions were made in spreadsheets and pushed weekly.',
        "And the store fleet — over 400 locations — was effectively invisible to the website. There was no buy-online-pickup-in-store, no inventory visibility, no way for the site to act as a front door to the stores or for the stores to fulfill the site.",
      ],
    },
    {
      id: 'before-after-2018-2020',
      kind: 'beforeAfter',
      before: { src: '/images/kirklands-2018.jpg', caption: 'Homepage, 2018' },
      after: { src: '/images/kirklands-2020.jpg', caption: 'Homepage, 2020' },
      note: 'Two years of incremental rebuilds — visual system, mobile-first templates, personalized rails, omnichannel surfacing.',
    },

    {
      id: 'strategy',
      kind: 'list',
      label: '02 · Strategy & three bets',
      heading: 'Three bets that compounded.',
      items: [
        {
          title: 'Mobile-first, not mobile-also.',
          body: 'Rebuild every template on a phone-sized canvas first. Desktop became the wide variant of a mobile design — not the other way around. Image crops, type scales, navigation, PLPs, PDPs, cart, and checkout all rethought for thumb-reach.',
        },
        {
          title: 'Omnichannel as a product, not a feature.',
          body: 'Treat the 400+ stores as inventory and fulfillment infrastructure. Ship buy-online-pickup-in-store, curbside pickup, and shop-your-store — all designed before anyone had heard of a global pandemic.',
        },
        {
          title: 'Personalization as the default surface.',
          body: 'Get more shoppers logged in, then use that signal to tailor merchandising, recommendations, and recently-viewed across the experience. Design for the personalized state first.',
        },
      ],
    },

    {
      id: 'process',
      kind: 'narrative',
      label: '03 · Process & systems thinking',
      heading: 'A site is a system. Redesigning it is a systems problem.',
      lede: 'You can\'t redesign an ecommerce site one screen at a time. Every screen is a view onto a content model, a merchandising system, an inventory state, and a fulfillment promise. The work was as much about wiring those layers together as it was about pixels.',
      body: [
        'I built a component-level design system for the site — typography, color, grid, the building blocks of every PLP cell, PDP module, cart row, and checkout step. Once those existed, every redesign became compositional rather than bespoke.',
        'Above the components sat content models. PLPs needed to flex between editorial collections, faceted browse, and personalized rails. PDPs needed to express variation, store availability, and pickup options without burying the buy button. Each model was designed once and reused everywhere.',
        "I designed and coded much of the front end myself, working alongside engineering. Designing in the browser kept the system honest — type that looked right in Figma had to survive real product data, real image crops, and real mobile constraints. Shipping the code I'd designed shortened the loop from weeks to hours.",
      ],
      figure: {
        src: '/images/kirklands-flatware.jpg',
        alt: 'Category browse with faceted filtering',
        caption: 'Category browse · faceted content model',
        side: 'right',
      },
    },
    {
      id: 'process-grid',
      kind: 'imageGrid',
      label: 'Selected artifacts',
      columns: 3,
      items: [
        { src: '/images/kirklands-mobile.jpg', alt: 'Mobile-first templates', caption: 'Mobile-first PDP templates' },
        { placeholder: true, label: 'System diagram', caption: 'BOPIS / curbside data flow' },
        { placeholder: true, label: 'Wireframe', caption: 'Mobile checkout flow' },
      ],
    },

    {
      id: 'change-management',
      kind: 'narrative',
      label: '04 · Change management',
      heading: 'The hardest design work was internal.',
      lede: 'Redesigning a publicly traded retailer\'s ecommerce experience is not just a design problem. It\'s a capital-allocation problem, an org problem, and a story problem.',
      body: [
        "Mobile-first meant convincing merchants to design assortments, photography, and copy for a phone screen — not the desktop hero shot they'd been making for a decade. Omnichannel meant convincing store operations that the website could send work to their associates without breaking labor models. Personalization meant convincing IT to invest in the data plumbing before the visible payoff.",
        'I spent as much time in roadmap reviews, exec readouts, and cross-functional working sessions as I did in design tools. Every bet got reframed for a different audience: the merchant story, the operator story, the engineering story, the board story. The design work shipped because the organization was ready for it to ship.',
      ],
      figure: {
        src: '/images/kirklands-wgd.jpg',
        alt: 'Wedding gift destination editorial surface',
        caption: 'Editorial merchandising · the merchant story made visible',
        side: 'left',
      },
    },
    {
      id: 'pullquote',
      kind: 'pullquote',
      text: 'Designing the org to ship the work was the work.',
    },

    {
      id: 'outcomes',
      kind: 'stats',
      label: '05 · Outcomes',
      items: [
        { value: '$70M → $200M', label: 'Annual digital revenue', note: "Source: Kirkland's public filings" },
        { value: '3–4% → 15–18%', label: 'Logged-in / personalized sessions' },
        { value: 'Millions', label: 'Users served annually' },
        { value: 'Pre-COVID', label: 'BOPIS · curbside · shop-your-store' },
      ],
    },
    {
      id: 'outcomes-narrative',
      kind: 'narrative',
      heading: 'The infrastructure was already in place when 2020 arrived.',
      body: [
        "When the pandemic closed stores in March 2020, the work that had felt like a slow-burn investment became table stakes overnight. Customers who'd never used buy-online-pickup-in-store needed it that week. Curbside went from a strategic option to the only option. Shop-your-store became the only way to extend a closed store's catalog to the people who couldn't enter it.",
        'Digital revenue accelerated from roughly $70M to nearly $200M annually. The redesign, the omnichannel buildout, and the personalization investments compounded — each one more valuable because the others existed.',
      ],
      figure: {
        src: '/images/kirklands-omni.jpg',
        alt: 'Omnichannel pickup interface',
        caption: 'BOPIS · the surface that was waiting for March 2020',
        side: 'right',
      },
    },
  ],

  reflection: {
    label: '06 · Reflection',
    body: [
      'The Kirkland\'s work was a lesson in how strategy, design, systems, and organizational change all have to move together. Any one of them in isolation would have produced a great-looking site that didn\'t change the business.',
      'The work I\'m proudest of isn\'t a screen — it\'s the operating posture the team grew into: shipping mobile-first by default, treating stores as a digital surface, and designing for the personalized state as the baseline.',
    ],
  },

  next: { slug: 'providertrust', label: 'ProviderTrust' },
}
