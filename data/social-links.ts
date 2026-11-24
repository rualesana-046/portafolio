import type { SocialLink, SocialPlatform } from "@/types/contact";

export const socialLinks: readonly SocialLink[] = [
  { id: "email", label: "rualesana046@gmail.com", url: "mailto:rualesana046@gmail.com" },
  { id: "github", label: "GitHub", url: "https://github.com/rualesana-046" },
];

export const socialLogos: Record<Exclude<SocialPlatform, "email">, string> = {
  github: "/logos/social/github.svg",
};
