import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social-links";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { currentSiteUrl } from "@/lib/site-url";
import { buildPersonStructuredData, serializeStructuredData } from "@/lib/structured-data";

export function PersonJsonLd() {
  const data = buildPersonStructuredData(profile, socialLinks, currentSiteUrl(), DEFAULT_LOCALE);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(data) }} />;
}
