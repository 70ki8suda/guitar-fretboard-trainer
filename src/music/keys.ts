export const keyIds = [
  "C",
  "C#",
  "Db",
  "D",
  "D#",
  "Eb",
  "E",
  "F",
  "F#",
  "Gb",
  "G",
  "G#",
  "Ab",
  "A",
  "A#",
  "Bb",
  "B",
] as const;

export type KeyId = (typeof keyIds)[number];

export type AccidentalPolicy = "sharp" | "flat" | "natural";

export type SelectedKey = {
  id: KeyId;
  tonicPitchClass: number;
  accidentalPolicy: AccidentalPolicy;
};

const keyMap: Record<KeyId, SelectedKey> = {
  C: { id: "C", tonicPitchClass: 0, accidentalPolicy: "natural" },
  "C#": { id: "C#", tonicPitchClass: 1, accidentalPolicy: "sharp" },
  Db: { id: "Db", tonicPitchClass: 1, accidentalPolicy: "flat" },
  D: { id: "D", tonicPitchClass: 2, accidentalPolicy: "sharp" },
  "D#": { id: "D#", tonicPitchClass: 3, accidentalPolicy: "sharp" },
  Eb: { id: "Eb", tonicPitchClass: 3, accidentalPolicy: "flat" },
  E: { id: "E", tonicPitchClass: 4, accidentalPolicy: "sharp" },
  F: { id: "F", tonicPitchClass: 5, accidentalPolicy: "flat" },
  "F#": { id: "F#", tonicPitchClass: 6, accidentalPolicy: "sharp" },
  Gb: { id: "Gb", tonicPitchClass: 6, accidentalPolicy: "flat" },
  G: { id: "G", tonicPitchClass: 7, accidentalPolicy: "sharp" },
  "G#": { id: "G#", tonicPitchClass: 8, accidentalPolicy: "sharp" },
  Ab: { id: "Ab", tonicPitchClass: 8, accidentalPolicy: "flat" },
  A: { id: "A", tonicPitchClass: 9, accidentalPolicy: "sharp" },
  "A#": { id: "A#", tonicPitchClass: 10, accidentalPolicy: "sharp" },
  Bb: { id: "Bb", tonicPitchClass: 10, accidentalPolicy: "flat" },
  B: { id: "B", tonicPitchClass: 11, accidentalPolicy: "sharp" },
};

export function getSelectedKey(keyId: KeyId | string | null | undefined): SelectedKey {
  if (typeof keyId === "string" && Object.prototype.hasOwnProperty.call(keyMap, keyId)) {
    return keyMap[keyId as KeyId];
  }

  return keyMap.C;
}
