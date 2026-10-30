export type Locale = "es" | "en";
export type Localized<T = string> = Record<Locale, T>;
