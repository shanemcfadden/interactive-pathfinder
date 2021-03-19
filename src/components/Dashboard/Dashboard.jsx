import React, { useState } from 'react';
import { dijkstra } from '../../algorithms/dijkstra';

const Dashboard = ({
  startNode,
  endNode,
  setCurrentClickFunction,
  stateOfNodes,
  setStateOfNodes,
  clearStateOfNodes,
  drawingWallsAllowed,
  setDrawingWallsAllowed,
}) => {
  const [currentInterval, setCurrentInterval] = useState(null);
  const [findPathButton, setFindPathButton] = useState('findPath');
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
    handleFindPathReset();
    setDrawingWallsAllowed(false);
    setCurrentClickFunction('setStartNode');
  };
  const handleEndButtonClick = () => {
    handleFindPathReset();
    setDrawingWallsAllowed(false);
    setCurrentClickFunction('setEndNode');
  };
  const handleFindPathClick = () => {
    setFindPathButton('cancel');
    setCurrentClickFunction('none');
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

  const handleClearWalls = () => {
    const newNodes = [...stateOfNodes];
    setStateOfNodes(
      newNodes.map((row) => {
        return row.map((state) => {
          if (state !== 'wall') {
            return state;
          }
          return undefined;
        });
      })
    );
  };

  const afterDijkstraSuccess = () => {
    setCurrentInterval(null);
    setFindPathButton('reset');
  };

  const handleCancelFindPath = () => {
    clearInterval(currentInterval);
    setCurrentInterval(null);
    handleFindPathReset();
  };

  const handleFindPathReset = () => {
    clearStateOfNodes();
    setFindPathButton('findPath');
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
        disabled={findPathButton !== 'findPath'}
      >
        Select Start
      </button>
      <button
        type="button"
        onClick={handleEndButtonClick}
        disabled={findPathButton !== 'findPath'}
      >
        Select End
      </button>
      <button
        type="button"
        onClick={() => {
          setDrawingWallsAllowed(!drawingWallsAllowed);
        }}
        disabled={findPathButton !== 'findPath'}
      >
        {drawingWallsAllowed ? 'Stop' : 'Start'} Adding Walls
      </button>
      <button
        type="button"
        onClick={handleClearWalls}
        disabled={findPathButton !== 'findPath'}
      >
        Clear Walls
      </button>
      {renderFindPathButton()}
    </div>
  );
};

export default Dashboard;
