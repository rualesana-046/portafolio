import type { Localized } from "@/types/i18n";

export interface SiteMetadata {
  readonly title: Localized;
  readonly description: Localized;
  readonly openGraphType: "profile";
  readonly openGraphLocale: string;
  readonly twitterCard: "summary_large_image";
  readonly canonicalPath: string;
  readonly isIndexable: boolean;
  readonly shortName: string;
  readonly display: "standalone";
  readonly backgroundColor: string;
  readonly faviconPath: string;
  readonly faviconType: string;
  readonly appIconRoute: string;
  readonly appIconSizes: readonly number[];
  readonly appleIconSize: number;
}
