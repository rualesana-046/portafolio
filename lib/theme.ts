export type Theme = "light" | "dark";

export const DEFAULT_THEME: Theme = "light";
export const THEME_STORAGE_KEY = "portfolio-theme";
export const DARK_THEME_CLASS = "dark";
export const SCRIPT_ENABLED_CLASS = "js";
export const THEME_ROOT_ATTRIBUTE = "class";

export function themeFromRoot(root: HTMLElement): Theme {
  return root.classList.contains(DARK_THEME_CLASS) ? "dark" : "light";
}

export function oppositeTheme(theme: Theme): Theme {
  return theme === "dark" ? "light" : "dark";
}

export const themeInitScript = `document.documentElement.classList.add(${JSON.stringify(SCRIPT_ENABLED_CLASS)});try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});var d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle(${JSON.stringify(DARK_THEME_CLASS)},d)}catch(e){}`;
