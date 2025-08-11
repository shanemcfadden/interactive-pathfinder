import { useCallback, type Dispatch, type SetStateAction } from "react";
import { getDijkstraGenerator } from "../../../util/algorithms/dijkstra";
import { Button } from "../../../components/Button";
import {
  usePathFindingContext,
  usePathFindingDispatchContext,
} from "../../../contexts/PathFindingContext";
import { useUserActionDispatchContext } from "../../../contexts/UserActionContext";
import { useModalContext } from "../../../contexts/ModalContext/context";

export const FindPathButton = ({
  setCurrentInterval,
  setFindPathButton,
}: {
  setCurrentInterval: Dispatch<SetStateAction<number | null>>;
  setFindPathButton: Dispatch<SetStateAction<"findPath" | "reset" | "cancel">>;
}) => {
  const { openModal } = useModalContext();
  const dispatchUserAction = useUserActionDispatchContext();
  const { start, end, textureMap: terrainMap } = usePathFindingContext();
  const dispatchPath = usePathFindingDispatchContext();

  const afterDijkstraSuccess = useCallback(
    (failedMessage?: string) => {
      setCurrentInterval(null);
      dispatchPath({
        type: "CLEAR_VISITED_COORDINATES",
      });

      if (failedMessage) {
        openModal();
        setFindPathButton("findPath");
        return;
      }

      setFindPathButton("reset");
    },
    [dispatchPath, openModal, setCurrentInterval, setFindPathButton],
  );

  const handleFindPathClick = useCallback(() => {
    setFindPathButton("cancel");
    dispatchUserAction({
      type: "NO_ACTION",
    });
    const dijkstraGenerator = getDijkstraGenerator(start, end, terrainMap);
    const interval = setInterval(() => {
      const generated = dijkstraGenerator.next();
      if (generated.done) {
        clearInterval(interval);
        afterDijkstraSuccess(
          generated.value.pathFound ? undefined : "Path not found",
        );
      } else {
        switch (generated.value.type) {
          case "ADD_VISITED_COORDINATE":
            dispatchPath({
              type: "ADD_VISITED_COORDINATE",
              coordinate: generated.value.coordinate,
            });
            break;
          case "ADD_PATH_COORDINATE":
            dispatchPath({
              type: "ADD_PATH_COORDINATE",
              coordinate: generated.value.coordinate,
            });
        }
      }
    }, 10);
    setCurrentInterval(interval);
  }, [
    start,
    end,
    terrainMap,
    afterDijkstraSuccess,
    dispatchPath,
    dispatchUserAction,
    setCurrentInterval,
    setFindPathButton,
  ]);

  return (
    <Button onClickFn={handleFindPathClick} actionType={"submit"}>
      Find Path
    </Button>
  );
};
