import * as stylex from "@stylexjs/stylex";

import { getDegreeColor } from "../../music/colors";
import type { FretPositionDisplay } from "../../music/fretboard";
import type { DisplayMode } from "../../app/useFretboardAppState";
import { fretboardStyles } from "../styles/fretboard.stylex";

type FretMarkerProps = {
  display: FretPositionDisplay;
  displayMode: DisplayMode;
};

function getChordToneAccent(chordToneRole: string | undefined) {
  if (!chordToneRole) {
    return null;
  }

  if (chordToneRole === "R") {
    return {
      border: "#2e8ea3",
      glow: "rgba(46, 142, 163, 0.34)",
      inner: "rgba(46, 142, 163, 0.18)",
    };
  }

  if (chordToneRole === "3" || chordToneRole === "m3") {
    return {
      border: "#d56c25",
      glow: "rgba(213, 108, 37, 0.34)",
      inner: "rgba(213, 108, 37, 0.18)",
    };
  }

  if (chordToneRole === "5" || chordToneRole === "b5") {
    return {
      border: "#a65734",
      glow: "rgba(166, 87, 52, 0.3)",
      inner: "rgba(166, 87, 52, 0.16)",
    };
  }

  return {
    border: "#8e6a3b",
    glow: "rgba(142, 106, 59, 0.28)",
    inner: "rgba(142, 106, 59, 0.16)",
  };
}

export function FretMarker({ display, displayMode }: FretMarkerProps) {
  const hasChordOverlay = display.inChord && display.chordToneRole;
  const showScale = displayMode === "scale" || displayMode === "both";
  const showChord = displayMode === "chord" || displayMode === "both";
  const hasVisibleScale = display.inScale && showScale;
  const hasVisibleChord = hasChordOverlay && showChord;

  if (!display.isValidPosition) {
    return (
      <div {...stylex.props(fretboardStyles.marker, fretboardStyles.inactiveMarker)}>
        <span {...stylex.props(fretboardStyles.markerGhost)}>×</span>
      </div>
    );
  }

  if (!hasVisibleScale && !hasVisibleChord) {
    return (
      <div
        aria-label={`Fret ${display.fret}, inactive`}
        {...stylex.props(fretboardStyles.marker, fretboardStyles.inactiveMarker)}
      >
        <span {...stylex.props(fretboardStyles.markerGhost)}>·</span>
      </div>
    );
  }

  const color = hasVisibleScale ? getDegreeColor(display.degreeLabel ?? "1") : null;
  const chordAccent = hasVisibleChord ? getChordToneAccent(display.chordToneRole) : null;

  return (
    <div
      aria-label={`Fret ${display.fret}, degree ${display.degreeLabel ?? "none"}, ${
        display.solfegeLabel ?? "no scale tone"
      }${hasVisibleChord ? `, chord ${display.chordToneRole}` : ""}`}
      {...stylex.props(fretboardStyles.marker, fretboardStyles.activeMarker)}
      style={{
        backgroundColor: color?.hex ?? "rgba(255, 251, 246, 0.92)",
        borderColor: chordAccent?.border,
        borderWidth: hasVisibleChord ? "2px" : "1px",
        boxShadow: color
          ? `inset 0 0 0 1px ${chordAccent?.inner ?? "rgba(255, 255, 255, 0.18)"}, 0 0 0 1px rgba(255, 255, 255, 0.24), 0 0 18px ${chordAccent?.glow ?? `${color.hex}20`}, 0 14px 30px ${color.hex}26`
          : `inset 0 0 0 1px ${chordAccent?.inner ?? "rgba(32, 24, 17, 0.08)"}, 0 0 0 1px rgba(32, 24, 17, 0.1), 0 0 18px ${chordAccent?.glow ?? "rgba(123, 94, 64, 0.08)"}, 0 12px 24px rgba(123, 94, 64, 0.12)`,
      }}
    >
      <span {...stylex.props(fretboardStyles.markerContent)}>
        <span {...stylex.props(fretboardStyles.markerDegree)}>
          {hasVisibleScale ? display.degreeLabel : "·"}
        </span>
        <span {...stylex.props(fretboardStyles.markerSolfege)}>
          {hasVisibleScale ? display.solfegeLabel : "Chord"}
        </span>
        {hasVisibleChord ? (
          <span {...stylex.props(fretboardStyles.markerChordRole)}>{display.chordToneRole}</span>
        ) : null}
      </span>
    </div>
  );
}
