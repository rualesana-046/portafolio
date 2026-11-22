import type { Localized } from "@/types/i18n";
import type { ProjectTechnology } from "@/types/project";
import type { Skill, SkillCategory } from "@/types/skill";

export type SkillIndex = ReadonlyMap<string, Skill>;

export function createSkillIndex(skills: readonly Skill[]): SkillIndex {
  const index = new Map<string, Skill>();
  for (const skill of skills) {
    if (index.has(skill.id)) {
      throw new Error(`Duplicate skill id "${skill.id}"`);
    }
    index.set(skill.id, skill);
  }
  return index;
}

export function resolveSkills(ids: readonly string[], index: SkillIndex): readonly Skill[] {
  return ids.map((id) => {
    const skill = index.get(id);
    if (!skill) {
      throw new Error(`Unknown skill id "${id}"`);
    }
    return skill;
  });
}

export type ResolvedTechnology =
  | { readonly kind: "skill"; readonly skill: Skill }
  | { readonly kind: "label"; readonly label: Localized };

export function resolveTechnologies(
  technologies: readonly ProjectTechnology[],
  index: SkillIndex,
): readonly ResolvedTechnology[] {
  return technologies.map((technology): ResolvedTechnology => {
    if (typeof technology !== "string") {
      return { kind: "label", label: technology };
    }
    const [skill] = resolveSkills([technology], index);
    if (!skill) {
      throw new Error(`Unknown skill id "${technology}"`);
    }
    return { kind: "skill", skill };
  });
}

export interface SkillGroup {
  readonly category: SkillCategory;
  readonly skills: readonly Skill[];
}

export function groupSkillsByCategory(
  skills: readonly Skill[],
  order: readonly SkillCategory[],
): readonly SkillGroup[] {
  return order
    .map((category) => ({ category, skills: skills.filter((skill) => skill.category === category) }))
    .filter((group) => group.skills.length > 0);
}
