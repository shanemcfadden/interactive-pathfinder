import "../styles/Node.css";
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
      className={`node ${TEXTURE_WEIGHT_TO_CLASS_MAP[currentTexture]} ${getPathStateClass(
        {
          isStart,
          isEnd,
          path: currentPathState,
        },
      )}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
    >
      {isStart && "S"}
      {isEnd && "E"}
    </div>
  );
};

export default Node;

const getPathStateClass = ({
  isStart,
  isEnd,
  path,
}: {
  isStart: boolean;
  isEnd: boolean;
  path: PathValue;
}): string => {
  if (isStart) {
    return "node--start";
  }

  if (isEnd) {
    return "node--end";
  }

  return PATH_VALUE_TO_CLASS_MAP[path];
};

const PATH_VALUE_TO_CLASS_MAP: Record<PathValue, string> = {
  [Path.Unvisited]: "",
  [Path.Visited]: "node--visited",
  [Path.Path]: "node--path",
};

const TEXTURE_WEIGHT_TO_CLASS_MAP: Record<TextureWeightValue, string> = {
  [TextureWeight.Asphalt]: "node--asphalt",
  [TextureWeight.Dirt]: "node--dirt",
  [TextureWeight.Grass]: "node--grass",
  [TextureWeight.Sand]: "node--sand",
  [TextureWeight.Swamp]: "node--swamp",
  [TextureWeight.Water]: "node--water",
};
