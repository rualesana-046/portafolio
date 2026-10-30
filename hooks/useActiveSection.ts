import { useEffect, useState } from "react";

const ACTIVE_LINE_MARGIN = "-45% 0px -55% 0px";

export function useActiveSection<T extends string>(ids: readonly T[]): T | null {
  const [activeId, setActiveId] = useState<T | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) {
      return;
    }

    const intersecting = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        }
        setActiveId(ids.find((id) => intersecting.has(id)) ?? null);
      },
      { rootMargin: ACTIVE_LINE_MARGIN },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
