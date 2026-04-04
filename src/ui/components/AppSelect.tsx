import * as stylex from "@stylexjs/stylex";

import { controlStyles } from "../styles/controls.stylex";

export type AppSelectOption = {
  value: string;
  label: string;
};

type AppSelectProps = {
  label: string;
  value: string;
  options: AppSelectOption[];
  onChange: (value: string) => void;
  testId?: string;
};

export function AppSelect({ label, value, options, onChange, testId }: AppSelectProps) {
  const selectId = `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-select`;

  return (
    <label htmlFor={selectId} {...stylex.props(controlStyles.field)}>
      <span {...stylex.props(controlStyles.fieldLabel)}>{label}</span>
      <span {...stylex.props(controlStyles.selectWrap)}>
        <select
          id={selectId}
          data-testid={testId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          {...stylex.props(controlStyles.selectControl)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span aria-hidden="true" {...stylex.props(controlStyles.selectArrow)}>
          ▾
        </span>
      </span>
    </label>
  );
}
