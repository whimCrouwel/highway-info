import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouteLine } from "./RouteLine";
import type { MapNode, MapRoute } from "./types";

const nodesById: Record<string, MapNode> = {
  a: { id: "a", name: "A JCT", type: "jct", x: 0, y: 0, routeIds: ["r1"] },
  b: { id: "b", name: "B JCT", type: "jct", x: 100, y: 0, routeIds: ["r1"] },
};

const singleBadgeRoute: MapRoute = {
  id: "r1",
  eNumbers: ["E1"],
  name: "テスト道",
  colorVar: "--route-e8",
  path: ["a", "b"],
  badges: [{ x: 40, y: 0 }],
  directionTags: [],
};

const sharedBadgeRoute: MapRoute = { ...singleBadgeRoute, id: "r2", eNumbers: ["E1", "C1"] };

function renderInSvg(ui: React.ReactElement) {
  return render(<svg>{ui}</svg>);
}

describe("RouteLine", () => {
  it("renders one badge per E-number at a shared anchor point", () => {
    renderInSvg(
      <RouteLine route={sharedBadgeRoute} nodesById={nodesById} isDimmed={false} onSelect={() => {}} />
    );
    expect(screen.getByText("E1")).toBeInTheDocument();
    expect(screen.getByText("C1")).toBeInTheDocument();
  });

  it("calls onSelect with the route id when the line is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderInSvg(<RouteLine route={singleBadgeRoute} nodesById={nodesById} isDimmed={false} onSelect={onSelect} />);
    await user.click(screen.getByTestId("route-hit-r1"));
    expect(onSelect).toHaveBeenCalledWith("r1");
  });

  it("applies the dim style when isDimmed is true", () => {
    renderInSvg(<RouteLine route={singleBadgeRoute} nodesById={nodesById} isDimmed onSelect={() => {}} />);
    expect(screen.getByTestId("route-path-r1")).toHaveClass("opacity-25");
  });

  it("does not apply the dim style when isDimmed is false", () => {
    renderInSvg(<RouteLine route={singleBadgeRoute} nodesById={nodesById} isDimmed={false} onSelect={() => {}} />);
    expect(screen.getByTestId("route-path-r1")).not.toHaveClass("opacity-25");
  });
});
