import { type Dispatch, type SetStateAction, useCallback } from "react";
import { Button } from "@components/Button";
import { usePathFindingDispatchContext } from "@contexts/PathFindingContext";

export const CancelPathButton = ({
  currentInterval,
  setCurrentInterval,
  setFindPathButton,
}: {
  currentInterval: NodeJS.Timeout | null;
  setCurrentInterval: Dispatch<SetStateAction<NodeJS.Timeout | null>>;
  setFindPathButton: Dispatch<SetStateAction<"findPath" | "reset" | "cancel">>;
}) => {
  const dispatchPath = usePathFindingDispatchContext();
  const handleFindPathReset = useCallback(() => {
    dispatchPath({
      type: "RESET_PATH",
    });
    setFindPathButton("findPath");
  }, [dispatchPath, setFindPathButton]);
  const handleCancelFindPath = useCallback(() => {
    clearInterval(currentInterval ?? undefined);
    setCurrentInterval(null);
    handleFindPathReset();
  }, [currentInterval, handleFindPathReset, setCurrentInterval]);

  return (
    <Button
      data-testid="cancel-path-button"
      onClickFn={handleCancelFindPath}
      actionType={"danger"}
    >
      Cancel
    </Button>
  );
};
