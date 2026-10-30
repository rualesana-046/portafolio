import type { Localized } from "@/types/i18n";

export type SectionId =
  | "hero"
  | "about"
  | "projects"
  | "testimonials"
  | "experience"
  | "contact"
  | "skills";

export interface NavigationItem {
  readonly id: SectionId;
  readonly label: Localized;
}
