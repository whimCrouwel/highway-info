import type { DirectionTagData } from "./types";

export function DirectionTag({ x, y, angleDeg, label }: DirectionTagData) {
  return (
    <g transform={`translate(${x} ${y})`} className="pointer-events-none">
      <g transform={`rotate(${angleDeg})`}>
        <path d="M0,-4 L8,0 L0,4 Z" className="fill-muted-foreground" />
      </g>
      <text
        x={12}
        y={4}
        paintOrder="stroke"
        className="fill-muted-foreground stroke-background text-[11px] font-semibold"
        strokeWidth={3}
        strokeLinejoin="round"
      >
        {label}
      </text>
    </g>
  );
}
