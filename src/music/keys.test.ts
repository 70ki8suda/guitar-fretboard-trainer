import { describe, expect, it } from 'vitest'
import { getSelectedKey } from './keys'

describe('getSelectedKey', () => {
  it('matches the exact v1 key whitelist and policies', () => {
    expect(
      [
        ['C', 'natural'],
        ['C#', 'sharp'],
        ['Db', 'flat'],
        ['D', 'sharp'],
        ['D#', 'sharp'],
        ['Eb', 'flat'],
        ['E', 'sharp'],
        ['F', 'flat'],
        ['F#', 'sharp'],
        ['Gb', 'flat'],
        ['G', 'sharp'],
        ['G#', 'sharp'],
        ['Ab', 'flat'],
        ['A', 'sharp'],
        ['A#', 'sharp'],
        ['Bb', 'flat'],
        ['B', 'sharp'],
      ].map(([keyId]) => getSelectedKey(keyId as never)),
    ).toMatchObject([
      { id: 'C', accidentalPolicy: 'natural' },
      { id: 'C#', accidentalPolicy: 'sharp' },
      { id: 'Db', accidentalPolicy: 'flat' },
      { id: 'D', accidentalPolicy: 'sharp' },
      { id: 'D#', accidentalPolicy: 'sharp' },
      { id: 'Eb', accidentalPolicy: 'flat' },
      { id: 'E', accidentalPolicy: 'sharp' },
      { id: 'F', accidentalPolicy: 'flat' },
      { id: 'F#', accidentalPolicy: 'sharp' },
      { id: 'Gb', accidentalPolicy: 'flat' },
      { id: 'G', accidentalPolicy: 'sharp' },
      { id: 'G#', accidentalPolicy: 'sharp' },
      { id: 'Ab', accidentalPolicy: 'flat' },
      { id: 'A', accidentalPolicy: 'sharp' },
      { id: 'A#', accidentalPolicy: 'sharp' },
      { id: 'Bb', accidentalPolicy: 'flat' },
      { id: 'B', accidentalPolicy: 'sharp' },
    ])
  })

  it('keeps C# and Db as separate keys with different policies', () => {
    expect(getSelectedKey('C#').accidentalPolicy).toBe('sharp')
    expect(getSelectedKey('Db').accidentalPolicy).toBe('flat')
  })

  it('falls back to C for unsupported values', () => {
    expect(getSelectedKey('nope' as never).id).toBe('C')
  })
})
