"use client";

import { useSyncExternalStore } from "react";

function subscribeToNothing(): () => void {
  return () => undefined;
}

function readYear(): number {
  return new Date().getFullYear();
}

function readServerYear(): null {
  return null;
}

export function CurrentYear() {
  const year = useSyncExternalStore(subscribeToNothing, readYear, readServerYear);

  return <span className="inline-block min-w-[4ch] tabular-nums">{year}</span>;
}
