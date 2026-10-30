import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type GlassCardElement = "div" | "article" | "li";

interface GlassCardProps {
  readonly as?: GlassCardElement;
  readonly interactive?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
}

export function GlassCard({
  as: Element = "div",
  interactive = false,
  className,
  children,
}: GlassCardProps) {
  return (
    <Element
      className={cn(
        "rounded-2xl border border-line/60 bg-surface/70 shadow-parchment backdrop-blur-glass dark:border-line/40 dark:shadow-arcane",
        interactive &&
          "transition duration-300 ease-out hover:border-accent/70 motion-safe:hover:-translate-y-1.5",
        className,
      )}
    >
      {children}
    </Element>
  );
}
