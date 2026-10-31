import type { ComposedLetter, ContactFormValues, LetterLabels, SocialLink } from "@/types/contact";

const MAILTO_PREFIX = "mailto:";
const LINE_BREAK = "\r\n";
const LINE_BREAK_PATTERN = /\r?\n/g;

export function getEmailAddress(links: readonly SocialLink[]): string | undefined {
  const link = links.find((candidate) => candidate.id === "email" && candidate.url.startsWith(MAILTO_PREFIX));
  return link?.url.slice(MAILTO_PREFIX.length);
}

export function composeLetter(values: ContactFormValues, labels: LetterLabels): ComposedLetter {
  return {
    subject: `${labels.subjectPrefix}: ${values.subject}`,
    body: [
      `${labels.name}: ${values.name}`,
      `${labels.email}: ${values.email}`,
      "",
      `${labels.message}:`,
      values.message.replace(LINE_BREAK_PATTERN, LINE_BREAK),
    ].join(LINE_BREAK),
  };
}

export function buildMailtoUrl(address: string, letter: ComposedLetter): string {
  const query = `subject=${encodeURIComponent(letter.subject)}&body=${encodeURIComponent(letter.body)}`;
  return `${MAILTO_PREFIX}${address}?${query}`;
}

export function formatLetterForClipboard(address: string, letter: ComposedLetter, labels: LetterLabels): string {
  return [`${labels.to}: ${address}`, `${labels.subject}: ${letter.subject}`, "", letter.body].join(LINE_BREAK);
}
