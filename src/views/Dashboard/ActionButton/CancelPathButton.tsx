import { useCallback, type Dispatch, type SetStateAction } from 'react';
import Button from '../../../components/Button';
import { usePathFindingDispatchContext } from '../../../contexts/PathFindingContext';

export const CancelPathButton = ({
  currentInterval,
  setCurrentInterval,
  setFindPathButton,
}: {
  currentInterval: number | null;
  setCurrentInterval: Dispatch<SetStateAction<number | null>>;
  setFindPathButton: Dispatch<SetStateAction<'findPath' | 'reset' | 'cancel'>>;
}) => {
  const dispatchPath = usePathFindingDispatchContext();
  const handleFindPathReset = useCallback(() => {
    dispatchPath({
      type: 'RESET_PATH',
    });
    setFindPathButton('findPath');
  }, [dispatchPath, setFindPathButton]);
  const handleCancelFindPath = useCallback(() => {
    clearInterval(currentInterval ?? undefined);
    setCurrentInterval(null);
    handleFindPathReset();
  }, [currentInterval, handleFindPathReset, setCurrentInterval]);

  return (
    <Button onClickFn={handleCancelFindPath} actionType={'danger'}>
      Cancel
    </Button>
  );
};
