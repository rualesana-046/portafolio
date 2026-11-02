"use client";

import Image from "next/image";
import { ScrollText } from "lucide-react";
import { HeroScene } from "@/components/ui/HeroScene";
import { profile } from "@/data/profile";
import { sections } from "@/data/sections";
import { ui } from "@/data/ui";
import { useLocalized } from "@/hooks/useLocalized";
import { isVectorImage } from "@/lib/media";

const HEADING_ID = "hero-heading";

export function Hero() {
  const t = useLocalized();

  return (
    <section
      id="hero"
      aria-labelledby={HEADING_ID}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-44 pt-28 sm:px-6 sm:pb-60 lg:pt-32"
    >
      <HeroScene />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div className="order-2 text-center md:order-1 md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-strong motion-safe:animate-ink-rise">
            {t(sections.hero.title)}
          </p>
          <h1
            id={HEADING_ID}
            className="mt-4 font-title text-5xl font-semibold leading-tight tracking-wide motion-safe:animate-ink-rise motion-safe:[animation-delay:120ms] sm:text-6xl lg:text-7xl"
          >
            <span className="text-leaf">{profile.name}</span>
          </h1>
          <p className="mt-5 text-lg text-ink motion-safe:animate-ink-rise motion-safe:[animation-delay:240ms] sm:text-xl">
            {t(profile.headline)}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-muted motion-safe:animate-ink-rise motion-safe:[animation-delay:360ms] md:mx-0">
            {t(profile.summary)}
          </p>
          <div className="mt-9 motion-safe:animate-ink-rise motion-safe:[animation-delay:480ms]">
            <a
              href={profile.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-3 rounded-full border border-accent/70 bg-gradient-to-b from-button-from to-button-to px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-on-button shadow-[inset_0_1px_0_rgb(255_255_255/0.28),0_10px_24px_-12px_rgb(var(--glow)/0.7)] transition hover:shadow-arcane motion-safe:hover:-translate-y-0.5"
            >
              <ScrollText aria-hidden="true" className="h-4 w-4" />
              {t(ui.downloadCv)}
              <span className="sr-only"> {t(ui.opensInNewTab)}</span>
            </a>
          </div>
        </div>
        <div className="order-1 mx-auto w-56 motion-safe:animate-ink-rise sm:w-72 md:order-2 lg:w-80">
          <div className="relative">
            <span
              aria-hidden="true"
              data-portrait-frame=""
              className="absolute -inset-3 rounded-full border border-accent/30"
            />
            {isVectorImage(profile.photo) ? (
              <div
                role="img"
                aria-label={t(profile.photoAlt)}
                className="hero-portrait relative aspect-square w-full rounded-full shadow-arcane ring-1 ring-accent/60"
              />
            ) : (
              <Image
                src={profile.photo}
                alt={t(profile.photoAlt)}
                width={960}
                height={1200}
                preload
                fetchPriority="high"
                sizes="(min-width: 1024px) 20rem, (min-width: 640px) 18rem, 14rem"
                className="relative aspect-square w-full rounded-full object-cover shadow-arcane ring-1 ring-accent/60"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
