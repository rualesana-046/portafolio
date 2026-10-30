"use client";

import { ui } from "@/data/ui";
import { useLocalized } from "@/hooks/useLocalized";
import type { Localized } from "@/types/i18n";

interface FilterChipsProps<K extends string> {
  readonly label: Localized;
  readonly kinds: readonly K[];
  readonly labels: Readonly<Record<K, Localized>>;
  readonly activeKind: K | null;
  readonly onSelect: (kind: K | null) => void;
  readonly visibleCount: number;
}

const chipClassName =
  "focus-ring rounded-full border border-accent/60 px-4 py-1.5 text-sm text-muted transition-colors hover:text-ink aria-pressed:border-transparent aria-pressed:bg-button-to aria-pressed:text-on-button";

export function FilterChips<K extends string>({
  label,
  kinds,
  labels,
  activeKind,
  onSelect,
  visibleCount,
}: FilterChipsProps<K>) {
  const t = useLocalized();

  return (
    <div className="mb-10 flex flex-col items-center gap-3">
      <div role="group" aria-label={t(label)} className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          aria-pressed={activeKind === null}
          onClick={() => onSelect(null)}
          className={chipClassName}
        >
          {t(ui.filterAll)}
        </button>
        {kinds.map((kind) => (
          <button
            key={kind}
            type="button"
            aria-pressed={activeKind === kind}
            onClick={() => onSelect(kind)}
            className={chipClassName}
          >
            {t(labels[kind])}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        {t(ui.visibleItems)}: {visibleCount}
      </p>
    </div>
  );
}
