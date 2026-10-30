"use client";

import { animate, m, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

const REVEAL_OFFSET = 24;
const REVEAL_DURATION = 0.7;

interface RevealProps {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const opacity = useMotionValue(1);
  const y = useMotionValue(0);
  const isHiddenRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useLayoutEffect(() => {
    const element = ref.current;
    const viewportHeight = window.innerHeight;
    if (!element || viewportHeight === 0 || element.getBoundingClientRect().top <= viewportHeight) {
      return;
    }
    isHiddenRef.current = true;
    opacity.set(0);
    y.set(shouldReduceMotion ? 0 : REVEAL_OFFSET);
  }, [opacity, y, shouldReduceMotion]);

  useEffect(() => {
    if (!isInView || !isHiddenRef.current) {
      return;
    }
    const transition = { duration: REVEAL_DURATION, delay, ease: "easeOut" } as const;
    const animations = [animate(opacity, 1, transition), animate(y, 0, transition)];
    Promise.all(animations).then(() => {
      isHiddenRef.current = false;
    });
    return () => animations.forEach((animation) => animation.stop());
  }, [isInView, delay, opacity, y]);

  return (
    <m.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </m.div>
  );
}
