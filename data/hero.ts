import type { Illustration } from "@/types/illustration";
import type { Theme } from "@/lib/theme";

export type SceneFormat = "wide" | "tall";

export const heroScenes = {
  light: {
    wide: { src: "/images/hero/alba.webp", width: 2752, height: 1536 },
    tall: { src: "/images/hero/alba-mobile.webp", width: 1536, height: 2752 },
  },
  dark: {
    wide: { src: "/images/hero/ocaso.webp", width: 2752, height: 1536 },
    tall: { src: "/images/hero/ocaso-mobile.webp", width: 1536, height: 2752 },
  },
} as const satisfies Record<Theme, Record<SceneFormat, Illustration>>;
