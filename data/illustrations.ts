import type { Illustration } from "@/types/illustration";

export const illustrations = {
  perchedOwl: { src: "/images/illustrations/owl-perched.webp", width: 700, height: 955 },
} as const satisfies Record<string, Illustration>;
