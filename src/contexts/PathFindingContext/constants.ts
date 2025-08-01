import {
  DEFAULT_END_NODE,
  DEFAULT_START_NODE,
  GRID_HEIGHT_NODES,
  GRID_WIDTH_NODES,
} from '../../settings/grid';
import { Path, type PathValue } from '../../settings/paths';
import { Grid } from '../../util/grid';
import { DEFAULT_STARTING_TERRAIN } from '../../settings/terrains';
import type { PathFindingState } from './types';

export const INITIAL_PATH_FINDING_STATE: PathFindingState = {
  start: DEFAULT_START_NODE,
  end: DEFAULT_END_NODE,
  isPathFinderActive: false,
  path: new Grid<PathValue>(
    Array.from({ length: GRID_HEIGHT_NODES }, () =>
      Array.from({ length: GRID_WIDTH_NODES }, () => Path.Unvisited),
    ),
  ),
  sampleTerrain: DEFAULT_STARTING_TERRAIN.key,
  terrainMap: DEFAULT_STARTING_TERRAIN.stateOfNodes,
};
