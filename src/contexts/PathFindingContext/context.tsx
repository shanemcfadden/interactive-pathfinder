import { createContext, useContext, type Dispatch } from 'react';
import type { PathReducerAction, PathFindingState } from './types';
import { INITIAL_PATH_FINDING_STATE } from './constants';

export const PathFindingContext = createContext<PathFindingState>(
  INITIAL_PATH_FINDING_STATE,
);
export const usePathFindingContext = () => useContext(PathFindingContext);

export const PathFindingDispatchContext = createContext<
  Dispatch<PathReducerAction>
>(() => {});
export const usePathFindingDispatchContext = () =>
  useContext(PathFindingDispatchContext);
