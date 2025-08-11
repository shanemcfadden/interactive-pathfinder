import { useCallback, type MouseEventHandler } from "react";
import { Node } from "./Node";
import { usePathFindingContext } from "../../contexts/PathFindingContext";
import {
  useUserActionContext,
  useUserActionDispatchContext,
} from "../../contexts/UserActionContext";

export const PathFindingMap = () => {
  const { textureMap } = usePathFindingContext();
  const userAction = useUserActionContext();
  const dispatchUserAction = useUserActionDispatchContext();

  const onMouseLeave = useCallback<MouseEventHandler>(
    (e) => {
      e.preventDefault();

      if (userAction.type === "APPLY_TEXTURE") {
        dispatchUserAction({
          type: "PREPARE_APPLY_TEXTURE",
          texture: userAction.texture,
        });
      }
    },
    [userAction, dispatchUserAction],
  );

  return (
    <div className="grid grid-cols-35 gap-0.5 my-4" onMouseLeave={onMouseLeave}>
      {textureMap.values.map((row, i) =>
        row.map((_, j) => (
          <Node rowIndex={i} columnIndex={j} key={`${i}-${j}`} />
        )),
      )}
    </div>
  );
};
