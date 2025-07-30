import type { PathValue } from '../../settings/paths';
import type { Terrain, TerrainKey } from '../../settings/terrains';
import type { TextureWeightValue } from '../../settings/textures';
import type { Coordinate } from '../../util/arr';
import type { Grid } from '../../util/grid';

export interface PathFindingState {
  start: Coordinate;
  end: Coordinate;
  path: Grid<PathValue>;
  terrainMap: Grid<TextureWeightValue>;
  sampleTerrain: TerrainKey | null;
}

export type PathReducerAction =
  | AddPathNodeAction
  | AddVisitedNodeAction
  | ClearVisitedNodesAction
  | ResetPathAction
  | UpdateEndNodeAction
  | UpdateStartNodeAction
  | UpdateTerrainTexture
  | UseSampleTerrainAction;

interface AddPathNodeAction {
  type: 'ADD_PATH_COORDINATE';
  coordinate: Coordinate;
}

interface AddVisitedNodeAction {
  type: 'ADD_VISITED_COORDINATE';
  coordinate: Coordinate;
}

interface ClearVisitedNodesAction {
  type: 'CLEAR_VISITED_NODES';
}

interface ResetPathAction {
  type: 'RESET_PATH';
}

interface UseSampleTerrainAction {
  type: 'USE_SAMPLE_TERRAIN';
  terrain: Terrain;
}

interface UpdateTerrainTexture {
  type: 'UPDATE_TERRAIN_TEXTURE';
  coordinate: Coordinate;
  texture: TextureWeightValue;
}

interface UpdateEndNodeAction {
  type: 'UPDATE_END_NODE';
  coordinate: Coordinate;
}

interface UpdateStartNodeAction {
  type: 'UPDATE_START_NODE';
  coordinate: Coordinate;
}
