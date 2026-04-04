import * as stylex from "@stylexjs/stylex";

import {
  getFretPositionDisplay,
  STANDARD_TUNING_STRINGS,
  type SelectedKey,
  type ScaleDefinition,
} from "../../music";
import { fretboardStyles } from "../styles/fretboard.stylex";
import { FretMarker } from "./FretMarker";

type FretboardProps = {
  selectedKey: SelectedKey;
  selectedScale: ScaleDefinition;
};

const fretNumbers = Array.from({ length: 22 }, (_, index) => index);

export function Fretboard({ selectedKey, selectedScale }: FretboardProps) {
  return (
    <section {...stylex.props(fretboardStyles.panel)} aria-label="Fretboard panel">
      <header {...stylex.props(fretboardStyles.panelHeader)}>
        <h2 {...stylex.props(fretboardStyles.panelTitle)}>Fretboard</h2>
        <p {...stylex.props(fretboardStyles.panelBody)}>
          Standard tuning, strings low to high, frets 0 to 21.
        </p>
      </header>

      <div {...stylex.props(fretboardStyles.boardWrap)}>
        <div {...stylex.props(fretboardStyles.board)}>
          <div {...stylex.props(fretboardStyles.fretHeaderRow)}>
            <div {...stylex.props(fretboardStyles.fretHeaderSpacer)} />
            {fretNumbers.map((fret) => (
              <div key={fret} {...stylex.props(fretboardStyles.fretHeader)}>
                {fret}
              </div>
            ))}
          </div>

          {STANDARD_TUNING_STRINGS.map((label, stringIndex) => {
            return (
              <div key={label.number} {...stylex.props(fretboardStyles.stringRow)}>
                <div {...stylex.props(fretboardStyles.stringLabel)}>
                  <span {...stylex.props(fretboardStyles.stringNumber)}>String {label.number}</span>
                  <span {...stylex.props(fretboardStyles.stringPitch)}>{label.pitch}</span>
                </div>
                {fretNumbers.map((fret) => (
                  <div key={`${stringIndex}-${fret}`} {...stylex.props(fretboardStyles.cell)}>
                    <FretMarker
                      display={getFretPositionDisplay(
                        stringIndex,
                        fret,
                        selectedKey,
                        selectedScale,
                      )}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
