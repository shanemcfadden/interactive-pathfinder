import { type PropsWithChildren, memo } from "react";
import { Margin } from "./Margin";

export const Paragraph = memo(({ children }: PropsWithChildren) => (
  <Margin size="small">
    <p>{children}</p>
  </Margin>
));
