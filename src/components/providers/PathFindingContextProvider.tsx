import {
  INITIAL_PATH_FINDING_STATE,
  PathFindingContext,
  PathFindingDispatchContext,
  reducer,
} from "@contexts/PathFindingContext";
import { type PropsWithChildren, useReducer } from "react";

export const PathFindingContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_PATH_FINDING_STATE);

  return (
    <PathFindingContext.Provider value={state}>
      <PathFindingDispatchContext.Provider value={dispatch}>
        {children}
      </PathFindingDispatchContext.Provider>
    </PathFindingContext.Provider>
  );
};
