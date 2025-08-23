import { useCallback, useMemo, type MouseEventHandler } from "react";
import { areCoordinatesEqual, type Coordinate } from "@utils";
import {
  usePathFindingContext,
  usePathFindingDispatchContext,
} from "@contexts/PathFindingContext";
import {
  useUserActionContext,
  useUserActionDispatchContext,
} from "@contexts/UserActionContext";
import { getCustomClasses } from "./class-name-utils";

export const Node = ({
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
  const { start, end, path, textureMap } = usePathFindingContext();
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
    () => textureMap.getCoordinate(coordinate),
    [textureMap, coordinate],
  );

  const currentPathState = useMemo(
    () => path.getCoordinate(coordinate),
    [path, coordinate],
  );

  const onClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      e.preventDefault();

      switch (userAction.type) {
        case "UPDATE_START_COORDINATE":
          dispatchPath({
            type: "UPDATE_START_COORDINATE",
            coordinate,
          });
          break;
        case "UPDATE_END_COORDINATE":
          dispatchPath({
            type: "UPDATE_END_COORDINATE",
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
      data-testid={`node-${rowIndex}-${columnIndex}`}
      data-path-state={currentPathState}
      data-texture={currentTexture}
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
