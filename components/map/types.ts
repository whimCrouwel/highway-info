export interface Region {
  id: string;
  name: string;
  /** [west, south, east, north] in lng/lat, for map.fitBounds(). */
  bounds: [number, number, number, number];
}
