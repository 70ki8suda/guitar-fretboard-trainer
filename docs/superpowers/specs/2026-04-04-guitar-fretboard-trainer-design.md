# Guitar Fretboard Trainer Design

## Summary

This project is a web app for guitar improvisation practice. It helps users understand scale tones on the fretboard by showing:

- positions of the selected scale tones on a standard 6-string guitar fretboard
- degree labels relative to the selected key
- movable-do solfege labels relative to the selected key
- consistent color coding by degree

The initial release targets the core learning loop: select a key and scale, then immediately see scale tones across the fretboard with both degree and movable-do labels.

## Goals

- Make fretboard scale-tone locations easy to inspect across the full neck
- Reinforce degree awareness instead of shape memorization alone
- Show movable-do solfege instead of fixed absolute note names
- Preserve enharmonic spelling according to the selected key
- Keep the implementation extensible for future chord-tone and mode support

## Non-Goals

- audio playback
- TAB or fingering suggestions
- alternate tunings
- account or persistence features
- mobile app packaging
- exercise or quiz systems in v1

## Product Scope

### In Scope for v1

- single-screen web app
- key selection with separate sharp and flat spellings where relevant
- scale selection
- 6-string standard tuning fretboard rendering
- fret range from open string through 21st fret
- highlighting only tones that belong to the selected scale
- simultaneous display of degree and movable-do solfege on each active position
- stable degree-to-color legend
- responsive updates when key or scale changes

### Planned Extension Targets

- chord-tone highlighting
- mode support
- display filters by fret region or position
- note-label display variants
- left-handed rendering

## User Model

### Target Users

- beginner to intermediate guitar players
- players learning scales for improvisation
- players who want to understand interval function across the neck

### Primary Use Cases

- checking scale tones before practice
- improvising over a backing track in a chosen key
- comparing degree locations after changing key
- understanding where target tones live across the fretboard

## Functional Requirements

### 1. Key Selection

The app must allow the user to select the current key from explicit key spellings. Enharmonic pairs are treated as different keys when they imply different spelling policies.

v1 key whitelist:

- C
- C#
- Db
- D
- D#
- Eb
- E
- F
- F#
- Gb
- G
- G#
- Ab
- A
- A#
- Bb
- B

Explicitly out of scope for v1:

- Cb
- Fb
- E#
- B#

The selected key object must carry an explicit accidental policy:

- `sharp`: prefer sharp-oriented chromatic spelling and movable-do syllables
- `flat`: prefer flat-oriented chromatic spelling and movable-do syllables
- `natural`: use natural spellings unless chromatic alteration is required

v1 accidental policy map:

- `flat`: F, Bb, Eb, Ab, Db, Gb
- `sharp`: G, D, A, E, B, F#, C#, D#, A#
- `natural`: C

This whitelist is authoritative for v1 and must be the basis for tests.

### 2. Scale Selection

The app must support multiple scale definitions through a data-driven structure.

Initial scales:

- Major
- Natural Minor
- Major Pentatonic
- Minor Pentatonic

Each scale definition must include:

- semitone intervals from the tonic
- degree labels
- enough metadata to support future chord-tone filtering
- a stable boolean mask for future chord-tone candidate tagging

`chordToneMask` contract for v1:

- it has the same length and ordering as `intervals` and `degreeLabels`
- each index answers whether that scale tone should be treated as a chord-tone candidate in future filters
- it is not a 12-step chromatic mask
- v1 does not render chord tones yet, but the data contract must be stable

v1 scale definitions:

| Scale | Semitone Intervals | Degree Labels | Marker Labels |
|---|---|---|---|
| Major | 0, 2, 4, 5, 7, 9, 11 | 1, 2, 3, 4, 5, 6, 7 | always show both degree and movable-do |
| Natural Minor | 0, 2, 3, 5, 7, 8, 10 | 1, 2, b3, 4, 5, b6, b7 | always show both degree and movable-do |
| Major Pentatonic | 0, 2, 4, 7, 9 | 1, 2, 3, 5, 6 | always show both degree and movable-do |
| Minor Pentatonic | 0, 3, 5, 7, 10 | 1, b3, 4, 5, b7 | always show both degree and movable-do |

For pentatonic scales, omitted degrees are not rendered as placeholders on fret markers. The legend should show only the degrees present in the selected scale.

