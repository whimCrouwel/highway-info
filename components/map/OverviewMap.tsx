"use client";

import { useState } from "react";
import { area03Nodes, area03Routes } from "./data/area03";
import { useRouteHighlight } from "./useRouteHighlight";
import { MapCanvas } from "./MapCanvas";
import { RouteLegend } from "./RouteLegend";
import { AreaSelector } from "./AreaSelector";
import { Button } from "@/components/ui/button";

export function OverviewMap() {
  const { activeRouteId, toggleRoute, reset, isDimmed } = useRouteHighlight();
  const [dark, setDark] = useState(false);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <MapCanvas nodes={area03Nodes} routes={area03Routes} isDimmed={isDimmed} onSelectRoute={toggleRoute} />

      <div className="pointer-events-none absolute inset-0 flex flex-col gap-3 p-4">
        <div className="pointer-events-auto flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card/95 p-3 shadow-md backdrop-blur">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
              高速道路情報アプリ
            </span>
            <h1 className="text-base font-semibold tracking-tight">路線図ビュー（模式図）</h1>
          </div>
          <div className="flex items-center gap-2">
            <AreaSelector />
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={dark ? "ライトモードに切り替え" : "ダークモードに切り替え"}
              onClick={toggleDark}
            >
              {dark ? "☀️" : "🌙"}
            </Button>
          </div>
        </div>

        <div className="pointer-events-auto ml-auto mt-auto w-[240px]">
          <RouteLegend routes={area03Routes} activeRouteId={activeRouteId} onToggle={toggleRoute} onReset={reset} />
        </div>
      </div>
    </div>
  );
}
