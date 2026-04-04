import * as stylex from "@stylexjs/stylex";

import { AppShell } from "./app/AppShell";
import { lightColorTheme, lightFontTheme, lightShadowTheme } from "./ui/styles/tokens.stylex";

export function App() {
  return (
    <div {...stylex.props(lightColorTheme, lightFontTheme, lightShadowTheme)}>
      <AppShell />
    </div>
  );
}
