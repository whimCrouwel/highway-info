"use client";

import { useEffect, useState } from "react";
import { ExpresswayMap } from "./ExpresswayMap";
import { AreaSelector } from "./AreaSelector";
import { regions } from "./regions";
import { Button } from "@/components/ui/button";

export function OverviewMap() {
  const [dark, setDark] = useState(true);
  const [regionId, setRegionId] = useState("all");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const region = regions.find((r) => r.id === regionId) ?? regions[0];

  return (
    <div className="relative isolate h-screen w-screen overflow-hidden">
      <ExpresswayMap dark={dark} flyToBounds={region.bounds} />

      <div className="pointer-events-none absolute inset-0 z-[1100] flex flex-col gap-3 p-4">
        <div className="pointer-events-auto flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card/95 p-3 shadow-md backdrop-blur">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
              高速道路情報アプリ
            </span>
            <h1 className="text-base font-semibold tracking-tight">高速道路マップ</h1>
          </div>
          <div className="flex items-center gap-2">
            <AreaSelector value={regionId} onChange={setRegionId} />
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={dark ? "ライトモードに切り替え" : "ダークモードに切り替え"}
              onClick={() => setDark((d) => !d)}
            >
              {dark ? "☀️" : "🌙"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
