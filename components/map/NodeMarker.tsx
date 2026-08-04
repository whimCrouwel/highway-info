"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { MapNode } from "./types";

const TYPE_LABEL: Record<MapNode["type"], string> = {
  jct: "JCT",
  ic: "IC",
  sa: "SA",
  pa: "PA",
  endpoint: "",
};

export function NodeMarker({ node }: { node: MapNode }) {
  const alwaysLabeled = node.type === "jct" || node.type === "endpoint";

  if (alwaysLabeled) {
    return (
      <g transform={`translate(${node.x} ${node.y})`}>
        <circle r={node.type === "jct" ? 8 : 7} className="fill-card stroke-foreground" strokeWidth={2.5} />
        <text
          x={12}
          y={-8}
          paintOrder="stroke"
          className="fill-foreground stroke-background text-[13px] font-semibold"
          strokeWidth={4}
          strokeLinejoin="round"
        >
          {node.name}
        </text>
      </g>
    );
  }

  const radius = node.type === "ic" ? 6 : 4;
  const meta = `${node.routeIds.join(" ").toUpperCase()} · ${TYPE_LABEL[node.type]}`;

  return (
    <Popover>
      <PopoverTrigger
        nativeButton={false}
        render={
          <g
            transform={`translate(${node.x} ${node.y})`}
            tabIndex={0}
            role="button"
            aria-label={`${node.name} 詳細を表示`}
            className="cursor-pointer outline-none"
          />
        }
      >
        <circle
          r={radius}
          className={
            node.type === "ic"
              ? "fill-card stroke-muted-foreground hover:stroke-ring"
              : "fill-muted stroke-muted-foreground hover:stroke-ring"
          }
          strokeWidth={1.5}
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto px-3 py-2 text-sm">
        <p className="font-medium leading-tight">{node.name}</p>
        <p className="text-xs text-muted-foreground">{meta}</p>
      </PopoverContent>
    </Popover>
  );
}
