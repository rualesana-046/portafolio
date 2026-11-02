"use client";

import { useInView } from "framer-motion";
import { useId, useRef, useSyncExternalStore } from "react";

const POINTER_ANGLES = [0, 60, 120, 180, 240, 300] as const;
const TWINKLES = [
  { angle: 32, pattern: 0 },
  { angle: 96, pattern: 1 },
  { angle: 154, pattern: 2 },
  { angle: 212, pattern: 0 },
  { angle: 268, pattern: 1 },
  { angle: 334, pattern: 2 },
] as const;
const STAR_PATH = "M0 -1L0.22 -0.22L1 0L0.22 0.22L0 1L-0.22 0.22L-1 0L-0.22 -0.22Z";
const subscribeToNothing = () => () => {};

function BrassGradient({ id }: { readonly id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" style={{ stopColor: "rgb(var(--brass-light))" }} />
      <stop offset="0.45" style={{ stopColor: "rgb(var(--brass))" }} />
      <stop offset="1" style={{ stopColor: "rgb(var(--brass-dark))" }} />
    </linearGradient>
  );
}

function DegreeBand() {
  return (
    <span className="astrolabe-ring" data-ring="band">
      <svg viewBox="0 0 100 100" fill="none" className="astrolabe-spin">
        <circle cx="50" cy="50" r="50" className="astrolabe-band" vectorEffect="non-scaling-stroke" />
        <circle
          cx="50"
          cy="50"
          r="50"
          pathLength={72}
          strokeDasharray="0.1 0.9"
          className="astrolabe-tick-short"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx="50"
          cy="50"
          r="50"
          pathLength={24}
          strokeDasharray="0.1 0.9"
          className="astrolabe-tick-long"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

function Rete({ gradient }: { readonly gradient: string }) {
  return (
    <span className="astrolabe-ring" data-ring="rete">
      <svg viewBox="0 0 100 100" fill="none" className="astrolabe-spin" data-reverse="">
        <circle
          cx="50"
          cy="50"
          r="50"
          pathLength={120}
          strokeDasharray="8 2"
          stroke={`url(#${gradient})`}
          className="astrolabe-rete"
          vectorEffect="non-scaling-stroke"
        />
        {POINTER_ANGLES.map((angle) => (
          <g
            key={angle}
            transform={`rotate(${angle} 50 50)`}
            fill={`url(#${gradient})`}
            className="astrolabe-pointer"
          >
            <path d="M48.6 0.4L50 -6L51.4 0.4Z" />
            <path d={STAR_PATH} transform="translate(50 -8.4) scale(2.6)" />
          </g>
        ))}
      </svg>
    </span>
  );
}

function Twinkles({ gradient }: { readonly gradient: string }) {
  return (
    <span className="astrolabe-ring" data-ring="stars">
      <svg viewBox="0 0 100 100" fill={`url(#${gradient})`}>
        {TWINKLES.map(({ angle, pattern }) => (
          <g key={angle} transform={`rotate(${angle} 50 50)`}>
            <path
              d={STAR_PATH}
              transform="translate(50 0) scale(1.5)"
              className="astrolabe-twinkle"
              data-pattern={pattern}
            />
          </g>
        ))}
      </svg>
    </span>
  );
}

export function AstrolabeFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const isHydrated = useSyncExternalStore(subscribeToNothing, () => true, () => false);
  const gradient = `${useId()}-brass`;

  return (
    <div ref={ref} aria-hidden="true" className="astrolabe" data-offscreen={isInView ? undefined : ""}>
      <span className="astrolabe-rim" />
      {isHydrated && (
        <>
          <svg className="astrolabe-defs" aria-hidden="true">
            <defs>
              <BrassGradient id={gradient} />
            </defs>
          </svg>
          <DegreeBand />
          <Rete gradient={gradient} />
          <Twinkles gradient={gradient} />
        </>
      )}
    </div>
  );
}
