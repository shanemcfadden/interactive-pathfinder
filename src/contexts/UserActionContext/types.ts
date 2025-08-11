import type { TextureWeightValue } from "../../settings/textures";

export type UserAction =
  | NoAction
  | UpdateStartCoordinate
  | UpdateEndCoordinate
  | ApplyTexture
  | PrepareApplyTexture;

interface NoAction {
  type: "NO_ACTION";
}

interface UpdateStartCoordinate {
  type: "UPDATE_START_COORDINATE";
}

interface UpdateEndCoordinate {
  type: "UPDATE_END_COORDINATE";
}

interface ApplyTexture {
  type: "APPLY_TEXTURE";
  texture: TextureWeightValue;
}
interface PrepareApplyTexture {
  type: "PREPARE_APPLY_TEXTURE";
  texture: TextureWeightValue;
}
