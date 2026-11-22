import type { Localized } from "@/types/i18n";

export interface Profile {
  readonly name: string;
  readonly headline: Localized;
  readonly summary: Localized;
  readonly photo: string;
  readonly photoAlt: Localized;
  readonly cvPath: string;
}

export interface AboutPhoto {
  readonly src: string;
  readonly alt: Localized;
}

export interface AboutContent {
  readonly paragraph: Localized;
  readonly skills: readonly Localized[];
  readonly photo: AboutPhoto;
}
