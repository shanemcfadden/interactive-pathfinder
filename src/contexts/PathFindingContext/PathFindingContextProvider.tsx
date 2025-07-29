import { useReducer, type PropsWithChildren } from 'react';
import { reducer } from './reducer';
import { INITIAL_PATH_FINDING_STATE } from './constants';
import { PathFindingContext, PathFindingDispatchContext } from './context';

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
