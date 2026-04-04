import { useState } from "react";

import {
  chordQualityIds,
  getChordDefinition,
  getChordRoot,
  getChordTones,
  type ChordQualityId,
} from "../music/chords";
import { getScaleTones } from "../music/fretboard";
import { getSelectedKey, keyIds, type KeyId } from "../music/keys";
import { getScaleDefinition, type ScaleId } from "../music/scales";

export const displayModes = ["scale", "chord", "both"] as const;
export type DisplayMode = (typeof displayModes)[number];

type AppSelectOption = {
  value: string;
  label: string;
};

type FretboardAppStateOptions = {
  selectedKeyId?: KeyId | string | null;
  selectedScaleId?: ScaleId | string | null;
  selectedChordRootId?: KeyId | string | null;
  selectedChordQualityId?: ChordQualityId | string | null;
  selectedDisplayMode?: DisplayMode | string | null;
};

function normalizeKeyId(keyId: KeyId | string | null | undefined): KeyId {
  return getSelectedKey(keyId).id;
}

function normalizeScaleId(scaleId: ScaleId | string | null | undefined): ScaleId {
  return getScaleDefinition(scaleId).id;
}

function normalizeChordRootId(chordRootId: KeyId | string | null | undefined): KeyId {
  return getChordRoot(chordRootId).id;
}

function normalizeChordQualityId(
  chordQualityId: ChordQualityId | string | null | undefined,
): ChordQualityId {
  return getChordDefinition(chordQualityId).id;
}

function normalizeDisplayMode(displayMode: DisplayMode | string | null | undefined): DisplayMode {
  if (typeof displayMode === "string" && displayModes.includes(displayMode as DisplayMode)) {
    return displayMode as DisplayMode;
  }

  return "both";
}

const keyOptions: AppSelectOption[] = keyIds.map((keyId) => ({
  value: keyId,
  label: keyId,
}));

const scaleOptions: AppSelectOption[] = [
  { value: "major", label: "Major" },
  { value: "naturalMinor", label: "Natural Minor" },
  { value: "majorPentatonic", label: "Major Pentatonic" },
  { value: "minorPentatonic", label: "Minor Pentatonic" },
];

const chordRootOptions: AppSelectOption[] = keyIds.map((keyId) => ({
  value: keyId,
  label: keyId,
}));

const chordQualityOptions: AppSelectOption[] = chordQualityIds.map((qualityId) => ({
  value: qualityId,
  label:
    qualityId === "maj7"
      ? "Maj7"
      : qualityId === "mMaj7"
        ? "mMaj7"
        : qualityId === "m7b5"
          ? "m7b5"
          : qualityId === "dim7"
            ? "dim7"
            : qualityId,
}));

const displayModeOptions: AppSelectOption[] = [
  { value: "scale", label: "Scale" },
  { value: "chord", label: "Chord" },
  { value: "both", label: "Both" },
];

export function useFretboardAppState(options: FretboardAppStateOptions = {}) {
  const [selectedKeyId, setSelectedKeyIdState] = useState<KeyId>(() =>
    normalizeKeyId(options.selectedKeyId ?? "C"),
  );
  const [selectedScaleId, setSelectedScaleIdState] = useState<ScaleId>(() =>
    normalizeScaleId(options.selectedScaleId ?? "major"),
  );
  const [selectedChordRootId, setSelectedChordRootIdState] = useState<KeyId>(() =>
    normalizeChordRootId(options.selectedChordRootId ?? "D"),
  );
  const [selectedChordQualityId, setSelectedChordQualityIdState] = useState<ChordQualityId>(() =>
    normalizeChordQualityId(options.selectedChordQualityId ?? "m7"),
  );
  const [selectedDisplayMode, setSelectedDisplayModeState] = useState<DisplayMode>(() =>
    normalizeDisplayMode(options.selectedDisplayMode ?? "both"),
  );

  const selectedKey = getSelectedKey(selectedKeyId);
  const selectedScale = getScaleDefinition(selectedScaleId);
  const selectedChordRoot = getChordRoot(selectedChordRootId);
  const selectedChordQuality = getChordDefinition(selectedChordQualityId);
  const scaleTones = getScaleTones(selectedKey, selectedScale);
  const chordTones = getChordTones(selectedChordRoot, selectedChordQuality);
  const summaryEntries = scaleTones.map((tone) => ({
    ...tone,
    chordToneRole:
      chordTones.find((chordTone) => chordTone.pitchClass === tone.pitchClass)?.chordToneRole ??
      undefined,
  }));

  return {
    selectedKeyId,
    selectedScaleId,
    selectedChordRootId,
    selectedChordQualityId,
    selectedDisplayMode,
    selectedKey,
    selectedScale,
    selectedChordRoot,
    selectedChordQuality,
    keyOptions,
    scaleOptions,
    chordRootOptions,
    chordQualityOptions,
    displayModeOptions,
    scaleTones,
    chordTones,
    summaryEntries,
    setSelectedKeyId: (nextKeyId: KeyId | string) => {
      setSelectedKeyIdState(normalizeKeyId(nextKeyId));
    },
    setSelectedScaleId: (nextScaleId: ScaleId | string) => {
      setSelectedScaleIdState(normalizeScaleId(nextScaleId));
    },
    setSelectedChordRootId: (nextChordRootId: KeyId | string) => {
      setSelectedChordRootIdState(normalizeChordRootId(nextChordRootId));
    },
    setSelectedChordQualityId: (nextChordQualityId: ChordQualityId | string) => {
      setSelectedChordQualityIdState(normalizeChordQualityId(nextChordQualityId));
    },
    setSelectedDisplayMode: (nextDisplayMode: DisplayMode | string) => {
      setSelectedDisplayModeState(normalizeDisplayMode(nextDisplayMode));
    },
  };
}
