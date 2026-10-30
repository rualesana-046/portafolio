import type { Locale } from "@/types/i18n";

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