### 3. Fretboard Display

The app must render:

- 6 strings
- frets 0 through 21
- standard tuning `E A D G B E`

Each string/fret position must map to a pitch-class value and then to derived display metadata for the current key and scale.

### 4. Scale-Tone Highlighting

Only positions whose pitch class belongs to the selected scale should be emphasized.

For each active position, the marker must show:

- degree label
- movable-do solfege label

Inactive positions should either remain empty or visually subdued so the active scale map is easy to read.

### 5. Degree Color Mapping

The app must apply one consistent color per degree across the entire fretboard.

This mapping should be implemented in a way that supports chromatic extensions later, not just the diatonic major-scale degrees.

Suggested internal degree set:

- 1
- b2 / #1
- 2
- b3 / #2
- 3
- 4
- #4 / b5
- 5
- b6 / #5
- 6
- b7
- 7

The v1 legend should expose only the currently relevant labels, but the internal model should support the full set above for future chord-tone and mode features.

v1 degree color tokens:

| Degree | Color Token | Hex |
|---|---|---|
| 1 | `degreeRoot` | `#D94A4A` |
| b2 / #1 | `degreeFlat2` | `#D97A3A` |
| 2 | `degree2` | `#E0A43A` |
| b3 / #2 | `degreeFlat3` | `#C9A227` |
| 3 | `degree3` | `#A8B832` |
| 4 | `degree4` | `#4FAF5B` |
| #4 / b5 | `degreeSharp4` | `#2FA7A0` |
| 5 | `degree5` | `#3E86D1` |
| b6 / #5 | `degreeFlat6` | `#5C6FD6` |
| 6 | `degree6` | `#7A59C8` |
| b7 | `degreeFlat7` | `#B05BCB` |
| 7 | `degree7` | `#D45AA0` |

This palette is provisional in branding terms but normative for v1 implementation and tests.

### 6. Movable-Do Solfege

The label system must use movable-do, not fixed absolute note names.

Rules:

- the tonic of the selected key is always `Do`
- labels are relative to the selected key
- minor scales still treat the selected tonic as `Do`
- solfege must follow the selected key spelling policy where enharmonic choices matter

Examples:

- in `C Major`, `E` displays as `Mi`
- in `A Natural Minor`, `A` displays as `Do`

The chromatic movable-do set should support at least:

- Do
- Di / Ra
- Re
- Ri / Me
- Mi
- Fa
- Fi / Se
- So
- Si / Le
- La
- Li / Te
- Ti

Displayed syllables must be resolved deterministically from the selected key policy:

- `sharp` keys use `Di, Ri, Fi, Si, Li` for altered ascending/chromatic labels
- `flat` keys use `Ra, Me, Se, Le, Te` for altered descending/flat labels
- `natural` keys use unaltered syllables for in-scale tones and default to sharp-form chromatic labels when a non-diatonic label is needed in future extensions

For v1 scale tones, the expected movable-do output is:

| Degree | Sharp/Natural Form | Flat Form |
|---|---|---|
| 1 | Do | Do |
| b2 | Di | Ra |
| 2 | Re | Re |
| b3 | Ri | Me |
| 3 | Mi | Mi |
| 4 | Fa | Fa |
| #4 / b5 | Fi | Se |
| 5 | So | So |
| b6 | Si | Le |
| 6 | La | La |
| b7 | Li | Te |
| 7 | Ti | Ti |

For v1, only degree labels that appear in the selected scale need to be materialized on markers and in the legend.

## UX and Screen Design

## Single-Page Layout

1. Header
   - app title
   - compact summary of selected key and scale

2. Control Bar
   - key selector
   - scale selector
   - reserved space for future filters such as `Scale tones`, `Chord tones`, and `Both`

3. Legend
   - color chips with degree labels
   - visible mapping between degree and color

4. Fretboard Area
   - horizontal fretboard from open string to 21st fret
   - one marker per active scale tone
   - marker content: degree on the first line, movable-do on the second line

5. Supplemental Summary
   - current scale-tone list in order
   - reserved room for future chord-tone emphasis or formula display

## Interaction Design

- changing key or scale must update the fretboard immediately
- desktop-first layout is acceptable for v1
- active markers must remain readable even when the neck is dense
- colors cannot be the only source of meaning; the text label is also required

## UI Direction

