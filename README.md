# Portfolio

React + Vite + Tailwind CSS v4, built to a static site for GitHub Pages.

```bash
npm install
npm run dev      # local dev server
npm run build    # static output in dist/
npm run typecheck
```

All content (summary, about, experience, education, links) is in `src/data.ts`.
Colours are semantic tokens in `src/index.css` (light values in `:root`, dark in `.dark`); fonts are theme tokens there too.
The theme toggle offers Light, System setting (the default) and Dark, and remembers an explicit choice.

## Deploy

1. Push to a GitHub repo with a `main` branch.
2. In the repo, go to Settings → Pages and set Source to **GitHub Actions**.
3. Every push to `main` builds and deploys via `.github/workflows/deploy.yml`.

`vite.config.ts` uses `base: './'`, so it works at `username.github.io` and at `username.github.io/repo-name`.
