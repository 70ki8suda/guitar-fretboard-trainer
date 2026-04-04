import * as stylex from "@stylexjs/stylex";
import { Select } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";

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
  const labelId = `${selectId}-label`;
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div {...stylex.props(controlStyles.field)}>
      <span id={labelId} {...stylex.props(controlStyles.fieldLabel)}>
        {label}
      </span>
      <Select.Root value={value} onValueChange={(nextValue) => onChange(nextValue ?? "")}>
        <Select.Trigger
          id={selectId}
          aria-labelledby={labelId}
          data-testid={testId}
          {...stylex.props(controlStyles.selectTrigger)}
        >
          <span {...stylex.props(controlStyles.selectTriggerValue)}>
            {selectedOption?.label ?? value}
          </span>
          <Select.Icon {...stylex.props(controlStyles.selectTriggerIcon)}>
            <ChevronDown size={16} />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Positioner sideOffset={10} alignItemWithTrigger={false}>
            <Select.Popup
              data-testid={testId ? `${testId}-popup` : undefined}
              {...stylex.props(controlStyles.selectPopup)}
            >
              <Select.Arrow {...stylex.props(controlStyles.selectPopupArrow)} />
              <Select.List {...stylex.props(controlStyles.selectList)}>
                {options.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    {...stylex.props(controlStyles.selectItem)}
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator {...stylex.props(controlStyles.selectItemIndicator)}>
                      <Check size={14} />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
