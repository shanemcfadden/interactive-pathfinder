import { useCallback } from 'react';
import { useUserActionDispatchContext } from '../../contexts/UserActionContext';
import Button from '../../components/Button';

export const SelectStartButton = ({ disabled }: { disabled: boolean }) => {
  const dispatchUserAction = useUserActionDispatchContext();

  const handleStartButtonClick = useCallback(() => {
    dispatchUserAction({
      type: 'UPDATE_START_NODE',
    });
  }, [dispatchUserAction]);

  return (
    <Button onClickFn={handleStartButtonClick} disabled={disabled}>
      Select Start
    </Button>
  );
};
