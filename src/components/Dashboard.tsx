import { useCallback, type Dispatch, type SetStateAction } from 'react';
import '../styles/Dashboard.css';
import Button from './Button';
import { usePathFindingContext } from '../contexts/PathFindingContext';
import { useUserActionDispatchContext } from '../contexts/UserActionContext';
import { SelectTexture } from './SelectTexture';
import { SelectTerrain } from './SelectTerrain';
import { ActionButton } from './ActionButton';

const Dashboard = ({
  setModalIsOpen,
}: {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatchUserAction = useUserActionDispatchContext();
  const { isFindingPath } = usePathFindingContext();

  const handleStartButtonClick = useCallback(() => {
    dispatchUserAction({
      type: 'UPDATE_START_NODE',
    });
  }, [dispatchUserAction]);

  const handleEndButtonClick = useCallback(() => {
    dispatchUserAction({
      type: 'UPDATE_END_NODE',
    });
  }, [dispatchUserAction]);

  return (
    <div className="dashboard">
      <Button onClickFn={handleStartButtonClick} disabled={isFindingPath}>
        Select Start
      </Button>
      <Button onClickFn={handleEndButtonClick} disabled={isFindingPath}>
        Select End
      </Button>
      <SelectTexture disabled={isFindingPath} />
      <SelectTerrain disabled={isFindingPath} />
      <ActionButton setModalIsOpen={setModalIsOpen} />
    </div>
  );
};

export default Dashboard;
