import type { SiteMetadata } from "@/types/site";

export const siteMetadata: SiteMetadata = {
  title: {
    es: "Nombre de ejemplo · Portafolio de ejemplo",
    en: "Sample Name · Sample Portfolio",
  },
  description: {
    es: "Descripción de ejemplo del portafolio, pendiente de reemplazar por el contenido real.",
    en: "Sample portfolio description, pending replacement with the real content.",
  },
  openGraphType: "profile",
  openGraphLocale: "es_ES",
  twitterCard: "summary_large_image",
  canonicalPath: "/",
  isIndexable: false,
  shortName: "Portafolio",
  display: "standalone",
  backgroundColor: "#EDE9D8",
  faviconPath: "/icon.svg",
  faviconType: "image/svg+xml",
  appIconRoute: "/icon",
  appIconSizes: [180, 192, 512],
  appleIconSize: 180,
};
