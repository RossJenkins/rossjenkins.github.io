import { profile } from './data'

const frame = 'aspect-square w-28 rounded-2xl sm:w-36 md:w-full'

export default function Avatar() {
  if (profile.avatar) {
    return (
      <img
        src={`${import.meta.env.BASE_URL}${profile.avatar}`}
        alt={profile.name}
        className={`${frame} border border-line object-cover`}
      />
    )
  }

  return (
    <div
      aria-hidden="true"
      className={`${frame} grid place-items-center border-2 border-dashed border-line bg-paper/70 text-line`}
    >
      <svg viewBox="0 0 24 24" className="w-1/2" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
        <circle cx="12" cy="9" r="4" />
        <path d="M4.5 20.5c1.4-3.6 4.2-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
      </svg>
    </div>
  )
}
