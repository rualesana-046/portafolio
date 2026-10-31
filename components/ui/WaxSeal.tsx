"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/cn";

const SPRIG = "M12 20V6M12 15C9 14 7.5 12 7 9.5C9.5 10 11.2 11.6 12 14M12 11C14.6 10.2 16.2 8.4 16.8 6C14.3 6.4 12.6 8 12 10.5";
const PRESS_DURATION = 0.6;

interface WaxSealProps {
  readonly isPressing: boolean;
  readonly className?: string;
}

export function WaxSeal({ isPressing, className }: WaxSealProps) {
  return (
    <m.span
      aria-hidden="true"
      className={cn("wax-seal wax-seal-professional shrink-0", className)}
      animate={isPressing ? { scale: [1, 1.18, 0.92, 1], rotate: [0, -8, 4, 0] } : { scale: 1, rotate: 0 }}
      transition={{ duration: PRESS_DURATION, ease: "easeOut" }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-1/2 w-1/2"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="1" opacity="0.55" />
        <path d={SPRIG} />
      </svg>
    </m.span>
  );
}

export const WAX_SEAL_PRESS_MS = PRESS_DURATION * 1000;
