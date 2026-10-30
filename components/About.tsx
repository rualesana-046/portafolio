"use client";

import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { about } from "@/data/about";
import { sections } from "@/data/sections";
import { useLocalized } from "@/hooks/useLocalized";
import { cn } from "@/lib/cn";
import { isVectorImage } from "@/lib/media";
import type { GalleryImage } from "@/types/profile";

interface GalleryPhotoProps {
  readonly image: GalleryImage;
  readonly sizes: string;
}

function GalleryPhoto({ image, sizes }: GalleryPhotoProps) {
  const t = useLocalized();

  return (
    <Image
      src={image.src}
      alt={t(image.alt)}
      width={1200}
      height={1500}
      sizes={sizes}
      unoptimized={isVectorImage(image.src)}
      className="aspect-[4/5] w-full rounded-xl object-cover ring-1 ring-accent/40"
    />
  );
}

export function About() {
  const t = useLocalized();
  const gallery = about.gallery ?? [];
  const [featured] = gallery;
  const hasSingleImage = gallery.length === 1 && featured !== undefined;
  const hasGrid = gallery.length > 1;

  return (
    <Section id="about" heading={sections.about}>
      <Reveal>
        <GlassCard
          decoration="parchment"
          className={cn("mx-auto p-8 sm:p-12", hasSingleImage ? "max-w-5xl" : "max-w-3xl")}
        >
          <div className={cn(hasSingleImage && "grid items-center gap-10 md:grid-cols-[1.4fr_1fr]")}>
            <div className="space-y-5 text-lg leading-relaxed text-ink">
              {t(about.paragraphs).map((paragraph) => (
                <p
                  key={paragraph}
                  className="first:first-letter:float-left first:first-letter:mr-3 first:first-letter:font-title first:first-letter:text-6xl first:first-letter:leading-none first:first-letter:text-accent-strong"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {hasSingleImage && (
              <GalleryPhoto image={featured} sizes="(min-width: 768px) 22rem, 90vw" />
            )}
          </div>
          {hasGrid && (
            <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {gallery.map((image) => (
                <li key={image.src}>
                  <GalleryPhoto image={image} sizes="(min-width: 640px) 14rem, 45vw" />
                </li>
              ))}
            </ul>
          )}
        </GlassCard>
      </Reveal>
    </Section>
  );
}
