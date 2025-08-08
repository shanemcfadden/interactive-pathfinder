import type { PropsWithChildren } from "react";
import { Margin } from "./Margin";

export const Card = ({ children }: PropsWithChildren) => (
  <Margin>
    <div className="inline-block rounded-md px-8 bg-white text-black">
      <Margin size="large">{children}</Margin>
    </div>
  </Margin>
);
