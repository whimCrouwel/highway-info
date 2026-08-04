"use client";

import { area03Nodes, area03Routes } from "./data/area03";
import { useRouteHighlight } from "./useRouteHighlight";
import { MapCanvas } from "./MapCanvas";
import { RouteLegend } from "./RouteLegend";
import { AreaSelector } from "./AreaSelector";

export function OverviewMap() {
  const { activeRouteId, toggleRoute, reset, isDimmed } = useRouteHighlight();

  return (
    <div className="mx-auto flex max-w-[1180px] flex-col gap-5 px-5 pb-16 pt-7">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-b pb-4">
        <div>
          <span className="mb-1 block text-[11px] uppercase tracking-wider text-muted-foreground">
            高速道路情報アプリ
          </span>
          <h1 className="text-xl font-semibold tracking-tight">路線図ビュー（模式図）</h1>
        </div>
        <AreaSelector />
      </div>

      <p className="max-w-[60ch] text-xs leading-relaxed text-muted-foreground">
        実際の地形ではなく、路線図のようにデフォルメして表示しています。<b>JCTと路線の端点</b>
        は常時ラベル表示。<b>IC・SA/PA</b>は点のみで、タップすると名称が出ます。路線（線または右のリスト）を
        タップするとその路線だけハイライトします。
      </p>

      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[1fr_240px]">
        <MapCanvas
          nodes={area03Nodes}
          routes={area03Routes}
          isDimmed={isDimmed}
          onSelectRoute={toggleRoute}
        />
        <RouteLegend routes={area03Routes} activeRouteId={activeRouteId} onToggle={toggleRoute} onReset={reset} />
      </div>
    </div>
  );
}
