export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string): boolean {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function openUrl(url: string): void {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.rel = "noopener";
  anchor.click();
}
