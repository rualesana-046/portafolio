import { TechLogo } from "@/components/ui/TechLogo";
import type { Skill } from "@/types/skill";

interface TechBadgeProps {
  readonly skill: Skill;
}

export function TechBadge({ skill }: TechBadgeProps) {
  return (
    <span className="group inline-flex items-center gap-2 rounded-full border border-line/60 bg-surface/60 px-3 py-1 font-body text-sm text-ink transition-colors hover:border-accent dark:border-line/40">
      <TechLogo
        src={skill.logo}
        className="h-4 w-4 bg-ink transition-colors group-hover:bg-accent"
      />
      {skill.name}
    </span>
  );
}
