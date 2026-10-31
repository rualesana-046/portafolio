"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { FOREST_HEIGHT, FOREST_WIDTH, forestLayerPath } from "@/lib/forest";

const layers = [
  { className: "fill-tree-far", path: forestLayerPath({ seed: 7, base: 262, minHeight: 50, maxHeight: 85, spacing: 34 }) },
  { className: "fill-tree-mid", path: forestLayerPath({ seed: 19, base: 300, minHeight: 75, maxHeight: 125, spacing: 50 }) },
  { className: "fill-tree-near", path: forestLayerPath({ seed: 41, base: 345, minHeight: 105, maxHeight: 160, spacing: 74 }) },
] as const;

const mistBands = [
  { afterLayer: 0, className: "mist-band bottom-[18%] h-[28%] opacity-60" },
  { afterLayer: 1, className: "mist-band-slow bottom-[4%] h-[30%] opacity-50" },
] as const;

function ForestLayer({ path, className }: { readonly path: string; readonly className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${FOREST_WIDTH} ${FOREST_HEIGHT}`}
      preserveAspectRatio="xMidYMax slice"
      className={cn("absolute inset-0 h-full w-full", className)}
    >
      <path d={path} />
    </svg>
  );
}

export function ForestSilhouette({ className }: { readonly className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-offscreen={isInView ? undefined : ""}
      className={cn(
        "pointer-events-none overflow-hidden [mask-image:linear-gradient(to_bottom,black_70%,transparent)]",
        className,
      )}
    >
      {layers.map((layer, index) => (
        <div key={layer.className}>
          <ForestLayer path={layer.path} className={layer.className} />
          {mistBands
            .filter((band) => band.afterLayer === index)
            .map((band) => (
              <span
                key={band.className}
                className={cn(
                  "absolute -inset-x-[6%] block bg-[radial-gradient(ellipse_at_center,rgb(var(--mist)/0.9)_0%,transparent_70%)] will-change-transform",
                  band.className,
                )}
              />
            ))}
        </div>
      ))}
    </div>
  );
}
