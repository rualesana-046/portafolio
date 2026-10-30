import type { Skill } from "@/types/skill";

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
