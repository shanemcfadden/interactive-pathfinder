import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { getDijkstraGenerator } from '../algorithms/dijkstra';
import '../styles/Dashboard.css';
import DashboardButton from './DashboardButton';
import {
  usePathFindingContext,
  usePathFindingDispatchContext,
} from '../contexts/PathFindingContext';
import { useUserActionDispatchContext } from '../contexts/UserActionContext';
import { SelectTexture } from './SelectTexture';
import { SelectTerrain } from './SelectTerrain';

const Dashboard = ({
  setModalIsOpen,
}: {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatchUserAction = useUserActionDispatchContext();
  const { start, end, terrainMap } = usePathFindingContext();
  const dispatchPath = usePathFindingDispatchContext();
  const [currentInterval, setCurrentInterval] = useState<number | null>(null);
  const [findPathButton, setFindPathButton] = useState<
    'findPath' | 'reset' | 'cancel'
  >('findPath');

  const afterDijkstraSuccess = useCallback(
    (failedMessage?: string) => {
      setCurrentInterval(null);
      dispatchPath({
        type: 'CLEAR_VISITED_NODES',
      });

      if (failedMessage) {
        setModalIsOpen(true);
        setFindPathButton('findPath');
        return;
      }

      setFindPathButton('reset');
    },
    [dispatchPath, setModalIsOpen],
  );

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

  const handleFindPathClick = useCallback(() => {
    setFindPathButton('cancel');
    dispatchUserAction({
      type: 'NO_ACTION',
    });
    const dijkstraGenerator = getDijkstraGenerator(start, end, terrainMap);
    const interval = setInterval(() => {
      const generated = dijkstraGenerator.next();
      if (generated.done) {
        clearInterval(interval);
        afterDijkstraSuccess(
          generated.value.pathFound ? undefined : 'Path not found',
        );
      } else {
        switch (generated.value.type) {
          case 'ADD_VISITED_COORDINATE':
            dispatchPath({
              type: 'ADD_VISITED_COORDINATE',
              coordinate: generated.value.coordinate,
            });
            break;
          case 'ADD_PATH_COORDINATE':
            dispatchPath({
              type: 'ADD_PATH_COORDINATE',
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
    setFindPathButton,
  ]);

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

  const renderFindPathButton = () => {
    const findPathButtons = {
      cancel: {
        innerHTML: 'Cancel',
        onClickFn: handleCancelFindPath,
        extraClassName: 'dashboard__button--stop',
      },
      reset: {
        innerHTML: 'Reset',
        onClickFn: handleFindPathReset,
        extraClassName: '',
      },
      findPath: {
        innerHTML: 'Find Path',
        onClickFn: handleFindPathClick,
        extraClassName: 'dashboard__button--go',
      },
    };

    const { innerHTML, onClickFn, extraClassName } =
      findPathButtons[findPathButton];

    return (
      <DashboardButton onClickFn={onClickFn} extraClassName={extraClassName}>
        {innerHTML}
      </DashboardButton>
    );
  };

  return (
    <div className="dashboard">
      <DashboardButton
        onClickFn={handleStartButtonClick}
        disabled={findPathButton !== 'findPath'}
      >
        Select Start
      </DashboardButton>
      <DashboardButton
        onClickFn={handleEndButtonClick}
        disabled={findPathButton !== 'findPath'}
      >
        Select End
      </DashboardButton>
      <SelectTexture disabled={findPathButton !== 'findPath'} />
      <SelectTerrain disabled={findPathButton !== 'findPath'} />
      {renderFindPathButton()}
    </div>
  );
};

export default Dashboard;
