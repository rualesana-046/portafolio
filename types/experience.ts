import type { Localized } from "@/types/i18n";

export interface Period {
  readonly start: string;
  readonly end: string | null;
}

export interface ExperienceEntry {
  readonly id: string;
  readonly role: Localized;
  readonly organization: string;
  readonly period: Period;
  readonly description: Localized;
  readonly highlights: Localized<readonly string[]>;
  readonly technologies: readonly string[];
}

export interface EducationEntry {
  readonly id: string;
  readonly title: Localized;
  readonly institution: string;
  readonly period: Period;
  readonly description?: Localized;
  readonly credentialUrl?: string;
}

export interface LanguageProficiency {
  readonly id: string;
  readonly language: Localized;
  readonly level: string;
}
