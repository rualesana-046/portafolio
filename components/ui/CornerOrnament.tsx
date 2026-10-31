const LEAF = "M0 0C4-6 12-8 18-6C14 0 6 3 0 0Z";

export function CornerOrnament({ className }: { readonly className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 114V22C6 13 13 6 22 6H114" strokeWidth="1.6" />
      <path d="M14 114V30C14 21 21 14 30 14H114" strokeWidth="0.8" opacity="0.7" />
      <path d="M114 6c-8 0-12 6-8 10s10 0 8-4" strokeWidth="1.2" />
      <path d="M6 114c0-8 6-12 10-8s0 10-4 8" strokeWidth="1.2" />
      <path d="M22 22C34 26 42 34 46 46C40 44 34 42 30 38C26 34 24 28 22 22Z" strokeWidth="1.2" />
      <path d="M24 24C32 30 38 36 44 44" strokeWidth="0.7" />
      <path d="M46 46C54 50 62 50 70 46M46 46C50 54 50 62 46 70" strokeWidth="1" />
      <g strokeWidth="1">
        <path d={LEAF} transform="translate(58 47) rotate(-20)" />
        <path d={LEAF} transform="translate(47 58) rotate(110) scale(1 -1)" />
      </g>
      <path d="M70 46C78 40 88 40 94 46C88 50 80 50 74 47" strokeWidth="0.9" />
      <path d="M46 70C40 78 40 88 46 94C50 88 50 80 47 74" strokeWidth="0.9" />
      <path d="M26 10l4-4 4 4-4 4zM10 26l4-4 4 4-4 4z" fill="currentColor" strokeWidth="0.6" />
      <circle cx="22" cy="22" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
