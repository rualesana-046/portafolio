import type { MetadataRoute } from "next";
import { siteMetadata } from "@/data/site";
import { currentSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: new URL(siteMetadata.canonicalPath, currentSiteUrl()).href }];
}