The visual direction for v1 should follow the `Nodex composer` light-theme family, especially the `solar` atmosphere.

Target feeling:

- precision tool in daylight
- engineered, not playful
- luminous, but restrained
- synth-inspired color atmosphere rather than generic educational-app brightness

### Visual Principles

- use a warm-neutral canvas with cool atmospheric gradients, not flat white
- use translucent layered panels with thin quiet borders
- keep depth soft and diffused rather than heavy
- let cyan and amber act as signal accents, not dominant brand paint
- keep decorative elements peripheral and never inside dense control zones

### Typography Direction

- primary UI text and headings should use a confident contemporary grotesk style aligned with `Space Grotesk`
- metadata, degree labels, fret numbers, legend labels, and technical annotations should use a mono accent style aligned with `IBM Plex Mono`
- typography should feel authoritative and measured, not casual

### Fretboard Styling Direction

- the fretboard should not imitate photoreal wood
- treat the neck as a precision instrument panel built from measured slots, thin separators, and calm optical depth
- inactive positions should be visually subdued rather than fully hidden, so the fret grid remains legible
- active markers should appear optically lifted from the surface with restrained glow and clear internal hierarchy
- within each marker, degree is the primary line and movable-do is the secondary line

### Color Atmosphere

- the overall page should inherit `solar`-like daylight gradients: warm horizon tones balanced by cool cyan diffusion
- panel surfaces should remain bright enough for clarity without becoming plain white cards
- degree colors may vary by interval for learning purposes, but they must still sit inside the wider Nodex light-theme atmosphere
- accent cyan and accent amber should be used for controls, focus states, and small emphasis signals

### Layout Tone

- the app should feel modular and panel-based
- controls should live in a crisp top control surface
- legend and supplemental scale information should read like instrument readouts, not decorative widgets
- spacing and corner radius should stay disciplined and slightly tense rather than soft and bubbly

## Technical Design

### Stack

- React
- TypeScript
- Vite+ CLI, the official unified toolchain from `viteplus.dev`
- pnpm
- Vite under the hood for app dev/build, with the Vite+ `vp` command as the repo workflow entrypoint
- repo-standard workflow commands: `vp install`, `vp dev`, `vp check`, `vp build`, `vp test`

### Layered Architecture

The codebase should separate `UI concerns` from `music-theory concerns`.

#### UI Layer

Responsibilities:

- rendering controls
- rendering the legend
- rendering the fretboard grid
- formatting the selected-state summary

The UI layer should not directly encode note-spelling logic or scale membership rules.

#### Music Theory Layer

Responsibilities:

- key metadata and spelling policy
- pitch-class operations
- scale interval definitions
- degree labeling
- movable-do labeling
- fretboard position mapping
- future chord-tone tagging

This layer should expose pure functions so it can be tested without React rendering.

### Proposed Module Boundaries

- `src/music/keys.ts`
  Defines selectable keys and sharp/flat spelling preferences.

- `src/music/scales.ts`
  Defines scale intervals, degree labels, and future extension metadata.

- `src/music/solfege.ts`
  Maps relative scale degrees or chromatic intervals to movable-do labels.

- `src/music/pitch.ts`
  Handles pitch-class math and enharmonic policy helpers.

- `src/music/fretboard.ts`
  Maps `string + fret` to pitch class and derived display data for the current state.

- `src/ui/`
  Contains React components for controls, legend, markers, and fretboard layout.

### Core Function Contracts

The music layer should expose a small set of pure functions with explicit ownership boundaries:

```ts
type KeyId =
  | "C" | "C#" | "Db" | "D" | "D#" | "Eb" | "E" | "F"
  | "F#" | "Gb" | "G" | "G#" | "Ab" | "A" | "A#" | "Bb" | "B"

type ScaleId = "major" | "naturalMinor" | "majorPentatonic" | "minorPentatonic"

type AccidentalPolicy = "sharp" | "flat" | "natural"

type SelectedKey = {
  id: KeyId
  tonicPitchClass: number
  accidentalPolicy: AccidentalPolicy
}

type ScaleDefinition = {
  id: ScaleId
  intervals: number[]
  degreeLabels: string[]
  chordToneMask: boolean[]
}

type ActiveTone = {
  pitchClass: number
  intervalFromTonic: number
  degreeLabel: string
  solfegeLabel: string
  colorToken: string
}

const STANDARD_TUNING_PITCH_CLASSES = [4, 9, 2, 7, 11, 4] as const
// string order is low 6th string to high 1st string: E A D G B E

function getSelectedKey(keyId: KeyId): SelectedKey
function getScaleDefinition(scaleId: ScaleId): ScaleDefinition
function getScaleTones(key: SelectedKey, scale: ScaleDefinition): ActiveTone[]
function getFretPositionDisplay(
  stringIndex: number,
  fret: number,
  key: SelectedKey,
  scale: ScaleDefinition,
): FretPositionDisplay
```

