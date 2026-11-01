import type { CSSProperties } from "react";

export function maskImageStyle(src: string): CSSProperties {
  const image = `url("${src}")`;
  return { maskImage: image, WebkitMaskImage: image };
}

export function maskVariableStyle(src: string): CSSProperties {
  return { "--art": `url("${src}")` } as CSSProperties;
}
