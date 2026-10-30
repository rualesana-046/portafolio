"use client";

import { useLocalized } from "@/hooks/useLocalized";
import type { SectionHeadingContent } from "@/types/navigation";

interface SectionHeadingProps {
  readonly content: SectionHeadingContent;
  readonly headingId: string;
}

function Ornament() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 16"
      className="mx-auto mt-4 h-4 w-40 text-accent"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    >
      <path d="M2 8h56M102 8h56" strokeWidth="1" strokeOpacity="0.7" />
      <path d="M66 8h28" strokeWidth="1.5" />
      <path d="M80 1l7 7-7 7-7-7z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.25" />
      <circle cx="62" cy="8" r="1.5" fill="currentColor" />
      <circle cx="98" cy="8" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function SectionHeading({ content, headingId }: SectionHeadingProps) {
  const t = useLocalized();

  return (
    <header className="mx-auto mb-12 max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-strong">
        {t(content.eyebrow)}
      </p>
      <h2
        id={headingId}
        className="text-leaf mt-3 font-title text-4xl font-semibold tracking-wide sm:text-5xl"
      >
        {t(content.title)}
      </h2>
      <Ornament />
      {content.description && <p className="mt-4 text-muted">{t(content.description)}</p>}
    </header>
  );
}
