import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

const SPIRAL_PATH = "M9 9m-1.6 0a1.6 1.6 0 1 1 3.2 0a3 3 0 1 1 -6 0a4.6 4.6 0 1 1 9.2 0";

function RollerEnd({ side }: { readonly side: "start" | "end" }) {
  return (
    <span className="scroll-roller-end" data-side={side}>
      <svg viewBox="0 0 18 18" fill="none">
        <path d={SPIRAL_PATH} />
      </svg>
    </span>
  );
}

function Roller({ children }: { readonly children?: ReactNode }) {
  return (
    <span aria-hidden="true" className="scroll-roller">
      <RollerEnd side="start" />
      <RollerEnd side="end" />
      {children}
    </span>
  );
}

interface ParchmentScrollProps {
  readonly tilt: number;
  readonly seal?: ReactNode;
  readonly className?: string;
  readonly children: ReactNode;
}

export function ParchmentScroll({ tilt, seal, className, children }: ParchmentScrollProps) {
  return (
    <figure className={cn("scroll", className)} style={{ "--tilt": `${tilt}deg` } as CSSProperties}>
      <Roller />
      <div className="scroll-body">{children}</div>
      <Roller>{seal && <span className="scroll-seal">{seal}</span>}</Roller>
    </figure>
  );
}
