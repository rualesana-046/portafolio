import { roundToHundredths } from "@/lib/number";

export const FRAME_CENTER = 50;

export function polar(radius: number, degrees: number): readonly [number, number] {
  const radians = ((degrees - 90) * Math.PI) / 180;
  return [roundToHundredths(FRAME_CENTER + radius * Math.cos(radians)), roundToHundredths(FRAME_CENTER + radius * Math.sin(radians))];
}

export function straightRays(count: number, start: number, longEnd: number, shortEnd: number): string {
  return Array.from({ length: count }, (_, index) => {
    const angle = (360 / count) * index;
    const [x1, y1] = polar(start, angle);
    const [x2, y2] = polar(index % 2 === 0 ? longEnd : shortEnd, angle);
    return `M${x1} ${y1}L${x2} ${y2}`;
  }).join("");
}

export function starPath(points: 4 | 8, length: number, waist: number): string {
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
        return [`${index === 0 ? "M" : "L"}${roundToHundredths(tip[0] ?? 0)} ${roundToHundredths(tip[1] ?? 0)}`, `L${roundToHundredths(notch[0] ?? 0)} ${roundToHundredths(notch[1] ?? 0)}`];
      })
      .join("") + "Z"
  );
}

export function moonPhase(phase: number, radius: number): string {
  const r = radius;
  const lit = phase / 8;
  if (phase === 0) return "";
  if (phase === 4) return `M0 ${-r}A${r} ${r} 0 1 1 0 ${r}A${r} ${r} 0 1 1 0 ${-r}Z`;
  const isWaxing = lit < 0.5;
  const fraction = isWaxing ? lit * 2 : (1 - lit) * 2;
  const terminator = roundToHundredths(Math.abs(Math.cos(fraction * Math.PI)) * r);
  const outerSweep = isWaxing ? 1 : 0;
  const innerSweep = fraction < 0.5 === isWaxing ? 0 : 1;
  return `M0 ${-r}A${r} ${r} 0 0 ${outerSweep} 0 ${r}A${terminator} ${r} 0 0 ${innerSweep} 0 ${-r}Z`;
}

export function spikes(count: number, base: number, halfWidth: number, length: (index: number) => number): string {
  return Array.from({ length: count }, (_, index) => {
    const angle = (360 / count) * index;
    const spread = (halfWidth / base) * (180 / Math.PI);
    const [lx, ly] = polar(base, angle - spread);
    const [rx, ry] = polar(base, angle + spread);
    const [tx, ty] = polar(base + length(index), angle);
    return `M${lx} ${ly}L${tx} ${ty}L${rx} ${ry}Z`;
  }).join("");
}
