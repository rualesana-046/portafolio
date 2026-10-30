import type { Localized } from "@/types/i18n";

export type InterestKind = "book" | "hobby" | "creative";

export interface Interest {
  readonly id: string;
  readonly kind: InterestKind;
  readonly title: Localized;
  readonly description: Localized;
  readonly image?: string;
  readonly link?: string;
}
