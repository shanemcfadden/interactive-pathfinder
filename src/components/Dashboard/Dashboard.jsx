import React, { useState } from 'react';
import { dijkstra } from '../../algorithms/dijkstra';

const Dashboard = ({
  startNode,
  endNode,
  setCurrentClickFunction,
  stateOfNodes,
  setStateOfNodes,
  clearStateOfNodes,
}) => {
  const [algorithmRunning, setAlgorithmRunning] = useState(false);
  const [currentInterval, setCurrentInterval] = useState(null);
  const addVisitedNode = (coordinate) => {
    const newStateOfNodes = [...stateOfNodes];
    newStateOfNodes[coordinate[0]][coordinate[1]] = 'visited';
    setStateOfNodes(newStateOfNodes);
  };
  const addPathNode = (coordinate) => {
    const newStateOfNodes = [...stateOfNodes];
    newStateOfNodes[coordinate[0]][coordinate[1]] = 'path';
    setStateOfNodes(newStateOfNodes);
  };
  const handleStartButtonClick = () => {
    clearStateOfNodes();
    setCurrentClickFunction('setStartNode');
  };
  const handleEndButtonClick = () => {
    clearStateOfNodes();
    setCurrentClickFunction('setEndNode');
  };
  const handleFindPathClick = () => {
    setCurrentClickFunction('none');
    setAlgorithmRunning(true);
    const interval = dijkstra(
      startNode,
      endNode,
      stateOfNodes,
      addVisitedNode,
      addPathNode,
      cleanUpDijkstra
    );
    setCurrentInterval(interval);
  };

  const enableButtons = () => {
    setAlgorithmRunning(false);
  };

  const handleCancelFindPath = () => {
    clearInterval(currentInterval);
    clearStateOfNodes();
    cleanUpDijkstra();
  };

  const cleanUpDijkstra = () => {
    enableButtons();
    setCurrentInterval(null);
  };

  return (
    <div>
      <h1>This is the dashboard</h1>
      <button
        type="button"
        onClick={handleStartButtonClick}
        disabled={algorithmRunning}
      >
        Select Start
      </button>
      <button
        type="button"
        onClick={handleEndButtonClick}
        disabled={algorithmRunning}
      >
        Select End
      </button>
      {currentInterval ? (
        <button type="button" onClick={handleCancelFindPath}>
          Cancel
        </button>
      ) : (
        <button
          type="button"
          onClick={handleFindPathClick}
          disabled={algorithmRunning}
        >
          Find Path!
        </button>
      )}
    </div>
  );
};

export default Dashboard;
