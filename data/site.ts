import type { SiteMetadata } from "@/types/site";

export const siteMetadata: SiteMetadata = {
  title: {
    es: "Ana María Ruales · Portafolio",
    en: "Ana María Ruales · Portfolio",
  },
  description: {
    es: "Portafolio de Ana María Ruales, desarrolladora full stack. Proyectos que abarcan el análisis de requisitos, el diseño, el desarrollo y el despliegue.",
    en: "Portfolio of Ana María Ruales, full stack developer. Projects spanning requirements analysis, design, development and deployment.",
  },
  openGraphType: "profile",
  openGraphLocale: "es_ES",
  twitterCard: "summary_large_image",
  canonicalPath: "/",
  isIndexable: false,
  shortName: "Ana María",
  display: "standalone",
  backgroundColor: "#EDE9D8",
  faviconPath: "/icon.svg",
  faviconType: "image/svg+xml",
  appIconRoute: "/icon",
  appIconSizes: [180, 192, 512],
  appleIconSize: 180,
};
