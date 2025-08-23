import { createContext, useContext, type Dispatch } from "react";
import type { UserAction } from "./types";

export const UserActionContext = createContext<UserAction>({
  type: "NO_ACTION",
});

export const useUserActionContext = () => useContext(UserActionContext);
export const UserActionDispatchContext = createContext<Dispatch<UserAction>>(
  () => {},
);
export const useUserActionDispatchContext = () =>
  useContext(UserActionDispatchContext);
