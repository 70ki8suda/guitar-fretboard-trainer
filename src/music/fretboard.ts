import { getDegreeColor } from "./colors";
import { normalizePitchClass } from "./pitch";
import type { SelectedKey } from "./keys";
import type { ScaleDefinition } from "./scales";
import { getSolfegeLabel } from "./solfege";

export const STANDARD_TUNING_PITCH_CLASSES = [4, 9, 2, 7, 11, 4] as const;

export const STANDARD_TUNING_STRINGS = [
  { number: 6, pitch: "E" },
  { number: 5, pitch: "A" },
  { number: 4, pitch: "D" },
  { number: 3, pitch: "G" },
  { number: 2, pitch: "B" },
  { number: 1, pitch: "E" },
] as const;

export type ActiveTone = {
  pitchClass: number;
  intervalFromTonic: number;
  degreeLabel: string;
  solfegeLabel: string;
  colorToken: string;
};

export type FretPositionDisplay = {
  stringIndex: number;
  fret: number;
  pitchClass: number;
  isValidPosition: boolean;
  inScale: boolean;
  degreeLabel?: string;
  solfegeLabel?: string;
  colorToken?: string;
  futureTags?: {
    chordTone?: boolean;
  };
};

function getToneFromScale(
  key: SelectedKey,
  scale: ScaleDefinition,
  intervalFromTonic: number,
): ActiveTone | null {
  const degreeIndex = scale.intervals.findIndex(
    (interval) => normalizePitchClass(interval) === normalizePitchClass(intervalFromTonic),
  );

  if (degreeIndex < 0) {
    return null;
  }

  const degreeLabel = scale.degreeLabels[degreeIndex];

  return {
    pitchClass: normalizePitchClass(key.tonicPitchClass + intervalFromTonic),
    intervalFromTonic: normalizePitchClass(intervalFromTonic),
    degreeLabel,
    solfegeLabel: getSolfegeLabel(degreeLabel, key.accidentalPolicy),
    colorToken: getDegreeColor(degreeLabel).token,
  };
}

export function getScaleTones(key: SelectedKey, scale: ScaleDefinition): ActiveTone[] {
  return scale.intervals.map((interval, index) => {
    const degreeLabel = scale.degreeLabels[index];
    return {
      pitchClass: normalizePitchClass(key.tonicPitchClass + interval),
      intervalFromTonic: normalizePitchClass(interval),
      degreeLabel,
      solfegeLabel: getSolfegeLabel(degreeLabel, key.accidentalPolicy),
      colorToken: getDegreeColor(degreeLabel).token,
    };
  });
}

export function getFretPositionDisplay(
  stringIndex: number,
  fret: number,
  key: SelectedKey,
  scale: ScaleDefinition,
): FretPositionDisplay {
  const isValidPosition =
    Number.isInteger(stringIndex) &&
    Number.isInteger(fret) &&
    stringIndex >= 0 &&
    stringIndex < STANDARD_TUNING_PITCH_CLASSES.length &&
    fret >= 0 &&
    fret <= 21;

  if (!isValidPosition) {
    return {
      stringIndex,
      fret,
      pitchClass: -1,
      isValidPosition: false,
      inScale: false,
    };
  }

  const pitchClass = normalizePitchClass(STANDARD_TUNING_PITCH_CLASSES[stringIndex] + fret);
  const intervalFromTonic = normalizePitchClass(pitchClass - key.tonicPitchClass);
  const activeTone = getToneFromScale(key, scale, intervalFromTonic);

  if (!activeTone) {
    return {
      stringIndex,
      fret,
      pitchClass,
      isValidPosition: true,
      inScale: false,
    };
  }

  const degreeIndex = scale.degreeLabels.indexOf(activeTone.degreeLabel);

  return {
    stringIndex,
    fret,
    pitchClass,
    isValidPosition: true,
    inScale: true,
    degreeLabel: activeTone.degreeLabel,
    solfegeLabel: activeTone.solfegeLabel,
    colorToken: activeTone.colorToken,
    futureTags: {
      chordTone: scale.chordToneMask[degreeIndex] ?? false,
    },
  };
}

export { getSelectedKey } from "./keys";
export { getScaleDefinition } from "./scales";
