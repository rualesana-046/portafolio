"use client";

import { useRef } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProjectDialog } from "@/components/ui/ProjectDialog";
import { TechnologyList } from "@/components/ui/TechnologyList";
import { projectKindLabels } from "@/data/ui";
import { useIsHydrated } from "@/hooks/useDocumentAttribute";
import { useLocalized } from "@/hooks/useLocalized";
import type { Project } from "@/types/project";

const MAX_VISIBLE_TECHNOLOGIES = 4;

interface ProjectCardProps {
  readonly project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useLocalized();
  const isHydrated = useIsHydrated();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const title = t(project.title);

  return (
    <GlassCard
      as="article"
      interactive
      className="flex h-full flex-col overflow-hidden has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-canvas"
    >
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
        <p className="line-clamp-4 min-h-[4lh] text-muted">{t(project.description)}</p>
        <TechnologyList technologies={project.technologies} limit={MAX_VISIBLE_TECHNOLOGIES} className="mt-auto pt-2 sm:min-h-[4.75rem]" />
      </div>
      <ProjectDialog project={project} dialogRef={dialogRef} onClosed={() => openerRef.current?.focus()} />
    </GlassCard>
  );
}
