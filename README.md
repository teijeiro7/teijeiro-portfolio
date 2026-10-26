# Cristian Teijeiro · Portfolio

[![Astro](https://img.shields.io/badge/Astro-4.12.2-BC52EE?logo=astro)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Personal portfolio: an engineering dossier built as a static site with Astro.
Bilingual (English at `/`, Spanish at `/es`), one accent colour, no backend, no
trackers, no client-side router.

🌐 **Live:** [teijeiro7.vercel.app](https://teijeiro7.vercel.app)

---

## What is in here

| Route | Page |
| --- | --- |
| `/` · `/es` | Index: portrait, selected work, experience preview, contact call |
| `/work` · `/es/work` | Archive of four project records, with filters |
| `/work/orial` · `/es/work/orial` | Orial case study: decisions, metrics, architecture |
| `/experience` · `/es/experience` | Timeline, now, education, toolbox, principles |
| `/contact` · `/es/contact` | Contact details, `mailto:` form, FAQ |

The 404 is English only and `noindex`.

## Design system

- One accent: `#D43511` in the light theme, `#FF5F37` in the dark theme.
- Inter for prose, JetBrains Mono for labels and numbers. Radius is always `2px`.
- Numbered records, hairline rules, a single paper/ink palette, no shadows.
- `@layer` order: tokens, base, layout, components, pages, motion.
- Theme is stored in `localStorage` and falls back to `prefers-color-scheme`.
- `prefers-reduced-motion` and `focus-visible` are first-class, not afterthoughts.

Everything lives in [`src/styles/site.css`](src/styles/site.css).

## Content, not markup

All copy lives in [`src/data/`](src/data) as JSON, validated with zod at build
time. Layout files never contain strings. That means an editor (human or agent)
can rewrite the site without opening a component.

```text
src/data/
├── site.json          # identity, links, SEO, nav + footer labels
├── home.json          # hero, stack strip, selected projects, preview, CTA
├── work.json          # archive intro, filters, the four records
├── cases/orial.json   # the case study
├── experience.json    # timeline, education, skills, principles
├── contact.json       # copy, form labels, FAQ
├── not-found.json     # 404
├── schema.ts          # the contract: zod schemas for every file
└── content.ts         # parses and exports typed content
```

Every visible string is `{ "en": "...", "es": "..." }`. A missing translation
fails the build. Inside a string, `|` is a line break and `*text*` is emphasis;
both are escaped before rendering. Em dashes are banned by the linter.

Read [`AGENTS.md`](AGENTS.md) for the editing recipes and the rules that keep
the design consistent.

## Structure

```text
src/
├── components/    # Nav, Footer, Breadcrumb, SectionHead, CtaBand, ProjectMedia, Arrow
├── layouts/
│   └── Base.astro # head, meta, hreflang, canonical, theme bootstrap
├── lib/           # i18n helpers and the inline formatter
├── pages/         # 11 thin route wrappers (EN + ES)
├── scripts/
│   └── site.ts    # theme, scroll progress, sheet, reveal, clock, copy, filters, mailto
├── styles/
│   └── site.css   # the whole design system
├── views/         # HomeView, WorkView, OrialView, ExperienceView, ContactView, NotFoundView
└── data/          # content
scripts/
└── validate-content.ts  # schema + editorial linter
```

Pages are wrappers: they pick a locale, a page-meta key and a path, then render
one view. Adding a route is a five-line file.

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run content:check` | Validate every content file (schema + editorial rules) |
| `npm run build` | Type-check, validate content, build to `dist/` |
| `npm run preview` | Preview the production build |

CI runs `content:check` and `build` on every push and pull request.

## Contact form

There is no server. The form composes a `mailto:` URL from `site.json › meta.email`
and the fields the visitor filled in, then hands it to the operating system. If
no mail client is configured, nothing is sent and nothing is faked.

## License

MIT © [Cristian Teijeiro](https://github.com/teijeiro7)
