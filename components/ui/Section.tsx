import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import type { SectionHeadingContent, SectionId } from "@/types/navigation";

interface SectionProps {
  readonly id: SectionId;
  readonly heading: SectionHeadingContent;
  readonly className?: string;
  readonly children: ReactNode;
}

export function Section({ id, heading, className, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("px-4 py-24 sm:px-6 sm:py-28", className)}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading content={heading} headingId={headingId} />
        {children}
      </div>
    </section>
  );
}
