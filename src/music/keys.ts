export const keyIds = [
  'C',
  'C#',
  'Db',
  'D',
  'D#',
  'Eb',
  'E',
  'F',
  'F#',
  'Gb',
  'G',
  'G#',
  'Ab',
  'A',
  'A#',
  'Bb',
  'B',
] as const

export type KeyId = (typeof keyIds)[number]

export type AccidentalPolicy = 'sharp' | 'flat' | 'natural'

export type SelectedKey = {
  id: KeyId
  accidentalPolicy: AccidentalPolicy
}

const keyMap: Record<KeyId, SelectedKey> = {
  C: { id: 'C', accidentalPolicy: 'natural' },
  'C#': { id: 'C#', accidentalPolicy: 'sharp' },
  Db: { id: 'Db', accidentalPolicy: 'flat' },
  D: { id: 'D', accidentalPolicy: 'sharp' },
  'D#': { id: 'D#', accidentalPolicy: 'sharp' },
  Eb: { id: 'Eb', accidentalPolicy: 'flat' },
  E: { id: 'E', accidentalPolicy: 'sharp' },
  F: { id: 'F', accidentalPolicy: 'flat' },
  'F#': { id: 'F#', accidentalPolicy: 'sharp' },
  Gb: { id: 'Gb', accidentalPolicy: 'flat' },
  G: { id: 'G', accidentalPolicy: 'sharp' },
  'G#': { id: 'G#', accidentalPolicy: 'sharp' },
  Ab: { id: 'Ab', accidentalPolicy: 'flat' },
  A: { id: 'A', accidentalPolicy: 'sharp' },
  'A#': { id: 'A#', accidentalPolicy: 'sharp' },
  Bb: { id: 'Bb', accidentalPolicy: 'flat' },
  B: { id: 'B', accidentalPolicy: 'sharp' },
}

export function getSelectedKey(keyId: KeyId | string | null | undefined): SelectedKey {
  if (typeof keyId === 'string' && keyId in keyMap) {
    return keyMap[keyId as KeyId]
  }

  return keyMap.C
}
