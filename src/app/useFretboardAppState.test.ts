import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useFretboardAppState } from "./useFretboardAppState";

describe("useFretboardAppState", () => {
  it("defaults to C major and exposes ordered scale tones for the summary", () => {
    const { result } = renderHook(() => useFretboardAppState());

    expect(result.current.selectedKeyId).toBe("C");
    expect(result.current.selectedScaleId).toBe("major");
    expect(result.current.scaleTones.map((tone) => tone.degreeLabel)).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
    ]);
    expect(result.current.summaryEntries.map((entry) => entry.degreeLabel)).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
    ]);
  });

  it("falls back to defaults for unsupported key and scale inputs", () => {
    const { result } = renderHook(() =>
      useFretboardAppState({
        selectedKeyId: "nope" as never,
        selectedScaleId: "broken" as never,
      }),
    );

    expect(result.current.selectedKeyId).toBe("C");
    expect(result.current.selectedScaleId).toBe("major");
  });

  it("keeps C# and Db as separate key options", () => {
    const { result } = renderHook(() => useFretboardAppState());

    expect(result.current.keyOptions.map((option) => option.value)).toContain("C#");
    expect(result.current.keyOptions.map((option) => option.value)).toContain("Db");
  });

  it("shows only the degrees present in the selected scale", () => {
    const { result } = renderHook(() =>
      useFretboardAppState({
        selectedScaleId: "minorPentatonic",
      }),
    );

    expect(result.current.scaleTones.map((tone) => tone.degreeLabel)).toEqual([
      "1",
      "b3",
      "4",
      "5",
      "b7",
    ]);
    expect(result.current.summaryEntries.map((entry) => entry.degreeLabel)).toEqual([
      "1",
      "b3",
      "4",
      "5",
      "b7",
    ]);
  });

  it("updates derived state immediately when the selected key or scale changes", () => {
    const { result } = renderHook(() => useFretboardAppState());

    act(() => {
      result.current.setSelectedKeyId("Db");
      result.current.setSelectedScaleId("minorPentatonic");
    });

    expect(result.current.selectedKeyId).toBe("Db");
    expect(result.current.selectedScaleId).toBe("minorPentatonic");
    expect(result.current.scaleTones.map((tone) => tone.solfegeLabel)).toEqual([
      "Do",
      "Me",
      "Fa",
      "So",
      "Te",
    ]);
  });

  it("tracks chord overlay selections and exposes chord-role matches in the summary", () => {
    const { result } = renderHook(() => useFretboardAppState());

    act(() => {
      result.current.setSelectedChordRootId("D");
      result.current.setSelectedChordQualityId("m7");
      result.current.setSelectedDisplayMode("both");
    });

    expect(result.current.selectedChordRootId).toBe("D");
    expect(result.current.selectedChordQualityId).toBe("m7");
    expect(result.current.selectedDisplayMode).toBe("both");
    expect(
      result.current.summaryEntries.find((tone) => tone.degreeLabel === "2")?.chordToneRole,
    ).toBe("R");
  });
});
