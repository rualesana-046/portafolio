"use client";

import { Code, Download, ExternalLink, TriangleAlert, X, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, type RefObject } from "react";
import { TechnologyList } from "@/components/ui/TechnologyList";
import { projectKindLabels, ui } from "@/data/ui";
import { useLocalized } from "@/hooks/useLocalized";
import { isVectorImage } from "@/lib/media";
import { isExternalUrl } from "@/lib/text";
import type { Localized } from "@/types/i18n";
import type { Project, ProjectLinks } from "@/types/project";

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

interface ProjectDialogProps {
  readonly project: Project;
  readonly dialogRef: RefObject<HTMLDialogElement | null>;
  readonly onClosed: () => void;
}

export function ProjectDialog({ project, dialogRef, onClosed }: ProjectDialogProps) {
  const t = useLocalized();
  const titleId = useId();
  const actions = linkActions.flatMap((action) => {
    const url = project.links[action.key];
    return url ? [{ ...action, url }] : [];
  });

  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    const closeOnBackdrop = (event: globalThis.MouseEvent) => {
      if (event.target === dialog) {
        dialog.close();
      }
    };
    dialog.addEventListener("click", closeOnBackdrop);
    return () => dialog.removeEventListener("click", closeOnBackdrop);
  }, [dialogRef]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClosed}
      className="project-dialog focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent m-auto max-h-[calc(100dvh-2rem)] w-[min(44rem,calc(100%-2rem))] max-w-none overflow-y-auto overscroll-contain break-words rounded-2xl border border-line/70 bg-canvas p-0 text-ink shadow-parchment backdrop:bg-letter-char/70 motion-safe:open:animate-ink-rise dark:shadow-arcane"
    >
      <div className="project-dialog-bar sticky top-0 z-10 flex justify-end bg-canvas/95 px-3 py-2 backdrop-blur-glass">
        <button
          type="button"
          onClick={close}
          aria-label={t(ui.closeProjectDetails)}
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/60 text-accent-strong transition hover:bg-button-to hover:text-on-button"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
      <Image
        src={project.image}
        alt={t(project.imageAlt)}
        width={1600}
        height={900}
        sizes="(min-width: 768px) 44rem, 100vw"
        unoptimized={isVectorImage(project.image)}
        className="aspect-video w-full object-cover"
      />
      <div className="space-y-6 p-6 sm:p-8">
        <header className="project-dialog-repeat">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-strong">
            {t(projectKindLabels[project.kind])}
          </p>
          <h3 id={titleId} className="mt-2 font-title text-3xl font-semibold leading-tight text-ink">
            {t(project.title)}
          </h3>
        </header>
        <p className="project-dialog-repeat text-ink">{t(project.description)}</p>
        <section>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-strong">
            {t(ui.projectFeatures)}
          </h4>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink marker:text-accent">
            {t(project.features).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>
        <section>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-strong">
            {t(ui.projectParticipation)}
          </h4>
          <p className="mt-3 text-ink">{t(project.participation)}</p>
        </section>
        <section>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-strong">
            {t(ui.technologies)}
          </h4>
          <TechnologyList technologies={project.technologies} className="mt-3" />
        </section>
        {project.notice && (
          <p
            role="note"
            className="flex items-start gap-3 rounded-xl border border-accent/50 bg-surface/60 px-4 py-3 text-sm text-ink"
          >
            <TriangleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" />
            <span className="flex min-w-0 flex-col gap-0.5">
              <strong className="font-semibold">{t(ui.projectNotice)}</strong>
              <span>{t(project.notice)}</span>
            </span>
          </p>
        )}
        {actions.length > 0 && (
          <ul aria-label={t(ui.projectLinks)} className="flex flex-wrap gap-2">
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
                      {` ${t(ui.projectLinkOf)} ${t(project.title)}${isExternal ? ` ${t(ui.opensInNewTab)}` : ""}`}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </dialog>
  );
}
