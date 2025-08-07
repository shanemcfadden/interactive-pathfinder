import { TextureWeight, type TextureWeightValue } from "../settings/textures";
import { Path, type PathValue } from "../settings/paths";
import { useCallback, useMemo, type MouseEventHandler } from "react";
import { areCoordinatesEqual, type Coordinate } from "../util/coordinate";
import {
  usePathFindingContext,
  usePathFindingDispatchContext,
} from "../contexts/PathFindingContext";
import {
  useUserActionContext,
  useUserActionDispatchContext,
} from "../contexts/UserActionContext";

const Node = ({
  rowIndex,
  columnIndex,
}: {
  rowIndex: number;
  columnIndex: number;
}) => {
  const coordinate = useMemo<Coordinate>(
    () => [rowIndex, columnIndex],
    [rowIndex, columnIndex],
  );
  const { start, end, path, terrainMap: terrain } = usePathFindingContext();
  const dispatchPath = usePathFindingDispatchContext();

  const userAction = useUserActionContext();
  const dispatchUserAction = useUserActionDispatchContext();

  const isStart = useMemo(
    () => areCoordinatesEqual(coordinate, start),
    [coordinate, start],
  );

  const isEnd = useMemo(
    () => areCoordinatesEqual(coordinate, end),
    [coordinate, end],
  );

  const currentTexture = useMemo(
    () => terrain.getCoordinate(coordinate),
    [terrain, coordinate],
  );

  const currentPathState = useMemo(
    () => path.getCoordinate(coordinate),
    [path, coordinate],
  );

  const onClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      e.preventDefault();

      switch (userAction.type) {
        case "UPDATE_START_NODE":
          dispatchPath({
            type: "UPDATE_START_NODE",
            coordinate,
          });
          break;
        case "UPDATE_END_NODE":
          dispatchPath({
            type: "UPDATE_END_NODE",
            coordinate,
          });
          break;
        default:
          return;
      }

      dispatchUserAction({
        type: "NO_ACTION",
      });
    },
    [dispatchUserAction, dispatchPath, userAction.type, coordinate],
  );

  const onMouseDown = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      e.preventDefault();

      if (userAction.type !== "PREPARE_APPLY_TEXTURE") {
        return;
      }

      dispatchPath({
        type: "UPDATE_TERRAIN_TEXTURE",
        coordinate,
        texture: userAction.texture,
      });
      dispatchUserAction({
        type: "APPLY_TEXTURE",
        texture: userAction.texture,
      });
    },
    [userAction, dispatchPath, dispatchUserAction, coordinate],
  );

  const onMouseEnter = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      e.preventDefault();

      if (userAction.type !== "APPLY_TEXTURE") {
        return;
      }

      dispatchPath({
        type: "UPDATE_TERRAIN_TEXTURE",
        coordinate,
        texture: userAction.texture,
      });
    },
    [userAction, dispatchPath, coordinate],
  );

  const onMouseUp = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      e.preventDefault();

      if (userAction.type !== "APPLY_TEXTURE") {
        return;
      }

      dispatchUserAction({
        type: "PREPARE_APPLY_TEXTURE",
        texture: userAction.texture,
      });
    },
    [userAction, dispatchUserAction],
  );

  return (
    <div
      className={[
        "aspect-square",
        "color-white",
        "duration-1000",
        "flex",
        "font-bold",
        "transition-opacity",
        "transition-ring",
        "w-full",
        getCustomClasses({
          currentTexture,
          isStart,
          isEnd,
          currentPathState,
        }),
      ].join(" ")}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
    >
      <div className="m-auto">
        {isStart && "S"}
        {isEnd && "E"}
      </div>
    </div>
  );
};

export default Node;

const getCustomClasses = (configuration: {
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
}) => {
  if (isStart || isEnd || currentPathState !== Path.Visited) {
    return "";
  }

  return "opacity-60";
};

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

const getBoxShadow = ({
  isStart,
  isEnd,
  currentPathState,
}: {
  isStart: boolean;
  isEnd: boolean;
  currentPathState: PathValue;
}): string => {
  if (isStart || isEnd || currentPathState === Path.Path) {
    return "ring-2";
  }
  return "";
};

const TEXTURE_WEIGHT_TO_CLASS_MAP: Record<TextureWeightValue, string> = {
  [TextureWeight.Asphalt]: "bg-asphalt",
  [TextureWeight.Dirt]: "bg-dirt",
  [TextureWeight.Grass]: "bg-grass",
  [TextureWeight.Sand]: "bg-sand",
  [TextureWeight.Swamp]: "bg-swamp",
  [TextureWeight.Water]: "bg-water",
};
