import { useEffect, useMemo, useState } from 'react'

const START_DELAY = 450
const CHAR_DELAY = 85

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Cursor({ blinking }: { blinking: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`ml-[0.08em] inline-block h-[0.95em] w-[0.14em] translate-y-[0.12em] bg-accent ${
        blinking ? 'motion-safe:animate-blink' : ''
      }`}
    />
  )
}

// Glues the cursor to the last typed character so it never wraps onto a line by itself.
function Tail({ chars, count, blinking }: { chars: string[]; count: number; blinking: boolean }) {
  return (
    <>
      {chars.slice(0, Math.max(count - 1, 0)).join('')}
      <span className="whitespace-nowrap">
        {count > 0 && chars[count - 1]}
        <Cursor blinking={blinking} />
      </span>
    </>
  )
}

/**
 * Types `text` out one character at a time, then leaves a blinking cursor at the end.
 * Screen readers get the full text immediately; reduced-motion users skip the animation.
 */
export default function TypedHeading({ text, className = '' }: { text: string; className?: string }) {
  // Array.from splits by code point, so emoji aren't cut in half mid-type.
  const chars = useMemo(() => Array.from(text), [text])
  const [count, setCount] = useState(() => (reducedMotion() ? chars.length : 0))
  const done = count >= chars.length

  useEffect(() => {
    if (done) return
    const t = setTimeout(() => setCount((c) => c + 1), count === 0 ? START_DELAY : CHAR_DELAY)
    return () => clearTimeout(t)
  }, [count, done])

  return (
    <h1 className={`grid ${className}`}>
      <span className="sr-only">{text}</span>
      {/* Invisible full copy reserves the final size, so nothing below shifts while typing. */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        <Tail chars={chars} count={chars.length} blinking={false} />
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        <Tail chars={chars} count={count} blinking={done} />
      </span>
    </h1>
  )
}
