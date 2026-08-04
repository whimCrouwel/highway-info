import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRouteHighlight } from "./useRouteHighlight";

describe("useRouteHighlight", () => {
  it("starts with no active route and nothing dimmed", () => {
    const { result } = renderHook(() => useRouteHighlight());
    expect(result.current.activeRouteId).toBeNull();
    expect(result.current.isDimmed("e8")).toBe(false);
  });

  it("toggling a route makes it active and dims the others", () => {
    const { result } = renderHook(() => useRouteHighlight());
    act(() => result.current.toggleRoute("e8"));
    expect(result.current.activeRouteId).toBe("e8");
    expect(result.current.isDimmed("e8")).toBe(false);
    expect(result.current.isDimmed("e18")).toBe(true);
  });

  it("toggling the same route again clears the highlight", () => {
    const { result } = renderHook(() => useRouteHighlight());
    act(() => result.current.toggleRoute("e8"));
    act(() => result.current.toggleRoute("e8"));
    expect(result.current.activeRouteId).toBeNull();
    expect(result.current.isDimmed("e18")).toBe(false);
  });

  it("toggling a different route switches the highlight", () => {
    const { result } = renderHook(() => useRouteHighlight());
    act(() => result.current.toggleRoute("e8"));
    act(() => result.current.toggleRoute("e18"));
    expect(result.current.activeRouteId).toBe("e18");
    expect(result.current.isDimmed("e8")).toBe(true);
  });

  it("reset clears the highlight", () => {
    const { result } = renderHook(() => useRouteHighlight());
    act(() => result.current.toggleRoute("e8"));
    act(() => result.current.reset());
    expect(result.current.activeRouteId).toBeNull();
  });
});
