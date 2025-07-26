import {
  useState,
  type ChangeEventHandler,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { dijkstra } from '../algorithms/dijkstra';
import { SAMPLE_TERRAINS } from '../settings/terrains';
import { TEXTURES_ARRAY } from '../settings/textures';
import '../styles/Dashboard.css';
import DashboardButton from './DashboardButton';
import type { Coordinate } from '../util/arr';
import type { Grid } from '../util/grid';
import type { DispatchPath } from '../hooks/usePathReducer';

const Dashboard = ({
  startNode,
  endNode,
  setCurrentClickFunction,
  stateOfNodes,
  dispatchPath,
  currentTexture,
  setCurrentTexture,
  setModalIsOpen,
  currentSampleTerrain,
  setSampleTerrain,
}: {
  startNode: Coordinate;
  endNode: Coordinate;
  setCurrentClickFunction: Dispatch<
    SetStateAction<'updateEndNode' | 'updateStartNode' | null>
  >;
  stateOfNodes: Grid<number>;
  dispatchPath: DispatchPath;
  currentTexture: number | null;
  setCurrentTexture: Dispatch<SetStateAction<number | null>>;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  currentSampleTerrain: number | null;
  setSampleTerrain: Dispatch<SetStateAction<number | null>>;
}) => {
  const [currentInterval, setCurrentInterval] = useState<number | null>(null);
  const [findPathButton, setFindPathButton] = useState<
    'findPath' | 'reset' | 'cancel'
  >('findPath');

  const afterDijkstraSuccess = (failedMessage?: string) => {
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
  };

  const handleStartButtonClick = () => {
    setCurrentTexture(null);
    setCurrentClickFunction('updateStartNode');
  };
  const handleEndButtonClick = () => {
    setCurrentTexture(null);
    setCurrentClickFunction('updateEndNode');
  };
  const handleFindPathClick = () => {
    setFindPathButton('cancel');
    setCurrentTexture(null);
    setCurrentClickFunction(null);
    const interval = dijkstra(
      startNode,
      endNode,
      stateOfNodes,
      (node: Coordinate) => {
        dispatchPath({
          type: 'ADD_VISITED_NODE',
          coordinate: node,
        });
      },
      (node: Coordinate) => {
        dispatchPath({
          type: 'ADD_PATH_NODE',
          coordinate: node,
        });
      },
      afterDijkstraSuccess,
    );
    setCurrentInterval(interval);
  };

  const handleCancelFindPath = () => {
    clearInterval(currentInterval ?? undefined);
    setCurrentInterval(null);
    handleFindPathReset();
  };

  const handleFindPathReset = () => {
    dispatchPath({
      type: 'RESET_PATH',
    });
    setFindPathButton('findPath');
  };

  const handleTextureChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    setCurrentClickFunction(null);
    const newValue = e.target.value === 'none' ? null : +e.target.value;
    setCurrentTexture(newValue);
  };

  const handleSampleTerrainChange: ChangeEventHandler<HTMLSelectElement> = (
    e,
  ) => {
    e.preventDefault();
    setCurrentClickFunction(null);
    const newValue = e.target.value === 'none' ? null : +e.target.value;
    setSampleTerrain(newValue);
  };

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
