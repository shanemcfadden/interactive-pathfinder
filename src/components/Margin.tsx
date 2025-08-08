import type { PropsWithChildren } from "react";

interface MarginProps {
  size?: "small" | "medium" | "large";
}

export const Margin = ({
  children,
  size = "medium",
}: PropsWithChildren<MarginProps>) => (
  <div className={MARGIN_SIZE_TO_CLASS_NAMES[size]}>{children}</div>
);

const MARGIN_SIZE_TO_CLASS_NAMES: Record<
  NonNullable<MarginProps["size"]>,
  string
> = {
  small: "my-2",
  medium: "my-4",
  large: "my-8",
};
