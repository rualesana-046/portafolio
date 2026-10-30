import type { Localized } from "@/types/i18n";

export interface Profile {
  readonly name: string;
  readonly headline: Localized;
  readonly summary: Localized;
  readonly photo: string;
  readonly photoAlt: Localized;
  readonly cvPath: string;
}

export interface GalleryImage {
  readonly src: string;
  readonly alt: Localized;
}

export interface AboutContent {
  readonly paragraphs: Localized<readonly string[]>;
  readonly gallery?: readonly GalleryImage[];
}
