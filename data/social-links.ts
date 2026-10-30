import type { SocialLink, SocialPlatform } from "@/types/contact";

export const socialLinks: readonly SocialLink[] = [
  { id: "email", label: "ejemplo@example.com", url: "mailto:ejemplo@example.com" },
  { id: "linkedin", label: "LinkedIn de ejemplo", url: "#" },
  { id: "github", label: "GitHub de ejemplo", url: "#" },
];

export const socialLogos: Record<Exclude<SocialPlatform, "email">, string> = {
  github: "/logos/social/github.svg",
  linkedin: "/logos/social/linkedin.svg",
};
