// All site content lives here. Edit this file; the components just render it.

export type Link = { label: string; href: string }

export type Role = {
  title: string
  company: string
  companyUrl?: string
  dates: string
  current?: boolean
  highlights: string[]
  links?: Link[]
}

export const profile = {
  name: 'Ross Jenkins',
  greeting: 'Hi, I’m Ross 👋',
  // Filename of a square photo in /public. Set to '' to show the placeholder instead.
  avatar: 'me.jpg',
  role: 'Design engineer in Belfast',
  summary:
    'I’m an engineer with 7+ years of product and design system experience who loves to work end to end. I can shape a UX alongside PM and design, build it, get it in front of users, and iterate. I care about visual craft, accessibility, and building components that help others ship consistent, polished interfaces.',
}

// Add paragraphs (hobbies, interests) here later.
export const about: string[] = [
  'I’m a design engineer based in Belfast. There’s more to come here about what I get up to outside of work.',
]

export const experience: Role[] = [
  {
    title: 'Lead Design System Engineer',
    company: 'Whitespace',
    companyUrl: 'https://white.space',
    dates: 'Sept 2026 – Present',
    current: true,
    highlights: [
      'Took ownership of the frontend monorepo and cut build times from ~30 mins to ~10, while adding automated accessibility and visual regression testing.',
      'Lead the React component library and a themed Storybook that engineers and non-technical stakeholders use to browse components and common patterns.',
      'Prototyping a token, governance and agentic development toolchain, using W3C Design Tokens and Style Dictionary to keep design and code in sync and prevent drift.',
    ],
  },
  {
    title: 'Development Team Lead',
    company: 'Gearset',
    companyUrl: 'https://gearset.com',
    dates: 'Feb 2025 – Aug 2026',
    highlights: [
      'Led a team of 5 engineers, working with product and engineering management to set our roadmap and deliver workflow improvements for large, strategic customers, including Gitflow support in Pipelines.',
      'Turned user feedback into a Markdown editor for deployment steps in Pipelines, built from design system primitives, then iterated with in-editor help and native file uploads.',
      'Developed the React component library implementing Gearset’s design system, adopted across an ~90 person engineering organisation.',
      'Migrated Gearset from a legacy client-side router to React Router v7 across ~200 application routes.',
      'Scaled the team through the internship programme and coaching: 3 promotions and 9 interns hired, several returning as graduates.',
      'Represented Gearset at Dreamforce, talking to existing and prospective customers.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Gearset',
    companyUrl: 'https://gearset.com',
    dates: 'Aug 2022 – Feb 2025',
    highlights: [
      'Integrated SAML SSO into the product with a focus on intuitive, accessible configuration, unblocking a critical security requirement for enterprise customers.',
      'Delivered a bespoke merge conflict resolution product so users can resolve conflicts without leaving Gearset.',
      'Mentored new engineers from their first commit onwards.',
    ],
    links: [{ label: 'Talk: the Redux Redux (NIDC)', href: 'https://www.youtube.com/watch?v=OIC7m-X77Hw' }],
  },
  {
    title: 'Software Engineer II',
    company: 'Instil',
    companyUrl: 'https://instil.co',
    dates: 'Jan 2020 – Aug 2022',
    highlights: [
      'Implemented the design system for a client’s car insurance platform and built its quotation flow, with a clear, accessible information architecture across a multi-stage form.',
      'Added Apple Pay and Google Pay to the checkout flow for a modern experience across web and mobile.',
    ],
    links: [{ label: 'Blog: const assertions for fun and profit', href: 'https://instil.co/blog/using-typescript-const-assertions-for-fun-and-profit' }],
  },
  {
    title: 'Graduate Software Engineer',
    company: 'AquaQ Analytics',
    companyUrl: 'https://dataintellect.com',
    dates: 'Jul 2019 – Jan 2020',
    highlights: [],
  },
]

// Rendered as a TypeScript discriminated union. `kind` is the discriminant; `type` is the
// interface name shown in the code block. Rule of thumb: frontend/backend are what ships in the
// product; testing/tooling are what you build, test and design with.
export const skills: { kind: string; type: string; items: string[] }[] = [
  {
    kind: 'frontend',
    type: 'Frontend',
    items: ['TypeScript', 'React', 'Next.js', 'React Router', 'Redux Toolkit', 'Radix UI', 'Tailwind CSS', 'CSS Modules', 'SCSS'],
  },
  { kind: 'backend', type: 'Backend', items: ['C#', '.NET', 'Node.js', 'GraphQL', 'PostgreSQL', 'AWS'] },
  { kind: 'testing', type: 'Testing', items: ['Vitest', 'Jest', 'Playwright', 'Cypress'] },
  { kind: 'tooling', type: 'Tooling', items: ['Storybook', 'Figma', 'Claude Code', 'Docker', 'Webpack'] },
]

export const education = {
  degree: 'BSc (Hons) Computer Science',
  school: 'The University of Edinburgh',
  dates: '2015 – 2019',
  // Set `url` to link your dissertation; until then the title shows as plain text.
  dissertation: { title: 'Tackling Algorithmic Bias', url: '' },
}

export const links: Link[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rossjenkinsdev/' },
  { label: 'GitHub', href: 'https://github.com/rossjenkins' },
]
