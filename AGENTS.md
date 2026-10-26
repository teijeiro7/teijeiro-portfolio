# AGENTS.md

Instructions for AI agents (and humans in a hurry) working on this repository.

This is Cristian Teijeiro's portfolio: a static Astro site, bilingual (English at
`/`, Spanish at `/es`), one design system, no backend.

## The one rule

**Copy lives in `src/data/*.json`. Layout lives in `src/`.**

If the task is "change this sentence", "update my role", "add a project",
"fix the Spanish" or "change the SEO title", you only touch `src/data`. Do not
edit `.astro`, `.css` or `.ts` files to change text. If a field you need does
not exist, add it to the JSON **and** to `src/data/schema.ts`, then wire it in
the view that renders it.

## Before you start

```bash
npm install
npm run content:check   # validates every JSON file against the schema + editorial rules
npm run dev             # http://localhost:4321
```

`npm run build` runs `astro check` (types) and then the production build. A
missing translation, an unknown project id or a private link to a repo fails
the build on purpose.

## Content map

| File | What it controls | Rendered by |
| --- | --- | --- |
| `src/data/site.json` | Name, email, GitHub/LinkedIn, coordinates, page titles + descriptions, nav labels, footer, shared UI labels | `src/layouts/Base.astro`, `Nav.astro`, `Footer.astro` |
| `src/data/home.json` | Home: hero lead, stack strip, the 3 selected projects (by id), experience preview, closing CTA | `src/views/HomeView.astro` |
| `src/data/work.json` | Work archive: intro, filters, the 4 project records, closing CTA | `src/views/WorkView.astro`, `ProjectMedia.astro` |
| `src/data/cases/orial.json` | The Orial case study: specs, contents, blocks, decisions, architecture diagram | `src/views/OrialView.astro` |
| `src/data/experience.json` | Timeline, education, skills, principles, "now", CTA | `src/views/ExperienceView.astro` |
| `src/data/contact.json` | Contact copy, fact list, form labels, FAQ | `src/views/ContactView.astro` |
| `src/data/not-found.json` | 404 copy and terminal lines (English only, `noindex`) | `src/views/NotFoundView.astro` |

`src/data/schema.ts` is the contract. `src/data/content.ts` parses the JSON at
build time and throws if anything is off. Do not bypass them.

## The shape of a string

Every visitor-facing string is an object with both languages:

```json
{ "en": "Software Engineer", "es": "Ingeniero de Software" }
```

Rules:

- Both keys are required. An empty Spanish string fails validation.
- Write Spanish in the same register as the English: direct, first person,
  no marketing adjectives. Do not translate literally when the idiom differs.
- Two markers are allowed inside a string, and nowhere else:
  - `|` becomes a line break. **Headings only**, at most one per string.
  - `*text*` becomes `<em>text</em>`. Used for the accented word in a heading.
- No em dashes (`—`) and no en dashes (`–`) in visible copy. Use a comma, a
  full stop, a colon or a hyphen.
- No trailing or double spaces.
- Everything is escaped before rendering, so do not add HTML to a string.

Example: `"Work, on|the *record*."` renders as two lines with "record" in the
accent italic.

## Recipes

### Change a sentence

1. Find the key with `rg "the sentence" src/data`.
2. Edit the `en` value, then write the matching `es` value.
3. `npm run content:check`.

### Add or change a project record

Projects are an array in `src/data/work.json` under `projects`, newest first.
Each record needs:

```json
{
  "id": "short-slug",
  "name": "Display Name",
  "kind": "product | mobile | ai",
  "kicker": { "en": "...", "es": "..." },
  "tag": { "en": "...", "es": "..." },
  "cover": "smashly | orial | jarvis | durit",
  "meta": "2026 · Product",
  "summary": { "en": "...", "es": "..." },
  "description": { "en": "...", "es": "..." },
  "facts": [{ "label": { "en": "Role", "es": "Rol" }, "value": { "en": "...", "es": "..." } }],
  "tags": [{ "text": "React" }],
  "links": [{ "label": { "en": "Visit the product", "es": "Visitar el producto" }, "href": "https://example.com", "external": true }],
  "homeLink": "archive | case"
}
```

`cover` selects the artwork. There are four covers and the component only knows
these four; a new cover needs a small change in `ProjectMedia.astro` and in
`HomeView.astro` (`thumbFor`). Prefer reusing an existing cover.

### Private code

Never link private repositories. A project whose code is not public gets:

```json
"links": [{ "disabled": true }]
```

The site renders a non-clickable "Code private" chip. `content:check` fails if a
disabled link carries an `href`. Orial, Jarvis and DURIT Prospector are private.
Smashly has one public link (`https://smashly-app.es`) and a disabled code chip.

### Add a case study

1. Create `src/data/cases/<id>.json` using `src/data/cases/orial.json` as the
   template, and register it in `src/data/content.ts` (`cases` object).
2. Set `caseStudy: true` and `homeLink: "case"` on the project in `work.json`.
3. Add the English route at `src/pages/work/<id>.astro` and the Spanish one at
   `src/pages/es/work/<id>.astro`, both pointing at an existing view.
4. Add a page entry in `site.json › pages` so `<title>` and the description exist.

Case-study blocks support `paragraphs`, `metrics`, `decisions` and an
`architecture` diagram. The diagram is a list of rows; a row is either nodes and
arrows, or a single `{ "type": "arrow", "dir": "↓" }` item for a stacked
layout. Keep `contents` in sync with the block `id`s: they are the anchors.

### Change links or contact details

`site.json › meta` is the single source for the email, GitHub, LinkedIn,
coordinates and canonical URL. The contact form composes a `mailto:` from
`meta.email`; there is no backend and no fake submit.

### Change SEO

`site.json › pages › <page>` holds `title` and `description` per language.
Canonical and `hreflang` are generated from `meta.site` plus the route. The 404
is English only and always `noindex`.

## What not to touch

- `src/styles/site.css` is the whole design system (tokens, layout,
  components, motion). Content changes never require editing it.
- `src/data/schema.ts` is not documentation: every restriction in it is
  enforced at build time. Loosen a rule only when the content genuinely needs
  it, and say why in the commit.
- `mockups/` is the approved visual reference. It is untracked, not shipped and
  not part of any PR. Do not import from it.
- Do not reintroduce the Free-AI-API project, the "momentum" section or the Lab
  section. They were removed on purpose. The archive is four records and the
  home gallery is three selected projects.

## Design rules to preserve

- One accent: `#D43511` light, `#FF5F37` dark. One radius: `2px`.
- Inter for prose, JetBrains Mono for labels and numbers.
- Numbered records, hairline rules, generous whitespace. No cards with shadows,
  no gradients, no decorative icons.
- Every interactive element has a visible `focus-visible` state.
- `prefers-reduced-motion: reduce` disables transitions and reveals.
- Text meets AA contrast in both themes.
- The portrait is the DNI-style crop at `public/images/portrait-2026.webp`.
  Do not replace or re-crop it without being asked.
- The logo is `public/logo-mark.svg`: no background box, black glyph in the
  light theme, white in the dark theme.

## Validate before you finish

```bash
npm run content:check   # schema + editorial rules
npm run build           # astro check + static build
```

If you changed visible copy, also open the page at 390px and 1440px in both
themes and both languages, and check the Spanish reads naturally rather than
like a translation.
