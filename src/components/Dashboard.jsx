import React, { useState } from 'react';
import { dijkstra } from 'algorithms/dijkstra';
import 'styles/Dashboard.css';

const Dashboard = ({
  startNode,
  endNode,
  setCurrentClickFunction,
  stateOfNodes,
  setFindingPath,
  addPathNode,
  addVisitedNode,
  resetStateOfPath,
  clearVisitedNodes,
  currentTexture,
  setCurrentTexture,
}) => {
  const [currentInterval, setCurrentInterval] = useState(null);
  const [findPathButton, setFindPathButton] = useState('findPath');
  const handleStartButtonClick = () => {
    handleFindPathReset();
    setCurrentTexture(null);
    setCurrentClickFunction('updateStartNode');
  };
  const handleEndButtonClick = () => {
    handleFindPathReset();
    setCurrentTexture(null);
    setCurrentClickFunction('updateEndNode');
  };
  const handleFindPathClick = () => {
    setFindPathButton('cancel');
    setCurrentClickFunction(null);
    setFindingPath(true);
    const interval = dijkstra(
      startNode,
      endNode,
      stateOfNodes,
      addVisitedNode,
      addPathNode,
      afterDijkstraSuccess
    );
    setCurrentInterval(interval);
  };

  const afterDijkstraSuccess = () => {
    setCurrentInterval(null);
    setFindingPath(false);
    clearVisitedNodes();
    setFindPathButton('reset');
  };

  const handleCancelFindPath = () => {
    clearInterval(currentInterval);
    setCurrentInterval(null);
    handleFindPathReset();
  };

  const handleFindPathReset = () => {
    resetStateOfPath();
    setFindPathButton('findPath');
  };

  const renderFindPathButton = () => {
    if (findPathButton === 'findPath') {
      return (
        <button
          className="dashboard__button dashboard__button--go"
          type="button"
          onClick={handleFindPathClick}
        >
          Find Path!
        </button>
      );
    } else if (findPathButton === 'reset') {
      return (
        <button
          className="dashboard__button"
          type="button"
          onClick={handleFindPathReset}
        >
          Reset
        </button>
      );
    } else {
      return (
        <button
          className="dashboard__button dashboard__button--stop"
          type="button"
          onClick={handleCancelFindPath}
        >
          Cancel
        </button>
      );
    }
  };

  const handleTextureChange = (e) => {
    e.preventDefault();
    const newValue = e.target.value === 'none' ? null : +e.target.value;
    setCurrentTexture(newValue);
  };

  return (
    <div className="dashboard">
      <div className="dashboard__column">
        <button
          className="dashboard__button"
          type="button"
          onClick={handleStartButtonClick}
          disabled={findPathButton !== 'findPath'}
        >
          Select Start
        </button>

        <button
          className="dashboard__button"
          type="button"
          onClick={handleEndButtonClick}
          disabled={findPathButton !== 'findPath'}
        >
          Select End
        </button>
      </div>
      <div className="dashboard__column">
        <select
          value={currentTexture == null ? 'none' : currentTexture.toString()}
          onChange={handleTextureChange}
          disabled={findPathButton !== 'findPath'}
        >
          <option value="none">-</option>
          {[
            {
              weight: 1,
              name: 'Asphalt',
            },
            {
              weight: 2,
              name: 'Dirt',
            },
            {
              weight: 3,
              name: 'Grass',
            },
            { weight: 4, name: 'Sand' },
            { weight: 5, name: 'Swamp' },
            { weight: Infinity, name: 'Water' },
          ].map(({ weight, name }, i) => {
            return <option value={weight}>{name}</option>;
          })}
        </select>
      </div>
      <div className="dashboard__column">{renderFindPathButton()}</div>
    </div>
  );
};

export default Dashboard;
