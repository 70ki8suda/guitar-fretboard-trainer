export const scaleIds = ['major', 'naturalMinor', 'majorPentatonic', 'minorPentatonic'] as const

export type ScaleId = (typeof scaleIds)[number]

export type ScaleDefinition = {
  id: ScaleId
  intervals: readonly number[]
  degreeLabels: readonly string[]
  chordToneMask: readonly boolean[]
}

const scaleMap: Record<ScaleId, ScaleDefinition> = {
  major: {
    id: 'major',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    degreeLabels: ['1', '2', '3', '4', '5', '6', '7'],
    chordToneMask: [true, false, true, false, true, false, true],
  },
  naturalMinor: {
    id: 'naturalMinor',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    degreeLabels: ['1', '2', 'b3', '4', '5', 'b6', 'b7'],
    chordToneMask: [true, false, true, false, true, false, true],
  },
  majorPentatonic: {
    id: 'majorPentatonic',
    intervals: [0, 2, 4, 7, 9],
    degreeLabels: ['1', '2', '3', '5', '6'],
    chordToneMask: [true, false, true, true, false],
  },
  minorPentatonic: {
    id: 'minorPentatonic',
    intervals: [0, 3, 5, 7, 10],
    degreeLabels: ['1', 'b3', '4', '5', 'b7'],
    chordToneMask: [true, true, false, true, false],
  },
}

export function getScaleDefinition(scaleId: ScaleId): ScaleDefinition {
  return scaleMap[scaleId]
}
