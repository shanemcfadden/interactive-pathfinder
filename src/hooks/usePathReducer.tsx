import { useMemo, useReducer, type Dispatch } from 'react';
import {
  DEFAULT_END_NODE,
  DEFAULT_START_NODE,
  GRID_HEIGHT_NODES,
  GRID_WIDTH_NODES,
} from '../settings/grid';
import { PATHS_NAME_VALUE_MAP } from '../settings/paths';
import { areCoordinatesEqual, type Coordinate } from '../util/arr';
import { findCoordinateInGrid, mapGrid, type Grid } from '../util/grid';

export type DispatchPath = Dispatch<PathReducerAction>;

export const usePathReducer = () => {
  const [stateOfPath, dispatchPath] = useReducer(
    reducer,
    {
      start: DEFAULT_START_NODE,
      end: DEFAULT_END_NODE,
    },
    getInitalPathState,
  );

  const startNodeRaw = useMemo(() => {
    const coordinate = findCoordinateInGrid(
      stateOfPath,
      (value) => value === PATHS_NAME_VALUE_MAP.start,
    );

    if (!coordinate) {
      throw new Error('Failed to find start node in path state');
    }
    return coordinate;
  }, [stateOfPath]);

  const startNode: Coordinate = useMemo(
    () => [startNodeRaw[0], startNodeRaw[1]],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [startNodeRaw[0], startNodeRaw[1]],
  );

  const endNodeRaw = useMemo(() => {
    const coordinate = findCoordinateInGrid(
      stateOfPath,
      (value) => value === PATHS_NAME_VALUE_MAP.end,
    );

    if (!coordinate) {
      throw new Error('Failed to find end node in path state');
    }
    return coordinate;
  }, [stateOfPath]);

  const endNode: Coordinate = useMemo(
    () => [endNodeRaw[0], endNodeRaw[1]],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endNodeRaw[0], endNodeRaw[1]],
  );

  return {
    startNode,
    stateOfPath,
    endNode,
    dispatchPath,
  };
};

const reducer = (
  state: Grid<number>,
  action: PathReducerAction,
): Grid<number> => {
  switch (action.type) {
    case 'RESET_PATH':
      return mapGrid(state, (value) => {
        if (
          value === PATHS_NAME_VALUE_MAP.start ||
          value === PATHS_NAME_VALUE_MAP.end
        ) {
          return value;
        }
        return 0;
      });

    case 'CLEAR_VISITED_NODES':
      return mapGrid(state, (value) =>
        value === PATHS_NAME_VALUE_MAP.visited ? 0 : value,
      );

    case 'UPDATE_START_NODE': {
      const [a, b] = action.coordinate;
      const coordinateValue = state[a][b];

      if (
        // Replacing start node with start should not trigger a rerender
        coordinateValue === PATHS_NAME_VALUE_MAP.start ||
        // Replacing end node with start is invalid
        coordinateValue === PATHS_NAME_VALUE_MAP.end
      ) {
        return state;
      }

      return mapGrid(state, (value, [i, j]) => {
        if (areCoordinatesEqual(action.coordinate, [i, j])) {
          return PATHS_NAME_VALUE_MAP.start;
        }
        if (value === PATHS_NAME_VALUE_MAP.start) {
          return 0;
        }
        return value;
      });
    }

    case 'UPDATE_END_NODE': {
      const [a, b] = action.coordinate;
      const coordinateValue = state[a][b];

      if (
        // Replacing end node with end should not trigger a rerender
        coordinateValue === PATHS_NAME_VALUE_MAP.end ||
        // Replacing start node with end is invalid
        coordinateValue === PATHS_NAME_VALUE_MAP.start
      ) {
        return state;
      }

      return mapGrid(state, (value, [i, j]) => {
        if (areCoordinatesEqual(action.coordinate, [i, j])) {
          return PATHS_NAME_VALUE_MAP.end;
        }
        if (value === PATHS_NAME_VALUE_MAP.end) {
          return 0;
        }
        return value;
      });
    }

    case 'ADD_PATH_COORDINATE': {
      const [a, b] = action.coordinate;
      const coordinateValue = state[a][b];

      if (
        // Adding a path node on start or end is not valid
        coordinateValue === PATHS_NAME_VALUE_MAP.start ||
        coordinateValue === PATHS_NAME_VALUE_MAP.end ||
        // Replacing a path node with a path node should not trigger a rerender
        coordinateValue === PATHS_NAME_VALUE_MAP.path
      ) {
        return state;
      }

      return mapGrid(state, (value, [i, j]) => {
        if (areCoordinatesEqual(action.coordinate, [i, j])) {
          return PATHS_NAME_VALUE_MAP.path;
        }
        return value;
      });
    }

    case 'ADD_VISITED_COORDINATE': {
      const [a, b] = action.coordinate;
      const coordinateValue = state[a][b];

      if (
        // Adding a visited node on start or end is not valid
        coordinateValue === PATHS_NAME_VALUE_MAP.start ||
        coordinateValue === PATHS_NAME_VALUE_MAP.end ||
        // Replacing a visited node with a visited node should not trigger a rerender
        coordinateValue === PATHS_NAME_VALUE_MAP.visited
      ) {
        return state;
      }

      return mapGrid(state, (value, [i, j]) => {
        if (areCoordinatesEqual(action.coordinate, [i, j])) {
          return PATHS_NAME_VALUE_MAP.visited;
        }
        return value;
      });
    }
  }
};

const getInitalPathState = ({
  start,
  end,
}: {
  start: Coordinate;
  end: Coordinate;
}) =>
  Array.from({ length: GRID_HEIGHT_NODES }, (_, i) =>
    Array.from({ length: GRID_WIDTH_NODES }, (_, j) => {
      if (areCoordinatesEqual(start, [i, j])) {
        return PATHS_NAME_VALUE_MAP.start;
      }
      if (areCoordinatesEqual(end, [i, j])) {
        return PATHS_NAME_VALUE_MAP.end;
      }
      return 0;
    }),
  );

type PathReducerAction =
  | ResetPathAction
  | ClearVisitedNodesAction
  | UpdateStartNodeAction
  | UpdateEndNodeAction
  | AddPathNodeAction
  | AddVisitedNodeAction;

interface ResetPathAction {
  type: 'RESET_PATH';
}

interface ClearVisitedNodesAction {
  type: 'CLEAR_VISITED_NODES';
}

interface UpdateStartNodeAction {
  type: 'UPDATE_START_NODE';
  coordinate: Coordinate;
}

interface UpdateEndNodeAction {
  type: 'UPDATE_END_NODE';
  coordinate: Coordinate;
}

interface AddPathNodeAction {
  type: 'ADD_PATH_COORDINATE';
  coordinate: Coordinate;
}

interface AddVisitedNodeAction {
  type: 'ADD_VISITED_COORDINATE';
  coordinate: Coordinate;
}
