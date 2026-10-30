import { useCallback, useSyncExternalStore } from "react";

export interface DocumentAttributeState<T> {
  readonly value: T;
  readonly isHydrated: boolean;
}

function subscribeToNothing(): () => void {
  return () => undefined;
}

export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}

export function useDocumentAttribute<T>(
  attribute: string,
  readValue: (root: HTMLElement) => T,
  serverValue: T,
): DocumentAttributeState<T> {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const observer = new MutationObserver(onChange);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: [attribute],
      });
      return () => observer.disconnect();
    },
    [attribute],
  );

  const value = useSyncExternalStore(
    subscribe,
    () => readValue(document.documentElement),
    () => serverValue,
  );

  const isHydrated = useIsHydrated();

  return { value, isHydrated };
}
