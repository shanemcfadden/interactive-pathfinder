import React, { useState } from 'react';
import { dijkstra } from 'algorithms/dijkstra';
import { SAMPLE_TERRAINS } from 'settings/terrains';
import { TEXTURES_ARRAY } from 'settings/textures';
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
  setModalIsOpen,
  currentSampleTerrain,
  setSampleTerrain,
}) => {
  const [currentInterval, setCurrentInterval] = useState(null);
  const [findPathButton, setFindPathButton] = useState('findPath');

  const afterDijkstraSuccess = (failedMessage) => {
    setCurrentInterval(null);
    setFindingPath(false);
    clearVisitedNodes();
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

  const handleCancelFindPath = () => {
    clearInterval(currentInterval);
    setCurrentInterval(null);
    handleFindPathReset();
  };

  const handleFindPathReset = () => {
    resetStateOfPath();
    setFindPathButton('findPath');
  };

  const handleTextureChange = (e) => {
    e.preventDefault();
    setCurrentClickFunction(null);
    const newValue = e.target.value === 'none' ? null : +e.target.value;
    setCurrentTexture(newValue);
  };

  const handleSampleTerrainChange = (e) => {
    e.preventDefault();
    setCurrentClickFunction(null);
    const newValue = e.target.value === 'none' ? null : e.target.value;
    setSampleTerrain(newValue);
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

  return (
    <div className="dashboard">
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
      <label htmlFor="select-texture">Draw Texture:</label>
      <select
        id="select-texture"
        value={currentTexture == null ? 'none' : currentTexture.toString()}
        onChange={handleTextureChange}
        disabled={findPathButton !== 'findPath'}
      >
        <option value="none">-</option>
        {TEXTURES_ARRAY.map(({ weight, name, difficulty }) => {
          return (
            <option key={name} value={weight}>
              {name} ({difficulty})
            </option>
          );
        })}
      </select>
      <label htmlFor="select-sample">Sample terrains:</label>
      <select
        id="select-sample"
        value={currentSampleTerrain == null ? 'none' : currentSampleTerrain}
        onChange={handleSampleTerrainChange}
        disabled={findPathButton !== 'findPath'}
      >
        <option value="none">-</option>
        {SAMPLE_TERRAINS.map(({ displayText }, i) => {
          return (
            <option value={i} key={`terrain-${i}`}>
              {displayText}
            </option>
          );
        })}
      </select>
      {renderFindPathButton()}
    </div>
  );
};

export default Dashboard;
