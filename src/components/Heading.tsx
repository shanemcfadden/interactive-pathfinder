import type { PropsWithChildren } from "react";
import { Margin } from "./Margin";

export const Heading = ({ children }: PropsWithChildren) => (
  <Margin>
    <h1 className="text-center text-4xl">{children}</h1>
  </Margin>
);
