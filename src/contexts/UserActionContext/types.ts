import type { TextureWeightValue } from "../../settings/textures";

export type UserAction =
  | NoAction
  | UpdateStartNode
  | UpdateEndNode
  | ApplyTexture
  | PrepareApplyTexture;

interface NoAction {
  type: "NO_ACTION";
}

interface UpdateStartNode {
  type: "UPDATE_START_NODE";
}

interface UpdateEndNode {
  type: "UPDATE_END_NODE";
}

interface ApplyTexture {
  type: "APPLY_TEXTURE";
  texture: TextureWeightValue;
}
interface PrepareApplyTexture {
  type: "PREPARE_APPLY_TEXTURE";
  texture: TextureWeightValue;
}
