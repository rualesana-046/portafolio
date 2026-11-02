"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { EnvelopeArt } from "@/components/ui/EnvelopeArt";
import { useIsHydrated } from "@/hooks/useDocumentAttribute";

type Step = 0 | 1 | 2 | 3 | 4 | 5;

const STEP_AT_MS = [0, 0, 300, 800, 1200, 1650] as const;
const ANIMATED_STEPS = [1, 2, 3, 4, 5] as const;
const OPEN_STEP: Step = 5;

interface EnvelopeProps {
  readonly label: string;
  readonly hint: string;
  readonly pointerFocusId: string;
  readonly keyboardFocusId: string;
  readonly children: ReactNode;
}

export function Envelope({ label, hint, pointerFocusId, keyboardFocusId, children }: EnvelopeProps) {
  const shouldReduceMotion = useReducedMotion();
  const isHydrated = useIsHydrated();
  const [step, setStep] = useState<Step>(0);
  const timersRef = useRef<number[]>([]);
  const id = useId();
  const contentId = `${id}-content`;
  const hintId = `${id}-hint`;

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const focusAfterOpen = (targetId: string) => {
    window.requestAnimationFrame(() => document.getElementById(targetId)?.focus());
  };

  const open = (event: MouseEvent<HTMLButtonElement>) => {
    if (step > 0) {
      return;
    }
    const targetId = event.detail === 0 ? keyboardFocusId : pointerFocusId;
    if (shouldReduceMotion) {
      setStep(OPEN_STEP);
      focusAfterOpen(targetId);
      return;
    }
    ANIMATED_STEPS.forEach((next) => {
      timersRef.current.push(
        window.setTimeout(() => {
          setStep(next);
          if (next === OPEN_STEP) {
            focusAfterOpen(targetId);
          }
        }, STEP_AT_MS[next]),
      );
    });
  };

  const flag = (from: Step) => (step >= from ? "" : undefined);

  return (
    <div
      className="envelope"
      data-seal={flag(1)}
      data-flap={flag(2)}
      data-fade={flag(3)}
      data-letter={flag(4)}
      data-done={flag(5)}
    >
      <div className="envelope-closed">
        <button
          type="button"
          aria-expanded={step > 0}
          aria-controls={contentId}
          aria-describedby={hintId}
          onClick={open}
          className="envelope-box focus-ring"
        >
          <EnvelopeArt />
          <span className="sr-only">{label}</span>
        </button>
        <p id={hintId} className="envelope-hint text-muted">
          {hint}
        </p>
      </div>
      <div className="envelope-reveal">
        <div className="envelope-reveal-inner">
          <div id={contentId} className="envelope-letter" inert={isHydrated && step < OPEN_STEP}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
