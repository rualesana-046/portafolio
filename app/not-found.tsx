"use client";

import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { ui } from "@/data/ui";
import { useLocalized } from "@/hooks/useLocalized";
import { CONTENT_ID } from "@/lib/anchors";

export default function NotFound() {
  const t = useLocalized();

  return (
    <main id={CONTENT_ID} className="flex min-h-[100svh] items-center justify-center px-4 py-16">
      <GlassCard decoration="parchment" className="w-full max-w-lg p-10 text-center sm:p-14">
        <p aria-hidden="true" className="text-leaf font-title text-8xl font-semibold">
          {t(ui.notFoundCode)}
        </p>
        <h1 className="mt-4 font-title text-2xl font-semibold tracking-wide text-ink sm:text-3xl">
          {t(ui.notFoundTitle)}
        </h1>
        <p className="mt-4 text-muted">{t(ui.notFoundBody)}</p>
        <Link
          href="/"
          className="focus-ring mt-8 inline-flex rounded-full border border-accent/70 px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-accent-strong transition hover:shadow-arcane"
        >
          {t(ui.backHome)}
        </Link>
      </GlassCard>
    </main>
  );
}
