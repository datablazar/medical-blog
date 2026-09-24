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

## Structure

- `design-system/tokens.json`: a copy of the design system's tokens (the source of truth).
- `app/tokens.css`: the tokens as CSS custom properties and type classes (`.t-display` … `.t-kicker`).
- `components/`: the site header and footer, `PostCard`, `Callout` (`in-short`, `good-to-know`, `urgent`) and `Button`.
- `content/posts/*.md`: posts with front matter (`title`, `summary`, `topic`, `date`, `readingTime`).
