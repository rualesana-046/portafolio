"use client";

import { createContext, useCallback, useEffect, useMemo, type ReactNode } from "react";
import { useDocumentAttribute } from "@/hooks/useDocumentAttribute";
import { writeStorage } from "@/lib/dom";
import {
  DEFAULT_LOCALE,
  LOCALE_ROOT_ATTRIBUTE,
  LOCALE_STORAGE_KEY,
  localeFromRoot,
} from "@/lib/i18n";
import type { Locale, Localized } from "@/types/i18n";

export interface LocaleContextValue {
  readonly locale: Locale;
  readonly isHydrated: boolean;
  readonly setLocale: (locale: Locale) => void;
}

export const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  readonly children: ReactNode;
  readonly documentTitle: Localized;
}

export function LocaleProvider({ children, documentTitle }: LocaleProviderProps) {
  const { value: locale, isHydrated } = useDocumentAttribute(
    LOCALE_ROOT_ATTRIBUTE,
    localeFromRoot,
    DEFAULT_LOCALE,
  );

  const setLocale = useCallback((nextLocale: Locale) => {
    document.documentElement.lang = nextLocale;
    writeStorage(LOCALE_STORAGE_KEY, nextLocale);
  }, []);

  const title = documentTitle[locale];

  useEffect(() => {
    const applyTitle = () => {
      if (document.title !== title) {
        document.title = title;
      }
    };
    applyTitle();
    const observer = new MutationObserver(applyTitle);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [title]);

  const value = useMemo(
    () => ({ locale, isHydrated, setLocale }),
    [locale, isHydrated, setLocale],
  );

  return (
    <LocaleContext value={value}>
      {children}
    </LocaleContext>
  );
}
