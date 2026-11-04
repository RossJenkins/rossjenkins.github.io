import type { ReactNode } from 'react'

// Shared page width. The nav, hero and every section use it so the vertical rails line up.
export const container = 'mx-auto max-w-6xl'

// Width of the left label column on desktop. The hero avatar sits in the same column.
export const columns = 'md:grid-cols-[15rem_1fr] lg:grid-cols-[18rem_1fr]'

function Corner({ side }: { side: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 13 13"
      // Offset by half the size (minus half the 1px rule) so the centre sits on the line.
      className={`pointer-events-none absolute -bottom-[7px] z-10 size-[13px] text-accent ${
        side === 'left' ? '-left-[7px]' : '-right-[7px]'
      }`}
    >
      <path d="M6.5 0v13M0 6.5h13" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/**
 * A full-bleed band with a bottom rule, and a centred column framed by vertical rails.
 * Small crosshairs mark where the rails meet the rule. Pass `bottomRule={false}` for the
 * last band on the page, which has no rule (and so no crosshairs) beneath it.
 */
export default function Frame({
  className = '',
  bottomRule = true,
  children,
}: {
  className?: string
  bottomRule?: boolean
  children: ReactNode
}) {
  return (
    <div className={`px-4 sm:px-6 ${bottomRule ? 'border-b border-line' : ''} ${className}`}>
      <div className={`relative border-x border-line ${container}`}>
        {children}
        {bottomRule && (
          <>
            <Corner side="left" />
            <Corner side="right" />
          </>
        )}
      </div>
    </div>
  )
}
