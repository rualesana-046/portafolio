import type { MetadataRoute } from "next";
import { siteMetadata } from "@/data/site";
import { DEFAULT_LOCALE } from "@/lib/i18n";

const ICON_TYPE = "image/png";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMetadata.title[DEFAULT_LOCALE],
    short_name: siteMetadata.shortName,
    description: siteMetadata.description[DEFAULT_LOCALE],
    lang: DEFAULT_LOCALE,
    start_url: siteMetadata.canonicalPath,
    display: siteMetadata.display,
    background_color: siteMetadata.backgroundColor,
    icons: siteMetadata.appIconSizes
      .filter((size) => size !== siteMetadata.appleIconSize)
      .map((size) => ({ src: `${siteMetadata.appIconRoute}/${size}`, sizes: `${size}x${size}`, type: ICON_TYPE })),
  };
}
