"use client";

import { Mail } from "lucide-react";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { TechLogo } from "@/components/ui/TechLogo";
import { socialLinks, socialLogos } from "@/data/social-links";
import { socialPlatformLabels, ui } from "@/data/ui";
import { useLocalized } from "@/hooks/useLocalized";
import { isExternalUrl } from "@/lib/text";
import type { SocialLink } from "@/types/contact";

function SocialIcon({ link }: { readonly link: SocialLink }) {
  if (link.id === "email") {
    return <Mail aria-hidden="true" className="h-[18px] w-[18px]" />;
  }
  return <TechLogo src={socialLogos[link.id]} className="h-[18px] w-[18px] bg-current" />;
}

export function Footer() {
  const t = useLocalized();

  return (
    <footer className="border-t border-line/70 px-4 py-10 dark:border-line/40 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <ul aria-label={t(ui.socialLinks)} className="flex items-center gap-3">
          {socialLinks.map((link) => {
            const isExternal = isExternalUrl(link.url);
            return (
              <li key={link.id}>
                <a
                  href={link.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-accent/60 text-ink transition hover:text-accent hover:shadow-arcane"
                >
                  <SocialIcon link={link} />
                  <span className="sr-only">
                    {t(socialPlatformLabels[link.id])}
                    {isExternal && ` ${t(ui.opensInNewTab)}`}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <p className="text-sm text-muted">
          {t(ui.copyrightSymbol)} <CurrentYear />
        </p>
      </div>
    </footer>
  );
}
