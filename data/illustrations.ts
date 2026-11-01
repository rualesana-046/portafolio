import type { Illustration } from "@/types/illustration";

export const illustrations = {
  perchedOwl: { src: "/images/illustrations/owl-perched.webp", width: 700, height: 955 },
  oakLeafStamp: { src: "/images/illustrations/oak-leaf-stamp.webp", width: 128, height: 145 },
} as const satisfies Record<string, Illustration>;
