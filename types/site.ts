import type { Localized } from "@/types/i18n";

export interface SiteMetadata {
  readonly title: Localized;
  readonly description: Localized;
  readonly openGraphType: "profile";
  readonly openGraphLocale: string;
  readonly twitterCard: "summary_large_image";
  readonly canonicalPath: string;
}
