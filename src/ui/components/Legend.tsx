import * as stylex from "@stylexjs/stylex";

import { getDegreeColor } from "../../music/colors";
import type { ActiveTone } from "../../music/fretboard";
import { controlStyles } from "../styles/controls.stylex";

type LegendProps = {
  tones: ActiveTone[];
};

export function Legend({ tones }: LegendProps) {
  return (
    <section {...stylex.props(controlStyles.legendCard)} aria-label="Scale legend">
      <div {...stylex.props(controlStyles.legendHeader)}>
        <h2 {...stylex.props(controlStyles.cardTitle)}>Legend</h2>
        <p {...stylex.props(controlStyles.cardBody)}>
          Only the degrees present in the selected scale are shown, ordered by scale degree.
        </p>
      </div>

      <ul {...stylex.props(controlStyles.legendList)}>
        {tones.map((tone) => {
          const color = getDegreeColor(tone.degreeLabel);

          return (
            <li
              key={`${tone.degreeLabel}-${tone.pitchClass}`}
              {...stylex.props(controlStyles.legendItem)}
            >
              <span
                aria-hidden="true"
                {...stylex.props(controlStyles.legendSwatch)}
                style={{ backgroundColor: color.hex }}
              />
              <span {...stylex.props(controlStyles.legendDegree)}>{tone.degreeLabel}</span>
              <span {...stylex.props(controlStyles.legendSolfege)}>{tone.solfegeLabel}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
