import type { Localized } from "../data/schema";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "es";
}

/** Pick the active language out of a `{ en, es }` content object. */
export function t(value: Localized, locale: Locale): string {
  return value[locale];
}

/**
 * Content stores locale-neutral paths (`/work/orial`). Routes are prefixed for
 * Spanish so both languages have their own URL and their own indexable page.
 */
export function pathFor(path: string, locale: Locale): string {
  if (!path.startsWith("/")) return path;
  if (locale === "en") return path;
  return path === "/" ? "/es" : `/es${path}`;
}

/** Same page in the other language, used by the language switch. */
export function alternateLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

/** Strip the `/es` prefix from a pathname to get its locale-neutral form. */
export function neutralPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (clean === "/es") return "/";
  if (clean.startsWith("/es/")) return clean.slice(3);
  return clean;
}

/** `<html lang>` and `hreflang` values. */
export const htmlLang: Record<Locale, string> = {
  en: "en",
  es: "es",
};
