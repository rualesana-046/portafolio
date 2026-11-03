const EXTERNAL_URL_PATTERN = /^https?:\/\//i;
const PLACEHOLDER_PATTERN = /\{(\w+)\}/g;

export function fillTemplate(template: string, values: Readonly<Record<string, string | number>>): string {
  return template.replace(PLACEHOLDER_PATTERN, (placeholder, key: string) =>
    key in values ? String(values[key]) : placeholder,
  );
}

export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const first = words[0];
  const last = words.length > 1 ? words[words.length - 1] : undefined;
  return [first, last]
    .filter((word): word is string => word !== undefined)
    .map((word) => word.charAt(0).toLocaleUpperCase())
    .join("");
}

export function isExternalUrl(url: string): boolean {
  return EXTERNAL_URL_PATTERN.test(url);
}
