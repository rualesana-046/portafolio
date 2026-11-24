import type { SocialLink } from "@/types/contact";
import type { Locale } from "@/types/i18n";
import type { Profile } from "@/types/profile";

const SCHEMA_CONTEXT = "https://schema.org";
const PERSON_TYPE = "Person";
const GITHUB_PLATFORM = "github";
const LESS_THAN = /</g;
const LINE_SEPARATOR = new RegExp("\\u2028", "g");
const PARAGRAPH_SEPARATOR = new RegExp("\\u2029", "g");

export interface PersonStructuredData {
  readonly "@context": string;
  readonly "@type": string;
  readonly name: string;
  readonly jobTitle: string;
  readonly url: string;
  readonly image: string;
  readonly sameAs: readonly string[];
}

export function buildPersonStructuredData(
  profile: Profile,
  socialLinks: readonly SocialLink[],
  siteUrl: URL,
  locale: Locale,
): PersonStructuredData {
  const github = socialLinks.find((link) => link.id === GITHUB_PLATFORM);
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": PERSON_TYPE,
    name: profile.name,
    jobTitle: profile.headline[locale],
    url: siteUrl.href,
    image: new URL(profile.photo, siteUrl).href,
    sameAs: github ? [github.url] : [],
  };
}

export function serializeStructuredData(data: PersonStructuredData): string {
  return JSON.stringify(data)
    .replace(LESS_THAN, "\\u003c")
    .replace(LINE_SEPARATOR, "\\u2028")
    .replace(PARAGRAPH_SEPARATOR, "\\u2029");
}
