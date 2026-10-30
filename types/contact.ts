import type { Localized } from "@/types/i18n";

export type SocialPlatform = "github" | "linkedin" | "email";

export interface SocialLink {
  readonly id: SocialPlatform;
  readonly label: string;
  readonly url: string;
}

export type ContactFieldName = "name" | "email" | "subject" | "message";

export type ContactFormValues = Record<ContactFieldName, string>;

export type ValidationErrorCode =
  | "required"
  | "invalidName"
  | "invalidEmail"
  | "subjectTooShort"
  | "messageTooShort"
  | "messageTooLong";

export type ContactFormErrors = Partial<Record<ContactFieldName, ValidationErrorCode>>;

export type ContactFormStatus = "idle" | "stamping" | "opened" | "copied" | "copyFailed";

export interface ContactFieldContent {
  readonly label: Localized;
  readonly placeholder: Localized;
}

export interface ContactContent {
  readonly title: Localized;
  readonly greeting: Localized;
  readonly body: Localized;
  readonly signature: Localized;
  readonly fields: Record<ContactFieldName, ContactFieldContent>;
}
