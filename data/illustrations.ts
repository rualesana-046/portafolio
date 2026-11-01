import type { Illustration } from "@/types/illustration";

export const illustrations = {
  perchedOwl: { src: "/images/illustrations/owl-perched.webp", width: 700, height: 955 },
  oakLeafStamp: { src: "/images/illustrations/oak-leaf-stamp.webp", width: 128, height: 145 },
  keyStamp: { src: "/images/illustrations/key-stamp.webp", width: 128, height: 49 },
  fernStamp: { src: "/images/illustrations/fern-stamp.webp", width: 128, height: 112 },
  wildflowerStamp: { src: "/images/illustrations/wildflower-stamp.webp", width: 96, height: 197 },
  mothStamp: { src: "/images/illustrations/moth-stamp.webp", width: 128, height: 65 },
  keyPrint: { src: "/images/illustrations/key-print.webp", width: 240, height: 92 },
  fernPrint: { src: "/images/illustrations/fern-print.webp", width: 240, height: 209 },
  wildflowerPrint: { src: "/images/illustrations/wildflower-print.webp", width: 200, height: 410 },
  mothPrint: { src: "/images/illustrations/moth-print.webp", width: 240, height: 122 },
} as const satisfies Record<string, Illustration>;
