import { useMemo, useState } from "react";

interface KindItem<K extends string> {
  readonly kind: K;
}

export interface KindFilter<K extends string, I extends KindItem<K>> {
  readonly activeKind: K | null;
  readonly setActiveKind: (kind: K | null) => void;
  readonly kinds: readonly K[];
  readonly visibleItems: readonly I[];
}

export function useKindFilter<K extends string, I extends KindItem<K>>(
  items: readonly I[],
  order: readonly K[],
): KindFilter<K, I> {
  const [activeKind, setActiveKind] = useState<K | null>(null);

  const kinds = useMemo(
    () => order.filter((kind) => items.some((item) => item.kind === kind)),
    [items, order],
  );

  const visibleItems = useMemo(
    () => (activeKind === null ? items : items.filter((item) => item.kind === activeKind)),
    [items, activeKind],
  );

  return { activeKind, setActiveKind, kinds, visibleItems };
}
