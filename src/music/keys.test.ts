import { describe, expect, it } from "vitest";
import { getSelectedKey } from "./keys";

describe("getSelectedKey", () => {
  it("matches the exact v1 key whitelist and policies", () => {
    expect(
      [
        ["C", "natural"],
        ["C#", "sharp"],
        ["Db", "flat"],
        ["D", "sharp"],
        ["D#", "sharp"],
        ["Eb", "flat"],
        ["E", "sharp"],
        ["F", "flat"],
        ["F#", "sharp"],
        ["Gb", "flat"],
        ["G", "sharp"],
        ["G#", "sharp"],
        ["Ab", "flat"],
        ["A", "sharp"],
        ["A#", "sharp"],
        ["Bb", "flat"],
        ["B", "sharp"],
      ].map(([keyId]) => getSelectedKey(keyId as never)),
    ).toMatchObject([
      { id: "C", tonicPitchClass: 0, accidentalPolicy: "natural" },
      { id: "C#", tonicPitchClass: 1, accidentalPolicy: "sharp" },
      { id: "Db", tonicPitchClass: 1, accidentalPolicy: "flat" },
      { id: "D", tonicPitchClass: 2, accidentalPolicy: "sharp" },
      { id: "D#", tonicPitchClass: 3, accidentalPolicy: "sharp" },
      { id: "Eb", tonicPitchClass: 3, accidentalPolicy: "flat" },
      { id: "E", tonicPitchClass: 4, accidentalPolicy: "sharp" },
      { id: "F", tonicPitchClass: 5, accidentalPolicy: "flat" },
      { id: "F#", tonicPitchClass: 6, accidentalPolicy: "sharp" },
      { id: "Gb", tonicPitchClass: 6, accidentalPolicy: "flat" },
      { id: "G", tonicPitchClass: 7, accidentalPolicy: "sharp" },
      { id: "G#", tonicPitchClass: 8, accidentalPolicy: "sharp" },
      { id: "Ab", tonicPitchClass: 8, accidentalPolicy: "flat" },
      { id: "A", tonicPitchClass: 9, accidentalPolicy: "sharp" },
      { id: "A#", tonicPitchClass: 10, accidentalPolicy: "sharp" },
      { id: "Bb", tonicPitchClass: 10, accidentalPolicy: "flat" },
      { id: "B", tonicPitchClass: 11, accidentalPolicy: "sharp" },
    ]);
  });

  it("keeps C# and Db as separate keys with different policies", () => {
    expect(getSelectedKey("C#")).toMatchObject({
      id: "C#",
      tonicPitchClass: 1,
      accidentalPolicy: "sharp",
    });
    expect(getSelectedKey("Db")).toMatchObject({
      id: "Db",
      tonicPitchClass: 1,
      accidentalPolicy: "flat",
    });
  });

  it("falls back to C for unsupported values", () => {
    expect(getSelectedKey("nope" as never).id).toBe("C");
  });

  it("falls back to C for prototype-shaped values", () => {
    expect(getSelectedKey("constructor" as never)).toMatchObject({
      id: "C",
      tonicPitchClass: 0,
      accidentalPolicy: "natural",
    });
    expect(getSelectedKey("toString" as never)).toMatchObject({
      id: "C",
      tonicPitchClass: 0,
      accidentalPolicy: "natural",
    });
  });
});
