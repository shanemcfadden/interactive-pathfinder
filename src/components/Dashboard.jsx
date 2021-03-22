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
    setDrawingWallsAllowed(false);
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

  const removeVisitedAndPathNodes = () => {
    const newNodes = [...stateOfNodes];
    setStateOfNodes(
      newNodes.map((row, i) => {
        return row.map((val, j) => {
          if (val === 'wall') {
            return val;
          }
          return undefined;
        });
      })
    );
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
    removeVisitedAndPathNodes();
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
          onClick={handleEndButtonClick}
          disabled={findPathButton !== 'findPath'}
        >
          Select End
        </button>
      </div>
      <div className="dashboard__column">
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
