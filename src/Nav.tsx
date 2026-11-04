import { useEffect, useRef, useState } from 'react'
import { container } from './Frame'
import ThemeToggle from './ThemeToggle'
import { useTheme } from './theme'

const items = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
]

const itemClass = 'hover:underline decoration-2 underline-offset-4 decoration-line'

// Matches Tailwind's `md` breakpoint, where the inline nav takes over from the menu.
const desktopQuery = '(min-width: 48rem)'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      close()
      buttonRef.current?.focus()
    }
    // Close if the viewport grows past the breakpoint, so the scroll lock can't get stuck on.
    const mq = window.matchMedia(desktopQuery)

    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', close)
    document.documentElement.style.overflow = 'hidden'
    firstLinkRef.current?.focus({ preventScroll: true })

    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', close)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <nav aria-label="Main" className="sticky top-0 z-20 border-b border-line bg-paper px-4 sm:px-6">
      <div className={`flex h-14 items-center justify-between border-x border-line px-4 sm:px-6 ${container}`}>
        <a href="#" className="font-mono text-base font-semibold">
          <span className="text-accent">~/</span>ross-jenkins
        </a>
        <div className="flex items-center gap-4">
          <ul className="hidden items-center gap-6 text-base md:flex">
            {items.map((i) => (
              <li key={i.href}>
                <a href={i.href} className={itemClass}>
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
            <div className="hidden md:block">
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
            <button
              ref={buttonRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen(!open)}
              className="-mr-2 grid size-10 place-items-center rounded-md hover:bg-band md:hidden"
            >
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {/* Each bar rotates/fades so the icon morphs between ☰ and ✕. */}
                <g className="transition-transform duration-300 motion-reduce:transition-none [transform-box:view-box] [transform-origin:center]" style={{ transform: open ? 'rotate(45deg) translateY(5px)' : 'none' }}>
                  <path d="M4 7h16" />
                </g>
                <path d="M4 12h16" className={`transition-opacity duration-200 motion-reduce:transition-none ${open ? 'opacity-0' : ''}`} />
                <g className="transition-transform duration-300 motion-reduce:transition-none [transform-box:view-box] [transform-origin:center]" style={{ transform: open ? 'rotate(-45deg) translateY(-5px)' : 'none' }}>
                  <path d="M4 17h16" />
                </g>
              </svg>
            </button>
          </div>
      </div>

      {/* Always mounted so it can animate out; `inert` keeps it out of the tab order and a11y tree when closed. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`absolute inset-x-0 top-[calc(100%+1px)] h-[calc(100dvh-100%-1px)] bg-paper px-4 transition-[opacity,translate,visibility] duration-300 ease-out motion-reduce:transition-none sm:px-6 md:hidden ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
        }`}
      >
        <div className="flex h-full flex-col border-x border-line">
          <ul className="flex-1">
            {items.map((i, n) => (
              <li
                key={i.href}
                className={`border-b border-line transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none ${
                  open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${100 + n * 50}ms` : '0ms' }}
              >
                <a
                  ref={n === 0 ? firstLinkRef : undefined}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 px-4 py-5 font-mono text-2xl font-semibold hover:bg-panel focus-visible:outline-offset-[-4px] sm:px-6"
                >
                  <span className="text-base font-normal text-accent">{String(n + 1).padStart(2, '0')}</span>
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
          <div
            className={`flex items-center justify-between border-t border-line px-4 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] transition-opacity duration-300 motion-reduce:transition-none sm:px-6 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: open ? `${100 + items.length * 50}ms` : '0ms' }}
          >
            <span className="font-mono text-base text-muted">Theme</span>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </div>
    </nav>
  )
}
