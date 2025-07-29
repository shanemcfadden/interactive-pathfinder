import {
  DEFAULT_END_NODE,
  DEFAULT_START_NODE,
  GRID_HEIGHT_NODES,
  GRID_WIDTH_NODES,
} from '../../settings/grid';
import { Path, type PathValue } from '../../settings/paths';
import { Grid } from '../../util/grid';
import {
  TextureWeight,
  type TextureWeightValue,
} from '../../settings/textures';

export const INITIAL_PATH_FINDING_STATE = {
  start: DEFAULT_START_NODE,
  end: DEFAULT_END_NODE,
  path: new Grid<PathValue>(
    Array.from({ length: GRID_HEIGHT_NODES }, () =>
      Array.from({ length: GRID_WIDTH_NODES }, () => Path.Unvisited),
    ),
  ),
  terrainMap: new Grid<TextureWeightValue>(
    Array.from({ length: GRID_HEIGHT_NODES }, () =>
      Array.from({ length: GRID_WIDTH_NODES }, () => TextureWeight.Grass),
    ),
  ),
};
