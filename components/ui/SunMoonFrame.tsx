"use client";

import { useInView } from "framer-motion";
import { useId, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";

const CENTER = 50;
const RAY_START = 37.2;
const STARS = [
  { angle: 22, points: 4, pattern: 0 },
  { angle: 96, points: 8, pattern: 1 },
  { angle: 163, points: 4, pattern: 2 },
  { angle: 238, points: 8, pattern: 0 },
  { angle: 311, points: 4, pattern: 1 },
] as const;

const round = (value: number) => Number(value.toFixed(2));

function polar(radius: number, degrees: number): readonly [number, number] {
  const radians = ((degrees - 90) * Math.PI) / 180;
  return [round(CENTER + radius * Math.cos(radians)), round(CENTER + radius * Math.sin(radians))];
}

function straightRays(count: number, start: number, longEnd: number, shortEnd: number): string {
  return Array.from({ length: count }, (_, index) => {
    const angle = (360 / count) * index;
    const [x1, y1] = polar(start, angle);
    const [x2, y2] = polar(index % 2 === 0 ? longEnd : shortEnd, angle);
    return `M${x1} ${y1}L${x2} ${y2}`;
  }).join("");
}

function starPath(points: 4 | 8, length: number, waist: number): string {
  const tips = points === 4 ? [0, 90, 180, 270] : [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    tips
      .flatMap((angle, index) => {
        const tipLength = points === 8 && index % 2 === 1 ? length * 0.55 : length;
        const tip = [Math.cos((angle * Math.PI) / 180) * tipLength, Math.sin((angle * Math.PI) / 180) * tipLength];
        const half = 180 / tips.length;
        const notch = [
          Math.cos(((angle + half) * Math.PI) / 180) * waist,
          Math.sin(((angle + half) * Math.PI) / 180) * waist,
        ];
        return [`${index === 0 ? "M" : "L"}${round(tip[0] ?? 0)} ${round(tip[1] ?? 0)}`, `L${round(notch[0] ?? 0)} ${round(notch[1] ?? 0)}`];
      })
      .join("") + "Z"
  );
}

function moonPhase(phase: number, radius: number): string {
  const r = radius;
  const lit = phase / 8;
  if (phase === 0) return "";
  if (phase === 4) return `M0 ${-r}A${r} ${r} 0 1 1 0 ${r}A${r} ${r} 0 1 1 0 ${-r}Z`;
  const isWaxing = lit < 0.5;
  const fraction = isWaxing ? lit * 2 : (1 - lit) * 2;
  const terminator = round(Math.abs(Math.cos(fraction * Math.PI)) * r);
  const outerSweep = isWaxing ? 1 : 0;
  const innerSweep = fraction < 0.5 === isWaxing ? 0 : 1;
  return `M0 ${-r}A${r} ${r} 0 0 ${outerSweep} 0 ${r}A${terminator} ${r} 0 0 ${innerSweep} 0 ${-r}Z`;
}

function spikes(count: number, base: number, halfWidth: number, length: (index: number) => number): string {
  return Array.from({ length: count }, (_, index) => {
    const angle = (360 / count) * index;
    const spread = (halfWidth / base) * (180 / Math.PI);
    const [lx, ly] = polar(base, angle - spread);
    const [rx, ry] = polar(base, angle + spread);
    const [tx, ty] = polar(base + length(index), angle);
    return `M${lx} ${ly}L${tx} ${ty}L${rx} ${ry}Z`;
  }).join("");
}

const SUN_RING = 37.5;
const SUN_RAY_BASE = 39.5;
const SUN_RAY_LENGTH = 10;
const SUN_RAY_CYCLE = [1, 0.35, 0.7, 0.35, 0.5, 0.35, 0.7, 0.35] as const;
const SUN_RAYS = spikes(72, SUN_RAY_BASE, 0.4, (index) => SUN_RAY_LENGTH * (SUN_RAY_CYCLE[index % SUN_RAY_CYCLE.length] ?? 0));
const SUN_STARS = [45, 135, 225, 315].map((angle, index) => ({ position: polar(47.6, angle), pattern: index % 3 }));

const MOON_HALO = straightRays(72, RAY_START, 39.6, 38.8);
const PHASE_RADIUS = 2.4;
const PHASE_RING = 43.2;
const PHASES = Array.from({ length: 8 }, (_, phase) => ({ phase, position: polar(PHASE_RING, phase * 45) }));
const PHASE_OUTLINES = PHASES.map(
  ({ position: [x, y] }) =>
    `M${x} ${round(y - PHASE_RADIUS)}A${PHASE_RADIUS} ${PHASE_RADIUS} 0 1 1 ${x} ${round(y + PHASE_RADIUS)}A${PHASE_RADIUS} ${PHASE_RADIUS} 0 1 1 ${x} ${round(y - PHASE_RADIUS)}Z`,
).join("");

function Stars({ gradient }: { readonly gradient: string }) {
  return (
    <svg viewBox="0 0 100 100" className="sunmoon-layer" fill={`url(#${gradient})`}>
      {STARS.map(({ angle, points, pattern }) => {
        const [x, y] = polar(47.4, angle);
        return (
          <path
            key={angle}
            d={starPath(points, 2.5, 0.38)}
            transform={`translate(${x} ${y})`}
            className="sunmoon-star"
            data-pattern={pattern}
          />
        );
      })}
    </svg>
  );
}

function SunStars() {
  return (
    <svg viewBox="0 0 100 100" className="sunmoon-layer">
      {SUN_STARS.map(({ position: [x, y], pattern }) => (
        <path
          key={`${x}-${y}`}
          d={starPath(4, 2.4, 0.32)}
          transform={`translate(${x} ${y})`}
          className="sun-star sunmoon-star"
          data-pattern={pattern}
        />
      ))}
    </svg>
  );
}

function Sun() {
  const id = useId();
  const fade = `${id}-fade`;
  const mask = `${id}-mask`;

  return (
    <>
      <span className="sun-glow" />
      <svg viewBox="0 0 100 100" className="sunmoon-layer" fill="none">
        <circle cx={CENTER} cy={CENTER} r={SUN_RING} className="sun-ring" vectorEffect="non-scaling-stroke" />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={SUN_RING}
          pathLength={24}
          strokeDasharray="0 1"
          className="sun-dots"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <svg viewBox="0 0 100 100" className="sunmoon-layer sunmoon-spin">
        <defs>
          <radialGradient id={fade} cx={CENTER} cy={CENTER} r={50} gradientUnits="userSpaceOnUse">
            <stop offset={SUN_RAY_BASE / 50} stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
            <rect width="100" height="100" fill={`url(#${fade})`} />
          </mask>
        </defs>
        <g mask={`url(#${mask})`} className="sun-ray-fill sunmoon-breathe">
          <path d={SUN_RAYS} />
        </g>
      </svg>
      <SunStars />
    </>
  );
}

function Moon() {
  return (
    <>
      <svg viewBox="0 0 100 100" className="sunmoon-layer" fill="none">
        <path d={MOON_HALO} className="sunmoon-halo sunmoon-breathe" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg viewBox="0 0 100 100" className="sunmoon-layer sunmoon-spin">
        <path d={PHASE_OUTLINES} className="sunmoon-phase-outline" vectorEffect="non-scaling-stroke" />
        {PHASES.map(({ phase, position: [x, y] }) => (
          <path
            key={phase}
            d={moonPhase(phase, PHASE_RADIUS) || `M0 0`}
            transform={`translate(${x} ${y})`}
            className="sunmoon-phase"
          />
        ))}
      </svg>
    </>
  );
}

export function SunMoonFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const { theme, isHydrated } = useTheme();
  const gradient = `${useId()}-metal`;

  return (
    <div ref={ref} aria-hidden="true" className="sunmoon" data-offscreen={isInView ? undefined : ""}>
      <span className="sunmoon-rim" />
      {isHydrated && (
        <span className="sunmoon-box" data-theme-frame={theme}>
          <svg className="sunmoon-defs" aria-hidden="true">
            <defs>
              <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" style={{ stopColor: "rgb(var(--frame-metal-dark))" }} />
                <stop offset="0.5" style={{ stopColor: "rgb(var(--frame-metal))" }} />
                <stop offset="1" style={{ stopColor: "rgb(var(--frame-metal-dark))" }} />
              </linearGradient>
            </defs>
          </svg>
          {theme === "dark" ? (
            <>
              <Moon />
              <Stars gradient={gradient} />
            </>
          ) : (
            <Sun />
          )}
        </span>
      )}
    </div>
  );
}
