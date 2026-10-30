"use client";

import { Languages } from "lucide-react";
import { ui } from "@/data/ui";
import { useLocale } from "@/hooks/useLocale";
import { useLocalized } from "@/hooks/useLocalized";
import { cn } from "@/lib/cn";
import { LOCALES, oppositeLocale } from "@/lib/i18n";
import type { Locale } from "@/types/i18n";

const activeLocaleClass: Record<Locale, string> = {
  es: "[html[lang=es]_&]:bg-accent-strong [html[lang=es]_&]:text-canvas",
  en: "[html[lang=en]_&]:bg-accent-strong [html[lang=en]_&]:text-canvas",
};

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  const t = useLocalized();

  return (
    <button
      type="button"
      onClick={() => setLocale(oppositeLocale(locale))}
      className="focus-ring inline-flex items-center gap-1 rounded-full border border-accent/60 bg-surface/60 p-1 font-mono text-[0.7rem] font-semibold transition-shadow hover:shadow-arcane"
    >
      <span className="sr-only">{t(ui.switchLanguage)}</span>
      <Languages aria-hidden="true" className="mx-1 hidden h-3.5 w-3.5 text-accent-strong sm:block" />
      {LOCALES.map((code) => (
        <span
          key={code}
          lang={code}
          aria-hidden="true"
          className={cn("rounded-full px-2 py-1 text-muted transition-colors", activeLocaleClass[code])}
        >
          {code.toUpperCase()}
        </span>
      ))}
    </button>
  );
}
