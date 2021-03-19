import React from 'react';
import { dijkstra } from '../../algorithms/dijkstra';

const Dashboard = ({
  startNode,
  endNode,
  setCurrentClickFunction,
  stateOfNodes,
  setStateOfNodes,
  clearStateOfNodes,
}) => {
  const addVisitedNode = (coordinate) => {
    const newStateOfNodes = [...stateOfNodes];
    newStateOfNodes[coordinate[0]][coordinate[1]] = 'visited';
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
    dijkstra(startNode, endNode, stateOfNodes, addVisitedNode);
  };

  return (
    <div>
      <h1>This is the dashboard</h1>
      <button type="button" onClick={handleStartButtonClick}>
        Select Start
      </button>
      <button type="button" onClick={handleEndButtonClick}>
        Select End
      </button>
      <button type="button" onClick={handleFindPathClick}>
        Find Path!
      </button>
    </div>
  );
};

export default Dashboard;
