import type { MapNode, MapRoute } from "../types";

export const area03Nodes: MapNode[] = [
  // E8 北陸道: 上越JCT -> 米原JCT（実際の起点・終点まで全区間）
  { id: "joetsu-jct", name: "上越JCT", type: "jct", x: 500, y: 150, routeIds: ["e8", "e18"] },
  { id: "itoigawa-ic", name: "糸魚川IC", type: "ic", x: 400, y: 220, routeIds: ["e8"] },
  { id: "asahi-ic", name: "朝日IC", type: "ic", x: 330, y: 270, routeIds: ["e8"] },
  { id: "kurobe-ic", name: "黒部IC", type: "ic", x: 280, y: 320, routeIds: ["e8"] },
  { id: "namerikawa-ic", name: "滑川IC", type: "ic", x: 240, y: 365, routeIds: ["e8"] },
  { id: "toyama-ic", name: "富山IC", type: "ic", x: 190, y: 410, routeIds: ["e8"] },
  { id: "kosugi-ic", name: "小杉IC", type: "ic", x: 150, y: 455, routeIds: ["e8"] },
  { id: "takaoka-ic", name: "高岡IC", type: "ic", x: 110, y: 500, routeIds: ["e8"] },
  { id: "kanazawa-morimoto-ic", name: "金沢森本IC", type: "ic", x: 80, y: 555, routeIds: ["e8"] },
  { id: "kanazawa-nishi-ic", name: "金沢西IC", type: "ic", x: 60, y: 610, routeIds: ["e8"] },
  { id: "kaga-ic", name: "加賀IC", type: "ic", x: 90, y: 660, routeIds: ["e8"] },
  { id: "komatsu-ic", name: "小松IC", type: "ic", x: 140, y: 700, routeIds: ["e8"] },
  { id: "maruoka-ic", name: "丸岡IC", type: "ic", x: 200, y: 730, routeIds: ["e8"] },
  { id: "fukui-ic", name: "福井IC", type: "ic", x: 270, y: 750, routeIds: ["e8"] },
  { id: "sabae-ic", name: "鯖江IC", type: "ic", x: 340, y: 760, routeIds: ["e8"] },
  { id: "takefu-ic", name: "武生IC", type: "ic", x: 410, y: 765, routeIds: ["e8"] },
  { id: "imajo-ic", name: "今庄IC", type: "ic", x: 480, y: 760, routeIds: ["e8"] },
  { id: "tsuruga-ic", name: "敦賀IC", type: "ic", x: 550, y: 745, routeIds: ["e8"] },
  { id: "kinomoto-ic", name: "木之本IC", type: "ic", x: 650, y: 720, routeIds: ["e8"] },
  { id: "maibara-jct", name: "米原JCT", type: "endpoint", x: 750, y: 700, routeIds: ["e8"] },

  // E18 上信越道: 上越JCT -> 藤岡JCT（実際の起点・終点）
  { id: "arai-pa", name: "新井PA", type: "pa", x: 560, y: 140, routeIds: ["e18"] },
  { id: "myoko-kogen-ic", name: "妙高高原IC", type: "ic", x: 620, y: 150, routeIds: ["e18"] },
  { id: "shinano-machi-ic", name: "信濃町IC", type: "ic", x: 680, y: 165, routeIds: ["e18"] },
  { id: "toyota-iiyama-ic", name: "豊田飯山IC", type: "ic", x: 740, y: 185, routeIds: ["e18"] },
  { id: "suzaka-nagano-higashi-ic", name: "須坂長野東IC", type: "ic", x: 800, y: 210, routeIds: ["e18"] },
  { id: "koshoku-jct", name: "更埴JCT", type: "jct", x: 860, y: 240, routeIds: ["e18", "e19"] },
  { id: "sakaki-ic", name: "坂城IC", type: "ic", x: 920, y: 225, routeIds: ["e18"] },
  { id: "ueda-sugadaira-ic", name: "上田菅平IC", type: "ic", x: 980, y: 205, routeIds: ["e18"] },
  { id: "tobu-yumeno-ic", name: "東部湯の丸IC", type: "ic", x: 1040, y: 190, routeIds: ["e18"] },
  { id: "komoro-ic", name: "小諸IC", type: "ic", x: 1100, y: 175, routeIds: ["e18"] },
  { id: "saku-ic", name: "佐久IC", type: "ic", x: 1160, y: 160, routeIds: ["e18"] },
  { id: "shimonita-ic", name: "下仁田IC", type: "ic", x: 1220, y: 145, routeIds: ["e18"] },
  { id: "tomioka-ic", name: "富岡IC", type: "ic", x: 1270, y: 130, routeIds: ["e18"] },
  { id: "fujioka-jct", name: "藤岡JCT", type: "endpoint", x: 1320, y: 110, routeIds: ["e18"] },

  // E19 長野道: 更埴JCT -> 岡谷JCT（実際の起点・終点）
  { id: "omi-ic", name: "麻績IC", type: "ic", x: 830, y: 300, routeIds: ["e19"] },
  { id: "ikusaka-pa", name: "生坂PA", type: "pa", x: 810, y: 350, routeIds: ["e19"] },
  { id: "matsumoto-ic", name: "松本IC", type: "ic", x: 790, y: 410, routeIds: ["e19"] },
  { id: "shiojiri-kita-ic", name: "塩尻北IC", type: "ic", x: 770, y: 460, routeIds: ["e19"] },
  { id: "okaya-jct", name: "岡谷JCT", type: "jct", x: 750, y: 510, routeIds: ["e19", "e67"] },

  // E67 安房峠道路: 岡谷JCT -> 平湯IC（実際の起点・終点）
  { id: "shiojiri-ic", name: "塩尻IC", type: "ic", x: 700, y: 555, routeIds: ["e67"] },
  { id: "nakanoyu-ic", name: "中の湯IC", type: "ic", x: 650, y: 600, routeIds: ["e67"] },
  { id: "hirayu-ic", name: "平湯IC", type: "endpoint", x: 610, y: 640, routeIds: ["e67"] },
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
    path: [
      "joetsu-jct",
      "itoigawa-ic",
      "asahi-ic",
      "kurobe-ic",
      "namerikawa-ic",
      "toyama-ic",
      "kosugi-ic",
      "takaoka-ic",
      "kanazawa-morimoto-ic",
      "kanazawa-nishi-ic",
      "kaga-ic",
      "komatsu-ic",
      "maruoka-ic",
      "fukui-ic",
      "sabae-ic",
      "takefu-ic",
      "imajo-ic",
      "tsuruga-ic",
      "kinomoto-ic",
      "maibara-jct",
    ],
    badges: [
      { x: 300, y: 300 },
      { x: 130, y: 478 },
      { x: 260, y: 720 },
      { x: 540, y: 775 },
    ],
    directionTags: [
      { x: 450, y: 205, angleDeg: -135, label: "下り" },
      { x: 720, y: 740, angleDeg: 200, label: "上り" },
    ],
  },
  {
    id: "e18",
    eNumbers: ["E18"],
    name: "上信越道",
    colorVar: "--route-e18",
    path: [
      "joetsu-jct",
      "arai-pa",
      "myoko-kogen-ic",
      "shinano-machi-ic",
      "toyota-iiyama-ic",
      "suzaka-nagano-higashi-ic",
      "koshoku-jct",
      "sakaki-ic",
      "ueda-sugadaira-ic",
      "tobu-yumeno-ic",
      "komoro-ic",
      "saku-ic",
      "shimonita-ic",
      "tomioka-ic",
      "fujioka-jct",
    ],
    badges: [
      { x: 720, y: 158 },
      { x: 1080, y: 148 },
    ],
    directionTags: [
      { x: 555, y: 195, angleDeg: -20, label: "下り" },
      { x: 1290, y: 150, angleDeg: 30, label: "上り" },
    ],
  },
  {
    id: "e19",
    eNumbers: ["E19"],
    name: "長野道",
    colorVar: "--route-e19",
    path: ["koshoku-jct", "omi-ic", "ikusaka-pa", "matsumoto-ic", "shiojiri-kita-ic", "okaya-jct"],
    badges: [
      { x: 820, y: 328 },
      { x: 790, y: 438 },
    ],
    directionTags: [
      { x: 900, y: 275, angleDeg: 90, label: "下り" },
      { x: 700, y: 470, angleDeg: -90, label: "上り" },
    ],
  },
  {
    id: "e67",
    eNumbers: ["E67"],
    name: "安房峠道路",
    colorVar: "--route-e67",
    path: ["okaya-jct", "shiojiri-ic", "nakanoyu-ic", "hirayu-ic"],
    badges: [{ x: 680, y: 533 }],
    directionTags: [
      { x: 795, y: 555, angleDeg: 135, label: "下り" },
      { x: 570, y: 680, angleDeg: 200, label: "上り" },
    ],
  },
];
