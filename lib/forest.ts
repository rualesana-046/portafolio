export const FOREST_WIDTH = 1200;
export const FOREST_HEIGHT = 360;

export interface ForestLayerSpec {
  readonly seed: number;
  readonly base: number;
  readonly minHeight: number;
  readonly maxHeight: number;
  readonly spacing: number;
}

function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function pine(x: number, base: number, height: number, width: number, random: () => number): string {
  const tiers = 5 + Math.floor(random() * 3);
  const top = base - height;
  const tierHeight = (height * 0.88) / tiers;
  const side = (direction: 1 | -1) => {
    const points: string[] = [];
    for (let tier = 1; tier <= tiers; tier += 1) {
      const progress = tier / tiers;
      const y = top + tierHeight * tier;
      const half = (width / 2) * progress ** 0.85 * (0.8 + random() * 0.4);
      points.push(`L${Math.round(x + direction * half)} ${Math.round(y + 2 + random() * 4)}`);
      if (tier < tiers) {
        const notch = half * (0.3 + random() * 0.2);
        points.push(`L${Math.round(x + direction * notch)} ${Math.round(y - tierHeight / 3)}`);
      }
    }
    return direction === 1 ? points : points.reverse();
  };
  const right = side(1).join("");
  const left = side(-1).join("");
  const trunk = Math.max(2, width * 0.04);
  return `M${Math.round(x)} ${Math.round(top)}${right}L${Math.round(x + trunk)} ${base}L${Math.round(x - trunk)} ${base}${left}Z`;
}

function ground(base: number, amplitude: number, phase: number): string {
  const points: string[] = [];
  for (let x = 0; x <= FOREST_WIDTH; x += 60) {
    const angle = (x / FOREST_WIDTH) * Math.PI;
    const y = base - Math.sin(angle * 2 + phase) * amplitude - Math.sin(angle * 5 + phase * 2) * amplitude * 0.4;
    points.push(`${x === 0 ? "M" : "L"}${x} ${Math.round(y)}`);
  }
  return `${points.join("")}V${FOREST_HEIGHT}H0Z`;
}

export function forestLayerPath({ seed, base, minHeight, maxHeight, spacing }: ForestLayerSpec): string {
  const random = seededRandom(seed);
  const trees: string[] = [];
  for (let x = -20; x < FOREST_WIDTH + 40; x += spacing * (0.5 + random() * 1.1)) {
    const height = minHeight + random() * (maxHeight - minHeight);
    const treeBase = Math.round(base + random() * 10);
    trees.push(pine(x, treeBase, height, height * (0.32 + random() * 0.14), random));
  }
  return `${trees.join("")}${ground(base + 6, 8, seed)}`;
}
