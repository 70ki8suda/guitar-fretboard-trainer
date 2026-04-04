import * as stylex from "@stylexjs/stylex";

import { colorVars, fontVars, shadowVars } from "./tokens.stylex";

export const appShellStyles = stylex.create({
  appShell: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "360px minmax(0, 1fr)",
    gap: "24px",
    padding: "24px",
    width: "100%",
    boxSizing: "border-box",
    color: colorVars.textPrimary,
    fontFamily: fontVars.body,
    backgroundColor: colorVars.surfaceCanvas,
    backgroundImage:
      "radial-gradient(circle at 0% 0%, rgba(46, 142, 163, 0.14), transparent 32%), radial-gradient(circle at 100% 0%, rgba(213, 108, 37, 0.14), transparent 28%), linear-gradient(145deg, #f1e5d5 0%, #f7eddc 52%, #ead8c3 100%)",
    "@media (max-width: 1080px)": {
      gridTemplateColumns: "1fr",
      padding: "18px",
    },
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    minWidth: 0,
  },
  workspace: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    minWidth: 0,
  },
  topGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.35fr) minmax(320px, 0.65fr)",
    gap: "24px",
    "@media (max-width: 1280px)": {
      gridTemplateColumns: "1fr",
    },
  },
  glassPanel: {
    position: "relative",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colorVars.borderSubtle,
    borderRadius: "28px",
    backgroundColor: colorVars.surfacePanel,
    boxShadow: shadowVars.panel,
    backdropFilter: "blur(18px)",
    overflow: "hidden",
  },
  sectionBlock: {
    padding: "22px",
  },
  brandCard: {
    padding: "24px",
    display: "flex",
    alignItems: "center",
    gap: "18px",
    minHeight: "148px",
  },
  brandMark: {
    width: "60px",
    height: "60px",
    borderRadius: "18px",
    display: "grid",
    placeItems: "center",
    color: colorVars.textInverse,
    backgroundImage: `linear-gradient(140deg, ${colorVars.accentCyan} 0%, ${colorVars.accentAmber} 100%)`,
    boxShadow: shadowVars.accent,
  },
  eyebrow: {
    margin: 0,
    fontFamily: fontVars.mono,
    fontSize: "11px",
    letterSpacing: "0.24em",
    textTransform: "uppercase",
    color: colorVars.textSubtle,
  },
  heroTitle: {
    margin: "8px 0 0",
    fontSize: "34px",
    lineHeight: 1,
    letterSpacing: "-0.04em",
  },
  sectionHeading: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "12px",
  },
  sectionHeadingWrap: {
    flexWrap: "wrap",
  },
  sectionTitle: {
    margin: "6px 0 0",
    fontSize: "24px",
    lineHeight: 1.05,
  },
  iconButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
});
