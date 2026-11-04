import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'light' | 'dark' | 'system'

const KEY = 'theme'
const darkQuery = () => window.matchMedia('(prefers-color-scheme: dark)')

function read(): Theme {
  try {
    const stored = localStorage.getItem(KEY)
    return stored === 'light' || stored === 'dark' ? stored : 'system'
  } catch {
    return 'system'
  }
}

const isDark = (theme: Theme) => theme === 'dark' || (theme === 'system' && darkQuery().matches)

function apply(theme: Theme) {
  document.documentElement.classList.toggle('dark', isDark(theme))
}

/**
 * Swaps the theme inside a view transition, revealing the new colours as a circle that grows
 * out from `origin` (the toggle that was pressed). Falls back to an instant swap when the API
 * is unsupported or the user prefers reduced motion.
 */
function transition(update: () => void, origin?: HTMLElement) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!origin || reduce || typeof document.startViewTransition !== 'function') {
    update()
    return
  }

  const rect = origin.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2
  // Distance to the farthest corner, so the circle ends up covering the whole viewport.
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  document.startViewTransition(update).ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 550, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
    )
  })
}

// Defaults to 'system'. The same logic runs in an inline script in index.html
// before first paint, so there's no flash of the wrong theme.
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(read)

  useEffect(() => {
    apply(theme)
    if (theme !== 'system') return
    const mq = darkQuery()
    const onChange = () => apply('system')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [theme])

  const setTheme = useCallback((next: Theme, origin?: HTMLElement) => {
    // Only animate when the visible colours actually change (e.g. not dark → system-while-dark).
    const animate = isDark(next) !== document.documentElement.classList.contains('dark')
    transition(
      () => {
        // The view transition snapshots the DOM after this callback, so update synchronously.
        flushSync(() => setThemeState(next))
        apply(next)
      },
      animate ? origin : undefined,
    )
    try {
      if (next === 'system') localStorage.removeItem(KEY)
      else localStorage.setItem(KEY, next)
    } catch {
      // Storage can be unavailable (e.g. private mode); the choice still applies for this visit.
    }
  }, [])

  return { theme, setTheme }
}
