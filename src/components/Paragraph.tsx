import { memo, type PropsWithChildren } from "react";
import { Margin } from "./Margin";

export const Paragraph = memo(({ children }: PropsWithChildren) => (
  <Margin size="small">
    <p>{children}</p>
  </Margin>
));
