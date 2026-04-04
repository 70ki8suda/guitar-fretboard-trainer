import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppShell } from "./AppShell";

describe("AppShell", () => {
  it("renders the shell with controls, fretboard, legend, and summaries", () => {
    render(<AppShell />);

    expect(screen.getByRole("banner", { name: /app header/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /guitar fretboard trainer/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /scale tones/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /chord tones/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /both/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Legend", level: 2 })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Fretboard", level: 2 })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Scale summary", level: 2 })).toBeTruthy();
  });

  it("prioritizes the fretboard in a single-column flow", () => {
    render(<AppShell />);

    const headings = Array.from(
      new Set(screen.getAllByRole("heading", { level: 2 }).map((element) => element.textContent)),
    );

    expect(headings).toEqual(["Key and scale", "Fretboard", "Legend", "Scale summary"]);
  });

  it("updates the selected key and scale in visible output immediately", () => {
    render(<AppShell />);

    fireEvent.click(screen.getAllByTestId("key-select")[0] as HTMLElement);
    fireEvent.click(screen.getByRole("option", { name: "Db" }));
    fireEvent.click(screen.getAllByTestId("scale-select")[0] as HTMLElement);
    fireEvent.click(screen.getByRole("option", { name: /minor pentatonic/i }));

    expect(screen.getAllByText("Db").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Minor Pentatonic").length).toBeGreaterThan(0);
  });

  it("renders the fretboard with the first string above the sixth string", () => {
    render(<AppShell />);

    const stringLabels = screen
      .getAllByText(/^String [1-6]$/)
      .map((element) => element.textContent);

    expect(stringLabels.slice(0, 6)).toEqual([
      "String 1",
      "String 2",
      "String 3",
      "String 4",
      "String 5",
      "String 6",
    ]);
  });
});
