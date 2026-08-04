"use client";

import { Card } from "@/components/ui/card";
import { RouteLine } from "./RouteLine";
import { NodeMarker } from "./NodeMarker";
import { DirectionTag } from "./DirectionTag";
import type { MapNode, MapRoute } from "./types";

export function MapCanvas({
  nodes,
  routes,
  isDimmed,
  onSelectRoute,
}: {
  nodes: MapNode[];
  routes: MapRoute[];
  isDimmed: (routeId: string) => boolean;
  onSelectRoute: (routeId: string) => void;
}) {
  const nodesById = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <Card className="p-2">
      <svg viewBox="0 0 760 520" role="img" aria-label="高速道路の模式図" className="block h-auto w-full">
        {routes.map((route) => (
          <RouteLine
            key={route.id}
            route={route}
            nodesById={nodesById}
            isDimmed={isDimmed(route.id)}
            onSelect={onSelectRoute}
          />
        ))}
        {routes.flatMap((route) => route.directionTags.map((tag, i) => <DirectionTag key={`${route.id}-${i}`} {...tag} />))}
        {nodes.map((node) => (
          <NodeMarker key={node.id} node={node} />
        ))}
      </svg>
    </Card>
  );
}
