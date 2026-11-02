import { roundToHundredths } from "@/lib/number";

export interface BurnShape {
  readonly seed: number;
  readonly pointsPerSide: number;
  readonly cornerBurn: number;
}

export interface BurnLayer {
  readonly inset: number;
  readonly roughness: number;
  readonly layerSeed: number;
}

type Side = "top" | "right" | "bottom" | "left";

const SIDES: readonly Side[] = ["top", "right", "bottom", "left"];
const WAVE_FREQUENCIES = [1, 2.3, 5.1] as const;
const DEPTH = "var(--letter-burn)";
const CORNER_ZONE = 0.2;
const CORNER_DEPTH = 1.15;

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function depth(factor: number): string {
  return `calc(${DEPTH}*${roundToHundredths(factor)})`;
}

function inverseDepth(factor: number): string {
  return `calc(100% - ${DEPTH}*${roundToHundredths(factor)})`;
}

function travel(along: number, startCorner: number, endCorner: number): string {
  if (along < CORNER_ZONE) {
    const t = along / CORNER_ZONE;
    return `${DEPTH}*${roundToHundredths(startCorner * (1 - t))} + ${roundToHundredths(CORNER_ZONE * 100 * t)}%`;
  }
  if (along > 1 - CORNER_ZONE) {
    const t = (1 - along) / CORNER_ZONE;
    return `100% - ${DEPTH}*${roundToHundredths(endCorner * (1 - t))} - ${roundToHundredths(CORNER_ZONE * 100 * t)}%`;
  }
  return `${roundToHundredths(along * 100)}%`;
}

function alongPosition(along: number, startCorner: number, endCorner: number, reversed: boolean): string {
  const expression = travel(along, startCorner, endCorner);
  return reversed ? `calc(100% - (${expression}))` : `calc(${expression})`;
}

function edgePoint(side: Side, along: number, factor: number, startCorner: number, endCorner: number): string {
  switch (side) {
    case "top":
      return `${alongPosition(along, startCorner, endCorner, false)} ${depth(factor)}`;
    case "right":
      return `${inverseDepth(factor)} ${alongPosition(along, startCorner, endCorner, false)}`;
    case "bottom":
      return `${alongPosition(along, startCorner, endCorner, true)} ${inverseDepth(factor)}`;
    case "left":
      return `${depth(factor)} ${alongPosition(along, startCorner, endCorner, true)}`;
  }
}

function cornerPoint(side: Side, factor: number): string {
  switch (side) {
    case "top":
      return `${depth(factor)} ${depth(factor)}`;
    case "right":
      return `${inverseDepth(factor)} ${depth(factor)}`;
    case "bottom":
      return `${inverseDepth(factor)} ${inverseDepth(factor)}`;
    case "left":
      return `${depth(factor)} ${inverseDepth(factor)}`;
  }
}

function baseFactors({ seed, pointsPerSide, cornerBurn }: BurnShape): number[][] {
  const random = seededRandom(seed);
  return SIDES.map(() => {
    const waves = WAVE_FREQUENCIES.map((frequency) => ({ frequency, phase: random() * Math.PI * 2 }));
    return Array.from({ length: pointsPerSide }, (_, index) => {
      const along = index / pointsPerSide;
      const wave = waves.reduce(
        (sum, { frequency, phase }, order) => sum + Math.sin(along * Math.PI * 2 * frequency + phase) / (order + 1),
        0,
      );
      const cornerDistance = Math.min(along, 1 - along) * 6;
      const corner = cornerDistance < 1 ? (1 - cornerDistance) ** 2 * cornerBurn : 0;
      return 0.5 + wave * 0.28 + corner;
    });
  });
}

export function burnEdgePolygon(shape: BurnShape, { inset, roughness, layerSeed }: BurnLayer): string {
  const random = seededRandom(shape.seed * 31 + layerSeed);
  const layered = baseFactors(shape).map((factors) =>
    factors.map((factor) => Math.max(0, factor + inset + (random() - 0.5) * roughness)),
  );
  const corners = layered.map((factors) => (factors[0] ?? 0) * CORNER_DEPTH);
  const points = layered.flatMap((factors, sideIndex) => {
    const side = SIDES[sideIndex] ?? "top";
    const startCorner = corners[sideIndex] ?? 0;
    const endCorner = corners[(sideIndex + 1) % SIDES.length] ?? 0;
    return factors.map((factor, index) =>
      index === 0
        ? cornerPoint(side, startCorner)
        : edgePoint(side, index / shape.pointsPerSide, factor, startCorner, endCorner),
    );
  });
  return `polygon(${points.join(", ")})`;
}
