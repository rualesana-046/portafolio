import type { SectionId } from "@/types/navigation";

export const CONTENT_ID = "content";
export const HERO_ID: SectionId = "hero";

export function toHash(id: string): string {
  return `#${id}`;
}
