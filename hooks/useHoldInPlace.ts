import { useCallback, useEffect, useRef } from "react";

const HOLD_FALLBACK_MS = 2000;
const PANEL_PROPERTY = "grid-template-rows";

const hasTransition = (element: HTMLElement) =>
  getComputedStyle(element).transitionDuration.split(",").some((duration) => parseFloat(duration) > 0);

export function useHoldInPlace() {
  const releaseRef = useRef<() => void>(() => {});

  useEffect(() => () => releaseRef.current(), []);

  return useCallback((anchor: HTMLElement, panels: readonly HTMLElement[]) => {
    releaseRef.current();
    const top = anchor.getBoundingClientRect().top;
    const pending = new Set(panels);
    let frame = 0;

    const correct = () => {
      const drift = anchor.getBoundingClientRect().top - top;
      if (drift !== 0) {
        window.scrollBy({ top: drift, behavior: "instant" });
      }
    };
    const follow = () => {
      correct();
      frame = window.requestAnimationFrame(follow);
    };
    const release = () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
      panels.forEach((panel) => {
        panel.removeEventListener("transitionend", onEnd);
        panel.removeEventListener("transitioncancel", onEnd);
      });
      releaseRef.current = () => {};
    };
    const onEnd = (event: TransitionEvent) => {
      if (event.target !== event.currentTarget || event.propertyName !== PANEL_PROPERTY) {
        return;
      }
      pending.delete(event.currentTarget as HTMLElement);
      if (pending.size === 0) {
        correct();
        release();
      }
    };
    const fallback = window.setTimeout(() => {
      correct();
      release();
    }, HOLD_FALLBACK_MS);

    releaseRef.current = release;
    if (!panels.some(hasTransition)) {
      frame = window.requestAnimationFrame(() => {
        correct();
        release();
      });
      return;
    }
    panels.forEach((panel) => {
      panel.addEventListener("transitionend", onEnd);
      panel.addEventListener("transitioncancel", onEnd);
    });
    frame = window.requestAnimationFrame(follow);
  }, []);
}
