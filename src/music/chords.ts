import { normalizePitchClass } from "./pitch";
import { getSelectedKey, type KeyId, type SelectedKey } from "./keys";

export const chordQualityIds = ["maj7", "7", "m7", "mMaj7", "m7b5", "dim7"] as const;

export type ChordQualityId = (typeof chordQualityIds)[number];

export type ChordDefinition = {
  id: ChordQualityId;
  intervals: readonly number[];
  degreeLabels: readonly string[];
  roleLabels: readonly string[];
};

export type ChordTone = {
  pitchClass: number;
  intervalFromRoot: number;
  degreeLabel: string;
  chordToneRole: string;
};

const chordMap: Record<ChordQualityId, ChordDefinition> = {
  maj7: {
    id: "maj7",
    intervals: [0, 4, 7, 11],
    degreeLabels: ["1", "3", "5", "7"],
    roleLabels: ["R", "3", "5", "7"],
  },
  "7": {
    id: "7",
    intervals: [0, 4, 7, 10],
    degreeLabels: ["1", "3", "5", "b7"],
    roleLabels: ["R", "3", "5", "b7"],
  },
  m7: {
    id: "m7",
    intervals: [0, 3, 7, 10],
    degreeLabels: ["1", "b3", "5", "b7"],
    roleLabels: ["R", "m3", "5", "b7"],
  },
  mMaj7: {
    id: "mMaj7",
    intervals: [0, 3, 7, 11],
    degreeLabels: ["1", "b3", "5", "7"],
    roleLabels: ["R", "m3", "5", "7"],
  },
  m7b5: {
    id: "m7b5",
    intervals: [0, 3, 6, 10],
    degreeLabels: ["1", "b3", "#4 / b5", "b7"],
    roleLabels: ["R", "m3", "b5", "b7"],
  },
  dim7: {
    id: "dim7",
    intervals: [0, 3, 6, 9],
    degreeLabels: ["1", "b3", "#4 / b5", "6"],
    roleLabels: ["R", "m3", "b5", "bb7"],
  },
};

export function getChordDefinition(
  chordQualityId: ChordQualityId | string | null | undefined,
): ChordDefinition {
  if (
    typeof chordQualityId === "string" &&
    Object.prototype.hasOwnProperty.call(chordMap, chordQualityId)
  ) {
    return chordMap[chordQualityId as ChordQualityId];
  }

  return chordMap.m7;
}

export function getChordRoot(chordRootId: KeyId | string | null | undefined): SelectedKey {
  return getSelectedKey(chordRootId);
}

export function getChordTones(root: SelectedKey, chordDefinition: ChordDefinition): ChordTone[] {
  return chordDefinition.intervals.map((interval, index) => ({
    pitchClass: normalizePitchClass(root.tonicPitchClass + interval),
    intervalFromRoot: normalizePitchClass(interval),
    degreeLabel: chordDefinition.degreeLabels[index],
    chordToneRole: chordDefinition.roleLabels[index],
  }));
}
