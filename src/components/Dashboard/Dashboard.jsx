import React from 'react';
import { dijkstra } from '../../algorithms/dijkstra';

const Dashboard = ({
  startNode,
  endNode,
  setCurrentClickFunction,
  visitedNodes,
  setVisitedNodes,
}) => {
  const addVisitedNode = (coordinate) => {
    const newVisitedNodes = [...visitedNodes];
    newVisitedNodes[coordinate[0]][coordinate[1]] = true;
    setVisitedNodes(newVisitedNodes);
  };
  const handleStartButtonClick = () => {
    setCurrentClickFunction('setStartNode');
  };
  const handleEndButtonClick = () => {
    setCurrentClickFunction('setEndNode');
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
      <button
        type="button"
        onClick={() => {
          dijkstra(startNode, endNode, visitedNodes, addVisitedNode);
        }}
      >
        Find Path!
      </button>
    </div>
  );
};

export default Dashboard;
