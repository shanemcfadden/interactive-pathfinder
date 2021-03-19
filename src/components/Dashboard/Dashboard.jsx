import React from 'react';
import { dijkstra } from '../../algorithms/dijkstra';

const Dashboard = ({
  startNode,
  endNode,
  setCurrentClickFunction,
  visitedNodes,
  setVisitedNodes,
  clearVisitedNodes,
}) => {
  const addVisitedNode = (coordinate) => {
    const newVisitedNodes = [...visitedNodes];
    newVisitedNodes[coordinate[0]][coordinate[1]] = 'visited';
    setVisitedNodes(newVisitedNodes);
  };
  const handleStartButtonClick = () => {
    clearVisitedNodes();
    setCurrentClickFunction('setStartNode');
  };
  const handleEndButtonClick = () => {
    clearVisitedNodes();
    setCurrentClickFunction('setEndNode');
  };
  const handleFindPathClick = () => {
    setCurrentClickFunction('none');
    dijkstra(startNode, endNode, visitedNodes, addVisitedNode);
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
