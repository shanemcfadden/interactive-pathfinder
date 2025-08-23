import {
  DEFAULT_END_COORDINATE,
  DEFAULT_START_COORDINATE,
  GRID_HEIGHT_NODES,
  GRID_WIDTH_NODES,
  Path,
  type PathValue,
  DEFAULT_STARTING_TERRAIN,
} from "@constants";
import { Grid } from "../../utils";
import type { PathFindingState } from "./types";

export const INITIAL_PATH_FINDING_STATE: PathFindingState = {
  start: DEFAULT_START_COORDINATE,
  end: DEFAULT_END_COORDINATE,
  isPathFinderActive: false,
  path: new Grid<PathValue>(
    Array.from({ length: GRID_HEIGHT_NODES }, () =>
      Array.from({ length: GRID_WIDTH_NODES }, () => Path.Unvisited),
    ),
  ),
  sampleTerrain: DEFAULT_STARTING_TERRAIN.key,
  textureMap: DEFAULT_STARTING_TERRAIN.textureMap,
};
