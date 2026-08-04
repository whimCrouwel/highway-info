import { describe, it, expect } from "vitest";
import { area03Nodes, area03Routes, area03NodesById } from "./area03";

describe("area03 schematic data", () => {
  it("has no duplicate node ids", () => {
    const ids = area03Nodes.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("indexes every node in area03NodesById", () => {
    for (const node of area03Nodes) {
      expect(area03NodesById[node.id]).toBe(node);
    }
  });

  it("has no duplicate route ids", () => {
    const ids = area03Routes.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every route's path references real nodes", () => {
    for (const route of area03Routes) {
      for (const nodeId of route.path) {
        expect(area03NodesById[nodeId], `${route.id} references missing node ${nodeId}`).toBeDefined();
      }
    }
  });

  it("every node's routeIds reference real routes", () => {
    const routeIds = new Set(area03Routes.map((r) => r.id));
    for (const node of area03Nodes) {
      for (const routeId of node.routeIds) {
        expect(routeIds.has(routeId), `${node.id} references missing route ${routeId}`).toBe(true);
      }
    }
  });

  it("JCT and endpoint nodes have real place names", () => {
    for (const node of area03Nodes) {
      if (node.type === "jct" || node.type === "endpoint") {
        expect(node.name.length).toBeGreaterThan(0);
      }
    }
  });
});
