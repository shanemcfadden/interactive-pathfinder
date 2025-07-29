import { useReducer, type Dispatch } from 'react';
import {
  DEFAULT_END_NODE,
  DEFAULT_START_NODE,
  GRID_HEIGHT_NODES,
  GRID_WIDTH_NODES,
} from '../settings/grid';
import { Path, type PathValue } from '../settings/paths';
import { areCoordinatesEqual, type Coordinate } from '../util/arr';
import { Grid } from '../util/grid';
import { TextureWeight, type TextureWeightValue } from '../settings/textures';

export type DispatchPath = Dispatch<PathReducerAction>;

export const usePathReducer = () => {
  return useReducer(reducer, {
    start: DEFAULT_START_NODE,
    end: DEFAULT_END_NODE,
    pathValues: new Grid<PathValue>(
      Array.from({ length: GRID_HEIGHT_NODES }, () =>
        Array.from({ length: GRID_WIDTH_NODES }, () => {
          return Path.Unvisited;
        }),
      ),
    ),
    terrain: new Grid<TextureWeightValue>(
      Array.from({ length: GRID_HEIGHT_NODES }, () =>
        Array.from({ length: GRID_WIDTH_NODES }, () => {
          return TextureWeight.Grass;
        }),
      ),
    ),
  });
};

export interface PathState {
  start: Coordinate;
  end: Coordinate;
  pathValues: Grid<PathValue>;
  terrain: Grid<TextureWeightValue>;
}
const reducer = (state: PathState, action: PathReducerAction): PathState => {
  switch (action.type) {
    case 'RESET_PATH':
      return {
        ...state,
        pathValues: state.pathValues.map(() => Path.Unvisited),
      };

    case 'CLEAR_VISITED_NODES':
      return {
        ...state,
        pathValues: state.pathValues.map((value) =>
          value === Path.Visited ? Path.Unvisited : value,
        ),
      };

    case 'UPDATE_START_NODE': {
      if (
        // Replacing start node with start should not trigger a rerender
        areCoordinatesEqual(action.coordinate, state.start) ||
        // Replacing end node with start is invalid
        areCoordinatesEqual(action.coordinate, state.end)
      ) {
        return state;
      }

      return {
        ...state,
        start: action.coordinate,
      };
    }

    case 'UPDATE_END_NODE': {
      if (
        // Replacing end node with end should not trigger a rerender
        areCoordinatesEqual(action.coordinate, state.end) ||
        // Replacing start node with end is invalid
        areCoordinatesEqual(action.coordinate, state.start)
      ) {
        return state;
      }

      return {
        ...state,
        end: action.coordinate,
      };
    }

    case 'ADD_PATH_COORDINATE': {
      const coordinateValue = state.pathValues.getCoordinate(action.coordinate);

      if (
        // Adding a path node on start or end is not valid
        areCoordinatesEqual(action.coordinate, state.start) ||
        areCoordinatesEqual(action.coordinate, state.end) ||
        // Replacing a path node with a path node should not trigger a rerender
        coordinateValue === Path.Path
      ) {
        return state;
      }

      return {
        ...state,
        pathValues: state.pathValues.map((value, [i, j]) => {
          if (areCoordinatesEqual(action.coordinate, [i, j])) {
            return Path.Path;
          }
          return value;
        }),
      };
    }

    case 'ADD_VISITED_COORDINATE': {
      const coordinateValue = state.pathValues.getCoordinate(action.coordinate);

      if (
        // Adding a visited node on start or end is not valid
        areCoordinatesEqual(action.coordinate, state.start) ||
        areCoordinatesEqual(action.coordinate, state.end) ||
        // Replacing a visited node with a visited node should not trigger a rerender
        coordinateValue === Path.Visited
      ) {
        return state;
      }

      return {
        ...state,
        pathValues: state.pathValues.map((value, [i, j]) => {
          if (areCoordinatesEqual(action.coordinate, [i, j])) {
            return Path.Visited;
          }
          return value;
        }),
      };
    }

    case 'USE_SAMPLE_TERRAIN': {
      return {
        ...state,
        terrain: action.terrain,
        ...(action.start ? { start: action.start } : {}),
        ...(action.end ? { end: action.end } : {}),
      };
    }

    case 'UPDATE_TERRAIN_TEXTURE': {
      const currentTexture = state.terrain.getCoordinate(action.coordinate);

      // Replacing a texture with the same texture should not trigger a rerender
      if (currentTexture === action.texture) {
        return state;
      }

      return {
        ...state,
        terrain: state.terrain.map((value, [i, j]) => {
          if (areCoordinatesEqual(action.coordinate, [i, j])) {
            return action.texture;
          }
          return value;
        }),
      };
    }
  }
};

type PathReducerAction =
  | ResetPathAction
  | ClearVisitedNodesAction
  | UpdateStartNodeAction
  | UpdateEndNodeAction
  | AddPathNodeAction
  | AddVisitedNodeAction
  | UseSampleTerrainAction
  | UpdateTerrainTexture;

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

interface UseSampleTerrainAction {
  type: 'USE_SAMPLE_TERRAIN';
  terrain: Grid<TextureWeightValue>;
  start?: Coordinate | undefined;
  end?: Coordinate | undefined;
}

interface UpdateTerrainTexture {
  type: 'UPDATE_TERRAIN_TEXTURE';
  coordinate: Coordinate;
  texture: TextureWeightValue;
}
