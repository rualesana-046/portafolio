"use client";

import { Mail } from "lucide-react";
import { TechLogo } from "@/components/ui/TechLogo";
import { socialLinks, socialLogos } from "@/data/social-links";
import { socialPlatformLabels, ui } from "@/data/ui";
import { useLocalized } from "@/hooks/useLocalized";
import { cn } from "@/lib/cn";
import { isExternalUrl } from "@/lib/text";
import type { SocialLink } from "@/types/contact";

type SocialLinksVariant = "compact" | "labeled";

function SocialIcon({ link }: { readonly link: SocialLink }) {
  if (link.id === "email") {
    return <Mail aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />;
  }
  return <TechLogo src={socialLogos[link.id]} className="h-[18px] w-[18px] bg-current" />;
}

interface SocialLinksProps {
  readonly variant: SocialLinksVariant;
  readonly labelledBy?: string;
  readonly className?: string;
}

export function SocialLinks({ variant, labelledBy, className }: SocialLinksProps) {
  const t = useLocalized();
  const isCompact = variant === "compact";

  return (
    <ul
      aria-label={labelledBy ? undefined : t(ui.socialLinks)}
      aria-labelledby={labelledBy}
      className={cn("flex items-center", isCompact ? "gap-3" : "flex-wrap justify-center gap-x-6 gap-y-3", className)}
    >
      {socialLinks.map((link) => {
        const isExternal = isExternalUrl(link.url);
        return (
          <li key={link.id}>
            <a
              href={link.url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={cn(
                "focus-ring transition",
                isCompact
                  ? "grid h-10 w-10 place-items-center rounded-full border border-accent/60 text-ink hover:text-accent hover:shadow-arcane"
                  : "inline-flex min-h-10 items-center gap-2 rounded-full px-2 text-ink underline decoration-accent/60 underline-offset-4 hover:decoration-accent",
              )}
            >
              <SocialIcon link={link} />
              {isCompact ? (
                <span className="sr-only">{t(socialPlatformLabels[link.id])}</span>
              ) : (
                <span>{link.label}</span>
              )}
              {isExternal && <span className="sr-only">{` ${t(ui.opensInNewTab)}`}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
