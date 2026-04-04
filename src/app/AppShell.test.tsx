import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppShell } from "./AppShell";

describe("AppShell", () => {
  it("renders the shell with controls, fretboard, legend, and summaries", () => {
    render(<AppShell />);

    const header = screen.getByRole("banner", { name: /app header/i });

    expect(screen.getByRole("heading", { name: /guitar fretboard trainer/i })).toBeTruthy();
    expect(within(header).getByText("Selected key")).toBeTruthy();
    expect(within(header).getByText("Selected scale")).toBeTruthy();
    expect(screen.getByRole("button", { name: /scale tones/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /chord tones/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /both/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Legend", level: 2 })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Fretboard", level: 2 })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Scale summary", level: 2 })).toBeTruthy();
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
});
