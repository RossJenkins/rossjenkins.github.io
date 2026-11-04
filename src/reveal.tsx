import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Returns a callback ref and whether the element has scrolled into view. Fires once, then stops
 * observing. Reduced-motion users (and browsers without IntersectionObserver) start "in view",
 * so content is never left hidden.
 */
export function useInView() {
  const [el, setEl] = useState<Element | null>(null)
  const [inView, setInView] = useState(reducedMotion)

  useEffect(() => {
    if (!el || inView) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setInView(true)
        io.disconnect()
      },
      // Trigger a little before the element's top reaches the bottom 10% of the viewport.
      { rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [el, inView])

  return [setEl, inView] as const
}

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
}: {
  as?: 'div' | 'li'
  delay?: number
  className?: string
  children: ReactNode
}) {
  const [ref, shown] = useInView()
  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined

  return (
    <Tag
      ref={ref}
      style={style}
      className={`transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
