"use client";

import { useId } from "react";
import { LazyIllustration } from "@/components/ui/LazyIllustration";
import { WaxSealMark } from "@/components/ui/WaxSeal";
import { illustrations } from "@/data/illustrations";
import { cn } from "@/lib/cn";

const POSTMARK_WAVES = [17, 25, 33] as const;

function SealHalf({ side }: { readonly side: "left" | "right" }) {
  return (
    <span className={cn("envelope-seal-half", side === "left" ? "envelope-seal-left" : "envelope-seal-right")}>
      <WaxSealMark />
    </span>
  );
}

function PostageStamp() {
  return (
    <span aria-hidden="true" className="envelope-stamp">
      <span className="envelope-stamp-face">
        <LazyIllustration illustration={illustrations.oakLeafStamp} className="w-[62%] text-letter-ink" />
      </span>
      <svg viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet" className="envelope-postmark">
        <g fill="none" stroke="rgb(var(--letter-ink))" strokeWidth="0.9" opacity="0.42" vectorEffect="non-scaling-stroke">
          <circle cx="24" cy="25" r="17" vectorEffect="non-scaling-stroke" />
          <circle cx="24" cy="25" r="14" vectorEffect="non-scaling-stroke" />
          {POSTMARK_WAVES.map((y) => (
            <path key={y} d={`M44 ${y}q4.5-2 9 0t9 0t9 0t9 0t9 0t9 0`} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </svg>
    </span>
  );
}

export function EnvelopeArt() {
  const id = useId();
  const sideLeft = `${id}-side-left`;
  const sideRight = `${id}-side-right`;
  const bottom = `${id}-bottom`;
  const flapOuter = `${id}-flap-outer`;
  const flapInner = `${id}-flap-inner`;

  return (
    <>
      <span aria-hidden="true" className="envelope-layer envelope-body" />
      <span aria-hidden="true" className="envelope-layer envelope-lining" />
      <svg aria-hidden="true" viewBox="0 0 300 200" preserveAspectRatio="none" className="envelope-art">
        <defs>
          <linearGradient id={sideLeft} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="150" y2="0">
            <stop offset="0" stopColor="rgb(255 255 255)" stopOpacity="0.32" />
            <stop offset="1" stopColor="rgb(var(--letter-char))" stopOpacity="0.14" />
          </linearGradient>
          <linearGradient id={sideRight} gradientUnits="userSpaceOnUse" x1="300" y1="0" x2="150" y2="0">
            <stop offset="0" stopColor="rgb(255 255 255)" stopOpacity="0.22" />
            <stop offset="1" stopColor="rgb(var(--letter-char))" stopOpacity="0.16" />
          </linearGradient>
          <linearGradient id={bottom} gradientUnits="userSpaceOnUse" x1="0" y1="104" x2="0" y2="200">
            <stop offset="0" stopColor="rgb(var(--letter-char))" stopOpacity="0.16" />
            <stop offset="0.45" stopColor="rgb(var(--letter-toast))" stopOpacity="0.06" />
            <stop offset="1" stopColor="rgb(255 255 255)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <polygon points="0,0 150,106 0,200" fill={`url(#${sideLeft})`} />
        <polygon points="300,0 150,106 300,200" fill={`url(#${sideRight})`} />
        <polygon points="0,200 150,104 300,200" fill="rgb(var(--letter-paper-deep))" />
        <polygon points="0,200 150,104 300,200" fill={`url(#${bottom})`} />
        <polyline points="0,200 150,104 300,200" fill="none" stroke="rgb(255 255 255 / 0.7)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <polyline points="0,0 150,106 300,0" fill="none" stroke="rgb(var(--letter-char) / 0.16)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <PostageStamp />
      <span aria-hidden="true" className="envelope-flap">
        <span className="envelope-flap-face envelope-flap-outer">
          <span className="envelope-flap-paper" />
          <svg viewBox="0 0 300 106" preserveAspectRatio="none" className="envelope-art">
            <defs>
              <linearGradient id={flapOuter} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="106">
                <stop offset="0" stopColor="rgb(var(--letter-char))" stopOpacity="0.12" />
                <stop offset="1" stopColor="rgb(255 255 255)" stopOpacity="0.18" />
              </linearGradient>
            </defs>
            <polygon points="0,0 300,0 150,106" fill={`url(#${flapOuter})`} />
            <polyline points="0,0 150,106 300,0" fill="none" stroke="rgb(255 255 255 / 0.8)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          </svg>
        </span>
        <span className="envelope-flap-face envelope-flap-inner">
          <span className="envelope-flap-paper" />
          <svg viewBox="0 0 300 106" preserveAspectRatio="none" className="envelope-art">
            <defs>
              <linearGradient id={flapInner} gradientUnits="userSpaceOnUse" x1="0" y1="106" x2="0" y2="0">
                <stop offset="0" stopColor="rgb(var(--letter-char))" stopOpacity="0.14" />
                <stop offset="1" stopColor="rgb(255 255 255)" stopOpacity="0.12" />
              </linearGradient>
            </defs>
            <polygon points="0,106 300,106 150,0" fill={`url(#${flapInner})`} />
            <polyline points="0,106 150,0 300,106" fill="none" stroke="rgb(255 255 255 / 0.75)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          </svg>
        </span>
      </span>
      <span aria-hidden="true" className="envelope-seal">
        <SealHalf side="left" />
        <SealHalf side="right" />
      </span>
    </>
  );
}
