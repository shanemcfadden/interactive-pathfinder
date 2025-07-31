import { useCallback } from 'react';
import { useUserActionDispatchContext } from '../../contexts/UserActionContext';
import Button from '../Button';

export const SelectEndButton = ({ disabled }: { disabled: boolean }) => {
  const dispatchUserAction = useUserActionDispatchContext();

  const handleEndButtonClick = useCallback(() => {
    dispatchUserAction({
      type: 'UPDATE_END_NODE',
    });
  }, [dispatchUserAction]);

  return (
    <Button onClickFn={handleEndButtonClick} disabled={disabled}>
      Select End
    </Button>
  );
};
