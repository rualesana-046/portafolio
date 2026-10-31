"use client";

import { m, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { useId } from "react";
import { useMarkerBounds } from "@/hooks/useMarkerBounds";
import { layoutFootprints, type FootprintPlacement } from "@/lib/footprints";

const SOLE = "M0-26C7-26 10-19 10-10C10-2 8 3 7 7C6 10 3 11 0 11C-3 11-6 10-7 7C-8 3-10-2-10-10C-10-19-7-26 0-26Z";
const HEEL = "M-7 16C-7 14-4 13 0 13C4 13 7 14 7 16V25C7 28 4 30 0 30C-4 30-7 28-7 25Z";
const TREAD = "M-7-18H7M-8-11H8M-8-4H8M-6 3H6M-5 19H5M-5 25H5";
const SCALE = 0.45;
const TRAIL_WIDTH = 24;
const REST_OPACITY = 0.9;
const LAYOUT = { stride: 34, printLength: 28, margin: 8 } as const;

interface FootprintProps {
  readonly placement: FootprintPlacement;
  readonly height: number;
  readonly progress: MotionValue<number>;
  readonly maskId: string;
  readonly isStatic: boolean;
}

function Footprint({ placement, height, progress, maskId, isStatic }: FootprintProps) {
  const threshold = height > 0 ? placement.center / height : 0;
  const opacity = useTransform(
    progress,
    [Math.max(0, threshold - 0.06), threshold, Math.min(1, threshold + 0.35)],
    [0, 0.95, 0.5],
  );
  const x = TRAIL_WIDTH / 2 + (placement.isLeft ? -4.5 : 4.5);
  const angle = 180 + (placement.isLeft ? 6 : -6);

  return (
    <m.g
      data-footprint
      style={{ opacity: isStatic ? REST_OPACITY : opacity }}
      transform={`translate(${x} ${placement.center}) rotate(${angle}) scale(${placement.isLeft ? SCALE : -SCALE} ${SCALE})`}
    >
      <g mask={`url(#${maskId})`}>
        <path d={SOLE} />
        <path d={HEEL} />
      </g>
    </m.g>
  );
}

interface FootprintTrailProps {
  readonly progress: MotionValue<number>;
  readonly markerSelector: string;
  readonly className?: string;
}

export function FootprintTrail({ progress, markerSelector, className }: FootprintTrailProps) {
  const maskId = useId();
  const [ref, { height, markers }] = useMarkerBounds<HTMLDivElement>(markerSelector);
  const shouldReduceMotion = useReducedMotion();
  const placements = layoutFootprints(markers, LAYOUT);

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      {placements.length > 0 && (
        <svg width={TRAIL_WIDTH} height={height} viewBox={`0 0 ${TRAIL_WIDTH} ${height}`} className="fill-current">
          <defs>
            <mask id={maskId} maskContentUnits="userSpaceOnUse">
              <rect x="-12" y="-28" width="24" height="60" fill="#fff" />
              <path d={TREAD} stroke="#000" strokeWidth="1.6" strokeLinecap="round" />
            </mask>
          </defs>
          {placements.map((placement) => (
            <Footprint
              key={placement.center}
              placement={placement}
              height={height}
              progress={progress}
              maskId={maskId}
              isStatic={shouldReduceMotion === true}
            />
          ))}
        </svg>
      )}
    </div>
  );
}
