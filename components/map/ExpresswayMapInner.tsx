"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap, useMapEvent, ZoomControl } from "react-leaflet";
import L, { type Layer, type LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { JAPAN_BOUNDS } from "./regions";

const TILE_URL = (dark: boolean) =>
  `https://{s}.basemaps.cartocdn.com/${dark ? "dark_all" : "light_all"}/{z}/{x}/{y}{r}.png`;

const ATTRIBUTION =
  '&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Wider hit-testing than the drawn pixels, so thin lines and small dots are
// easy to click/tap without needing to hit the exact rendered shape.
const canvasRenderer = L.canvas({ tolerance: 8 });

function radiusForZoom(zoom: number) {
  return Math.max(4, Math.min(12, zoom - 2));
}

function weightForZoom(zoom: number) {
  return Math.max(2, Math.min(6, (zoom - 4) * 0.6));
}

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

function onEachLine(feature: GeoJSON.Feature, layer: Layer) {
  const props = feature.properties as { ref?: string; name?: string } | undefined;
  if (!props) return;
  layer.bindPopup(
    `<div style="font-size:13px"><div style="font-weight:600">${props.ref ?? ""}</div>${
      props.name ? `<div style="opacity:0.7;font-size:11px;margin-top:2px">${props.name}</div>` : ""
    }</div>`
  );
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

function LinesLayer({ data }: { data: GeoJSON.GeoJsonObject }) {
  const map = useMap();
  const layerRef = useRef<L.GeoJSON | null>(null);

  const applyWeight = (zoom: number) => {
    const weight = weightForZoom(zoom);
    layerRef.current?.setStyle(() => ({ weight }));
  };

  useMapEvent("zoomend", () => applyWeight(map.getZoom()));

  return (
    <GeoJSON
      ref={(layer) => {
        layerRef.current = layer;
        if (layer) applyWeight(map.getZoom());
      }}
      data={data}
      style={(feature) => ({
        color: (feature?.properties as { color?: string } | undefined)?.color ?? "#3388ff",
        weight: weightForZoom(map.getZoom()),
        opacity: 0.9,
      })}
      onEachFeature={onEachLine}
    />
  );
}

function JunctionsLayer({ data }: { data: GeoJSON.GeoJsonObject }) {
  const map = useMap();
  const layerRef = useRef<L.GeoJSON | null>(null);

  const applyRadius = (zoom: number) => {
    const radius = radiusForZoom(zoom);
    layerRef.current?.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker) layer.setRadius(radius);
    });
  };

  useMapEvent("zoomend", () => applyRadius(map.getZoom()));

  return (
    <GeoJSON
      ref={(layer) => {
        layerRef.current = layer;
        if (layer) applyRadius(map.getZoom());
      }}
      data={data}
      pointToLayer={(_feature, latlng: LatLng) =>
        L.circleMarker(latlng, {
          radius: radiusForZoom(map.getZoom()),
          weight: 1.5,
          color: "#333333",
          fillColor: "#ffffff",
          fillOpacity: 1,
          renderer: canvasRenderer,
        })
      }
      onEachFeature={onEachJunction}
    />
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
    <MapContainer
      bounds={toLatLngBounds(JAPAN_BOUNDS)}
      className="h-full w-full"
      zoomControl={false}
      preferCanvas
      renderer={canvasRenderer}
    >
      <ZoomControl position="bottomright" />
      <TileLayer url={TILE_URL(dark)} attribution={ATTRIBUTION} />
      {lines && <LinesLayer data={lines} />}
      {junctions && <JunctionsLayer data={junctions} />}
      <FitBounds bounds={flyToBounds} />
    </MapContainer>
  );
}
