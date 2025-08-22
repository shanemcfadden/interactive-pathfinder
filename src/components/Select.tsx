import { memo, type ChangeEventHandler } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

export const Select = memo(
  ({
    id,
    "data-testid": dataTestId,
    disabled,
    label,
    onChange,
    options,
    value: optionValue,
  }: {
    id: string;
    label: string;
    value: string;
    "data-testid"?: string;
    disabled: boolean;
    onChange: ChangeEventHandler<HTMLSelectElement>;
    options: SelectOption[];
  }) => (
    <div className="flex items-center">
      <label className="font-bold mr-2" htmlFor={id}>
        {label}:
      </label>
      <select
        className={[
          "bg-white",
          "cursor-pointer",
          "py-2",
          "px-3",
          "rounded-full",
          "text-black",
          "disabled:bg-gray-200",
          "disabled:cursor-not-allowed",
        ].join(" ")}
        data-testid={dataTestId}
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
