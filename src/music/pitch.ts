export function normalizePitchClass(pitchClass: number): number {
  return ((pitchClass % 12) + 12) % 12;
}

export function getIntervalFromTonic(tonicPitchClass: number, pitchClass: number): number {
  return normalizePitchClass(pitchClass - tonicPitchClass);
}

export function isSamePitchClass(leftPitchClass: number, rightPitchClass: number): boolean {
  return normalizePitchClass(leftPitchClass) === normalizePitchClass(rightPitchClass);
}

export function isPitchClassAtInterval(
  tonicPitchClass: number,
  pitchClass: number,
  interval: number,
): boolean {
  return getIntervalFromTonic(tonicPitchClass, pitchClass) === normalizePitchClass(interval);
}
