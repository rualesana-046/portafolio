"use client";

import { m } from "framer-motion";
import { useId } from "react";
import { cn } from "@/lib/cn";

const SPRIG = "M12 20V6M12 15C9 14 7.5 12 7 9.5C9.5 10 11.2 11.6 12 14M12 11C14.6 10.2 16.2 8.4 16.8 6C14.3 6.4 12.6 8 12 10.5";
const WAX_BLOB =
  "M32 5C39 4 46 8 51 13C56 18 59 24 58 31C58 38 55 44 49 48C44 52 37 55 30 54C23 54 16 50 11 44C7 38 5 31 7 24C9 17 13 11 19 8C23 6 27 5 32 5Z";
const WAX_DRIP = "M37 50C38 54 38 58 36 60C34 62 31 61 31 58C31 55 33 53 34 50Z";
const PRESS_DURATION = 0.6;

export function WaxSealMark({ className }: { readonly className?: string }) {
  const gradientId = `${useId()}-wax`;

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id={gradientId} cx="38%" cy="32%" r="70%">
          <stop offset="0" stopColor="rgb(var(--wax-from))" />
          <stop offset="1" stopColor="rgb(var(--wax-to))" />
        </radialGradient>
      </defs>
      <path d={WAX_DRIP} fill={`url(#${gradientId})`} />
      <path d={WAX_BLOB} fill={`url(#${gradientId})`} stroke="rgb(0 0 0 / 0.18)" strokeWidth="0.8" />
      <circle cx="32" cy="29" r="15.5" fill="rgb(var(--wax-to) / 0.35)" />
      <circle cx="32" cy="29" r="15.5" fill="none" stroke="rgb(0 0 0 / 0.28)" strokeWidth="2.2" />
      <circle cx="32" cy="29" r="13.6" fill="none" stroke="rgb(255 255 255 / 0.32)" strokeWidth="1" />
      <g transform="translate(20 17)" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={SPRIG} stroke="rgb(0 0 0 / 0.3)" strokeWidth="1.8" transform="translate(0.6 0.8)" />
        <path d={SPRIG} stroke="rgb(var(--on-wax))" strokeWidth="1.6" />
      </g>
      <ellipse cx="22" cy="15" rx="8" ry="3.5" fill="rgb(255 255 255 / 0.32)" transform="rotate(-28 22 15)" />
      <circle cx="44" cy="44" r="1.6" fill="rgb(255 255 255 / 0.22)" />
    </svg>
  );
}

interface WaxSealProps {
  readonly isPressing: boolean;
  readonly className?: string;
}

export function WaxSeal({ isPressing, className }: WaxSealProps) {
  return (
    <m.span
      aria-hidden="true"
      className={cn("block shrink-0", className)}
      animate={isPressing ? { scale: [1, 1.18, 0.92, 1], rotate: [0, -8, 4, 0] } : { scale: 1, rotate: 0 }}
      transition={{ duration: PRESS_DURATION, ease: "easeOut" }}
    >
      <WaxSealMark className="h-full w-full" />
    </m.span>
  );
}

export const WAX_SEAL_PRESS_MS = PRESS_DURATION * 1000;
