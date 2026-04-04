import { describe, expect, it } from 'vitest'
import { getDegreeColor } from './colors'

describe('getDegreeColor', () => {
  it('matches the full normative v1 palette', () => {
    expect(
      [
        '1',
        'b2 / #1',
        '2',
        'b3 / #2',
        '3',
        '4',
        '#4 / b5',
        '5',
        'b6 / #5',
        '6',
        'b7',
        '7',
      ].map((degree) => getDegreeColor(degree as never)),
    ).toEqual([
      { token: 'degreeRoot', hex: '#D94A4A' },
      { token: 'degreeFlat2', hex: '#D97A3A' },
      { token: 'degree2', hex: '#E0A43A' },
      { token: 'degreeFlat3', hex: '#C9A227' },
      { token: 'degree3', hex: '#A8B832' },
      { token: 'degree4', hex: '#4FAF5B' },
      { token: 'degreeSharp4', hex: '#2FA7A0' },
      { token: 'degree5', hex: '#3E86D1' },
      { token: 'degreeFlat6', hex: '#5C6FD6' },
      { token: 'degree6', hex: '#7A59C8' },
      { token: 'degreeFlat7', hex: '#B05BCB' },
      { token: 'degree7', hex: '#D45AA0' },
    ])
  })
})
