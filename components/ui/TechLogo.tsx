import { cn } from "@/lib/cn";
import { maskImageStyle } from "@/lib/mask";

interface TechLogoProps {
  readonly src: string;
  readonly className?: string;
}

export function TechLogo({ src, className }: TechLogoProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block shrink-0 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]",
        className,
      )}
      style={maskImageStyle(src)}
    />
  );
}
