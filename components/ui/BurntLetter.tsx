import type { ReactNode } from "react";
import { burnEdgePolygon, type BurnLayer, type BurnShape } from "@/lib/burn-edge";
import { cn } from "@/lib/cn";

const SHAPE: BurnShape = { seed: 11, pointsPerSide: 32, cornerBurn: 1.5 };
const CHAR: BurnLayer = { inset: 0, roughness: 0.24, layerSeed: 1 };
const TOAST: BurnLayer = { inset: 0.3, roughness: 0.2, layerSeed: 2 };
const PAPER: BurnLayer = { inset: 0.6, roughness: 0.26, layerSeed: 3 };

const charClip = burnEdgePolygon(SHAPE, CHAR);
const toastClip = burnEdgePolygon(SHAPE, TOAST);
const paperClip = burnEdgePolygon(SHAPE, PAPER);

interface BurntLetterProps {
  readonly className?: string;
  readonly children: ReactNode;
}

export function BurntLetter({ className, children }: BurntLetterProps) {
  return (
    <div className={cn("relative isolate text-letter-ink", className)}>
      <div aria-hidden="true" className="letter-backdrop absolute inset-0">
        <div className="absolute inset-0 bg-letter-char" style={{ clipPath: charClip }} />
        <div className="absolute inset-0 bg-letter-toast" style={{ clipPath: toastClip }} />
        <div className="letter-paper absolute inset-0" style={{ clipPath: paperClip }} />
      </div>
      <div className="relative px-10 py-14 sm:px-16 sm:py-16">{children}</div>
    </div>
  );
}
