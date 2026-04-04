import * as stylex from "@stylexjs/stylex";

import { getDegreeColor } from "../../music/colors";
import type { FretPositionDisplay } from "../../music/fretboard";
import { fretboardStyles } from "../styles/fretboard.stylex";

type FretMarkerProps = {
  display: FretPositionDisplay;
};

export function FretMarker({ display }: FretMarkerProps) {
  if (!display.isValidPosition) {
    return (
      <div {...stylex.props(fretboardStyles.marker, fretboardStyles.inactiveMarker)}>
        <span {...stylex.props(fretboardStyles.markerGhost)}>×</span>
      </div>
    );
  }

  if (!display.inScale) {
    return (
      <div
        aria-label={`Fret ${display.fret}, inactive`}
        {...stylex.props(fretboardStyles.marker, fretboardStyles.inactiveMarker)}
      >
        <span {...stylex.props(fretboardStyles.markerGhost)}>·</span>
      </div>
    );
  }

  const color = getDegreeColor(display.degreeLabel ?? "1");

  return (
    <div
      aria-label={`Fret ${display.fret}, degree ${display.degreeLabel}, ${display.solfegeLabel}`}
      {...stylex.props(fretboardStyles.marker, fretboardStyles.activeMarker)}
      style={{
        backgroundColor: color.hex,
        boxShadow: `0 0 0 1px rgba(255, 255, 255, 0.24), 0 14px 30px ${color.hex}26`,
      }}
    >
      <span {...stylex.props(fretboardStyles.markerContent)}>
        <span {...stylex.props(fretboardStyles.markerDegree)}>{display.degreeLabel}</span>
        <span {...stylex.props(fretboardStyles.markerSolfege)}>{display.solfegeLabel}</span>
      </span>
    </div>
  );
}
