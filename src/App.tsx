import type { ReactNode } from 'react'
import Avatar from './Avatar'
import Frame, { columns } from './Frame'
import Nav from './Nav'
import { Reveal } from './reveal'
import SkillsBlock from './SkillsBlock'
import TypedHeading from './TypedHeading'
import { about, education, experience, links, profile } from './data'

const linkClass =
  'text-muted underline decoration-line decoration-2 underline-offset-4 hover:text-ink hover:decoration-muted'

function Section({
  id,
  index,
  title,
  revealChildren = true,
  children,
}: {
  id: string
  index: number
  title: string
  /** Set false when the content animates itself (e.g. per item), to avoid a double reveal. */
  revealChildren?: boolean
  children: ReactNode
}) {
  return (
    <Frame className={index % 2 === 1 ? 'bg-section-odd' : 'bg-section-even'}>
      <section aria-labelledby={id} className={`grid ${columns}`}>
        <div className="border-b border-line px-6 py-5 md:border-r md:border-b-0 md:py-16">
          {/* The reveal wrapper is the sticky element, so the heading still pins while scrolling. */}
          <Reveal className="md:sticky md:top-24">
            <h2 id={id} className="scroll-mt-14 font-mono text-xl font-semibold md:text-2xl md:scroll-mt-24">
              <span className="mr-3 text-base font-normal text-accent">{String(index).padStart(2, '0')}</span>
              {title}
            </h2>
          </Reveal>
        </div>
        <div className="min-w-0 px-6 py-10 md:px-12 md:py-16">
          {revealChildren ? <Reveal delay={120}>{children}</Reveal> : children}
        </div>
      </section>
    </Frame>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <header>
        <Frame className="bg-hero bg-dots">
          <div className={`grid ${columns}`}>
            <div className="px-6 pt-12 md:border-r md:border-line md:py-24">
              <Avatar />
            </div>
            <div className="px-6 pt-6 pb-14 md:px-12 md:py-24">
              <TypedHeading text={profile.greeting} className="text-4xl font-semibold tracking-tight sm:text-6xl md:text-5xl lg:text-6xl" />
              <p className="mt-3 font-mono text-lg text-muted sm:text-xl">{profile.role}</p>
              <p className="mt-6 max-w-[62ch]">{profile.summary}</p>
            </div>
          </div>
        </Frame>
      </header>

      <main>
        <Section id="about" index={1} title="About me">
          <div className="max-w-[62ch] space-y-4">
            {about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Section>

        <Section id="experience" index={2} title="Experience" revealChildren={false}>
          <ol className="ml-2 border-l-2 border-line">
            {experience.map((role) => (
              <Reveal as="li" key={`${role.company}-${role.dates}`} delay={120} className="relative pb-10 pl-8 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute top-2 -left-2.25 size-4 rounded-full border-2 border-accent ${
                    role.current ? 'bg-accent' : 'bg-paper'
                  }`}
                />
                <h3 className="text-xl font-semibold">{role.title}</h3>
                <p className="flex flex-wrap items-baseline gap-x-4 text-base text-muted">
                  {role.companyUrl ? (
                    <a href={role.companyUrl} rel="noopener noreferrer" target="_blank" className={linkClass}>
                      {role.company}
                    </a>
                  ) : (
                    <span>{role.company}</span>
                  )}
                  <span className="font-mono text-sm">{role.dates}</span>
                </p>
                {role.highlights.length > 0 && (
                  <ul className="mt-3 max-w-[62ch] list-disc space-y-2 pl-5 marker:text-accent">
                    {role.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
                {role.links && (
                  <ul className="mt-3 flex flex-wrap gap-x-6 text-base">
                    {role.links.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} rel="noopener noreferrer" target="_blank" className={linkClass}>
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </ol>
        </Section>

        <Section id="skills" index={3} title="Skills" revealChildren={false}>
          <SkillsBlock />
        </Section>

        <Section id="education" index={4} title="Education">
          <h3 className="text-xl font-semibold">{education.degree}</h3>
          <p className="flex flex-wrap items-baseline gap-x-4 text-base text-muted">
            {education.schoolUrl ? (
              <a href={education.schoolUrl} rel="noopener noreferrer" target="_blank" className={linkClass}>
                {education.school}
              </a>
            ) : (
              <span>{education.school}</span>
            )}
            <span className="font-mono text-sm">{education.dates}</span>
          </p>
          {education.highlights.length > 0 && (
            <ul className="mt-3 max-w-[62ch] list-disc space-y-2 pl-5 marker:text-accent">
              {education.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}
          {education.dissertation && (
            <p className="mt-3">
              Here's a link to my dissertation
              {education.dissertation.url ? (
                <a href={`${import.meta.env.BASE_URL}${education.dissertation.url}`} target="_blank" className={linkClass}>
                  {education.dissertation.title}
                </a>
              ) : (
                education.dissertation.title
              )}
            </p>
          )}
        </Section>
      </main>

      {/* Always dark, whatever the theme: the `.dark` class re-scopes the colour tokens for this subtree. */}
      <footer className="dark">
        <Frame className="bg-footer" bottomRule={false}>
          {/* Baseline-aligned so the © line sits level with the links; the divider lives on the
              (taller) links cell so it still spans the full height. */}
          <div className={`grid md:items-baseline ${columns}`}>
            <p className="order-last px-6 pb-8 font-mono text-sm text-muted md:order-0 md:py-10">
              © {new Date().getFullYear()} {profile.name}
            </p>
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 border-line px-6 pt-8 pb-6 md:-ml-px md:border-l md:px-12 md:py-10">
              <ul aria-label="Find me online" className="flex flex-wrap gap-x-8 gap-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} rel="noopener noreferrer" target="_blank" className={linkClass}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="font-mono text-sm text-muted">Built with love, in Belfast 🏗️</p>
            </div>
          </div>
        </Frame>
      </footer>
    </>
  )
}
