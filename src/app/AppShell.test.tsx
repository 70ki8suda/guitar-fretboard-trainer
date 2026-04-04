import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppShell } from "./AppShell";

describe("AppShell", () => {
  it("renders the shell with controls, fretboard, legend, and summaries", () => {
    render(<AppShell />);

    expect(screen.getByRole("heading", { name: /guitar fretboard trainer/i })).toBeTruthy();
    expect(screen.getByText("Selected key")).toBeTruthy();
    expect(screen.getByText("Selected scale")).toBeTruthy();
    expect(screen.getByRole("button", { name: /scale tones/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /chord tones/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /both/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Legend", level: 2 })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Fretboard", level: 2 })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Scale summary", level: 2 })).toBeTruthy();
  });

  it("updates the selected key and scale in visible output immediately", () => {
    const { container } = render(<AppShell />);

    fireEvent.change(container.querySelector("#key-select") as HTMLSelectElement, {
      target: { value: "Db" },
    });
    fireEvent.change(container.querySelector("#scale-select") as HTMLSelectElement, {
      target: { value: "minorPentatonic" },
    });

    expect(screen.getAllByText("Db Minor Pentatonic").length).toBeGreaterThan(0);
  });
});
