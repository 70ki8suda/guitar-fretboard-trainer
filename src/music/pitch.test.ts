import { describe, expect, it } from "vitest";
import {
  getIntervalFromTonic,
  isPitchClassAtInterval,
  isSamePitchClass,
  normalizePitchClass,
} from "./pitch";

describe("pitch helpers", () => {
  it("normalizes pitch classes into the 0-11 range", () => {
    expect(normalizePitchClass(-1)).toBe(11);
    expect(normalizePitchClass(13)).toBe(1);
  });

  it("computes the interval from tonic to pitch class", () => {
    expect(getIntervalFromTonic(4, 8)).toBe(4);
  });

  it("compares pitch classes across octaves", () => {
    expect(isSamePitchClass(1, 13)).toBe(true);
    expect(isSamePitchClass(1, 14)).toBe(false);
  });

  it("matches a pitch class to an interval from tonic", () => {
    expect(isPitchClassAtInterval(4, 8, 4)).toBe(true);
    expect(isPitchClassAtInterval(4, 9, 4)).toBe(false);
  });
});
