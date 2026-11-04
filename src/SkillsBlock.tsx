import type { ReactNode } from 'react'
import { skills } from './data'
import { useInView } from './reveal'

const FILE_NAME = 'skills.ts'

// Animation timing: the window eases in first, then lines stream in top to bottom.
const CONTAINER_MS = 500
const LINE_STAGGER_MS = 35

// Syntax token colours. Everything except the skill names themselves is aria-hidden,
// so a screen reader hears plain lists of skills rather than TypeScript punctuation.
const tok = {
  keyword: 'text-accent',
  type: 'text-ink font-semibold',
  prop: 'text-muted',
  string: 'text-ink',
  punct: 'text-muted',
}

function T({ k, children }: { k: keyof typeof tok; children: ReactNode }) {
  return (
    <span aria-hidden="true" className={tok[k]}>
      {children}
    </span>
  )
}

function Line({ n, indent = 0, children }: { n: number; indent?: number; children?: ReactNode }) {
  return (
    // Each line wipes in left to right once the parent figure is shown (data-shown), staggered
    // by line number so the file appears to stream in.
    <div
      className="grid grid-cols-[2.5rem_1fr] [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-300 ease-out group-data-[shown=true]/code:[clip-path:inset(0)] motion-reduce:transition-none sm:grid-cols-[3rem_1fr]"
      style={{ transitionDelay: `${CONTAINER_MS + (n - 1) * LINE_STAGGER_MS}ms` }}
    >
      <span aria-hidden="true" className="pr-4 text-right text-line select-none">
        {n}
      </span>
      {/* Long lines soft-wrap with a hanging indent, like an editor with word wrap on. */}
      <div className="min-w-0" style={{ paddingLeft: `${indent}ch` }}>
        {children ?? ' '}
      </div>
    </div>
  )
}

export default function SkillsBlock() {
  const [ref, shown] = useInView()
  let n = 1

  return (
    <figure
      ref={ref}
      data-shown={shown}
      style={{ transitionDuration: `${CONTAINER_MS}ms` }}
      className={`group/code overflow-hidden rounded-lg border border-line bg-paper font-mono text-sm leading-6 transition-[opacity,translate,scale] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:text-[0.9375rem] sm:leading-7 ${
        shown ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-[0.98] opacity-0'
      }`}
    >
      <figcaption className="flex items-center gap-4 border-b border-line bg-band/40 px-4 py-2">
        <span aria-hidden="true" className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-3 rounded-full border border-line" />
          ))}
        </span>
        <span className="text-sm text-muted">{FILE_NAME}</span>
      </figcaption>

      <div className="py-4 pr-4">
        <ul>
          {skills.map((group, gi) => (
            <li key={group.kind}>
              {gi > 0 && <Line n={n++} />}
              <Line n={n++}>
                <T k="keyword">interface</T> <T k="type">{group.type}</T> <T k="punct">{'{'}</T>
              </Line>
              <Line n={n++} indent={2}>
                <T k="prop">kind</T>
                <T k="punct">: </T>
                <T k="string">'{group.kind}'</T>
                <T k="punct">;</T>
              </Line>
              <Line n={n++} indent={2}>
                <div className="flex">
                  <span className="shrink-0 whitespace-pre">
                    <T k="prop">name</T>
                    <T k="punct">: </T>
                  </span>
                  <ul aria-label={group.kind} className="flex min-w-0 flex-wrap">
                    {group.items.map((item, i) => (
                      // The `|` travels with the following item, so wrapped lines start with
                      // a leading pipe, the way Prettier formats long unions.
                      <li key={item} className="whitespace-pre">
                        {i > 0 && <T k="punct">| </T>}
                        <T k="string">'</T>
                        <span className={tok.string}>{item}</span>
                        <T k="string">'</T>
                        <T k="punct">{i < group.items.length - 1 ? ' ' : ';'}</T>
                      </li>
                    ))}
                  </ul>
                </div>
              </Line>
              <Line n={n++}>
                <T k="punct">{'}'}</T>
              </Line>
            </li>
          ))}
        </ul>
        <Line n={n++} />
        <Line n={n++}>
          <div className="flex">
            <span className="shrink-0 whitespace-pre">
              <T k="keyword">export type</T> <T k="type">Skill</T> <T k="punct">= </T>
            </span>
            <span className="flex min-w-0 flex-wrap">
              {skills.map((g, i) => (
                <span key={g.kind} className="whitespace-pre">
                  {i > 0 && <T k="punct">| </T>}
                  <T k="type">{g.type}</T>
                  {i < skills.length - 1 && <T k="punct"> </T>}
                </span>
              ))}
            </span>
          </div>
        </Line>
      </div>
    </figure>
  )
}
