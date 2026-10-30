const EXTERNAL_URL_PATTERN = /^https?:\/\//i;

export function isExternalUrl(url: string): boolean {
  return EXTERNAL_URL_PATTERN.test(url);
}
