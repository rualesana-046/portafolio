import { TechLogo } from "@/components/ui/TechLogo";
import type { Skill } from "@/types/skill";

interface SkillTileProps {
  readonly skill: Skill;
}

export function SkillTile({ skill }: SkillTileProps) {
  return (
    <div className="group flex h-full flex-col items-center gap-3 rounded-xl border border-line/60 bg-surface/50 px-3 py-5 text-center transition hover:border-accent hover:shadow-arcane dark:border-line/40">
      <TechLogo src={skill.logo} className="h-8 w-8 bg-muted transition-colors group-hover:bg-accent" />
      <span className="text-sm font-semibold text-ink">{skill.name}</span>
    </div>
  );
}
