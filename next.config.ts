import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // MapLibre GL creates a real WebGL context tied to its container on mount.
  // React Strict Mode's dev-only double mount/unmount/remount breaks that
  // (observed: the map's vector tile source never progresses past loading
  // its TileJSON metadata after the double-init), so it's disabled here.
  reactStrictMode: false,
};

export default nextConfig;
