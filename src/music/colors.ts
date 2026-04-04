export type DegreeColor = {
  token: string;
  hex: string;
};

export const degreeColorEntries = [
  { degreeLabel: "1", token: "degreeRoot", hex: "#D94A4A" },
  { degreeLabel: "b2 / #1", token: "degreeFlat2", hex: "#D97A3A" },
  { degreeLabel: "2", token: "degree2", hex: "#E0A43A" },
  { degreeLabel: "b3 / #2", token: "degreeFlat3", hex: "#C9A227" },
  { degreeLabel: "3", token: "degree3", hex: "#A8B832" },
  { degreeLabel: "4", token: "degree4", hex: "#4FAF5B" },
  { degreeLabel: "#4 / b5", token: "degreeSharp4", hex: "#2FA7A0" },
  { degreeLabel: "5", token: "degree5", hex: "#3E86D1" },
  { degreeLabel: "b6 / #5", token: "degreeFlat6", hex: "#5C6FD6" },
  { degreeLabel: "6", token: "degree6", hex: "#7A59C8" },
  { degreeLabel: "b7", token: "degreeFlat7", hex: "#B05BCB" },
  { degreeLabel: "7", token: "degree7", hex: "#D45AA0" },
] as const;

export const degreeColorMap = Object.fromEntries(
  degreeColorEntries.map(({ degreeLabel, token, hex }) => [degreeLabel, { token, hex }]),
) as Record<string, DegreeColor>;

const degreeAliases: Record<string, keyof typeof degreeColorMap> = {
  b2: "b2 / #1",
  "#1": "b2 / #1",
  "#1 / b2": "b2 / #1",
  "b2 / #1": "b2 / #1",
  b3: "b3 / #2",
  "#2": "b3 / #2",
  "#2 / b3": "b3 / #2",
  "b3 / #2": "b3 / #2",
  "#4": "#4 / b5",
  b5: "#4 / b5",
  "b5 / #4": "#4 / b5",
  "#4 / b5": "#4 / b5",
  b6: "b6 / #5",
  "#5": "b6 / #5",
  "#5 / b6": "b6 / #5",
  "b6 / #5": "b6 / #5",
};

export function getDegreeColor(degreeLabel: string): DegreeColor {
  const canonicalLabel = degreeAliases[degreeLabel] ?? degreeLabel;
  return degreeColorMap[canonicalLabel] ?? degreeColorMap["1"];
}
