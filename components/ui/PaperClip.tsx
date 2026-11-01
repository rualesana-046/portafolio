import { useId } from "react";

const CLIP_PATH = "M5.5 31V9a3.5 3.5 0 0 1 7 0v24a5.5 5.5 0 0 1-11 0V13";
const GLINT_PATH = "M12 12v14";

export function PaperClip() {
  const metalId = `${useId()}-metal`;

  return (
    <svg aria-hidden="true" viewBox="0 0 16 44" className="polaroid-clip">
      <defs>
        <linearGradient id={metalId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgb(var(--letter-muted))" />
          <stop offset="0.45" stopColor="rgb(var(--letter-line))" />
          <stop offset="1" stopColor="rgb(var(--letter-char))" />
        </linearGradient>
      </defs>
      <path d={CLIP_PATH} fill="none" stroke={`url(#${metalId})`} strokeWidth="1.3" strokeLinecap="round" />
      <path d={GLINT_PATH} fill="none" stroke="rgb(255 255 255 / 0.55)" strokeWidth="0.5" strokeLinecap="round" />
    </svg>
  );
}
