"use client";

import { useCallback, useState } from "react";

export function useRouteHighlight() {
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);

  const toggleRoute = useCallback((routeId: string) => {
    setActiveRouteId((current) => (current === routeId ? null : routeId));
  }, []);

  const reset = useCallback(() => setActiveRouteId(null), []);

  const isDimmed = useCallback(
    (routeId: string) => activeRouteId !== null && activeRouteId !== routeId,
    [activeRouteId]
  );

  return { activeRouteId, toggleRoute, reset, isDimmed };
}
