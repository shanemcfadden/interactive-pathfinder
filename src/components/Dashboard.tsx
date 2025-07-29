import {
  useCallback,
  useState,
  type ChangeEventHandler,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { getDijkstraGenerator } from '../algorithms/dijkstra';
import { SAMPLE_TERRAINS } from '../settings/terrains';
import { TEXTURES_ARRAY } from '../settings/textures';
import '../styles/Dashboard.css';
import DashboardButton from './DashboardButton';
import {
  usePathFindingContext,
  usePathFindingDispatchContext,
} from '../contexts/PathFindingContext';

const Dashboard = ({
  setCurrentClickFunction,
  currentTexture,
  setCurrentTexture,
  setModalIsOpen,
  currentSampleTerrain,
  setSampleTerrain,
}: {
  setCurrentClickFunction: Dispatch<
    SetStateAction<'updateEndNode' | 'updateStartNode' | null>
  >;
  currentTexture: number | null;
  setCurrentTexture: Dispatch<SetStateAction<number | null>>;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  currentSampleTerrain: number | null;
  setSampleTerrain: Dispatch<SetStateAction<number | null>>;
}) => {
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
    setCurrentTexture(null);
    setCurrentClickFunction('updateStartNode');
  }, [setCurrentClickFunction, setCurrentTexture]);

  const handleEndButtonClick = useCallback(() => {
    setCurrentTexture(null);
    setCurrentClickFunction('updateEndNode');
  }, [setCurrentClickFunction, setCurrentTexture]);

  const handleFindPathClick = useCallback(() => {
    setFindPathButton('cancel');
    setCurrentTexture(null);
    setCurrentClickFunction(null);
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
    setCurrentClickFunction,
    setCurrentTexture,
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

  const handleTextureChange: ChangeEventHandler<HTMLSelectElement> =
    useCallback(
      (e) => {
        e.preventDefault();
        setCurrentClickFunction(null);
        const newValue = e.target.value === 'none' ? null : +e.target.value;
        setCurrentTexture(newValue);
      },
      [setCurrentTexture, setCurrentClickFunction],
    );

  const handleSampleTerrainChange: ChangeEventHandler<HTMLSelectElement> =
    useCallback(
      (e) => {
        e.preventDefault();
        setCurrentClickFunction(null);
        const newValue = e.target.value === 'none' ? null : +e.target.value;
        setSampleTerrain(newValue);
      },
      [setSampleTerrain, setCurrentClickFunction],
    );

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
      <label htmlFor="select-texture">Draw Texture:</label>
      <select
        id="select-texture"
        value={currentTexture == null ? 'none' : currentTexture.toString()}
        onChange={handleTextureChange}
        disabled={findPathButton !== 'findPath'}
      >
        <option value="none">-</option>
        {TEXTURES_ARRAY.map(({ weight, name, difficulty }) => (
          <option key={name} value={weight}>
            {name} ({difficulty})
          </option>
        ))}
      </select>
      <label htmlFor="select-sample">Sample Terrains:</label>
      <select
        id="select-sample"
        value={currentSampleTerrain == null ? 'none' : currentSampleTerrain}
        onChange={handleSampleTerrainChange}
        disabled={findPathButton !== 'findPath'}
      >
        <option value="none">-</option>
        {SAMPLE_TERRAINS.map(({ displayText }, i) => (
          <option value={i} key={`terrain-${i}`}>
            {displayText}
          </option>
        ))}
      </select>
      {renderFindPathButton()}
    </div>
  );
};

export default Dashboard;
