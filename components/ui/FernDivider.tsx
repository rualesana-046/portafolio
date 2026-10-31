const FRONDS = Array.from({ length: 5 }, (_, index) => {
  const x = 18 + index * 9;
  const size = 9 - index * 1.2;
  return `M${x} 0c-3 ${-size} -8 ${-size} -10 ${-size + 2}M${x} 0c-3 ${size} -8 ${size} -10 ${size - 2}`;
}).join("");

export function FernDivider({ className }: { readonly className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="-150 -16 300 32"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      className={className}
    >
      <path d="M-146 0H-80M80 0H146" strokeWidth="0.8" opacity="0.7" />
      <path d="M-80 0H-30M30 0H80" strokeWidth="1.4" />
      <circle cx="-84" cy="0" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="84" cy="0" r="1.8" fill="currentColor" stroke="none" />
      <path d={FRONDS} transform="translate(-22 0)" strokeWidth="0.9" />
      <path d={FRONDS} transform="translate(22 0) scale(-1 1)" strokeWidth="0.9" />
      <path d="M0-9L6 0L0 9L-6 0Z" strokeWidth="1.2" />
      <circle cx="0" cy="0" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}
