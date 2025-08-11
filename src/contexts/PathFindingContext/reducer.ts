import { Path } from "../../settings/paths";
import { areCoordinatesEqual } from "../../util/coordinate";
import type { PathReducerAction, PathFindingState } from "./types";

export const reducer = (
  state: PathFindingState,
  action: PathReducerAction,
): PathFindingState => {
  switch (action.type) {
    case "RESET_PATH":
      return {
        ...state,
        isPathFinderActive: false,
        path: state.path.map(() => Path.Unvisited),
      };

    case "CLEAR_VISITED_COORDINATES":
      return {
        ...state,
        isPathFinderActive: true,
        path: state.path.map((value) =>
          value === Path.Visited ? Path.Unvisited : value,
        ),
      };

    case "UPDATE_START_COORDINATE": {
      if (
        // Replacing start coordinate with start should not trigger a rerender
        areCoordinatesEqual(action.coordinate, state.start) ||
        // Replacing end coordinate with start is invalid
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

    case "UPDATE_END_COORDINATE": {
      if (
        // Replacing end coordinate with end should not trigger a rerender
        areCoordinatesEqual(action.coordinate, state.end) ||
        // Replacing start coordinate with end is invalid
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

    case "ADD_PATH_COORDINATE": {
      const coordinateValue = state.path.getCoordinate(action.coordinate);

      if (
        // Adding a path coordinate on start or end is not valid
        areCoordinatesEqual(action.coordinate, state.start) ||
        areCoordinatesEqual(action.coordinate, state.end) ||
        // Replacing a path coordinate with a path coordinate should not trigger a rerender
        coordinateValue === Path.Path
      ) {
        return state;
      }

      return {
        ...state,
        isPathFinderActive: true,
        path: state.path.map((value, [i, j]) => {
          if (areCoordinatesEqual(action.coordinate, [i, j])) {
            return Path.Path;
          }
          return value;
        }),
      };
    }

    case "ADD_VISITED_COORDINATE": {
      const coordinateValue = state.path.getCoordinate(action.coordinate);

      if (
        // Adding a visited coordinate on start or end is not valid
        areCoordinatesEqual(action.coordinate, state.start) ||
        areCoordinatesEqual(action.coordinate, state.end) ||
        // Replacing a visited coordinate with a visited coordinate should not trigger a rerender
        coordinateValue === Path.Visited
      ) {
        return state;
      }

      return {
        ...state,
        isPathFinderActive: true,
        path: state.path.map((value, [i, j]) => {
          if (areCoordinatesEqual(action.coordinate, [i, j])) {
            return Path.Visited;
          }
          return value;
        }),
      };
    }

    case "USE_SAMPLE_TERRAIN": {
      return {
        ...state,
        sampleTerrain: action.terrain.key,
        textureMap: action.terrain.textureMap,
        ...(action.terrain.startCoordinate
          ? { start: action.terrain.startCoordinate }
          : {}),
        ...(action.terrain.endCoordinate
          ? { end: action.terrain.endCoordinate }
          : {}),
      };
    }

    case "UPDATE_TERRAIN_TEXTURE": {
      const currentTexture = state.textureMap.getCoordinate(action.coordinate);

      // Replacing a texture with the same texture should not trigger a rerender
      if (currentTexture === action.texture) {
        return state;
      }

      return {
        ...state,
        textureMap: state.textureMap.map((value, [i, j]) => {
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
