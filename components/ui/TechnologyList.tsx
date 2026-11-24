"use client";

import { TechBadge } from "@/components/ui/TechBadge";
import { TextBadge } from "@/components/ui/TextBadge";
import { skillIndex } from "@/data/skills";
import { ui } from "@/data/ui";
import { useLocalized } from "@/hooks/useLocalized";
import { cn } from "@/lib/cn";
import { resolveTechnologies } from "@/lib/skills";
import { fillTemplate } from "@/lib/text";
import type { ProjectTechnology } from "@/types/project";

interface TechnologyListProps {
  readonly technologies: readonly ProjectTechnology[];
  readonly limit?: number;
  readonly className?: string;
}

export function TechnologyList({ technologies, limit, className }: TechnologyListProps) {
  const t = useLocalized();
  const resolved = resolveTechnologies(technologies, skillIndex);
  const visible = limit === undefined ? resolved : resolved.slice(0, limit);
  const hiddenCount = resolved.length - visible.length;

  return (
    <ul aria-label={t(ui.technologies)} className={cn("flex flex-wrap gap-2", className)}>
      {visible.map((technology) =>
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
      {hiddenCount > 0 && (
        <li>
          <TextBadge
            label={`+${hiddenCount}`}
            description={fillTemplate(t(hiddenCount === 1 ? ui.moreTechnologiesOne : ui.moreTechnologies), {
              count: hiddenCount,
            })}
          />
        </li>
      )}
    </ul>
  );
}
