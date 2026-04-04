import { describe, expect, it } from "vitest";
import { getSolfegeLabel } from "./solfege";

describe("getSolfegeLabel", () => {
  it("uses natural-form syllables in natural keys", () => {
    expect(getSolfegeLabel("6", "natural")).toBe("La");
  });

  it("uses flat-form syllables for lowered scale degrees", () => {
    expect(getSolfegeLabel("b7", "flat")).toBe("Te");
    expect(getSolfegeLabel("b7", "sharp")).toBe("Te");
    expect(getSolfegeLabel("b3", "natural")).toBe("Me");
    expect(getSolfegeLabel("b6", "sharp")).toBe("Le");
  });

  it("maps the documented degree table deterministically", () => {
    expect(getSolfegeLabel("1", "sharp")).toBe("Do");
    expect(getSolfegeLabel("b3", "flat")).toBe("Me");
    expect(getSolfegeLabel("#4 / b5", "sharp")).toBe("Fi");
    expect(getSolfegeLabel("#4 / b5", "flat")).toBe("Se");
  });
});
