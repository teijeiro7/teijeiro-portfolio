import { z } from "zod";

/**
 * Every string that a visitor can read lives in `{ en, es }`.
 * Keeping both languages in the same object makes it impossible to add a
 * sentence in one language and forget the other: the build fails instead.
 */
export const localized = z.object({
  en: z.string().trim().min(1, "English copy is required"),
  es: z.string().trim().min(1, "Spanish copy is required"),
});

export type Localized = z.infer<typeof localized>;

const externalHref = z.url().refine((value) => value.startsWith("https://"), {
  message: "External links must use https://",
});

const internalHref = z.string().startsWith("/", {
  message: "Internal links must start with /",
});

export const href = z.union([externalHref, internalHref]);

export const ctaSchema = z.object({
  eyebrow: localized,
  title: localized,
  body: localized,
  button: localized,
  note: localized,
});

/* ---------------------------------- site --------------------------------- */

export const siteSchema = z.object({
  meta: z.object({
    name: z.string().trim().min(1),
    site: externalHref,
    email: z.email(),
    github: externalHref,
    linkedin: externalHref,
    location: localized,
    coordinates: z.string().trim().min(1),
  }),
  pages: z.object({
    home: z.object({ title: localized, description: localized }),
    work: z.object({ title: localized, description: localized }),
    orial: z.object({ title: localized, description: localized }),
    experience: z.object({ title: localized, description: localized }),
    contact: z.object({ title: localized, description: localized }),
    notFound: z.object({ title: localized, description: localized }),
  }),
  ui: z.object({
    skip: localized,
    role: localized,
    menu: localized,
    theme: localized,
    language: localized,
    nav: z.object({
      index: localized,
      work: localized,
      experience: localized,
      contact: localized,
    }),
    backToTop: localized,
    status: localized,
    city: localized,
    footer: z.object({
      pages: localized,
      elsewhere: localized,
      basedIn: localized,
      colophon: localized,
      location: localized,
      fonts: localized,
      stack: localized,
      trackers: localized,
      built: localized,
    }),
    labels: z.object({
      codePrivate: localized,
      caseStudy: localized,
      readCase: localized,
      visitProduct: localized,
      allProjects: localized,
      repositories: localized,
      copy: localized,
      copied: localized,
      opensMail: localized,
      openProject: localized,
    }),
  }),
});

export type Site = z.infer<typeof siteSchema>;

/* ---------------------------------- home --------------------------------- */

export const homeSchema = z.object({
  hero: z.object({
    eyebrow: localized,
    status: localized,
    lead: localized,
    focus: localized,
    ctaPrimary: localized,
    ctaSecondary: localized,
    facts: z.array(localized).min(1),
    portraitAlt: localized,
    portraitRole: localized,
    portraitFoot: localized,
  }),
  strip: z.array(z.string().min(1)).min(1),
  selected: z.object({
    eyebrow: localized,
    title: localized,
    count: localized,
    items: z.array(z.string()).min(1),
    all: localized,
  }),
  experience: z.object({
    eyebrow: localized,
    title: localized,
    body: localized,
    cta: localized,
    roles: z
      .array(
        z.object({
          when: localized,
          role: localized,
          org: localized,
          kind: localized,
        })
      )
      .min(1),
  }),
  cta: ctaSchema,
});

export type Home = z.infer<typeof homeSchema>;

/* ---------------------------------- work --------------------------------- */

export const projectSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "Project ids are lowercase slugs"),
  name: z.string().trim().min(1),
  kind: z.enum(["product", "mobile", "ai"]),
  kicker: localized,
  tag: localized,
  tagAccent: z.boolean().default(false),
  cover: z.enum(["smashly", "orial", "jarvis", "durit"]),
  /** Short year/platform string for the compact home row. */
  meta: z.string().min(1),
  /** Alt text for the screenshot used as the record cover, when there is one. */
  mediaAlt: localized.optional(),
  /** Typographic cover copy for projects without a public screenshot. */
  coverCopy: z
    .object({ top: localized, bottom: localized })
    .optional(),
  summary: localized,
  description: localized,
  facts: z
    .array(z.object({ label: localized, value: localized }))
    .min(1),
  tags: z
    .array(z.object({ text: z.string().min(1), accent: z.boolean().default(false) }))
    .min(1),
  links: z.array(
    z.object({
      label: localized.optional(),
      href: href.optional(),
      disabled: z.boolean().default(false),
      external: z.boolean().default(false),
    })
  ),
  homeLink: z.enum(["case", "archive"]).default("archive"),
  caseStudy: z.boolean().default(false),
});

export type Project = z.infer<typeof projectSchema>;

export const workSchema = z.object({
  eyebrow: localized,
  title: localized,
  lead: localized,
  facts: z
    .array(
      z.object({
        label: localized,
        value: localized,
        ok: z.boolean().default(false),
      })
    )
    .min(1),
  filtersLabel: localized,
  filterLabels: z.object({
    all: localized,
    product: localized,
    mobile: localized,
    ai: localized,
  }),
  sorted: localized,
  projects: z.array(projectSchema).min(1),
  cta: ctaSchema,
});

