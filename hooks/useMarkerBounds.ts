import { useEffect, useRef, useState, type RefObject } from "react";
import type { MarkerBounds } from "@/lib/footprints";

export interface MarkerLayout {
  readonly height: number;
  readonly markers: readonly MarkerBounds[];
}

const EMPTY_LAYOUT: MarkerLayout = { height: 0, markers: [] };

function sameLayout(first: MarkerLayout, second: MarkerLayout): boolean {
  return (
    first.height === second.height &&
    first.markers.length === second.markers.length &&
    first.markers.every(
      (marker, index) => marker.top === second.markers[index]?.top && marker.bottom === second.markers[index]?.bottom,
    )
  );
}

export function useMarkerBounds<T extends HTMLElement>(selector: string): readonly [RefObject<T | null>, MarkerLayout] {
  const ref = useRef<T>(null);
  const [layout, setLayout] = useState<MarkerLayout>(EMPTY_LAYOUT);

  useEffect(() => {
    const element = ref.current;
    const container = element?.parentElement;
    if (!element || !container) {
      return;
    }
    const measure = () => {
      const origin = element.getBoundingClientRect();
      const markers = Array.from(container.querySelectorAll<HTMLElement>(selector), (marker) => {
        const bounds = marker.getBoundingClientRect();
        return { top: Math.round(bounds.top - origin.top), bottom: Math.round(bounds.bottom - origin.top) };
      });
      const next = { height: Math.round(origin.height), markers };
      setLayout((previous) => (sameLayout(previous, next) ? previous : next));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    Array.from(container.children).forEach((child) => observer.observe(child));
    container.querySelectorAll("li").forEach((item) => observer.observe(item));
    measure();
    return () => observer.disconnect();
  }, [selector]);

  return [ref, layout];
}
