import { useCallback } from "react";
import {
  useUserActionContext,
  useUserActionDispatchContext,
} from "../../contexts/UserActionContext";
import { Button } from "../../components/Button";

export const SelectEndButton = ({ disabled }: { disabled: boolean }) => {
  const dispatchUserAction = useUserActionDispatchContext();
  const userAction = useUserActionContext();

  const handleEndButtonClick = useCallback(() => {
    dispatchUserAction({
      type: "UPDATE_END_COORDINATE",
    });
  }, [dispatchUserAction]);

  return (
    <Button
      onClickFn={handleEndButtonClick}
      data-testid="select-end-button"
      disabled={disabled}
      isActive={userAction.type === "UPDATE_END_COORDINATE"}
    >
      Select End
    </Button>
  );
};
