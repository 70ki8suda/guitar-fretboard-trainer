import { describe, expect, it } from "vitest";
import { getScaleDefinition } from "./scales";

describe("getScaleDefinition", () => {
  it("defines all four v1 scales exactly", () => {
    expect(getScaleDefinition("major")).toMatchObject({
      intervals: [0, 2, 4, 5, 7, 9, 11],
      degreeLabels: ["1", "2", "3", "4", "5", "6", "7"],
      chordToneMask: [true, false, true, false, true, false, true],
    });
    expect(getScaleDefinition("naturalMinor")).toMatchObject({
      intervals: [0, 2, 3, 5, 7, 8, 10],
      degreeLabels: ["1", "2", "b3", "4", "5", "b6", "b7"],
      chordToneMask: [true, false, true, false, true, false, true],
    });
    expect(getScaleDefinition("majorPentatonic")).toMatchObject({
      intervals: [0, 2, 4, 7, 9],
      degreeLabels: ["1", "2", "3", "5", "6"],
      chordToneMask: [true, false, true, true, false],
    });
    expect(getScaleDefinition("minorPentatonic")).toMatchObject({
      intervals: [0, 3, 5, 7, 10],
      degreeLabels: ["1", "b3", "4", "5", "b7"],
      chordToneMask: [true, true, false, true, false],
    });
  });

  it("defines minor pentatonic intervals and chordToneMask in interval order", () => {
    expect(getScaleDefinition("minorPentatonic")).toMatchObject({
      intervals: [0, 3, 5, 7, 10],
      degreeLabels: ["1", "b3", "4", "5", "b7"],
      chordToneMask: [true, true, false, true, false],
    });
  });

  it("keeps chordToneMask aligned with intervals and degree labels", () => {
    (["major", "naturalMinor", "majorPentatonic", "minorPentatonic"] as const).forEach(
      (scaleId) => {
        const scale = getScaleDefinition(scaleId);
        expect(scale.chordToneMask).toHaveLength(scale.intervals.length);
        expect(scale.degreeLabels).toHaveLength(scale.intervals.length);
      },
    );
  });

  it("falls back to major for invalid serialized scale input", () => {
    expect(getScaleDefinition("not-a-scale" as never)).toMatchObject({
      id: "major",
      intervals: [0, 2, 4, 5, 7, 9, 11],
      degreeLabels: ["1", "2", "3", "4", "5", "6", "7"],
      chordToneMask: [true, false, true, false, true, false, true],
    });
  });

  it("falls back to major for prototype-shaped values", () => {
    expect(getScaleDefinition("constructor" as never)).toMatchObject({
      id: "major",
      intervals: [0, 2, 4, 5, 7, 9, 11],
      degreeLabels: ["1", "2", "3", "4", "5", "6", "7"],
      chordToneMask: [true, false, true, false, true, false, true],
    });
    expect(getScaleDefinition("toString" as never)).toMatchObject({
      id: "major",
      intervals: [0, 2, 4, 5, 7, 9, 11],
      degreeLabels: ["1", "2", "3", "4", "5", "6", "7"],
      chordToneMask: [true, false, true, false, true, false, true],
    });
  });
});
