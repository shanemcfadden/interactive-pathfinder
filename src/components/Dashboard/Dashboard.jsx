import React, { useEffect, useState } from 'react';
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
  const [findPathButton, setFindPathButton] = useState('findPath');
  useEffect(() => {
    if (algorithmRunning) {
      setFindPathButton('cancel');
    }
  }, [algorithmRunning]);
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
    // clearStateOfNodes();
    handleFindPathReset();
    setCurrentClickFunction('setStartNode');
  };
  const handleEndButtonClick = () => {
    // clearStateOfNodes();
    handleFindPathReset();
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
      afterDijkstraSuccess
    );
    setCurrentInterval(interval);
  };
  const handleCancelFindPath = () => {
    clearInterval(currentInterval);
    clearStateOfNodes();
    setFindPathButton('findPath');
    cleanUpDijkstra();
  };

  const handleFindPathReset = () => {
    clearStateOfNodes();
    setFindPathButton('findPath');
  };

  const afterDijkstraSuccess = () => {
    cleanUpDijkstra();
    setFindPathButton('reset');
  };

  const cleanUpDijkstra = () => {
    setAlgorithmRunning(false);
    setCurrentInterval(null);
  };

  const renderFindPathButton = () => {
    if (findPathButton === 'findPath') {
      return (
        <button type="button" onClick={handleFindPathClick}>
          Find Path!
        </button>
      );
    } else if (findPathButton === 'reset') {
      return (
        <button type="button" onClick={handleFindPathReset}>
          Reset
        </button>
      );
    } else {
      return (
        <button type="button" onClick={handleCancelFindPath}>
          Cancel
        </button>
      );
    }
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
      {renderFindPathButton()}
    </div>
  );
};

// algorithmRunning ? (
//   <button type="button" onClick={handleCancelFindPath}>
//     Cancel
//   </button>
// ) : (
//   <button type="button" onClick={handleFindPathClick}>
//     Find Path!
//   </button>
// )}
export default Dashboard;
