import type { PropsWithChildren } from "react";
import { PathFindingContextProvider } from "./PathFindingContextProvider";
import { UserActionContextProvider } from "./UserActionContextProvider";
import { ModalContextProvider } from "./ModalContextProvider";

export const AppContextProvider = ({ children }: PropsWithChildren) => (
  <ModalContextProvider>
    <PathFindingContextProvider>
      <UserActionContextProvider>{children}</UserActionContextProvider>
    </PathFindingContextProvider>
  </ModalContextProvider>
);
