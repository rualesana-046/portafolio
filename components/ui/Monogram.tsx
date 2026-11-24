import { MONOGRAM_PATH, MONOGRAM_VIEW_BOX } from "@/data/monogram";

export function Monogram() {
  return (
    <svg viewBox={MONOGRAM_VIEW_BOX} className="seal-mark" aria-hidden="true" focusable="false">
      <path d={MONOGRAM_PATH} />
    </svg>
  );
}
