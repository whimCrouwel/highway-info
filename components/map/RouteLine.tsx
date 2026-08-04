"use client";

import { cn } from "@/lib/utils";
import type { MapNode, MapRoute } from "./types";

function buildPath(route: MapRoute, nodesById: Record<string, MapNode>): string {
  const points = route.path.map((id) => nodesById[id]);
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  if (!route.stub) return d;
  const last = points[points.length - 1];
  return `${d} L ${last.x + route.stub.dx} ${last.y + route.stub.dy}`;
}

export function RouteLine({
  route,
  nodesById,
  isDimmed,
  onSelect,
}: {
  route: MapRoute;
  nodesById: Record<string, MapNode>;
  isDimmed: boolean;
  onSelect: (routeId: string) => void;
}) {
  const d = buildPath(route, nodesById);
  const color = `var(${route.colorVar})`;

  return (
    <g>
      <path
        data-testid={`route-path-${route.id}`}
        d={d}
        stroke={color}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={cn("transition-opacity", isDimmed && "opacity-25")}
      />
      <path
        data-testid={`route-hit-${route.id}`}
        d={d}
        fill="none"
        stroke="transparent"
        strokeWidth={22}
        className="cursor-pointer"
        onClick={() => onSelect(route.id)}
      />
      {route.badges.map((badge, badgeIndex) => (
        <g
          key={badgeIndex}
          className={cn("transition-opacity", isDimmed && "opacity-25")}
        >
          {route.eNumbers.map((eNumber, i) => (
            <g key={eNumber} transform={`translate(${badge.x + i * 40} ${badge.y})`}>
              <rect width={eNumber.length * 8 + 20} height={22} rx={11} fill={color} />
              <text x={10} y={15} className="fill-white text-xs font-semibold">
                {eNumber}
              </text>
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}
