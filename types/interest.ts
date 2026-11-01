import type { Localized } from "@/types/i18n";

export type InterestKind = "book" | "hobby" | "creative";

export interface InterestImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: Localized;
}

export interface Interest {
  readonly id: string;
  readonly kind: InterestKind;
  readonly title: Localized;
  readonly description: Localized;
  readonly image?: InterestImage;
  readonly link?: string;
}
