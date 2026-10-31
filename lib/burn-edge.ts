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

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

function depth(factor: number): string {
  return `calc(${DEPTH}*${round(factor)})`;
}

function inverseDepth(factor: number): string {
  return `calc(100% - ${DEPTH}*${round(factor)})`;
}

function edgePoint(side: Side, along: number, factor: number): string {
  const percent = round(along * 100);
  switch (side) {
    case "top":
      return `${percent}% ${depth(factor)}`;
    case "right":
      return `${inverseDepth(factor)} ${percent}%`;
    case "bottom":
      return `${round(100 - percent)}% ${inverseDepth(factor)}`;
    case "left":
      return `${depth(factor)} ${round(100 - percent)}%`;
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
  const points = baseFactors(shape).flatMap((factors, sideIndex) => {
    const side = SIDES[sideIndex] ?? "top";
    return factors.map((factor, index) => {
      const layered = Math.max(0, factor + inset + (random() - 0.5) * roughness);
      return index === 0 ? cornerPoint(side, layered * 0.75) : edgePoint(side, index / shape.pointsPerSide, layered);
    });
  });
  return `polygon(${points.join(", ")})`;
}
