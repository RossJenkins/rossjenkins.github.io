import type { ReactNode } from 'react'
import type { Theme } from './theme'

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const options: { value: Theme; label: string; icon: ReactNode }[] = [
  {
    value: 'light',
    label: 'Light',
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </Icon>
    ),
  },
  {
    value: 'system',
    label: 'System setting',
    icon: (
      <Icon>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </Icon>
    ),
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: (
      <Icon>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </Icon>
    ),
  },
]

// State lives in the parent (via useTheme) so multiple toggles on the page stay in sync.
export default function ThemeToggle({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme, origin?: HTMLElement) => void }) {
  return (
    <div role="group" aria-label="Colour theme" className="inline-flex rounded-lg border border-line p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          title={o.label}
          aria-label={o.label}
          aria-pressed={theme === o.value}
          onClick={(e) => setTheme(o.value, e.currentTarget)}
          className={`grid size-8 place-items-center rounded-md ${
            theme === o.value ? 'bg-band text-ink' : 'text-muted hover:text-ink'
          }`}
        >
          {o.icon}
        </button>
      ))}
    </div>
  )
}
