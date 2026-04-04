# Guitar Fretboard Trainer Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-screen guitar fretboard trainer that shows scale tones across 0-21 frets with degree color coding and movable-do solfege labels.

**Architecture:** The app is a Vite+ React TypeScript SPA with a strict split between a pure music-theory layer and a StyleX-based UI layer. The music layer owns key policy, scale membership, movable-do labels, and fretboard derivation; the UI layer only renders state, controls, legend, and panel surfaces using a Nodex-solar visual direction.

**Tech Stack:** React, TypeScript, Vite+, pnpm, Vitest, StyleX, `@stylexjs/unplugin`

---

## File Structure

### Reference files to inspect before implementation

- `/Users/yasudanaoki/Desktop/nodex/apps/composer/vite.config.mts`
- `/Users/yasudanaoki/Desktop/nodex/apps/composer/index.html`
- `/Users/yasudanaoki/Desktop/nodex/apps/composer/src/features/drum/tokens.stylex.ts`
- `/Users/yasudanaoki/Desktop/nodex/apps/composer/src/features/drum/primitives.stylex.ts`
- `/Users/yasudanaoki/Desktop/nodex/apps/composer/src/features/drum/styles/appShell.stylex.ts`
- `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/docs/superpowers/specs/2026-04-04-guitar-fretboard-trainer-design.md`

### Planned app files

- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/package.json`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/vite.config.mts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/index.html`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/tsconfig.json`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/tsconfig.app.json`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/tsconfig.node.json`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/main.tsx`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/App.tsx`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/App.test.tsx`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/app/AppShell.tsx`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/app/useFretboardAppState.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/keys.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/scales.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/pitch.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/solfege.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/colors.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/fretboard.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/index.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/styles/tokens.stylex.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/styles/primitives.stylex.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/styles/appShell.stylex.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/styles/controls.stylex.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/styles/fretboard.stylex.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/components/AppSelect.tsx`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/components/Legend.tsx`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/components/ScaleSummary.tsx`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/components/Fretboard.tsx`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/components/FretMarker.tsx`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/keys.test.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/scales.test.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/solfege.test.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/fretboard.test.ts`

## Chunk 1: Scaffold and Toolchain

### Task 1: Create the Vite+ React TypeScript baseline

**Files:**

- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/package.json`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/vite.config.mts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/index.html`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/tsconfig.json`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/tsconfig.app.json`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/tsconfig.node.json`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/main.tsx`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/App.tsx`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/App.test.tsx`

- [ ] **Step 1: Write the failing startup smoke test**

Create `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/App.test.tsx`:

```ts
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('renders the default shell without crashing', () => {
    render(<App />)
    expect(screen.getByText(/guitar fretboard trainer/i)).toBeTruthy()
  })
})
```

- [ ] **Step 2: Scaffold package metadata and scripts**

Create `package.json` with scripts:

```json
{
  "scripts": {
    "dev": "vp dev",
    "check": "vp check",
    "build": "vp build",
    "test": "vp test"
  }
}
```

Dependencies must include React, React DOM, TypeScript, `@types/react`, `@types/react-dom`, `@types/node`, `jsdom`, `@stylexjs/stylex`, `@stylexjs/unplugin`, `@vitejs/plugin-react`, Vite+, Vitest, and `@testing-library/react`.

Also ensure the scaffold supports:

- `vp check` for type-aware checks
- `vp build` for production build validation

- [ ] **Step 3: Mirror Nodex Vite+ and StyleX wiring**

Set up `vite.config.mts` following `/Users/yasudanaoki/Desktop/nodex/apps/composer/vite.config.mts`:

```ts
import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import stylex from "@stylexjs/unplugin";

