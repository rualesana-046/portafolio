import type { ReactNode } from "react";
import { CornerOrnament } from "@/components/ui/CornerOrnament";
import { cn } from "@/lib/cn";

type GlassCardElement = "div" | "article" | "li" | "figure";
type GlassCardDecoration = "none" | "parchment";

interface GlassCardProps {
  readonly as?: GlassCardElement;
  readonly interactive?: boolean;
  readonly decoration?: GlassCardDecoration;
  readonly className?: string;
  readonly children: ReactNode;
}

const cornerPlacements = [
  "left-2 top-2",
  "right-2 top-2 -scale-x-100",
  "bottom-2 left-2 -scale-y-100",
  "bottom-2 right-2 -scale-100",
] as const;

function ParchmentDecoration() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/textures/parchment.svg')] opacity-60 mix-blend-multiply dark:opacity-10 dark:mix-blend-screen"
      />
      {cornerPlacements.map((placement) => (
        <CornerOrnament
          key={placement}
          className={cn("pointer-events-none absolute h-10 w-10 text-accent sm:h-14 sm:w-14", placement)}
        />
      ))}
    </>
  );
}

export function GlassCard({
  as: Element = "div",
  interactive = false,
  decoration = "none",
  className,
  children,
}: GlassCardProps) {
  const hasParchment = decoration === "parchment";

  return (
    <Element
      className={cn(
        "metal-frame rounded-2xl bg-surface/70 shadow-parchment backdrop-blur-glass dark:shadow-arcane",
        interactive &&
          "transition duration-300 ease-out hover:shadow-arcane motion-safe:hover:-translate-y-1.5",
        hasParchment && "isolate overflow-hidden",
        className,
      )}
    >
      {hasParchment && <ParchmentDecoration />}
      {hasParchment ? <div className="relative">{children}</div> : children}
    </Element>
  );
}
