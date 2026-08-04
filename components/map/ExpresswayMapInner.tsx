"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap, ZoomControl } from "react-leaflet";
import L, { type Layer, type LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { JAPAN_BOUNDS } from "./regions";

const TILE_URL = (dark: boolean) =>
  `https://{s}.basemaps.cartocdn.com/${dark ? "dark_all" : "light_all"}/{z}/{x}/{y}{r}.png`;

const ATTRIBUTION =
  '&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

function toLatLngBounds(bounds: [number, number, number, number]): [[number, number], [number, number]] {
  const [west, south, east, north] = bounds;
  return [
    [south, west],
    [north, east],
  ];
}

function FitBounds({ bounds }: { bounds: [number, number, number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(toLatLngBounds(bounds), { padding: [40, 40], animate: true });
  }, [map, bounds]);
  return null;
}

function lineStyle(feature?: GeoJSON.Feature) {
  const color = (feature?.properties as { color?: string } | undefined)?.color ?? "#3388ff";
  return { color, weight: 2.5, opacity: 0.9 };
}

function onEachLine(feature: GeoJSON.Feature, layer: Layer) {
  const props = feature.properties as { ref?: string; name?: string } | undefined;
  if (!props) return;
  layer.bindPopup(
    `<div style="font-size:13px"><div style="font-weight:600">${props.ref ?? ""}</div>${
      props.name ? `<div style="opacity:0.7;font-size:11px;margin-top:2px">${props.name}</div>` : ""
    }</div>`
  );
}

function junctionPointToLayer(feature: GeoJSON.Feature, latlng: LatLng) {
  return L.circleMarker(latlng, {
    radius: 3,
    weight: 1.5,
    color: "#333333",
    fillColor: "#ffffff",
    fillOpacity: 1,
  });
}

function onEachJunction(feature: GeoJSON.Feature, layer: Layer) {
  const props = feature.properties as { name?: string; ref?: string } | undefined;
  if (!props) return;
  layer.bindPopup(
    `<div style="font-size:13px"><div style="font-weight:600">${props.name ?? ""}</div>${
      props.ref ? `<div style="opacity:0.7;font-size:11px;margin-top:2px">${props.ref}</div>` : ""
    }</div>`
  );
}

function useGeoJson(url: string) {
  const [data, setData] = useState<GeoJSON.GeoJsonObject | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled) setData(json);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);
  return data;
}

export function ExpresswayMapInner({
  dark,
  flyToBounds,
}: {
  dark: boolean;
  flyToBounds: [number, number, number, number];
}) {
  const lines = useGeoJson("/data/expressway-lines.geojson");
  const junctions = useGeoJson("/data/expressway-junctions.geojson");

  return (
    <MapContainer bounds={toLatLngBounds(JAPAN_BOUNDS)} className="h-full w-full" zoomControl={false} preferCanvas>
      <ZoomControl position="bottomright" />
      <TileLayer url={TILE_URL(dark)} attribution={ATTRIBUTION} />
      {lines && <GeoJSON data={lines} style={lineStyle} onEachFeature={onEachLine} />}
      {junctions && (
        <GeoJSON
          data={junctions}
          pointToLayer={junctionPointToLayer}
          onEachFeature={onEachJunction}
        />
      )}
      <FitBounds bounds={flyToBounds} />
    </MapContainer>
  );
}