export default defineConfig({
  plugins: [stylex.vite(), react()],
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
```

- [ ] **Step 4: Wire the StyleX runtime entry**

Set up `index.html` in the same pattern as `/Users/yasudanaoki/Desktop/nodex/apps/composer/index.html` so `virtual:stylex.css` and `virtual:stylex:runtime` are loaded.

- [ ] **Step 5: Bootstrap Vite+ if needed**

Run:

```bash
if ! command -v vp >/dev/null 2>&1; then
  curl -fsSL https://vite.plus | bash
fi
```

Expected: `vp --version` becomes available after shell reload if it was missing.

- [ ] **Step 6: Install dependencies**

Run: `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp install`

Expected: lockfile created and install completes without dependency resolution errors.

- [ ] **Step 7: Create the minimal React entry and make the smoke test pass**

Create `src/main.tsx` and `src/App.tsx` with the smallest rendering path possible:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

`App.tsx` should initially render a simple heading with the app title so the smoke test is meaningful.

- [ ] **Step 8: Run the test to verify it passes**

Run: `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp test src/App.test.tsx`

Expected: the smoke test passes.

- [ ] **Step 9: Verify the scaffold builds**

Run: `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp build`

Expected: production build succeeds and emits `dist/` output.

- [ ] **Step 10: Commit**

```bash
git -C /Users/yasudanaoki/Desktop/guitar-fretboard-trainer add package.json pnpm-lock.yaml vite.config.mts index.html tsconfig.json tsconfig.app.json tsconfig.node.json src/main.tsx src/App.tsx src/App.test.tsx
git -C /Users/yasudanaoki/Desktop/guitar-fretboard-trainer commit -m "chore: scaffold viteplus react app"
```

### Task 2: Establish the Nodex-style StyleX token base

**Files:**

- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/styles/tokens.stylex.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/styles/primitives.stylex.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/styles/appShell.stylex.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/styles/tokens.test.ts`

- [ ] **Step 1: Write the failing token expectations**

Create `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/styles/tokens.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { lightThemeTokens } from "./tokens.stylex";

describe("lightThemeTokens", () => {
  it("exposes the required solar-light primitives", () => {
    expect(lightThemeTokens.surfaceCanvas).toBeTruthy();
    expect(lightThemeTokens.accentCyan).toBeTruthy();
    expect(lightThemeTokens.accentAmber).toBeTruthy();
  });
});
```

- [ ] **Step 2: Port structural tokens from Nodex**

Use these reference files:

- `/Users/yasudanaoki/Desktop/nodex/packages/design-system/tokens.stylex.ts`
- `/Users/yasudanaoki/Desktop/nodex/apps/composer/src/features/drum/tokens.stylex.ts`
- `/Users/yasudanaoki/Desktop/nodex/apps/composer/src/features/drum/primitives.stylex.ts`

Create local tokens that keep the same design language but only the values needed for this app.

- [ ] **Step 3: Implement panel and control primitives**

Create reusable objects for:

- panel surface
- control surface
- select surface
- marker surface

Do not put app layout rules into primitives.

- [ ] **Step 4: Implement the solar app shell style**

Create `appShell.stylex.ts` with:

- warm-neutral canvas
- cyan and amber radial diffusion
- panel spacing and layout primitives
- desktop-first grid that collapses cleanly on narrower screens

- [ ] **Step 5: Run static checks**

Run:

- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp test src/ui/styles/tokens.test.ts`
- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp check`

Expected: no formatting, lint, or type-check errors.

- [ ] **Step 6: Commit**

```bash
git -C /Users/yasudanaoki/Desktop/guitar-fretboard-trainer add src/ui/styles/tokens.stylex.ts src/ui/styles/tokens.test.ts src/ui/styles/primitives.stylex.ts src/ui/styles/appShell.stylex.ts
git -C /Users/yasudanaoki/Desktop/guitar-fretboard-trainer commit -m "feat: add nodex-inspired stylex tokens"
```

Chunk 1 ends after Task 2.

## Chunk 2: Music Theory Core

### Task 3: Implement key and scale definitions with tests

**Files:**

- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/keys.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/scales.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/keys.test.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/scales.test.ts`

- [ ] **Step 1: Write failing tests for the v1 key whitelist**

```ts
import { describe, expect, it } from "vitest";
import { getSelectedKey } from "./keys";

describe("getSelectedKey", () => {
  it("matches the exact v1 key whitelist and policies", () => {
    expect(
      [
        ["C", "natural"],
        ["C#", "sharp"],
        ["Db", "flat"],
        ["D", "sharp"],
        ["D#", "sharp"],
        ["Eb", "flat"],
        ["E", "sharp"],
        ["F", "flat"],
        ["F#", "sharp"],
        ["Gb", "flat"],
        ["G", "sharp"],
        ["G#", "sharp"],
        ["Ab", "flat"],
        ["A", "sharp"],
        ["A#", "sharp"],
        ["Bb", "flat"],
        ["B", "sharp"],
      ].map(([keyId]) => getSelectedKey(keyId as never)),
    ).toMatchObject([
      { id: "C", accidentalPolicy: "natural" },
      { id: "C#", accidentalPolicy: "sharp" },
      { id: "Db", accidentalPolicy: "flat" },
      { id: "D", accidentalPolicy: "sharp" },
      { id: "D#", accidentalPolicy: "sharp" },
      { id: "Eb", accidentalPolicy: "flat" },
      { id: "E", accidentalPolicy: "sharp" },
      { id: "F", accidentalPolicy: "flat" },
      { id: "F#", accidentalPolicy: "sharp" },
      { id: "Gb", accidentalPolicy: "flat" },
      { id: "G", accidentalPolicy: "sharp" },
      { id: "G#", accidentalPolicy: "sharp" },
      { id: "Ab", accidentalPolicy: "flat" },
      { id: "A", accidentalPolicy: "sharp" },
      { id: "A#", accidentalPolicy: "sharp" },
      { id: "Bb", accidentalPolicy: "flat" },
      { id: "B", accidentalPolicy: "sharp" },
    ]);
  });

  it("keeps C# and Db as separate keys with different policies", () => {
    expect(getSelectedKey("C#").accidentalPolicy).toBe("sharp");
    expect(getSelectedKey("Db").accidentalPolicy).toBe("flat");
  });

  it("falls back to C for unsupported values", () => {
    expect(getSelectedKey("nope" as never).id).toBe("C");
  });
});
```

- [ ] **Step 2: Write failing tests for scale definitions**

```ts
import { describe, expect, it } from "vitest";
import { getScaleDefinition } from "./scales";

describe("getScaleDefinition", () => {
  it("defines all four v1 scales exactly", () => {
    expect(getScaleDefinition("major")).toMatchObject({
      intervals: [0, 2, 4, 5, 7, 9, 11],
      degreeLabels: ["1", "2", "3", "4", "5", "6", "7"],
      chordToneMask: [true, false, true, false, true, false, true],
    });
    expect(getScaleDefinition("naturalMinor")).toMatchObject({
      intervals: [0, 2, 3, 5, 7, 8, 10],
      degreeLabels: ["1", "2", "b3", "4", "5", "b6", "b7"],
      chordToneMask: [true, false, true, false, true, false, true],
    });
    expect(getScaleDefinition("majorPentatonic")).toMatchObject({
      intervals: [0, 2, 4, 7, 9],
      degreeLabels: ["1", "2", "3", "5", "6"],
      chordToneMask: [true, false, true, true, false],
    });
    expect(getScaleDefinition("minorPentatonic")).toMatchObject({
      intervals: [0, 3, 5, 7, 10],
      degreeLabels: ["1", "b3", "4", "5", "b7"],
      chordToneMask: [true, true, false, true, false],
    });
  });

  it("defines minor pentatonic intervals and chordToneMask in interval order", () => {
    expect(getScaleDefinition("minorPentatonic")).toMatchObject({
      intervals: [0, 3, 5, 7, 10],
      degreeLabels: ["1", "b3", "4", "5", "b7"],
      chordToneMask: [true, true, false, true, false],
    });
  });

  it("keeps chordToneMask aligned with intervals and degree labels", () => {
    (["major", "naturalMinor", "majorPentatonic", "minorPentatonic"] as const).forEach(
      (scaleId) => {
        const scale = getScaleDefinition(scaleId);
        expect(scale.chordToneMask).toHaveLength(scale.intervals.length);
        expect(scale.degreeLabels).toHaveLength(scale.intervals.length);
      },
    );
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run:

- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp test src/music/keys.test.ts`
- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp test src/music/scales.test.ts`

Expected: failures for missing modules or exports.

- [ ] **Step 4: Implement the minimal key and scale modules**

Requirements:

- implement the exact v1 key whitelist from the spec
- expose fallback-safe lookup helpers
- keep `chordToneMask` aligned with `intervals` and `degreeLabels`
- export narrow `KeyId` and `ScaleId` types

- [ ] **Step 5: Re-run tests**

Expected: both test files pass.

- [ ] **Step 6: Commit**

```bash
git -C /Users/yasudanaoki/Desktop/guitar-fretboard-trainer add src/music/keys.ts src/music/scales.ts src/music/keys.test.ts src/music/scales.test.ts
git -C /Users/yasudanaoki/Desktop/guitar-fretboard-trainer commit -m "feat: add key and scale definitions"
```

### Task 4: Implement pitch math and movable-do resolution with tests

**Files:**

- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/pitch.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/pitch.test.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/solfege.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/solfege.test.ts`

- [ ] **Step 1: Write the failing movable-do tests**

```ts
import { describe, expect, it } from "vitest";
import { getSolfegeLabel } from "./solfege";

describe("getSolfegeLabel", () => {
  it("uses natural-form syllables in natural keys", () => {
    expect(getSolfegeLabel("6", "natural")).toBe("La");
  });

  it("uses flat-form syllables in flat keys", () => {
    expect(getSolfegeLabel("b7", "flat")).toBe("Te");
  });

  it("uses sharp-form syllables in sharp keys", () => {
    expect(getSolfegeLabel("b7", "sharp")).toBe("Li");
  });

  it("maps the documented degree table deterministically", () => {
    expect(getSolfegeLabel("1", "sharp")).toBe("Do");
    expect(getSolfegeLabel("b3", "flat")).toBe("Me");
    expect(getSolfegeLabel("#4 / b5", "sharp")).toBe("Fi");
    expect(getSolfegeLabel("#4 / b5", "flat")).toBe("Se");
  });
});
```

- [ ] **Step 2: Write failing pitch helper tests**

```ts
import { describe, expect, it } from "vitest";
import { normalizePitchClass, getIntervalFromTonic } from "./pitch";

describe("pitch helpers", () => {
  it("normalizes pitch classes into 0-11", () => {
    expect(normalizePitchClass(-1)).toBe(11);
    expect(normalizePitchClass(13)).toBe(1);
  });

  it("computes intervals from tonic", () => {
    expect(getIntervalFromTonic(4, 8)).toBe(4);
  });
});
```

- [ ] **Step 3: Run the tests to verify failure**

Run:

- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp test src/music/pitch.test.ts`
- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp test src/music/solfege.test.ts`

Expected: missing module or missing export failure.

- [ ] **Step 4: Implement pure pitch helpers**

`pitch.ts` should only contain:

- pitch-class normalization
- interval-from-tonic helpers
- semitone comparison helpers for matching active tones

- [ ] **Step 5: Implement deterministic solfege mapping**

`solfege.ts` should:

- map degrees to sharp/natural or flat syllables per spec
- keep future chromatic support table-based
- export only pure lookup helpers

- [ ] **Step 6: Re-run the tests and full check**

Run:

- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp test src/music/pitch.test.ts`
- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp test src/music/solfege.test.ts`
- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp check`

Expected: test passes, no check errors.

- [ ] **Step 7: Commit**

```bash
git -C /Users/yasudanaoki/Desktop/guitar-fretboard-trainer add src/music/pitch.ts src/music/pitch.test.ts src/music/solfege.ts src/music/solfege.test.ts
git -C /Users/yasudanaoki/Desktop/guitar-fretboard-trainer commit -m "feat: add pitch math and solfege mapping"
```

### Task 5: Implement fretboard derivation and degree colors with tests

**Files:**

- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/colors.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/colors.test.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/fretboard.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/fretboard.test.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/music/index.ts`

- [ ] **Step 1: Write failing tests for the normative degree palette**

```ts
import { describe, expect, it } from "vitest";
import { getDegreeColor } from "./colors";

describe("getDegreeColor", () => {
  it("matches the full normative v1 palette", () => {
    expect(
      ["1", "b2 / #1", "2", "b3 / #2", "3", "4", "#4 / b5", "5", "b6 / #5", "6", "b7", "7"].map(
        (degree) => getDegreeColor(degree as never),
      ),
    ).toEqual([
      { token: "degreeRoot", hex: "#D94A4A" },
      { token: "degreeFlat2", hex: "#D97A3A" },
      { token: "degree2", hex: "#E0A43A" },
      { token: "degreeFlat3", hex: "#C9A227" },
      { token: "degree3", hex: "#A8B832" },
      { token: "degree4", hex: "#4FAF5B" },
      { token: "degreeSharp4", hex: "#2FA7A0" },
      { token: "degree5", hex: "#3E86D1" },
      { token: "degreeFlat6", hex: "#5C6FD6" },
      { token: "degree6", hex: "#7A59C8" },
      { token: "degreeFlat7", hex: "#B05BCB" },
      { token: "degree7", hex: "#D45AA0" },
    ]);
  });
});
```

- [ ] **Step 2: Write failing tests for `getScaleTones` and position derivation**

```ts
import { describe, expect, it } from "vitest";
import { getFretPositionDisplay, getScaleTones } from "./fretboard";
import { getSelectedKey } from "./keys";
import { getScaleDefinition } from "./scales";

describe("getScaleTones", () => {
  it("returns active tones ordered by scale degree", () => {
    expect(
      getScaleTones(getSelectedKey("C"), getScaleDefinition("major")).map(
        (tone) => tone.degreeLabel,
      ),
    ).toEqual(["1", "2", "3", "4", "5", "6", "7"]);
  });
});

describe("getFretPositionDisplay", () => {
  it("returns degree and movable-do for in-scale positions", () => {
    const result = getFretPositionDisplay(0, 0, getSelectedKey("E"), getScaleDefinition("major"));
    expect(result).toMatchObject({
      isValidPosition: true,
      inScale: true,
      degreeLabel: "1",
      solfegeLabel: "Do",
    });
  });

  it("returns invalid shape for out-of-range fret", () => {
    expect(
      getFretPositionDisplay(0, 22, getSelectedKey("C"), getScaleDefinition("major")),
    ).toMatchObject({
      isValidPosition: false,
      inScale: false,
      degreeLabel: undefined,
      solfegeLabel: undefined,
    });
  });

  it("returns invalid shape for out-of-range string index", () => {
    expect(
      getFretPositionDisplay(6, 0, getSelectedKey("C"), getScaleDefinition("major")),
    ).toMatchObject({
      isValidPosition: false,
      inScale: false,
      degreeLabel: undefined,
      solfegeLabel: undefined,
    });
  });

  it("uses the documented standard tuning order", () => {
    expect(
      getFretPositionDisplay(5, 0, getSelectedKey("E"), getScaleDefinition("major")).pitchClass,
    ).toBe(4);
  });

  it("returns color and futureTags for active tones", () => {
    const result = getFretPositionDisplay(0, 0, getSelectedKey("E"), getScaleDefinition("major"));
    expect(result.colorToken).toBe("degreeRoot");
    expect(result.futureTags).toEqual({ chordTone: true });
  });
});
```

- [ ] **Step 3: Run the tests to verify failure**

Run:

- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp test src/music/colors.test.ts`
- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp test src/music/fretboard.test.ts`

Expected: missing module or failing expectations.

- [ ] **Step 4: Implement degree color mapping**

Create `colors.ts` with the exact token names and hex values from the spec. Keep one export for lookup by degree label.

- [ ] **Step 5: Implement fretboard derivation**

`fretboard.ts` must:

- own `STANDARD_TUNING_PITCH_CLASSES = [4, 9, 2, 7, 11, 4]`
- treat `stringIndex` as low 6th string to high 1st string
- return `isValidPosition: false` for invalid inputs
- derive `pitchClass`, `inScale`, `degreeLabel`, `solfegeLabel`, `colorToken`, and `futureTags`
- expose `getScaleTones` from the music layer and use it as the shared active-tone source for later UI tasks
- create `src/music/index.ts` as the stable barrel for key, scale, pitch, solfege, color, and fretboard exports

- [ ] **Step 6: Re-run tests**

Run:

- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp test src/music/colors.test.ts`
- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp test src/music/fretboard.test.ts`
- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp test`

Expected: all music-layer tests pass.

- [ ] **Step 7: Commit**

```bash
git -C /Users/yasudanaoki/Desktop/guitar-fretboard-trainer add src/music/colors.ts src/music/colors.test.ts src/music/fretboard.ts src/music/index.ts src/music/fretboard.test.ts
git -C /Users/yasudanaoki/Desktop/guitar-fretboard-trainer commit -m "feat: add fretboard derivation engine"
```

## Chunk 3: UI and Integration

### Task 6: Build state and control components

**Files:**

- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/app/useFretboardAppState.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/styles/controls.stylex.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/components/AppSelect.tsx`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/components/Legend.tsx`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/components/ScaleSummary.tsx`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/app/useFretboardAppState.test.ts`

- [ ] **Step 1: Write the failing UI-state expectations**

Create `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/app/useFretboardAppState.test.ts` and cover this state contract:

```ts
{
  selectedKeyId: 'C',
  selectedScaleId: 'major',
  setSelectedKeyId: (keyId) => void,
  setSelectedScaleId: (scaleId) => void
}
```

Also assert:

- unsupported key input falls back to `C`
- unsupported scale input falls back to `major`
- derived scale-tone output is ordered by scale degree for legend and summary rendering
- changing selected key or scale updates the derived state immediately

- [ ] **Step 2: Implement app state hook**

`useFretboardAppState.ts` should:

- initialize to `C` + `major`
- guard invalid values by falling back to defaults
- expose derived scale tones for summary and legend

- [ ] **Step 3: Implement shared select styling**

Build the select/control look from the Nodex composer references. Keep controls crisp and panel-based, not pillowy.

- [ ] **Step 4: Implement AppSelect, Legend, and ScaleSummary**

Requirements:

- key selector includes separate `C#` and `Db`
- legend only shows degrees present in the selected scale
- summary orders tones by scale degree, not by fretboard traversal

- [ ] **Step 5: Run checks**

Run:

- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp test src/app/useFretboardAppState.test.ts`
- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp check`

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git -C /Users/yasudanaoki/Desktop/guitar-fretboard-trainer add src/app/useFretboardAppState.ts src/ui/styles/controls.stylex.ts src/ui/components/AppSelect.tsx src/ui/components/Legend.tsx src/ui/components/ScaleSummary.tsx
git -C /Users/yasudanaoki/Desktop/guitar-fretboard-trainer commit -m "feat: add controls and derived app state"
```

### Task 7: Build the fretboard view and app shell

**Files:**

- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/app/AppShell.tsx`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/styles/fretboard.stylex.ts`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/components/FretMarker.tsx`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/ui/components/Fretboard.tsx`
- Create: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/app/AppShell.test.tsx`
- Modify: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/App.tsx`

- [ ] **Step 1: Write the failing integration expectation**

Create `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/src/app/AppShell.test.tsx`.

Expected UI output:

- control panel renders
- compact selected key/scale summary renders in the header
- reserved control-bar filter slot renders
- legend renders
- fretboard renders 6 strings and frets 0-21
- supplemental scale summary renders
- active positions show degree first and movable-do second
- changing key and scale updates the header summary, legend, and visible fret markers in the same render path

- [ ] **Step 2: Implement marker styling**

`FretMarker.tsx` and `fretboard.stylex.ts` should:

- keep inactive positions subdued rather than empty
- use mono text inside markers
- make degree visually dominant
- keep glow restrained and sunlit, not neon

- [ ] **Step 3: Implement the fretboard grid**

`Fretboard.tsx` should:

- iterate strings low-to-high in the spec order
- iterate frets `0..21`
- call the pure music layer for each position
- never duplicate note logic in the component

- [ ] **Step 4: Implement the app shell**

`AppShell.tsx` should assemble:

- header
- compact selected key/scale summary in the header
- control surface
- reserved control-bar slot for future filters: `Scale tones`, `Chord tones`, `Both`
- legend
- fretboard panel
- supplemental scale summary

Responsive baseline:

- desktop-first two-row composition at wide widths
- control bar and supplemental panels stack cleanly below tablet widths without changing information hierarchy

- [ ] **Step 5: Integrate the final App**

`App.tsx` should only mount the shell and any theme root styles.

- [ ] **Step 6: Run verification**

Run:

- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp test`
- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp check`
- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp build`

Expected: all commands pass.

- [ ] **Step 7: Commit**

```bash
git -C /Users/yasudanaoki/Desktop/guitar-fretboard-trainer add src/app/AppShell.tsx src/ui/styles/fretboard.stylex.ts src/ui/components/FretMarker.tsx src/ui/components/Fretboard.tsx src/App.tsx
git -C /Users/yasudanaoki/Desktop/guitar-fretboard-trainer commit -m "feat: render guitar fretboard trainer ui"
```

### Task 8: Final polish and docs

**Files:**

- Modify: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/README.md`
- Modify: `/Users/yasudanaoki/Desktop/guitar-fretboard-trainer/docs/superpowers/specs/2026-04-04-guitar-fretboard-trainer-design.md` only if implementation revealed necessary corrections

- [ ] **Step 1: Add a concise README**

Include:

- app purpose
- setup commands
- `vp dev`, `vp check`, `vp test`, `vp build`
- short note that StyleX and Nodex references informed the UI

- [ ] **Step 2: Run final verification again**

Run:

- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp test`
- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp check`
- `cd /Users/yasudanaoki/Desktop/guitar-fretboard-trainer && vp build`

Expected: all pass cleanly after README addition.

- [ ] **Step 3: Commit**

```bash
git -C /Users/yasudanaoki/Desktop/guitar-fretboard-trainer add README.md
git -C /Users/yasudanaoki/Desktop/guitar-fretboard-trainer commit -m "docs: add project readme"
```
