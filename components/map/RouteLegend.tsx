"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { MapRoute } from "./types";

export function RouteLegend({
  routes,
  activeRouteId,
  onToggle,
  onReset,
}: {
  routes: MapRoute[];
  activeRouteId: string | null;
  onToggle: (routeId: string) => void;
  onReset: () => void;
}) {
  return (
    <Card className="flex flex-col gap-2.5 p-4">
      <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">路線</h2>
      {routes.map((route) => (
        <Button
          key={route.id}
          type="button"
          variant="outline"
          aria-pressed={activeRouteId === route.id}
          onClick={() => onToggle(route.id)}
          className={cn(
            "h-9 w-full justify-start gap-2.5 px-2.5",
            activeRouteId === route.id && "border-foreground bg-accent"
          )}
        >
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ background: `var(${route.colorVar})` }}
          />
          <span className="flex-1 text-left">{route.name}</span>
          <Badge variant="secondary" className="font-mono text-[11px]">
            {route.eNumbers.join(" ")}
          </Badge>
        </Button>
      ))}
      <button
        type="button"
        onClick={onReset}
        className="py-0.5 text-left text-xs font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
      >
        すべて表示に戻す
      </button>
      <hr className="border-border" />
      <p className="text-xs leading-relaxed text-muted-foreground">
        <b className="text-foreground">上り／下り</b>は路線ごとに向きが違うため、端点のそばに矢印付きで表示しています。
      </p>
    </Card>
  );
}
