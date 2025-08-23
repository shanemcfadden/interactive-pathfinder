import { useCallback } from "react";
import {
  useUserActionContext,
  useUserActionDispatchContext,
} from "@contexts/UserActionContext";
import { Button } from "@components/Button";

export const SelectStartButton = ({ disabled }: { disabled: boolean }) => {
  const dispatchUserAction = useUserActionDispatchContext();
  const userAction = useUserActionContext();

  const handleStartButtonClick = useCallback(() => {
    dispatchUserAction({
      type: "UPDATE_START_COORDINATE",
    });
  }, [dispatchUserAction]);

  return (
    <Button
      onClickFn={handleStartButtonClick}
      data-testid="select-start-button"
      disabled={disabled}
      isActive={userAction.type === "UPDATE_START_COORDINATE"}
    >
      Select Start
    </Button>
  );
};
