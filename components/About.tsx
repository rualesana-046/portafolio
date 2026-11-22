"use client";

import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TextBadge } from "@/components/ui/TextBadge";
import { about } from "@/data/about";
import { sections } from "@/data/sections";
import { ui } from "@/data/ui";
import { useLocalized } from "@/hooks/useLocalized";
import { isVectorImage } from "@/lib/media";

function AboutPhotoFrame() {
  const t = useLocalized();

  return (
    <div className="photo-frame mx-auto w-full max-w-[14rem] md:max-w-none">
      <Image
        src={about.photo.src}
        alt={t(about.photo.alt)}
        width={1200}
        height={1500}
        sizes="(min-width: 1024px) 18rem, (min-width: 768px) 16rem, 14rem"
        unoptimized={isVectorImage(about.photo.src)}
        className="aspect-[4/5] w-full rounded-[0.6875rem] object-cover"
      />
    </div>
  );
}

export function About() {
  const t = useLocalized();

  return (
    <Section id="about" heading={sections.about}>
      <Reveal>
        <GlassCard decoration="parchment" className="mx-auto max-w-5xl px-6 py-10 sm:p-10 lg:p-14">
          <div className="grid items-center gap-8 md:grid-cols-[16rem_minmax(0,1fr)] md:gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12">
            <AboutPhotoFrame />
            <div>
              <p className="text-lg leading-relaxed text-ink first-letter:float-left first-letter:mr-3 first-letter:font-title first-letter:text-6xl first-letter:leading-none first-letter:text-accent-strong">
                {t(about.paragraph)}
              </p>
              <ul aria-label={t(ui.aboutSkills)} className="mt-8 flex flex-wrap gap-2">
                {about.skills.map((skill) => (
                  <li key={skill.es}>
                    <TextBadge label={t(skill)} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
