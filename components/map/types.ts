export type NodeType = "jct" | "ic" | "sa" | "pa" | "endpoint";

export interface MapNode {
  id: string;
  name: string;
  type: NodeType;
  x: number;
  y: number;
  /** Which route(s) this node sits on, for tooltip text like "E18 上信越道 · IC". */
  routeIds: string[];
}

export interface DirectionTagData {
  x: number;
  y: number;
  /** Arrow rotation in degrees; 0 = pointing right. */
  angleDeg: number;
  label: "上り" | "下り";
}

export interface BadgeAnchor {
  x: number;
  y: number;
}

export interface MapRoute {
  id: string;
  eNumbers: string[];
  name: string;
  /** CSS custom property holding the route's color, e.g. "--route-e8". */
  colorVar: string;
  /** Ordered node ids defining the polyline's bend points (JCT/endpoint nodes only). */
  path: string[];
  /** Optional short decorative line extending past the last path node, signalling "continues off-screen". */
  stub?: { dx: number; dy: number };
  badges: BadgeAnchor[];
  directionTags: DirectionTagData[];
}
