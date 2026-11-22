interface TextBadgeProps {
  readonly label: string;
}

export function TextBadge({ label }: TextBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-line/60 bg-surface/60 px-3 py-1 font-body text-sm text-ink dark:border-line/40">
      {label}
    </span>
  );
}
