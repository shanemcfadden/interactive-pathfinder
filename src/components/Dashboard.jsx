import React, { useState } from 'react';
import { dijkstra } from 'algorithms/dijkstra';
import 'styles/Dashboard.css';

const Dashboard = ({
  startNode,
  endNode,
  setCurrentClickFunction,
  stateOfNodes,
  setStateOfNodes,
  drawingWallsAllowed,
  setDrawingWallsAllowed,
  findingPath,
  setFindingPath,
  addPathNode,
  addVisitedNode,
  resetStateOfPath,
  clearVisitedNodes,
}) => {
  const [currentInterval, setCurrentInterval] = useState(null);
  const [findPathButton, setFindPathButton] = useState('findPath');
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
    setDrawingWallsAllowed(false);
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
          onClick={() => {
            setDrawingWallsAllowed(!drawingWallsAllowed);
          }}
          disabled={findPathButton !== 'findPath'}
        >
          {drawingWallsAllowed ? 'Stop' : 'Start'} Adding Walls
        </button>
      </div>
      <div className="dashboard__column">
        <button
          className="dashboard__button"
          type="button"
          onClick={handleEndButtonClick}
          disabled={findPathButton !== 'findPath'}
        >
          Select End
        </button>
        <button
          className="dashboard__button"
          type="button"
          onClick={handleClearWalls}
          disabled={findPathButton !== 'findPath'}
        >
          Clear Walls
        </button>
      </div>
      <div className="dashboard__column">{renderFindPathButton()}</div>
    </div>
  );
};

export default Dashboard;
