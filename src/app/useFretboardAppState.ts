import { useState } from "react";

import { getSelectedKey, keyIds, type KeyId } from "../music/keys";
import { getScaleDefinition, type ScaleId } from "../music/scales";
import { getScaleTones } from "../music/fretboard";

type AppSelectOption = {
  value: string;
  label: string;
};

type FretboardAppStateOptions = {
  selectedKeyId?: KeyId | string | null;
  selectedScaleId?: ScaleId | string | null;
};

function normalizeKeyId(keyId: KeyId | string | null | undefined): KeyId {
  return getSelectedKey(keyId).id;
}

function normalizeScaleId(scaleId: ScaleId | string | null | undefined): ScaleId {
  return getScaleDefinition(scaleId).id;
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

export function useFretboardAppState(options: FretboardAppStateOptions = {}) {
  const [selectedKeyId, setSelectedKeyIdState] = useState<KeyId>(() =>
    normalizeKeyId(options.selectedKeyId ?? "C"),
  );
  const [selectedScaleId, setSelectedScaleIdState] = useState<ScaleId>(() =>
    normalizeScaleId(options.selectedScaleId ?? "major"),
  );

  const selectedKey = getSelectedKey(selectedKeyId);
  const selectedScale = getScaleDefinition(selectedScaleId);
  const scaleTones = getScaleTones(selectedKey, selectedScale);

  return {
    selectedKeyId,
    selectedScaleId,
    selectedKey,
    selectedScale,
    keyOptions,
    scaleOptions,
    scaleTones,
    legendEntries: scaleTones,
    summaryEntries: scaleTones,
    setSelectedKeyId: (nextKeyId: KeyId | string) => {
      setSelectedKeyIdState(normalizeKeyId(nextKeyId));
    },
    setSelectedScaleId: (nextScaleId: ScaleId | string) => {
      setSelectedScaleIdState(normalizeScaleId(nextScaleId));
    },
  };
}