Ownership rules:

- `keys.ts` owns `KeyId`, `SelectedKey`, and `getSelectedKey`
- `scales.ts` owns `ScaleId`, `ScaleDefinition`, and `getScaleDefinition`
- `solfege.ts` owns interval-to-syllable resolution by `AccidentalPolicy`
- `pitch.ts` owns pitch-class arithmetic only
- `fretboard.ts` owns standard tuning, string-order convention, physical string/fret mapping, and composition of the other modules into `FretPositionDisplay`

### Data Model

Each active fretboard position should expose a derived object similar to:

```ts
type FretPositionDisplay = {
  stringIndex: number
  fret: number
  pitchClass: number
  isValidPosition: boolean
  inScale: boolean
  degreeLabel?: string
  solfegeLabel?: string
  colorToken?: string
  futureTags?: {
    chordTone?: boolean
  }
}
```

This keeps future features such as chord-tone emphasis additive instead of forcing a redesign.

## Initial and Invalid State Handling

### Default Initial State

On first load, the app should initialize with:

- key: `C`
- scale: `major`

This gives v1 a neutral and readable starting point.

### Invalid State Rules

If the app later accepts persisted values, query params, or route params, invalid values must not break rendering.

Required fallback behavior:

- unsupported key ID: fall back to `C`
- unsupported scale ID: fall back to `major`
- invalid string index or fret outside `0-21`: return a display object with `isValidPosition: false`, `inScale: false`, and no labels; do not throw in UI render paths

v1 does not need a dedicated error screen for invalid selections; safe fallback behavior is sufficient.

## Spelling Policy

The project must not flatten everything to a single enharmonic spelling system.

Instead:

- `C#` and `Db` are separate selectable keys
- the selected key determines whether sharp-oriented or flat-oriented spellings are preferred
- movable-do output must follow that policy

This decision is necessary to support musically coherent display in flat keys and to avoid mixing spellings that confuse the user.

## Testing Strategy

The most failure-prone logic is the music-theory layer, so v1 testing should focus there first.

Minimum unit-test coverage:

- key spelling policy selection
- scale membership for each supported scale
- movable-do output for representative sharp and flat keys
- fretboard mapping for selected string/fret positions
- consistency between degree label, solfege label, and color token

UI testing can remain lightweight in v1 as long as the pure logic is well-covered.

## Acceptance Criteria

The implementation is acceptable when:

- the user can select a key
- the user can select a scale
- the fretboard updates immediately after selection changes
- only tones in the current scale are emphasized
- each active position displays both degree and movable-do
- the same degree uses the same color everywhere on the fretboard
- the legend clearly explains the color mapping
- flat-oriented keys preserve flat-oriented display policy

## Risks and Mitigations

### Risk: enharmonic confusion

If pitch math is implemented without a spelling policy, the UI will produce musically inconsistent labels.

Mitigation:

- keep explicit key metadata
- keep spelling policy in the music layer
- test representative sharp and flat keys

### Risk: future chord-tone support causes refactor churn

If scale highlighting is hardcoded directly into the UI, later chord-tone support will require invasive rewrites.

Mitigation:

- keep display derivation in pure functions
- include future tags in derived display metadata
- reserve UI space for filter controls

### Risk: unreadable dense fretboard

Simultaneously showing degree and solfege can overcrowd the neck.

Mitigation:

- desktop-first layout in v1
- compact marker styling
- subdued treatment for non-scale tones

## Implementation Direction

The recommended implementation path is:

1. scaffold a Vite+ React TypeScript app
2. build and test the music-theory layer first
3. build the single-screen UI around those pure functions
4. validate with `vp check`, `vp test`, and `vp build`

This keeps the initial product focused while preserving room for chord-tone and mode expansion.
