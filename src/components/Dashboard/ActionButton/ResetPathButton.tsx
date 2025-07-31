import { useCallback, type Dispatch, type SetStateAction } from 'react';
import Button from '../../Button';
import { usePathFindingDispatchContext } from '../../../contexts/PathFindingContext';

export const ResetPathButton = ({
  setFindPathButton,
}: {
  setFindPathButton: Dispatch<SetStateAction<'findPath' | 'reset' | 'cancel'>>;
}) => {
  const dispatchPath = usePathFindingDispatchContext();

  const handleFindPathReset = useCallback(() => {
    dispatchPath({
      type: 'RESET_PATH',
    });
    setFindPathButton('findPath');
  }, [dispatchPath, setFindPathButton]);

  return <Button onClickFn={handleFindPathReset}>Reset</Button>;
};
