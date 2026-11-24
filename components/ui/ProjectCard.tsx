"use client";

import Image from "next/image";
import { useRef } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProjectDialog } from "@/components/ui/ProjectDialog";
import { TechBadge } from "@/components/ui/TechBadge";
import { TextBadge } from "@/components/ui/TextBadge";
import { skillIndex } from "@/data/skills";
import { projectKindLabels, ui } from "@/data/ui";
import { useIsHydrated } from "@/hooks/useDocumentAttribute";
import { useLocalized } from "@/hooks/useLocalized";
import { resolveTechnologies } from "@/lib/skills";
import type { Project } from "@/types/project";

const THUMBNAIL_SIZES =
  "(min-width: 75em) 23rem, (min-width: 64em) calc((100vw - 6rem) / 3), (min-width: 40em) calc((100vw - 4.5rem) / 2), calc(100vw - 2rem)";

interface ProjectCardProps {
  readonly project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useLocalized();
  const isHydrated = useIsHydrated();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const technologies = resolveTechnologies(project.technologies, skillIndex);
  const title = t(project.title);

  return (
    <GlassCard
      as="article"
      interactive
      className="flex h-full flex-col overflow-hidden has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-canvas"
    >
      <Image
        src={project.image}
        alt=""
        width={1600}
        height={900}
        sizes={THUMBNAIL_SIZES}
        className="project-thumb aspect-video w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-strong">
          {t(projectKindLabels[project.kind])}
        </p>
        <h3 className="-mt-2 text-xl font-semibold leading-snug text-ink">
          {isHydrated ? (
            <button
              ref={openerRef}
              type="button"
              aria-haspopup="dialog"
              onClick={() => dialogRef.current?.showModal()}
              className="text-left outline-none after:absolute after:inset-0 after:z-[2] after:cursor-pointer after:content-['']"
            >
              {title}
            </button>
          ) : (
            title
          )}
        </h3>
        <p className="line-clamp-4 text-muted">{t(project.description)}</p>
        <ul aria-label={t(ui.technologies)} className="flex flex-wrap gap-2 pt-2">
          {technologies.map((technology) =>
            technology.kind === "skill" ? (
              <li key={technology.skill.id}>
                <TechBadge skill={technology.skill} />
              </li>
            ) : (
              <li key={technology.label.es}>
                <TextBadge label={t(technology.label)} />
              </li>
            ),
          )}
        </ul>
      </div>
      <ProjectDialog project={project} dialogRef={dialogRef} onClosed={() => openerRef.current?.focus()} />
    </GlassCard>
  );
}
