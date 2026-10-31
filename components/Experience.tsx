"use client";

import { useScroll } from "framer-motion";
import { Award, Briefcase, GraduationCap, type LucideIcon } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { FootprintTrail } from "@/components/ui/FootprintTrail";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TechBadge } from "@/components/ui/TechBadge";
import { education, languageProficiencies } from "@/data/education";
import { experience } from "@/data/experience";
import { sections } from "@/data/sections";
import { skillIndex } from "@/data/skills";
import { ui } from "@/data/ui";
import { useLocale } from "@/hooks/useLocale";
import { useLocalized } from "@/hooks/useLocalized";
import { formatPeriod } from "@/lib/i18n";
import { resolveSkills } from "@/lib/skills";
import { isExternalUrl } from "@/lib/text";
import type { EducationEntry, ExperienceEntry, Period } from "@/types/experience";
import type { Localized } from "@/types/i18n";

function PeriodLabel({ period }: { readonly period: Period }) {
  const { locale } = useLocale();
  const t = useLocalized();
  const formatted = formatPeriod(period, locale, t(ui.present));

  return (
    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent-strong">
      <time dateTime={period.start}>{formatted.start}</time> {t(ui.periodSeparator)}{" "}
      {period.end === null ? formatted.end : <time dateTime={period.end}>{formatted.end}</time>}
    </p>
  );
}

interface TimelineProps {
  readonly title: Localized;
  readonly icon: LucideIcon;
  readonly children: ReactNode;
  readonly footer?: ReactNode;
}

function Timeline({ title, icon: Icon, children, footer }: TimelineProps) {
  const t = useLocalized();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.85", "end 0.55"] });

  return (
    <div>
      <h3 className="mb-8 flex items-center gap-3 font-title text-3xl font-semibold text-ink">
        <Icon aria-hidden="true" className="h-6 w-6 text-accent" />
        {t(title)}
      </h3>
      <div ref={trackRef} className="relative pl-10">
        <FootprintTrail
          progress={scrollYProgress}
          markerSelector="[data-timeline-marker]"
          className="absolute inset-y-0 left-0 w-6 text-accent-strong"
        />
        <ol className="space-y-8">{children}</ol>
      </div>
      {footer}
    </div>
  );
}

function TimelineItem({ index, children }: { readonly index: number; readonly children: ReactNode }) {
  return (
    <li className="relative">
      <span
        aria-hidden="true"
        data-timeline-marker
        className="absolute -left-10 top-6 h-[23px] w-[23px] rounded-full border-2 border-accent bg-canvas shadow-arcane"
      />
      <Reveal delay={index * 0.08}>
        <GlassCard className="p-6">{children}</GlassCard>
      </Reveal>
    </li>
  );
}

function ExperienceItem({ entry }: { readonly entry: ExperienceEntry }) {
  const t = useLocalized();
  const technologies = resolveSkills(entry.technologies, skillIndex);

  return (
    <>
      <PeriodLabel period={entry.period} />
      <h4 className="mt-2 text-xl font-semibold text-ink">{t(entry.role)}</h4>
      <p className="text-muted">{entry.organization}</p>
      <p className="mt-3 text-ink">{t(entry.description)}</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-ink marker:text-accent">
        {t(entry.highlights).map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <ul aria-label={t(ui.technologies)} className="mt-4 flex flex-wrap gap-2">
        {technologies.map((skill) => (
          <li key={skill.id}>
            <TechBadge skill={skill} />
          </li>
        ))}
      </ul>
    </>
  );
}

function EducationItem({ entry }: { readonly entry: EducationEntry }) {
  const t = useLocalized();
  const credentialUrl = entry.credentialUrl;
  const isExternal = credentialUrl !== undefined && isExternalUrl(credentialUrl);

  return (
    <>
      <PeriodLabel period={entry.period} />
      <h4 className="mt-2 text-xl font-semibold text-ink">{t(entry.title)}</h4>
      <p className="text-muted">{entry.institution}</p>
      {entry.description && <p className="mt-3 text-ink">{t(entry.description)}</p>}
      {credentialUrl && (
        <a
          href={credentialUrl}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="focus-ring mt-4 inline-flex items-center gap-2 rounded-full border border-accent/60 px-4 py-2 text-sm font-semibold text-accent-strong transition hover:bg-button-to hover:text-on-button"
        >
          <Award aria-hidden="true" className="h-4 w-4" />
          {t(ui.viewCredential)}
          <span className="sr-only">
            {" "}
            {t(entry.title)}
            {isExternal && ` ${t(ui.opensInNewTab)}`}
          </span>
        </a>
      )}
    </>
  );
}

function LanguageList() {
  const t = useLocalized();

  return (
    <Reveal className="mt-8 pl-10">
      <GlassCard className="p-6">
        <h4 className="text-xl font-semibold text-ink">{t(ui.languages)}</h4>
        <ul className="mt-3 space-y-1">
          {languageProficiencies.map((proficiency) => (
            <li key={proficiency.id} className="flex flex-wrap justify-between gap-2">
              <span className="text-ink">{t(proficiency.language)}</span>
              <span className="font-semibold text-accent-strong">{proficiency.level}</span>
            </li>
          ))}
        </ul>
      </GlassCard>
    </Reveal>
  );
}

export function Experience() {
  return (
    <Section id="experience" heading={sections.experience}>
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
        <Timeline title={ui.academicBackground} icon={GraduationCap} footer={<LanguageList />}>
          {education.map((entry, index) => (
            <TimelineItem key={entry.id} index={index}>
              <EducationItem entry={entry} />
            </TimelineItem>
          ))}
        </Timeline>
        <Timeline title={ui.technicalExperience} icon={Briefcase}>
          {experience.map((entry, index) => (
            <TimelineItem key={entry.id} index={index}>
              <ExperienceItem entry={entry} />
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </Section>
  );
}
