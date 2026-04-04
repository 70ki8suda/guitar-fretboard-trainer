import * as stylex from "@stylexjs/stylex";

import { useFretboardAppState } from "./useFretboardAppState";
import { AppSelect } from "../ui/components/AppSelect";
import { Legend } from "../ui/components/Legend";
import { ScaleSummary } from "../ui/components/ScaleSummary";
import { appShellStyles } from "../ui/styles/appShell.stylex";
import { controlStyles } from "../ui/styles/controls.stylex";
import { Fretboard } from "../ui/components/Fretboard";

function formatScaleLabel(scaleId: string) {
  switch (scaleId) {
    case "major":
      return "Major";
    case "naturalMinor":
      return "Natural Minor";
    case "majorPentatonic":
      return "Major Pentatonic";
    case "minorPentatonic":
      return "Minor Pentatonic";
    default:
      return scaleId;
  }
}

export function AppShell() {
  const {
    selectedKeyId,
    selectedScaleId,
    selectedKey,
    selectedScale,
    keyOptions,
    scaleOptions,
    legendEntries,
    summaryEntries,
    setSelectedKeyId,
    setSelectedScaleId,
  } = useFretboardAppState();

  const selectedScaleLabel = formatScaleLabel(selectedScaleId);

  return (
    <div {...stylex.props(appShellStyles.appShell)}>
      <aside {...stylex.props(appShellStyles.sidebar)}>
        <section {...stylex.props(appShellStyles.glassPanel, appShellStyles.brandCard)}>
          <div {...stylex.props(appShellStyles.brandMark)} aria-hidden="true">
            GF
          </div>
          <div>
            <p {...stylex.props(appShellStyles.eyebrow)}>Fretboard practice console</p>
            <h1 {...stylex.props(appShellStyles.heroTitle)}>Guitar Fretboard Trainer</h1>
            <p {...stylex.props(controlStyles.cardBody)}>
              Precision fretboard view with degree colors and movable-do labels.
            </p>
          </div>
        </section>

        <section {...stylex.props(appShellStyles.glassPanel, appShellStyles.sectionBlock)}>
          <div {...stylex.props(appShellStyles.sectionHeading)}>
            <div>
              <p {...stylex.props(appShellStyles.eyebrow)}>Selected state</p>
              <h2 {...stylex.props(appShellStyles.sectionTitle)}>Header summary</h2>
            </div>
          </div>
          <p {...stylex.props(controlStyles.cardBody)}>
            {selectedKeyId} {selectedScaleLabel}
          </p>
          <div {...stylex.props(controlStyles.summaryList)}>
            <div {...stylex.props(controlStyles.summaryItem)}>
              <span {...stylex.props(controlStyles.summaryTone)}>
                <span {...stylex.props(controlStyles.summaryDegree)}>Selected key</span>
                <span {...stylex.props(controlStyles.summarySolfege)}>{selectedKeyId}</span>
              </span>
              <span {...stylex.props(controlStyles.summaryMeta)}>
                {selectedKey.accidentalPolicy}
              </span>
            </div>
            <div {...stylex.props(controlStyles.summaryItem)}>
              <span {...stylex.props(controlStyles.summaryTone)}>
                <span {...stylex.props(controlStyles.summaryDegree)}>Selected scale</span>
                <span {...stylex.props(controlStyles.summarySolfege)}>{selectedScaleLabel}</span>
              </span>
              <span {...stylex.props(controlStyles.summaryMeta)}>{selectedScale.id}</span>
            </div>
          </div>
        </section>

        <section {...stylex.props(controlStyles.controlSurface, appShellStyles.sectionBlock)}>
          <div {...stylex.props(appShellStyles.sectionHeading)}>
            <div>
              <p {...stylex.props(appShellStyles.eyebrow)}>Control surface</p>
              <h2 {...stylex.props(appShellStyles.sectionTitle)}>Key and scale</h2>
            </div>
          </div>

          <div {...stylex.props(appShellStyles.topGrid)}>
            <AppSelect
              label="Key"
              value={selectedKeyId}
              options={keyOptions}
              onChange={setSelectedKeyId}
              testId="key-select"
            />
            <AppSelect
              label="Scale"
              value={selectedScaleId}
              options={scaleOptions}
              onChange={setSelectedScaleId}
              testId="scale-select"
            />
          </div>

          <div
            aria-label="Reserved filter slot"
            role="group"
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "18px",
            }}
          >
            <button
              type="button"
              {...stylex.props(controlStyles.iconButton)}
              style={{
                minHeight: "38px",
                padding: "0 12px",
                borderRadius: "999px",
                border: "1px solid rgba(148, 106, 59, 0.22)",
                backgroundColor: "rgba(255, 250, 244, 0.86)",
                color: "#201811",
              }}
            >
              Scale tones
            </button>
            <button
              type="button"
              {...stylex.props(controlStyles.iconButton)}
              style={{
                minHeight: "38px",
                padding: "0 12px",
                borderRadius: "999px",
                border: "1px solid rgba(148, 106, 59, 0.22)",
                backgroundColor: "rgba(255, 250, 244, 0.86)",
                color: "#201811",
              }}
            >
              Chord tones
            </button>
            <button
              type="button"
              {...stylex.props(controlStyles.iconButton)}
              style={{
                minHeight: "38px",
                padding: "0 12px",
                borderRadius: "999px",
                border: "1px solid rgba(148, 106, 59, 0.22)",
                backgroundColor: "rgba(255, 250, 244, 0.86)",
                color: "#201811",
              }}
            >
              Both
            </button>
          </div>
        </section>

        <Legend tones={legendEntries} />
      </aside>

      <section {...stylex.props(appShellStyles.workspace)}>
        <Fretboard selectedKey={selectedKey} selectedScale={selectedScale} />
        <ScaleSummary
          keyLabel={selectedKeyId}
          scaleLabel={selectedScaleLabel}
          tones={summaryEntries}
        />
      </section>
    </div>
  );
}
