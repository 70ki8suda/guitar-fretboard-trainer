import { describe, expect, it } from "vitest";
import { getSolfegeLabel } from "./solfege";

describe("getSolfegeLabel", () => {
  it("uses natural-form syllables in natural keys", () => {
    expect(getSolfegeLabel("6", "natural")).toBe("La");
  });

  it("uses flat-form syllables in flat keys", () => {
    expect(getSolfegeLabel("b7", "flat")).toBe("Te");
  });

  it("uses sharp-form syllables in sharp keys", () => {
    expect(getSolfegeLabel("b7", "sharp")).toBe("Li");
  });

  it("maps the documented degree table deterministically", () => {
    expect(getSolfegeLabel("1", "sharp")).toBe("Do");
    expect(getSolfegeLabel("b3", "flat")).toBe("Me");
    expect(getSolfegeLabel("#4 / b5", "sharp")).toBe("Fi");
    expect(getSolfegeLabel("#4 / b5", "flat")).toBe("Se");
  });
});
