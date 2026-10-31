import type { CSSProperties } from "react";

export function maskImageStyle(src: string): CSSProperties {
  const image = `url("${src}")`;
  return { maskImage: image, WebkitMaskImage: image };
}
