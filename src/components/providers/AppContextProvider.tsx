import { ModalContextProvider } from "./ModalContextProvider";
import { PathFindingContextProvider } from "./PathFindingContextProvider";
import type { PropsWithChildren } from "react";
import { UserActionContextProvider } from "./UserActionContextProvider";

export const AppContextProvider = ({ children }: PropsWithChildren) => (
  <ModalContextProvider>
    <PathFindingContextProvider>
      <UserActionContextProvider>{children}</UserActionContextProvider>
    </PathFindingContextProvider>
  </ModalContextProvider>
);
