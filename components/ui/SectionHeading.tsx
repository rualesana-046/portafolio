"use client";

import { FernDivider } from "@/components/ui/FernDivider";
import { useLocalized } from "@/hooks/useLocalized";
import type { SectionHeadingContent } from "@/types/navigation";

interface SectionHeadingProps {
  readonly content: SectionHeadingContent;
  readonly headingId: string;
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
      <FernDivider className="mx-auto mt-4 h-8 w-64 text-accent" />
      {content.description && <p className="mt-4 text-muted">{t(content.description)}</p>}
    </header>
  );
}
