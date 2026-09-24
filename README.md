# medical-blog
medically unexplained conditions science

The **Medically Explained** website, built with Next.js on the Medically Explained design system.

## Develop

```sh
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Design system

The site uses **Instrument**, the Medically Explained design system in Claude Design:
https://claude.ai/artifact/WyLbrrsnW1w1YB5Y7WEAcQ (brand book, tokens and rules).

## Structure

- `design-system/tokens.json`: a copy of the design system's tokens (the source of truth).
- `app/tokens.css`: the tokens as CSS custom properties. Fonts (Lexend for text, Atkinson Hyperlegible Mono for numbers and labels) load in `app/layout.tsx`, chosen for readers with brain fog.
- `app/globals.css`: base styles, `.container`, `.rule-top` and the `.label` section label.
- `app/(site)/`: the Home and About pages, sharing the header and footer layout.
- `components/`: `SiteHeader`, `SiteFooter`, `Logo`, `ArticleBody` (Markdown with citations and figures) and `figures/` (the article figures; `PemChart` is kept for the upcoming PEM explainer).
- `lib/site-content.ts`: the author's story and the disclaimer.
- `content/posts/*.md`: posts with front matter (`title`, `summary`, `topic`, `date`, `readingTime`, `references`). Posts marked `draft: true` stay in the repo but are hidden everywhere on the site.
