import { describe, expect, it } from "vitest";

import { getChordDefinition, getChordTones, type ChordQualityId } from "./chords";
import { getSelectedKey } from "./keys";

describe("getChordDefinition", () => {
  it("falls back to m7 for unsupported quality ids", () => {
    expect(getChordDefinition("broken").id).toBe("m7");
  });

  it("supports the documented seventh chord qualities", () => {
    expect(
      ["maj7", "7", "m7", "mMaj7", "m7b5", "dim7"].map(
        (qualityId) => getChordDefinition(qualityId as ChordQualityId).id,
      ),
    ).toEqual(["maj7", "7", "m7", "mMaj7", "m7b5", "dim7"]);
  });
});

describe("getChordTones", () => {
  it("returns Dm7 chord tones in pitch and role order", () => {
    const tones = getChordTones(getSelectedKey("D"), getChordDefinition("m7"));

    expect(tones.map((tone) => tone.degreeLabel)).toEqual(["1", "b3", "5", "b7"]);
    expect(tones.map((tone) => tone.chordToneRole)).toEqual(["R", "m3", "5", "b7"]);
    expect(tones.map((tone) => tone.pitchClass)).toEqual([2, 5, 9, 0]);
  });

  it("returns diminished seventh chord tones with lowered fifth and seventh", () => {
    const tones = getChordTones(getSelectedKey("B"), getChordDefinition("dim7"));

    expect(tones.map((tone) => tone.degreeLabel)).toEqual(["1", "b3", "#4 / b5", "6"]);
    expect(tones.map((tone) => tone.chordToneRole)).toEqual(["R", "m3", "b5", "bb7"]);
  });
});
