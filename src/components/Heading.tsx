import { memo, type JSX, type PropsWithChildren } from "react";
import { Margin } from "./Margin";

type HeadingLevel = 1 | 2;

export const Heading = memo(
  ({ children, level }: PropsWithChildren<{ level: HeadingLevel }>) => {
    const HeadingTag = HEADING_LEVEL_TO_HEADING_TAG[level];

    return (
      <Margin>
        <HeadingTag
          className={[
            "text-center",
            "font-bold",
            HEADING_LEVEL_TO_TEXT_SIZE[level],
          ].join(" ")}
        >
          {children}
        </HeadingTag>
      </Margin>
    );
  },
);

const HEADING_LEVEL_TO_TEXT_SIZE: Record<HeadingLevel, string> = {
  1: "text-4xl",
  2: "text-2xl",
};

const HEADING_LEVEL_TO_HEADING_TAG: Record<
  HeadingLevel,
  keyof JSX.IntrinsicElements
> = {
  1: "h1",
  2: "h2",
};
