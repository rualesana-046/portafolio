import type { Locale, Localized } from "@/types/i18n";

export const LOCALES = ["es", "en"] as const satisfies readonly Locale[];
export const DEFAULT_LOCALE: Locale = "es";
export const LOCALE_STORAGE_KEY = "portfolio-locale";
export const LOCALE_ROOT_ATTRIBUTE = "lang";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function localeFromRoot(root: HTMLElement): Locale {
  return isLocale(root.lang) ? root.lang : DEFAULT_LOCALE;
}

export const localeInitScript = `try{var l=localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)});if(${JSON.stringify(LOCALES)}.indexOf(l)>-1)document.documentElement.lang=l}catch(e){}`;

const MONTH_PATTERN = /^(\d{4})-(0[1-9]|1[0-2])$/;

export function localize<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

export function formatMonth(value: string, locale: Locale): string {
  const match = MONTH_PATTERN.exec(value);
  if (!match) {
    throw new Error(`Invalid month "${value}", expected YYYY-MM`);
  }
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1));
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function oppositeLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}
