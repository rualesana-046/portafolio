"use client";

import { MoonStar, Sun } from "lucide-react";
import { ui } from "@/data/ui";
import { useLocalized } from "@/hooks/useLocalized";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();
  const t = useLocalized();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="focus-ring inline-flex items-center gap-1 rounded-full border border-accent/60 bg-surface/60 p-1 text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-shadow hover:shadow-arcane"
    >
      <span className="sr-only dark:hidden">{t(ui.switchToDark)}</span>
      <span className="hidden dark:inline sr-only">{t(ui.switchToLight)}</span>
      <span
        aria-hidden="true"
        className="inline-flex items-center gap-1.5 rounded-full bg-button-to px-2.5 py-1 text-on-button transition-colors dark:bg-transparent dark:text-muted"
      >
        <Sun className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{t(ui.lumos)}</span>
      </span>
      <span
        aria-hidden="true"
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-muted transition-colors dark:bg-button-to dark:text-on-button"
      >
        <MoonStar className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{t(ui.nox)}</span>
      </span>
    </button>
  );
}
