import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface TechLogoProps {
  readonly src: string;
  readonly className?: string;
}

function maskStyle(src: string): CSSProperties {
  const image = `url("${src}")`;
  return { maskImage: image, WebkitMaskImage: image };
}

export function TechLogo({ src, className }: TechLogoProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block shrink-0 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]",
        className,
      )}
      style={maskStyle(src)}
    />
  );
}
