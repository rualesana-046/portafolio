import type { Localized } from "@/types/i18n";

export type ProjectKind = "desktop" | "mobile" | "smartwatch" | "game" | "web" | "personal";

export type ProjectTechnology = string | Localized;

export interface ProjectLinks {
  readonly repository?: string;
  readonly demo?: string;
  readonly download?: string;
}

export interface Project {
  readonly id: string;
  readonly kind: ProjectKind;
  readonly title: Localized;
  readonly description: Localized;
  readonly technologies: readonly ProjectTechnology[];
  readonly features: Localized<readonly string[]>;
  readonly participation: Localized;
  readonly notice?: Localized;
  readonly image: string;
  readonly imageAlt: Localized;
  readonly links: ProjectLinks;
}
