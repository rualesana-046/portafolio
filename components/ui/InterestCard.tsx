"use client";

import { BookOpen, Feather, Palette, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { interestKindLabels, ui } from "@/data/ui";
import { useLocalized } from "@/hooks/useLocalized";
import { isVectorImage } from "@/lib/media";
import { isExternalUrl } from "@/lib/text";
import type { Interest, InterestKind } from "@/types/interest";

const interestIcons: Record<InterestKind, LucideIcon> = {
  book: BookOpen,
  hobby: Feather,
  creative: Palette,
};

interface InterestCardProps {
  readonly interest: Interest;
}

export function InterestCard({ interest }: InterestCardProps) {
  const t = useLocalized();
  const Icon = interestIcons[interest.kind];
  const link = interest.link;
  const isExternal = link !== undefined && isExternalUrl(link);

  return (
    <GlassCard as="article" className="flex h-full flex-col overflow-hidden">
      {interest.image && (
        <Image
          src={interest.image}
          alt=""
          width={1200}
          height={900}
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 92vw"
          unoptimized={isVectorImage(interest.image)}
          className="aspect-[4/3] w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent-strong">
          <Icon aria-hidden="true" className="h-4 w-4" />
          {t(interestKindLabels[interest.kind])}
        </p>
        <h4 className="text-xl font-semibold text-ink">
          {link ? (
            <a
              href={link}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="focus-ring rounded-sm underline decoration-accent underline-offset-4 hover:text-accent-strong"
            >
              {t(interest.title)}
              {isExternal && <span className="sr-only"> {t(ui.opensInNewTab)}</span>}
            </a>
          ) : (
            t(interest.title)
          )}
        </h4>
        <p className="text-muted">{t(interest.description)}</p>
      </div>
    </GlassCard>
  );
}
