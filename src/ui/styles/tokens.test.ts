import { describe, expect, it } from "vitest";

import { lightThemeTokens } from "./tokens.stylex";

describe("lightThemeTokens", () => {
  it("exposes the nodex-inspired solar-light token base", () => {
    expect(lightThemeTokens).toMatchObject({
      fontBody: '"Space Grotesk", "Trebuchet MS", sans-serif',
      fontMono: '"IBM Plex Mono", monospace',
      surfaceCanvas: "#f1e5d5",
      accentCyan: "#2e8ea3",
      accentAmber: "#d56c25",
    });
  });
});
