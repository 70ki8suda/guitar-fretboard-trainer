import { describe, expect, it } from "vitest";
import { getFretPositionDisplay, getScaleTones } from "./fretboard";
import { getChordDefinition, getChordRoot } from "./chords";
import { getSelectedKey } from "./keys";
import { getScaleDefinition } from "./scales";

describe("getScaleTones", () => {
  it("returns active tones ordered by scale degree", () => {
    expect(
      getScaleTones(getSelectedKey("C"), getScaleDefinition("major")).map(
        (tone) => tone.degreeLabel,
      ),
    ).toEqual(["1", "2", "3", "4", "5", "6", "7"]);
  });
});

describe("getFretPositionDisplay", () => {
  it("returns degree and movable-do for in-scale positions", () => {
    const result = getFretPositionDisplay(0, 0, getSelectedKey("E"), getScaleDefinition("major"));
    expect(result).toMatchObject({
      isValidPosition: true,
      inScale: true,
      degreeLabel: "1",
      solfegeLabel: "Do",
    });
  });

  it("returns invalid shape for out-of-range fret", () => {
    const result = getFretPositionDisplay(0, 22, getSelectedKey("C"), getScaleDefinition("major"));
    expect(result).toMatchObject({
      isValidPosition: false,
      inScale: false,
    });
    expect(result).not.toHaveProperty("degreeLabel");
    expect(result).not.toHaveProperty("solfegeLabel");
    expect(result).not.toHaveProperty("colorToken");
    expect(result).not.toHaveProperty("futureTags");
  });

  it("returns invalid shape for out-of-range string index", () => {
    const result = getFretPositionDisplay(6, 0, getSelectedKey("C"), getScaleDefinition("major"));
    expect(result).toMatchObject({
      isValidPosition: false,
      inScale: false,
    });
    expect(result).not.toHaveProperty("degreeLabel");
    expect(result).not.toHaveProperty("solfegeLabel");
    expect(result).not.toHaveProperty("colorToken");
    expect(result).not.toHaveProperty("futureTags");
  });

  it("uses the documented standard tuning order", () => {
    expect(
      getFretPositionDisplay(5, 0, getSelectedKey("E"), getScaleDefinition("major")).pitchClass,
    ).toBe(4);
  });

  it("returns color and futureTags for active tones", () => {
    const result = getFretPositionDisplay(0, 0, getSelectedKey("E"), getScaleDefinition("major"));
    expect(result.colorToken).toBe("degreeRoot");
    expect(result.futureTags).toEqual({ chordTone: true });
  });

  it("merges scale and chord overlays for C major pentatonic with Dm7", () => {
    const dTone = getFretPositionDisplay(
      3,
      7,
      getSelectedKey("C"),
      getScaleDefinition("majorPentatonic"),
      getChordRoot("D"),
      getChordDefinition("m7"),
    );
    const fTone = getFretPositionDisplay(
      2,
      3,
      getSelectedKey("C"),
      getScaleDefinition("majorPentatonic"),
      getChordRoot("D"),
      getChordDefinition("m7"),
    );

    expect(dTone).toMatchObject({
      inScale: true,
      degreeLabel: "2",
      inChord: true,
      chordToneRole: "R",
      isOverlayTone: true,
    });
    expect(fTone).toMatchObject({
      inScale: false,
      inChord: true,
      chordToneRole: "m3",
      isOverlayTone: true,
    });
  });
});
