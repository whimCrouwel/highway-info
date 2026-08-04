"use client";

import dynamic from "next/dynamic";

export const ExpresswayMap = dynamic(
  () => import("./ExpresswayMapInner").then((m) => m.ExpresswayMapInner),
  { ssr: false }
);
