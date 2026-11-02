"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { heroScenes } from "@/data/hero";
import { useTheme } from "@/hooks/useTheme";

const TALL_QUERY = "(max-width: 639px)";
const MAX_DENSITY = 1.5;

function subscribeToTallQuery(onChange: () => void) {
  const query = window.matchMedia(TALL_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function pickCandidate(srcSet: string, targetWidth: number): string | undefined {
  const candidates = srcSet
    .split(", ")
    .map((entry) => {
      const [url = "", descriptor = ""] = entry.split(" ");
      return { url, width: Number.parseInt(descriptor, 10) };
    })
    .filter((candidate) => candidate.url && Number.isFinite(candidate.width))
    .sort((first, second) => first.width - second.width);
  return (candidates.find((candidate) => candidate.width >= targetWidth) ?? candidates.at(-1))?.url;
}

export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const { theme, isHydrated } = useTheme();
  const isTall = useSyncExternalStore(
    subscribeToTallQuery,
    () => window.matchMedia(TALL_QUERY).matches,
    () => false,
  );
  const scene = heroScenes[theme][isTall ? "tall" : "wide"];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!isHydrated || !canvas || loadedSrc === scene.src) return;
    const { props } = getImageProps({ src: scene.src, alt: "", fill: true, sizes: "100vw" });
    const targetWidth = Math.max(window.innerWidth, 320) * Math.min(window.devicePixelRatio, MAX_DENSITY);
    const image = new window.Image();
    image.src = pickCandidate(props.srcSet ?? "", targetWidth) ?? props.src;
    let isCurrent = true;
    image
      .decode()
      .then(() => {
        if (!isCurrent) return;
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        canvas.getContext("2d")?.drawImage(image, 0, 0);
        setLoadedSrc(scene.src);
      })
      .catch(() => undefined);
    return () => {
      isCurrent = false;
    };
  }, [isHydrated, loadedSrc, scene.src]);

  if (!isHydrated) return null;

  return (
    <div
      aria-hidden="true"
      className="hero-scene"
      data-loaded={loadedSrc === scene.src ? "" : undefined}
      style={{ aspectRatio: `${scene.width} / ${scene.height}` }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
