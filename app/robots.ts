import type { MetadataRoute } from "next";
import { siteMetadata } from "@/data/site";
import { currentSiteUrl } from "@/lib/site-url";

const SITEMAP_PATH = "/sitemap.xml";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = currentSiteUrl();
  return {
    rules: { userAgent: "*", allow: siteMetadata.canonicalPath },
    sitemap: new URL(SITEMAP_PATH, siteUrl).href,
  };
}
