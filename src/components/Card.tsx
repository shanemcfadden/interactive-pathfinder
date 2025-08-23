import { Margin } from "./Margin";
import type { PropsWithChildren } from "react";

export const Card = ({ children }: PropsWithChildren) => (
  <Margin>
    <div className="inline-block w-full rounded-md px-8 bg-white text-black">
      <Margin size="large">{children}</Margin>
    </div>
  </Margin>
);
