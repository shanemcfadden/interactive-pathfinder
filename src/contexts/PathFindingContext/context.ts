import { type Dispatch, createContext, useContext } from "react";
import type { PathFindingState, PathReducerAction } from "./types";
import { INITIAL_PATH_FINDING_STATE } from "./constants";

export const PathFindingContext = createContext<PathFindingState>(
  INITIAL_PATH_FINDING_STATE,
);
export const usePathFindingContext = () => useContext(PathFindingContext);

export const PathFindingDispatchContext = createContext<
  Dispatch<PathReducerAction>
>(() => {});
export const usePathFindingDispatchContext = () =>
  useContext(PathFindingDispatchContext);
