import { kirklandsLongForm } from './kirklands'

/**
 * @typedef {Object} CaseStudy
 * @property {string} id
 * @property {string} client
 * @property {string} year
 * @property {string} role
 * @property {string} tagline
 * @property {string} description
 * @property {string} image
 * @property {string} [detail]
 * @property {string} [detail2]
 * @property {string[]} tags
 * @property {string} caption
 * @property {Object} [longForm]
 */

/** @type {CaseStudy[]} */
export const CASE_STUDIES = [
  {
    id: 'providertrust',
    client: 'ProviderTrust',
    year: '2024–Present',
    role: 'Product Manager',
    tagline: 'Automating medical license compliance at scale',
    description:
      'On the product team at ProviderTrust, I work on a license automation system that transforms a deeply complex process — managing thousands of data points across clients, licensing boards, and platforms. The work spans self-service onboarding flows, drag-and-drop rules management, discipline mapping that bridges incompatible data vocabularies, and analytics that surface compliance risk before it becomes a problem.',
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
    description:
      'I co-founded FairWhistle and continue to lead UX for a platform improving compliance, communication, and relationships within professional soccer. The product covers referee assessments, match operations, TeamKit jersey coordination, and analytics — all designed mobile-first for use on fields, team buses, and in press boxes.',
    image: '/images/fairwhistle-banner.jpg',
    detail: '/images/fw-assessments.jpg',
    detail2: '/images/fw-mobile.png',
    tags: ['Co-Founder', 'UX Design', 'Sports Tech', 'Mobile-First'],
    caption: 'Referee assessment & match operations — FairWhistle, 2023',
  },
  {
    id: 'kirklands',
    client: "Kirkland's Home",
    year: '2017–2021',
    role: 'Ecommerce Design Lead',
    tagline: "Modernizing a publicly traded home retailer's digital experience",
    description:
      'I led ecommerce design for Kirkland\'s Home, rethinking the shopping experience from the ground up. A visual refresh, mobile-first redesign, and personalization strategy that moved logged-in users from 3–4% to 15–18%. Omnichannel features — BOPIS, curbside pickup, shop-your-store — launched ahead of the 2020 pandemic.',
    image: '/images/kirklands-banner.jpg',
    detail: '/images/kirklands-2018.jpg',
    detail2: '/images/kirklands-2020.jpg',
    tags: ['Ecommerce', 'Omnichannel', 'Personalization', 'Public Co.'],
    caption: 'Homepage redesign before/after — Kirklands.com, 2018 → 2020',
    longForm: kirklandsLongForm,
  },
]

export function getCaseStudy(slug) {
  return CASE_STUDIES.find((s) => s.id === slug)
}

export function getNextCaseStudy(slug) {
  const i = CASE_STUDIES.findIndex((s) => s.id === slug)
  if (i === -1) return null
  return CASE_STUDIES[(i + 1) % CASE_STUDIES.length]
}