export type Work = z.infer<typeof workSchema>;

/* ------------------------------- case study ------------------------------ */

const archItem = z.object({
  type: z.enum(["node", "arrow"]),
  k: z.string().optional(),
  text: localized.optional(),
  dir: z.enum(["→", "↔", "↓"]).optional(),
  accent: z.boolean().default(false),
});

export const caseSchema = z.object({
  eyebrow: localized,
  lead: localized,
  specs: z
    .array(
      z.object({
        label: localized,
        value: localized,
        ok: z.boolean().default(false),
      })
    )
    .min(1),
  cover: z.object({
    icon: z.string().startsWith("/"),
    plateTitle: z.string().min(1),
    plateSub: localized,
    list: z.array(localized).min(1),
    caption: localized,
    alt: localized,
  }),
  contentsLabel: localized,
  contents: z
    .array(z.object({ id: z.string().min(1), label: localized }))
    .min(1),
  blocks: z
    .array(
      z.object({
        id: z.string().min(1),
        eyebrow: localized,
        title: localized,
        paragraphs: z.array(localized).default([]),
        metrics: z
          .array(z.object({ value: z.string(), label: localized }))
          .default([]),
        decisions: z
          .array(
            z.object({
              n: z.string(),
              title: localized,
              body: localized,
            })
          )
          .default([]),
        architecture: z
          .object({ alt: localized, rows: z.array(z.array(archItem)).min(1) })
          .optional(),
      })
    )
    .min(1),
  next: z.object({
    label: localized,
    title: z.string().min(1),
    href: href,
    cta: localized,
  }),
});

export type CaseStudy = z.infer<typeof caseSchema>;

/* ------------------------------- experience ------------------------------ */

export const experienceSchema = z.object({
  eyebrow: localized,
  title: localized,
  lead: localized,
  facts: z.array(z.object({ label: localized, value: localized })).min(1),
  timeline: z.object({
    eyebrow: localized,
    title: localized,
    aside: localized,
  }),
  roles: z
    .array(
      z.object({
        when: localized,
        current: z.boolean().default(false),
        currentLabel: localized.optional(),
        logo: z.string().startsWith("/").optional(),
        logoText: z.string().optional(),
        logoAlt: z.string(),
        role: localized,
        org: localized,
        bullets: z.array(localized).min(1),
        tags: z.array(
          z.object({ text: z.string().min(1), accent: z.boolean().default(false) })
        ),
      })
    )
    .min(1),
  now: z.object({
    eyebrow: localized,
    title: localized,
    aside: localized,
    lead: localized,
    body: z.array(localized),
    facts: z.array(z.object({ label: localized, value: localized })).min(1),
  }),
  education: z.object({
    eyebrow: localized,
    title: localized,
    aside: localized,
    cards: z
      .array(
        z.object({
          when: localized,
          title: localized,
          body: localized,
        })
      )
      .min(1),
  }),
  skills: z.object({
    eyebrow: localized,
    title: localized,
    aside: localized,
    groups: z
      .array(
        z.object({
          title: localized,
          items: z.array(z.string().min(1)).min(1),
        })
      )
      .min(1),
  }),
  principles: z.object({
    eyebrow: localized,
    title: localized,
    items: z
      .array(z.object({ title: localized, body: localized }))
      .min(1),
  }),
  cta: ctaSchema,
});

export type Experience = z.infer<typeof experienceSchema>;

/* -------------------------------- contact -------------------------------- */

export const contactSchema = z.object({
  eyebrow: localized,
  title: localized,
  lead: localized,
  facts: z
    .array(
      z.object({
        label: localized,
        value: localized,
        sub: localized.optional(),
        clock: z.boolean().default(false),
      })
    )
    .min(1),
  form: z.object({
    head: localized,
    status: localized,
    name: localized,
    email: localized,
    subject: localized,
    message: localized,
    placeholders: z.object({
      name: localized,
      email: localized,
      subject: localized,
      message: localized,
    }),
    submit: localized,
    defaultSubject: localized,
    note: localized,
  }),
  faq: z.object({
    eyebrow: localized,
    title: localized,
    body: localized,
    items: z
      .array(z.object({ q: localized, a: localized }))
      .min(1),
  }),
});

export type Contact = z.infer<typeof contactSchema>;

/* --------------------------------- 404 ----------------------------------- */

export const notFoundSchema = z.object({
  code: localized,
  title: localized,
  body: localized,
  terminal: z.array(
    z.object({
      prompt: z.string(),
      command: z.string(),
      output: z.string(),
    })
  ),
  primary: localized,
  secondary: localized,
});

export type NotFound = z.infer<typeof notFoundSchema>;
