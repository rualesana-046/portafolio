import type { Localized } from "@/types/i18n";

export type TestimonialContext = "academic" | "professional";

export interface Testimonial {
  readonly id: string;
  readonly author: string;
  readonly role: Localized;
  readonly organization: string;
  readonly context: TestimonialContext;
  readonly quote: Localized;
  readonly avatar?: string;
}
