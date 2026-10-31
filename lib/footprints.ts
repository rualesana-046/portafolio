export interface MarkerBounds {
  readonly top: number;
  readonly bottom: number;
}

export interface FootprintPlacement {
  readonly center: number;
  readonly isLeft: boolean;
}

export interface FootprintLayoutOptions {
  readonly stride: number;
  readonly printLength: number;
  readonly margin: number;
}

export function layoutFootprints(
  markers: readonly MarkerBounds[],
  { stride, printLength, margin }: FootprintLayoutOptions,
): readonly FootprintPlacement[] {
  const placements: FootprintPlacement[] = [];
  for (let index = 0; index < markers.length - 1; index += 1) {
    const current = markers[index];
    const next = markers[index + 1];
    if (!current || !next) {
      continue;
    }
    const start = current.bottom + margin + printLength / 2;
    const end = next.top - margin - printLength / 2;
    const span = end - start;
    if (span < 0) {
      continue;
    }
    const count = Math.max(1, Math.floor(span / stride) + 1);
    const gap = count > 1 ? span / (count - 1) : 0;
    for (let step = 0; step < count; step += 1) {
      placements.push({
        center: count > 1 ? start + step * gap : start + span / 2,
        isLeft: placements.length % 2 === 0,
      });
    }
  }
  return placements;
}
