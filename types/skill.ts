export type SkillCategory = "framework" | "language" | "database" | "platform" | "tool";

export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly category: SkillCategory;
  readonly logo: string;
}
