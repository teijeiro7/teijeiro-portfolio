/**
 * Content linter.
 *
 * Parses every file in `src/data` with the same zod schemas the site builds
 * with, then applies the editorial rules the schema cannot express on its own:
 * no em dashes, no insecure links, no link to private code, no dangling ids.
 *
 * Run with `npm run content:check`. Exits non-zero on the first failing rule so
 * CI (and an agent) can stop before the site ships half-valid copy.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";

import {
  caseSchema,
  contactSchema,
  experienceSchema,
  homeSchema,
  notFoundSchema,
  siteSchema,
  workSchema,
} from "../src/data/schema.ts";

const root = new URL("../", import.meta.url).pathname;
const dataDir = join(root, "src/data");

const files = {
  site: "site.json",
  home: "home.json",
  work: "work.json",
  experience: "experience.json",
  contact: "contact.json",
  notFound: "not-found.json",
  cases: { orial: "cases/orial.json" },
} as const;

const schemas = {
  site: siteSchema,
  home: homeSchema,
  work: workSchema,
  experience: experienceSchema,
  contact: contactSchema,
  notFound: notFoundSchema,
  orial: caseSchema,
} as const;

type ContentKey = keyof typeof schemas;

const raw = {} as Record<ContentKey, unknown>;
const parsed = {} as Record<ContentKey, unknown>;

function read(file: string): unknown {
  return JSON.parse(readFileSync(join(dataDir, file), "utf8"));
}

const problems: string[] = [];

function fail(file: string, path: string, message: string) {
  problems.push(`${file} › ${path}: ${message}`);
}

/* ------------------------------- 1. shape -------------------------------- */

for (const [key, file] of [
  ["site", files.site],
  ["home", files.home],
  ["work", files.work],
  ["experience", files.experience],
  ["contact", files.contact],
  ["notFound", files.notFound],
  ["orial", files.cases.orial],
] as const) {
  const schema = schemas[key] as z.ZodType<unknown>;

  try {
    raw[key] = read(file);
    parsed[key] = schema.parse(raw[key]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      for (const issue of error.issues) {
        fail(file, issue.path.join(".") || "(root)", issue.message);
      }
    } else {
      fail(file, "(root)", error instanceof Error ? error.message : String(error));
    }
  }
}

/* ----------------------------- 2. raw string lint ------------------------- */

/**
 * Walk the raw JSON (not the parsed output, so defaults do not hide anything)
 * and collect every string with its dotted path.
 */
function* strings(value: unknown, path = ""): Generator<[string, string]> {
  if (typeof value === "string") {
    yield [path, value];
    return;
  }

  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      yield* strings(item, path ? `${path}[${index}]` : `[${index}]`);
    }
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      yield* strings(item, path ? `${path}.${key}` : key);
    }
  }
}

for (const [key, file] of Object.entries({
  site: files.site,
  home: files.home,
  work: files.work,
  experience: files.experience,
  contact: files.contact,
  notFound: files.notFound,
  orial: files.cases.orial,
})) {
  if (!raw[key as ContentKey]) continue;

  for (const [path, value] of strings(raw[key as ContentKey])) {
    if (value.includes("—")) {
      fail(file, path, "em dash found; use a comma, a full stop or a colon instead");
    }

    if (value.includes("–")) {
      fail(file, path, "en dash found; use a hyphen (-) or rephrase");
    }

    if (value.includes("http://")) {
      fail(file, path, "insecure http:// link; use https://");
    }

    if (value.trim() !== value) {
      fail(file, path, "leading or trailing whitespace");
    }

    if (/\s{2,}/.test(value)) {
      fail(file, path, "double space");
    }

    const stars = (value.match(/\*/g) ?? []).length;
    if (stars % 2 !== 0) {
      fail(file, path, "unbalanced * emphasis marker");
    }

    if (value.includes("|")) {
      const bars = (value.match(/\|/g) ?? []).length;
      if (bars > 2) {
        fail(file, path, "more than two | line breaks; this is a heading, not a paragraph");
      }
    }
  }
}

/* ---------------------------- 3. links + rules --------------------------- */

const work = parsed.work as z.infer<typeof workSchema> | undefined;
const home = parsed.home as z.infer<typeof homeSchema> | undefined;
const site = parsed.site as z.infer<typeof siteSchema> | undefined;

const knownRoutes = new Set([
  "/",
  "/work",
  "/work/orial",
  "/experience",
  "/contact",
]);

const checkHref = (file: string, path: string, href: string) => {
  if (href.startsWith("http://")) {
    fail(file, path, "insecure http:// link; use https://");
    return;
  }

  if (href.startsWith("/") && !knownRoutes.has(href.split("#")[0])) {
    fail(file, path, `internal link "${href}" does not match a route`);
  }
};

if (work) {
  const ids = new Set<string>();

  for (const [index, project] of work.projects.entries()) {
    const at = `projects[${index}]`;
    const name = project.id || project.name;

    if (ids.has(project.id)) {
      fail(files.work, `${at}.id`, `duplicate project id "${project.id}"`);
    }
    ids.add(project.id);

    for (const [linkIndex, link] of project.links.entries()) {
      const linkAt = `${at}.links[${linkIndex}]`;

      if (link.disabled && link.href) {
        fail(files.work, `${linkAt}.href`, `"${name}" code is private; a disabled link cannot point anywhere`);
      }

      if (!link.disabled && !link.href) {
        fail(files.work, `${linkAt}`, `"${name}" has a link with no target and is not marked disabled`);
      }

      if (link.href) checkHref(files.work, `${linkAt}.href`, link.href);
    }

    if (project.caseStudy && project.homeLink !== "case") {
      fail(files.work, `${at}.homeLink`, `"${name}" has a case study but does not link to it from the index`);
    }
  }

  if (home) {
    for (const [index, id] of home.selected.items.entries()) {
      if (!ids.has(id)) {
        fail(files.home, `selected.items[${index}]`, `unknown project id "${id}" in the selected list`);
      }
    }
  }

  if (home) {
    for (const [index, role] of home.experience.roles.entries()) {
      if (!role.role.en || !role.org.en) {
        fail(files.home, `experience.roles[${index}]`, "role and organisation are required");
      }
    }
  }
}

if (site) {
  checkHref(files.site, "meta.github", site.meta.github);
  checkHref(files.site, "meta.linkedin", site.meta.linkedin);
  checkHref(files.site, "meta.site", site.meta.site);

  if (!site.meta.site.endsWith("/") && new URL(site.meta.site).pathname !== "/") {
    fail(files.site, "meta.site", "site should be an origin without a trailing path");
  }
}

/* ------------------------------ 4. report -------------------------------- */

if (problems.length > 0) {
  console.error(`\n✗ content:check found ${problems.length} problem(s)\n`);
  for (const problem of problems) console.error(`  ${problem}`);
  console.error("");
  process.exit(1);
}

const counts = {
  "work records": work?.projects.length ?? 0,
  "case studies": Object.keys(files.cases).length,
  "experience roles": (parsed.experience as z.infer<typeof experienceSchema> | undefined)?.roles.length ?? 0,
  "faq entries": (parsed.contact as z.infer<typeof contactSchema> | undefined)?.faq.items.length ?? 0,
};

console.log("\n✓ content:check passed\n");
for (const [label, value] of Object.entries(counts)) {
  console.log(`  ${String(value).padStart(2, "0")}  ${label}`);
}
console.log("\n  Every string is present in EN and ES, no em dashes, no insecure links,");
console.log("  and no private project is linked.\n");
