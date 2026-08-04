import type { MapNode, MapRoute } from "../types";

export const area03Nodes: MapNode[] = [
  { id: "koshoku-jct", name: "更埴JCT", type: "jct", x: 380, y: 260, routeIds: ["e18", "e19"] },
  { id: "joetsu-jct", name: "上越JCT", type: "endpoint", x: 120, y: 130, routeIds: ["e8", "e18"] },
  { id: "fujioka-jct", name: "藤岡JCT", type: "endpoint", x: 640, y: 150, routeIds: ["e18"] },
  { id: "okaya-jct", name: "岡谷JCT", type: "endpoint", x: 380, y: 430, routeIds: ["e19", "e67"] },
  { id: "myoko-kogen-ic", name: "妙高高原IC", type: "ic", x: 230, y: 175, routeIds: ["e18"] },
  { id: "saku-ic", name: "佐久IC", type: "ic", x: 500, y: 200, routeIds: ["e18"] },
  { id: "omi-ic", name: "麻績IC", type: "ic", x: 380, y: 345, routeIds: ["e19"] },
  { id: "matsumoto-ic", name: "松本IC", type: "ic", x: 380, y: 385, routeIds: ["e19"] },
  { id: "obuse-pa", name: "小布施PA", type: "pa", x: 300, y: 215, routeIds: ["e18"] },
  { id: "ariake-sa", name: "有明SA", type: "sa", x: 380, y: 410, routeIds: ["e19"] },
  { id: "matsushiro-pa", name: "松代PA", type: "pa", x: 430, y: 220, routeIds: ["e18"] },
];

export const area03NodesById: Record<string, MapNode> = Object.fromEntries(
  area03Nodes.map((node) => [node.id, node])
);

export const area03Routes: MapRoute[] = [
  {
    id: "e8",
    eNumbers: ["E8"],
    name: "北陸道",
    colorVar: "--route-e8",
    path: ["joetsu-jct"],
    stub: { dx: -90, dy: -60 },
    badges: [{ x: 48, y: 82 }],
    directionTags: [
      { x: 58, y: 58, angleDeg: -90, label: "上り" },
      { x: 78, y: 132, angleDeg: 180, label: "下り" },
    ],
  },
  {
    id: "e18",
    eNumbers: ["E18"],
    name: "上信越道",
    colorVar: "--route-e18",
    path: ["joetsu-jct", "koshoku-jct", "fujioka-jct"],
    badges: [
      { x: 205, y: 150 },
      { x: 480, y: 175 },
    ],
    directionTags: [{ x: 560, y: 134, angleDeg: 0, label: "上り" }],
  },
  {
    id: "e19",
    eNumbers: ["E19"],
    name: "長野道",
    colorVar: "--route-e19",
    path: ["koshoku-jct", "okaya-jct"],
    badges: [{ x: 392, y: 330 }],
    directionTags: [{ x: 392, y: 300, angleDeg: 90, label: "上り" }],
  },
  {
    id: "e67",
    eNumbers: ["E67"],
    name: "安房峠道路",
    colorVar: "--route-e67",
    path: ["okaya-jct"],
    stub: { dx: -80, dy: 60 },
    badges: [{ x: 298, y: 452 }],
    directionTags: [{ x: 322, y: 466, angleDeg: -90, label: "下り" }],
  },
];
