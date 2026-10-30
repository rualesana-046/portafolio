import type { ReactNode } from "react";
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

const cornerPositions = [
  "left-4 top-4",
  "right-4 top-4 rotate-90",
  "bottom-4 right-4 rotate-180",
  "bottom-4 left-4 -rotate-90",
] as const;

function ParchmentDecoration() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/textures/parchment.svg')] opacity-60 mix-blend-multiply dark:opacity-10 dark:mix-blend-screen"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 hidden rounded-xl border border-accent/25 dark:block"
      />
      {cornerPositions.map((position) => (
        <svg
          key={position}
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          className={cn("pointer-events-none absolute hidden h-6 w-6 text-accent/70 dark:block", position)}
        >
          <path d="M1 12V1h11" />
          <path d="M5 8V5h3" />
          <circle cx="1" cy="1" r="1" fill="currentColor" />
        </svg>
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
