import {
  TextureWeight,
  type TextureWeightValue,
} from "../../../settings/textures";
import { Path, type PathValue } from "../../../settings/paths";

export const getCustomClasses = (configuration: {
  currentTexture: TextureWeightValue;
  isStart: boolean;
  isEnd: boolean;
  currentPathState: PathValue;
}): string =>
  [
    getOpacity(configuration),
    getColor(configuration),
    getBoxShadow(configuration),
  ].join(" ");

const getOpacity = ({
  isStart,
  isEnd,
  currentPathState,
}: {
  isStart: boolean;
  isEnd: boolean;
  currentPathState: PathValue;
}) =>
  [currentPathState === Path.Visited, !isEnd, !isStart].every(Boolean)
    ? "opacity-60"
    : "opacity-100";

const getColor = ({
  currentTexture,
  isStart,
  isEnd,
}: {
  currentTexture: TextureWeightValue;
  isStart: boolean;
  isEnd: boolean;
}): string => {
  if (isStart) {
    return "bg-green-700";
  }

  if (isEnd) {
    return "bg-red-500";
  }

  return TEXTURE_WEIGHT_TO_CLASS_MAP[currentTexture];
};

const TEXTURE_WEIGHT_TO_CLASS_MAP: Record<TextureWeightValue, string> = {
  [TextureWeight.Asphalt]: "bg-asphalt",
  [TextureWeight.Dirt]: "bg-dirt",
  [TextureWeight.Grass]: "bg-grass",
  [TextureWeight.Sand]: "bg-sand",
  [TextureWeight.Swamp]: "bg-swamp",
  [TextureWeight.Water]: "bg-water",
};

const getBoxShadow = ({
  isStart,
  isEnd,
  currentPathState,
}: {
  isStart: boolean;
  isEnd: boolean;
  currentPathState: PathValue;
}): string =>
  [isStart, isEnd, currentPathState === Path.Path].some(Boolean)
    ? "ring-2"
    : "";
