import type { AccidentalPolicy } from "./keys";

type SolfegeDegreeLabel =
  | "1"
  | "b2"
  | "b2 / #1"
  | "2"
  | "b3"
  | "b3 / #2"
  | "3"
  | "4"
  | "#4 / b5"
  | "5"
  | "b6"
  | "b6 / #5"
  | "6"
  | "b7"
  | "7";

const degreeAliases: Record<string, SolfegeDegreeLabel> = {
  "b2 / #1": "b2",
  "#1 / b2": "b2",
  "b3 / #2": "b3",
  "#2 / b3": "b3",
  "#4 / b5": "#4 / b5",
  "b5 / #4": "#4 / b5",
  "b6 / #5": "b6",
  "#5 / b6": "b6",
};

const solfegeTable: Record<AccidentalPolicy, Record<SolfegeDegreeLabel, string>> = {
  sharp: {
    "1": "Do",
    b2: "Di",
    "b2 / #1": "Di",
    "2": "Re",
    b3: "Ri",
    "b3 / #2": "Ri",
    "3": "Mi",
    "4": "Fa",
    "#4 / b5": "Fi",
    "5": "So",
    b6: "Si",
    "b6 / #5": "Si",
    "6": "La",
    b7: "Li",
    "7": "Ti",
  },
  flat: {
    "1": "Do",
    b2: "Ra",
    "b2 / #1": "Ra",
    "2": "Re",
    b3: "Me",
    "b3 / #2": "Me",
    "3": "Mi",
    "4": "Fa",
    "#4 / b5": "Se",
    "5": "So",
    b6: "Le",
    "b6 / #5": "Le",
    "6": "La",
    b7: "Te",
    "7": "Ti",
  },
  natural: {
    "1": "Do",
    b2: "Di",
    "b2 / #1": "Di",
    "2": "Re",
    b3: "Ri",
    "b3 / #2": "Ri",
    "3": "Mi",
    "4": "Fa",
    "#4 / b5": "Fi",
    "5": "So",
    b6: "Si",
    "b6 / #5": "Si",
    "6": "La",
    b7: "Li",
    "7": "Ti",
  },
};

export function getSolfegeLabel(degreeLabel: string, accidentalPolicy: AccidentalPolicy): string {
  const canonicalDegreeLabel =
    Object.prototype.hasOwnProperty.call(degreeAliases, degreeLabel)
      ? degreeAliases[degreeLabel]
      : (degreeLabel as SolfegeDegreeLabel);

  return solfegeTable[accidentalPolicy][canonicalDegreeLabel];
}
