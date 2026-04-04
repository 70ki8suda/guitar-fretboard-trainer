import { lightShadowTokens, lightThemeTokens } from "./tokens.stylex";

export const panelSurface = {
  borderWidth: "1px",
  borderStyle: "solid" as const,
  borderColor: lightThemeTokens.borderSubtle,
  borderRadius: "22px",
  backgroundColor: lightThemeTokens.surfacePanel,
  color: lightThemeTokens.textPrimary,
  boxShadow: lightShadowTokens.panel,
  backdropFilter: "blur(18px)",
};

export const controlSurface = {
  minHeight: "48px",
  padding: "0 14px",
  borderWidth: "1px",
  borderStyle: "solid" as const,
  borderColor: lightThemeTokens.borderSubtle,
  borderRadius: "16px",
  backgroundColor: lightThemeTokens.surfaceMuted,
  color: lightThemeTokens.textPrimary,
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.42)",
};

export const selectSurface = {
  width: "100%",
  minHeight: "48px",
  padding: "0 14px",
  borderWidth: "1px",
  borderStyle: "solid" as const,
  borderColor: lightThemeTokens.borderSubtle,
  borderRadius: "16px",
  backgroundColor: lightThemeTokens.surfaceOverlay,
  color: lightThemeTokens.textPrimary,
  boxShadow: lightShadowTokens.select,
};

export const markerSurface = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  minWidth: "32px",
  minHeight: "32px",
  padding: "0 10px",
  borderWidth: "1px",
  borderStyle: "solid" as const,
  borderColor: lightThemeTokens.borderSoft,
  borderRadius: "999px",
  backgroundColor: lightThemeTokens.surfaceOverlayStrong,
  color: lightThemeTokens.textStrong,
  boxShadow: lightShadowTokens.marker,
};
