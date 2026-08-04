import type { Region } from "./types";

export const JAPAN_BOUNDS: [number, number, number, number] = [122.8, 24.0, 148.9, 45.7];

export const regions: Region[] = [
  { id: "all", name: "全国", bounds: JAPAN_BOUNDS },
  { id: "hokkaido", name: "北海道", bounds: [139.3, 41.3, 148.9, 45.7] },
  { id: "tohoku", name: "東北", bounds: [139.3, 36.7, 142.1, 41.6] },
  { id: "hokuriku-shinetsu", name: "北陸・信越", bounds: [136.5, 35.9, 139.5, 38.6] },
  { id: "kanto", name: "関東", bounds: [138.4, 34.8, 141.0, 37.1] },
  { id: "tokai", name: "東海", bounds: [135.9, 33.9, 138.8, 36.5] },
  { id: "kansai", name: "関西", bounds: [134.0, 33.3, 136.5, 35.8] },
  { id: "chugoku", name: "中国", bounds: [130.7, 33.7, 134.5, 35.7] },
  { id: "shikoku", name: "四国", bounds: [132.0, 32.7, 134.9, 34.5] },
  { id: "kyushu-okinawa", name: "九州・沖縄", bounds: [122.8, 24.0, 132.0, 34.0] },
];
