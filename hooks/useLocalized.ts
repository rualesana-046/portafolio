import { useCallback } from "react";
import { useLocale } from "@/hooks/useLocale";
import { localize } from "@/lib/i18n";
import type { Localized } from "@/types/i18n";

export type Translate = <T>(value: Localized<T>) => T;

export function useLocalized(): Translate {
  const { locale } = useLocale();
  return useCallback(<T,>(value: Localized<T>): T => localize(value, locale), [locale]);
}
