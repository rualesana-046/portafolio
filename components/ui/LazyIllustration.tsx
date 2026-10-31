"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { maskImageStyle } from "@/lib/mask";
import type { Illustration } from "@/types/illustration";

const PRELOAD_MARGIN = "200px 0px";

interface LazyIllustrationProps {
  readonly illustration: Illustration;
  readonly className?: string;
}

export function LazyIllustration({ illustration, className }: LazyIllustrationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isNear = useInView(ref, { once: true, margin: PRELOAD_MARGIN });

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "block [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]",
        isNear && "bg-current",
        className,
      )}
      style={{
        aspectRatio: `${illustration.width} / ${illustration.height}`,
        ...(isNear ? maskImageStyle(illustration.src) : {}),
      }}
    />
  );
}
