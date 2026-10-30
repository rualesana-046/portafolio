import { sections } from "@/data/sections";
import type { NavigationItem, SectionId } from "@/types/navigation";

const navigationOrder: readonly SectionId[] = [
  "about",
  "projects",
  "testimonials",
  "experience",
  "contact",
  "skills",
];

export const navigation: readonly NavigationItem[] = navigationOrder.map((id) => ({
  id,
  label: sections[id].eyebrow,
}));
