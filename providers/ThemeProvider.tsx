"use client";

import { createContext, useCallback, useMemo, type ReactNode } from "react";
import { useDocumentAttribute } from "@/hooks/useDocumentAttribute";
import { writeStorage } from "@/lib/dom";
import {
  DARK_THEME_CLASS,
  DEFAULT_THEME,
  THEME_ROOT_ATTRIBUTE,
  THEME_STORAGE_KEY,
  oppositeTheme,
  themeFromRoot,
  type Theme,
} from "@/lib/theme";

export interface ThemeContextValue {
  readonly theme: Theme;
  readonly isHydrated: boolean;
  readonly setTheme: (theme: Theme) => void;
  readonly toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  readonly children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { value: theme, isHydrated } = useDocumentAttribute(
    THEME_ROOT_ATTRIBUTE,
    themeFromRoot,
    DEFAULT_THEME,
  );

  const setTheme = useCallback((nextTheme: Theme) => {
    document.documentElement.classList.toggle(DARK_THEME_CLASS, nextTheme === "dark");
    writeStorage(THEME_STORAGE_KEY, nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(oppositeTheme(theme));
  }, [setTheme, theme]);

  const value = useMemo(
    () => ({ theme, isHydrated, setTheme, toggleTheme }),
    [theme, isHydrated, setTheme, toggleTheme],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
