import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OverviewMap } from "./OverviewMap";

describe("OverviewMap", () => {
  it("always shows JCT and endpoint labels", () => {
    render(<OverviewMap />);
    expect(screen.getByText("更埴JCT")).toBeInTheDocument();
    expect(screen.getByText("上越JCT")).toBeInTheDocument();
  });

  it("hides IC labels until the node is clicked", async () => {
    const user = userEvent.setup();
    render(<OverviewMap />);
    expect(screen.queryByText("妙高高原IC")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /妙高高原IC/ }));
    expect(await screen.findByText("妙高高原IC")).toBeInTheDocument();
  });

  it("dims other routes when one route is selected from the legend", async () => {
    const user = userEvent.setup();
    render(<OverviewMap />);
    await user.click(screen.getByRole("button", { name: /北陸道/ }));
    expect(screen.getByTestId("route-path-e8")).not.toHaveClass("opacity-25");
    expect(screen.getByTestId("route-path-e18")).toHaveClass("opacity-25");
  });

  it("clears the highlight when 'すべて表示に戻す' is clicked", async () => {
    const user = userEvent.setup();
    render(<OverviewMap />);
    await user.click(screen.getByRole("button", { name: /北陸道/ }));
    await user.click(screen.getByText("すべて表示に戻す"));
    expect(screen.getByTestId("route-path-e18")).not.toHaveClass("opacity-25");
  });
});
