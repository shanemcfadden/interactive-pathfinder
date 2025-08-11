import type { PathValue } from "../../settings/paths";
import type { Terrain, TerrainKey } from "../../settings/terrains";
import type { TextureWeightValue } from "../../settings/textures";
import type { Coordinate } from "../../util/coordinate";
import type { Grid } from "../../util/grid";

export interface PathFindingState {
  start: Coordinate;
  end: Coordinate;
  isPathFinderActive: boolean;
  path: Grid<PathValue>;
  textureMap: Grid<TextureWeightValue>;
  sampleTerrain: TerrainKey | null;
}

export type PathReducerAction =
  | AddPathCoordinateAction
  | AddVisitedCoordinateAction
  | ClearVisitedCoordinatesAction
  | ResetPathAction
  | UpdateEndCoordinateAction
  | UpdateStartCoordinateAction
  | UpdateTerrainTexture
  | UseSampleTerrainAction;

interface AddPathCoordinateAction {
  type: "ADD_PATH_COORDINATE";
  coordinate: Coordinate;
}

interface AddVisitedCoordinateAction {
  type: "ADD_VISITED_COORDINATE";
  coordinate: Coordinate;
}

interface ClearVisitedCoordinatesAction {
  type: "CLEAR_VISITED_COORDINATES";
}

interface ResetPathAction {
  type: "RESET_PATH";
}

interface UseSampleTerrainAction {
  type: "USE_SAMPLE_TERRAIN";
  terrain: Terrain;
}

interface UpdateTerrainTexture {
  type: "UPDATE_TERRAIN_TEXTURE";
  coordinate: Coordinate;
  texture: TextureWeightValue;
}

interface UpdateEndCoordinateAction {
  type: "UPDATE_END_COORDINATE";
  coordinate: Coordinate;
}

interface UpdateStartCoordinateAction {
  type: "UPDATE_START_COORDINATE";
  coordinate: Coordinate;
}
