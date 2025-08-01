import { memo, type ChangeEventHandler } from 'react';

export interface SelectOption {
  label: string;
  value: string;
}

export const Select = memo(
  ({
    id,
    label,
    value: optionValue,
    onChange,
    disabled,
    options,
  }: {
    id: string;
    label: string;
    value: string;
    onChange: ChangeEventHandler<HTMLSelectElement>;
    disabled: boolean;
    options: SelectOption[];
  }) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={optionValue}
        onChange={onChange}
        disabled={disabled}
      >
        {options.map(({ value: optionValue, label: optionLabel }) => (
          <option value={optionValue} key={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  ),
);
