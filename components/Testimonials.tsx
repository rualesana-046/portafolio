"use client";

import { Briefcase, GraduationCap, Quote, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { ParchmentScroll } from "@/components/ui/ParchmentScroll";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { sections } from "@/data/sections";
import { testimonials } from "@/data/testimonials";
import { testimonialContextLabels } from "@/data/ui";
import { useLocalized } from "@/hooks/useLocalized";
import { cn } from "@/lib/cn";
import { isVectorImage } from "@/lib/media";
import { getInitials } from "@/lib/text";
import type { Testimonial, TestimonialContext } from "@/types/testimonial";

const waxSeals: Record<TestimonialContext, { readonly className: string; readonly icon: LucideIcon }> = {
  academic: { className: "wax-seal-academic", icon: GraduationCap },
  professional: { className: "wax-seal-professional", icon: Briefcase },
};

function AuthorPortrait({ testimonial }: { readonly testimonial: Testimonial }) {
  if (testimonial.avatar) {
    return (
      <Image
        src={testimonial.avatar}
        alt=""
        width={96}
        height={96}
        unoptimized={isVectorImage(testimonial.avatar)}
        className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-accent/60"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-accent/60 bg-surface/60 text-sm font-semibold tracking-wider text-accent-strong"
    >
      {getInitials(testimonial.author)}
    </span>
  );
}

const SCROLL_TILTS = [-1.2, 0.8, -0.6, 1.4] as const;

function TestimonialQuote({ testimonial }: { readonly testimonial: Testimonial }) {
  const t = useLocalized();

  return (
    <>
      <blockquote className="flex-1 text-lg italic leading-relaxed text-ink">
        <p>{t(testimonial.quote)}</p>
      </blockquote>
      <figcaption className="flex items-center gap-4 border-t border-line/60 pt-5 dark:border-line/40">
        <AuthorPortrait testimonial={testimonial} />
        <span className="flex flex-col">
          <span className="font-semibold text-ink">{testimonial.author}</span>
          <span className="text-sm text-muted">{t(testimonial.role)}</span>
          <span className="text-sm text-muted">{testimonial.organization}</span>
        </span>
      </figcaption>
    </>
  );
}

function TestimonialScroll({ testimonial, index }: { readonly testimonial: Testimonial; readonly index: number }) {
  const t = useLocalized();
  const seal = waxSeals[testimonial.context];
  const SealIcon = seal.icon;

  return (
    <ParchmentScroll
      tilt={SCROLL_TILTS[index % SCROLL_TILTS.length] ?? 0}
      seal={
        <span className={cn("wax-seal", seal.className)}>
          <SealIcon className="h-5 w-5" />
        </span>
      }
    >
      <div className="flex items-start justify-between gap-4">
        <Quote aria-hidden="true" className="h-8 w-8 text-accent" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
          {t(testimonialContextLabels[testimonial.context])}
        </span>
      </div>
      <TestimonialQuote testimonial={testimonial} />
    </ParchmentScroll>
  );
}

export function Testimonials() {
  return (
    <Section id="testimonials" heading={sections.testimonials}>
      <ul className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <li key={testimonial.id}>
            <Reveal delay={index * 0.1} className="h-full">
              <TestimonialScroll testimonial={testimonial} index={index} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
