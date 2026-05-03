import { useEffect, useState } from 'react'

const ROUTE_EVENT = 'routechange'

export function useRoute() {
  const [route, setRoute] = useState(() => ({
    pathname: window.location.pathname,
    hash: window.location.hash,
  }))

  useEffect(() => {
    const update = () =>
      setRoute({ pathname: window.location.pathname, hash: window.location.hash })
    window.addEventListener('popstate', update)
    window.addEventListener(ROUTE_EVENT, update)
    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener(ROUTE_EVENT, update)
    }
  }, [])

  return route
}

export function navigate(to, { replace = false } = {}) {
  if (replace) window.history.replaceState({}, '', to)
  else window.history.pushState({}, '', to)
  window.dispatchEvent(new Event(ROUTE_EVENT))
}

export function Link({ to, children, className, onClick, ...rest }) {
  const handleClick = (e) => {
    if (onClick) onClick(e)
    if (e.defaultPrevented) return
    if (e.button !== 0) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (rest.target === '_blank') return
    e.preventDefault()
    if (to.startsWith('#')) {
      const id = to.slice(1)
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState({}, '', to)
      return
    }
    navigate(to)
  }
  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}

export function matchCaseStudy(pathname) {
  const m = pathname.match(/^\/work\/([^/]+)\/?$/)
  return m ? m[1] : null
}
