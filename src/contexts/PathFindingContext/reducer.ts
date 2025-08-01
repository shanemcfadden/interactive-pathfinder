import { Path } from '../../settings/paths';
import { areCoordinatesEqual } from '../../util/coordinate';
import type { PathReducerAction, PathFindingState } from './types';

export const reducer = (
  state: PathFindingState,
  action: PathReducerAction,
): PathFindingState => {
  switch (action.type) {
    case 'RESET_PATH':
      return {
        ...state,
        isFindingPath: false,
        path: state.path.map(() => Path.Unvisited),
      };

    case 'CLEAR_VISITED_NODES':
      return {
        ...state,
        isFindingPath: false,
        path: state.path.map((value) =>
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
        sampleTerrain: null,
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
        sampleTerrain: null,
      };
    }

    case 'ADD_PATH_COORDINATE': {
      const coordinateValue = state.path.getCoordinate(action.coordinate);

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
        isFindingPath: true,
        path: state.path.map((value, [i, j]) => {
          if (areCoordinatesEqual(action.coordinate, [i, j])) {
            return Path.Path;
          }
          return value;
        }),
      };
    }

    case 'ADD_VISITED_COORDINATE': {
      const coordinateValue = state.path.getCoordinate(action.coordinate);

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
        isFindingPath: true,
        path: state.path.map((value, [i, j]) => {
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
        sampleTerrain: action.terrain.key,
        terrainMap: action.terrain.stateOfNodes,
        ...(action.terrain.startNode
          ? { start: action.terrain.startNode }
          : {}),
        ...(action.terrain.endNode ? { end: action.terrain.endNode } : {}),
      };
    }

    case 'UPDATE_TERRAIN_TEXTURE': {
      const currentTexture = state.terrainMap.getCoordinate(action.coordinate);

      // Replacing a texture with the same texture should not trigger a rerender
      if (currentTexture === action.texture) {
        return state;
      }

      return {
        ...state,
        terrainMap: state.terrainMap.map((value, [i, j]) => {
          if (areCoordinatesEqual(action.coordinate, [i, j])) {
            return action.texture;
          }
          return value;
        }),
        sampleTerrain: null,
      };
    }
  }
};
