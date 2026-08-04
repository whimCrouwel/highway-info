import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NodeMarker } from "./NodeMarker";
import type { MapNode } from "./types";

const jctNode: MapNode = { id: "n1", name: "更埴JCT", type: "jct", x: 0, y: 0, routeIds: ["e18"] };
const icNode: MapNode = { id: "n2", name: "妙高高原IC", type: "ic", x: 0, y: 0, routeIds: ["e18"] };

function renderInSvg(ui: React.ReactElement) {
  return render(<svg>{ui}</svg>);
}

describe("NodeMarker", () => {
  it("always shows the label for a JCT node", () => {
    renderInSvg(<NodeMarker node={jctNode} />);
    expect(screen.getByText("更埴JCT")).toBeInTheDocument();
  });

  it("does not show the label for an IC node until clicked", () => {
    renderInSvg(<NodeMarker node={icNode} />);
    expect(screen.queryByText("妙高高原IC")).not.toBeInTheDocument();
  });

  it("reveals the IC node's name in a popover on click", async () => {
    const user = userEvent.setup();
    renderInSvg(<NodeMarker node={icNode} />);
    await user.click(screen.getByRole("button", { name: /妙高高原IC/ }));
    expect(await screen.findByText("妙高高原IC")).toBeInTheDocument();
  });
});
