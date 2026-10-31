"use client";

import { CurrentYear } from "@/components/ui/CurrentYear";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ui } from "@/data/ui";
import { useLocalized } from "@/hooks/useLocalized";

export function Footer() {
  const t = useLocalized();

  return (
    <footer className="border-t border-line/70 px-4 py-10 dark:border-line/40 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <SocialLinks variant="compact" />
        <p className="text-sm text-muted">
          {t(ui.copyrightSymbol)} <CurrentYear />
        </p>
      </div>
    </footer>
  );
}
