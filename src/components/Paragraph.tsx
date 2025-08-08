import type { PropsWithChildren } from "react";
import { Margin } from "./Margin";

export const Paragraph = ({ children }: PropsWithChildren) => (
  <Margin size="small">
    <p>{children}</p>
  </Margin>
);
