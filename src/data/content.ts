import {
  caseSchema,
  contactSchema,
  experienceSchema,
  homeSchema,
  notFoundSchema,
  siteSchema,
  workSchema,
} from "./schema";

import siteJson from "./site.json";
import homeJson from "./home.json";
import workJson from "./work.json";
import experienceJson from "./experience.json";
import contactJson from "./contact.json";
import notFoundJson from "./not-found.json";
import orialJson from "./cases/orial.json";

/**
 * Content is validated at build time. If a field is missing, a translation is
 * empty or a link breaks a rule, the build fails here instead of shipping a
 * half-empty page. Edit the JSON files in `src/data`, then run
 * `npm run content:check`.
 */
export const site = siteSchema.parse(siteJson);
export const home = homeSchema.parse(homeJson);
export const work = workSchema.parse(workJson);
export const experience = experienceSchema.parse(experienceJson);
export const contact = contactSchema.parse(contactJson);
export const notFound = notFoundSchema.parse(notFoundJson);

export const cases = {
  orial: caseSchema.parse(orialJson),
} as const;

export type CaseId = keyof typeof cases;

/** Projects keyed by id, so the home page can reference them by slug only. */
export const projectsById = new Map(work.projects.map((project) => [project.id, project]));

export function getProject(id: string) {
  const project = projectsById.get(id);
  if (!project) {
    throw new Error(`Unknown project id "${id}" referenced in content`);
  }
  return project;
}
