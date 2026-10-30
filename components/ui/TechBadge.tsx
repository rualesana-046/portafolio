import type { CSSProperties } from "react";
import type { Skill } from "@/types/skill";

interface TechBadgeProps {
  readonly skill: Skill;
}

function maskStyle(logo: string): CSSProperties {
  const image = `url("${logo}")`;
  return { maskImage: image, WebkitMaskImage: image };
}

export function TechBadge({ skill }: TechBadgeProps) {
  return (
    <span className="group inline-flex items-center gap-2 rounded-full border border-line/60 bg-surface/60 px-3 py-1 font-mono text-xs text-ink transition-colors hover:border-accent dark:border-line/40">
      <span
        aria-hidden="true"
        className="h-4 w-4 shrink-0 bg-ink transition-colors [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] group-hover:bg-accent"
        style={maskStyle(skill.logo)}
      />
      {skill.name}
    </span>
  );
}
