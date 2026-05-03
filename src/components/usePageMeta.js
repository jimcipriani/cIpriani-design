import { useEffect } from 'react'

function upsertMeta(kind, key, value) {
  const selector = `meta[${kind}="${key}"]`
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(kind, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function usePageMeta({ title, description, image }) {
  useEffect(() => {
    const prevTitle = document.title
    if (title) {
      document.title = title
      upsertMeta('property', 'og:title', title)
    }
    if (description) {
      upsertMeta('name', 'description', description)
      upsertMeta('property', 'og:description', description)
    }
    if (image) {
      const abs = image.startsWith('http') ? image : `${window.location.origin}${image}`
      upsertMeta('property', 'og:image', abs)
    }
    upsertCanonical(window.location.origin + window.location.pathname)
    return () => {
      document.title = prevTitle
    }
  }, [title, description, image])
}
