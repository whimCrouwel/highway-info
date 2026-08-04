import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouteLegend } from "./RouteLegend";
import type { MapRoute } from "./types";

const routes: MapRoute[] = [
  { id: "e8", eNumbers: ["E8"], name: "北陸道", colorVar: "--route-e8", path: [], badges: [], directionTags: [] },
  { id: "e18", eNumbers: ["E18"], name: "上信越道", colorVar: "--route-e18", path: [], badges: [], directionTags: [] },
];

describe("RouteLegend", () => {
  it("lists every route's name and E-number", () => {
    render(<RouteLegend routes={routes} activeRouteId={null} onToggle={() => {}} onReset={() => {}} />);
    expect(screen.getByText("北陸道")).toBeInTheDocument();
    expect(screen.getByText("E8")).toBeInTheDocument();
    expect(screen.getByText("上信越道")).toBeInTheDocument();
    expect(screen.getByText("E18")).toBeInTheDocument();
  });

  it("calls onToggle with the route id when a chip is clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<RouteLegend routes={routes} activeRouteId={null} onToggle={onToggle} onReset={() => {}} />);
    await user.click(screen.getByRole("button", { name: /北陸道/ }));
    expect(onToggle).toHaveBeenCalledWith("e8");
  });

  it("marks the active route's chip pressed", () => {
    render(<RouteLegend routes={routes} activeRouteId="e18" onToggle={() => {}} onReset={() => {}} />);
    expect(screen.getByRole("button", { name: /上信越道/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /北陸道/ })).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onReset when the reset link is clicked", async () => {
    const user = userEvent.setup();
    const onReset = vi.fn();
    render(<RouteLegend routes={routes} activeRouteId="e8" onToggle={() => {}} onReset={onReset} />);
    await user.click(screen.getByText("すべて表示に戻す"));
    expect(onReset).toHaveBeenCalled();
  });
});
