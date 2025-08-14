import { memo, type PropsWithChildren } from "react";

export const Button = memo(
  ({
    actionType = "default",
    children,
    disabled = false,
    isActive = false,
    onClickFn,
    "data-testid": dataTestId,
  }: PropsWithChildren<{
    actionType?: ButtonActionType;
    disabled?: boolean;
    isActive?: boolean;
    onClickFn: () => void;
    "data-testid"?: string;
  }>) => (
    <button
      className={[
        "rounded-full",
        "py-2",
        "px-4",
        "cursor-pointer",
        "font-bold",
        "disabled:cursor-not-allowed",
        "disabled:text-gray-200",
        "text-white",
        isActive ? "ring-4" : "",
        ACTION_TYPE_TO_CLASS[actionType],
      ].join(" ")}
      type="button"
      onClick={onClickFn}
      data-testid={dataTestId}
      data-active={isActive}
      disabled={disabled}
    >
      {children}
    </button>
  ),
);

export type ButtonActionType = "danger" | "default" | "submit";

const ACTION_TYPE_TO_CLASS: Record<ButtonActionType, string> = {
  default: "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 ",
  danger: "bg-red-600 hover:bg-red-700 disabled:bg-red-400",
  submit: "bg-green-600 hover:bg-green-700 disabled:bg-green-400",
};
