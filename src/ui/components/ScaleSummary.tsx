import * as stylex from "@stylexjs/stylex";

import type { ActiveTone } from "../../music/fretboard";
import { controlStyles } from "../styles/controls.stylex";

type ScaleSummaryProps = {
  keyLabel: string;
  scaleLabel: string;
  tones: ActiveTone[];
};

export function ScaleSummary({ keyLabel, scaleLabel, tones }: ScaleSummaryProps) {
  return (
    <section {...stylex.props(controlStyles.summaryCard)} aria-label="Scale summary">
      <div {...stylex.props(controlStyles.legendHeader)}>
        <h2 {...stylex.props(controlStyles.cardTitle)}>Scale summary</h2>
        <p {...stylex.props(controlStyles.cardBody)}>
          {keyLabel} {scaleLabel}
        </p>
      </div>

      <ul {...stylex.props(controlStyles.summaryList)}>
        {tones.map((tone) => (
          <li
            key={`${tone.degreeLabel}-${tone.pitchClass}`}
            {...stylex.props(controlStyles.summaryItem)}
          >
            <span {...stylex.props(controlStyles.summaryTone)}>
              <span {...stylex.props(controlStyles.summaryDegree)}>{tone.degreeLabel}</span>
              <span {...stylex.props(controlStyles.summarySolfege)}>{tone.solfegeLabel}</span>
            </span>
            <span {...stylex.props(controlStyles.summaryMeta)}>{tone.colorToken}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
