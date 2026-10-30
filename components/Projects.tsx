"use client";

import { AnimatePresence, m } from "framer-motion";
import { Code, Download, ExternalLink, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { FilterChips } from "@/components/ui/FilterChips";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TechBadge } from "@/components/ui/TechBadge";
import { projects } from "@/data/projects";
import { sections } from "@/data/sections";
import { skillIndex } from "@/data/skills";
import { projectKindLabels, ui } from "@/data/ui";
import { useKindFilter } from "@/hooks/useKindFilter";
import { useLocalized } from "@/hooks/useLocalized";
import { isVectorImage } from "@/lib/media";
import { resolveSkills } from "@/lib/skills";
import { isExternalUrl } from "@/lib/text";
import type { Localized } from "@/types/i18n";
import type { Project, ProjectKind, ProjectLinks } from "@/types/project";

const projectKinds = Object.keys(projectKindLabels) as ProjectKind[];

interface LinkAction {
  readonly key: keyof ProjectLinks;
  readonly label: Localized;
  readonly icon: LucideIcon;
}

const linkActions: readonly LinkAction[] = [
  { key: "repository", label: ui.viewRepository, icon: Code },
  { key: "demo", label: ui.viewDemo, icon: ExternalLink },
  { key: "download", label: ui.downloadProject, icon: Download },
];

function ProjectCard({ project }: { readonly project: Project }) {
  const t = useLocalized();
  const technologies = resolveSkills(project.technologies, skillIndex);
  const actions = linkActions.flatMap((action) => {
    const url = project.links[action.key];
    return url ? [{ ...action, url }] : [];
  });

  return (
    <GlassCard as="article" interactive className="flex h-full flex-col overflow-hidden">
      <Image
        src={project.image}
        alt={t(project.imageAlt)}
        width={1600}
        height={900}
        sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 92vw"
        unoptimized={isVectorImage(project.image)}
        className="aspect-video w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-strong">
          {t(projectKindLabels[project.kind])}
        </p>
        <h3 className="-mt-2 text-xl font-semibold leading-snug text-ink">{t(project.title)}</h3>
        <p className="text-muted">{t(project.description)}</p>
        <ul aria-label={t(ui.technologies)} className="flex flex-wrap gap-2">
          {technologies.map((skill) => (
            <li key={skill.id}>
              <TechBadge skill={skill} />
            </li>
          ))}
        </ul>
        {actions.length > 0 && (
          <ul aria-label={t(ui.projectLinks)} className="mt-auto flex flex-wrap gap-2 pt-2">
            {actions.map(({ key, label, icon: Icon, url }) => {
              const isExternal = isExternalUrl(url);
              return (
                <li key={key}>
                  <a
                    href={url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="focus-ring inline-flex items-center gap-2 rounded-full border border-accent/60 px-4 py-2 text-sm font-semibold text-accent-strong transition hover:bg-button-to hover:text-on-button"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                    {t(label)}
                    <span className="sr-only">
                      {" "}
                      {t(project.title)}
                      {isExternal && ` ${t(ui.opensInNewTab)}`}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </GlassCard>
  );
}

export function Projects() {
  const { activeKind, setActiveKind, kinds, visibleItems } = useKindFilter(projects, projectKinds);

  return (
    <Section id="projects" heading={sections.projects}>
      <FilterChips
        label={ui.filterProjects}
        kinds={kinds}
        labels={projectKindLabels}
        activeKind={activeKind}
        onSelect={setActiveKind}
        visibleCount={visibleItems.length}
      />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {visibleItems.map((project, index) => (
            <m.li
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Reveal delay={(index % 3) * 0.08} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
    </Section>
  );
}
