import { useState } from 'react';
import { coordinatesAreEqual } from 'util/arr';
import {
  GRID_HEIGHT_NODES,
  GRID_WIDTH_NODES,
  PATHS_NAME_VALUE_MAP,
} from 'util/settings';

const startNodeValue = PATHS_NAME_VALUE_MAP.start;
const endNodeValue = PATHS_NAME_VALUE_MAP.end;
const pathNodeValue = PATHS_NAME_VALUE_MAP.path;
const visitedNodeValue = PATHS_NAME_VALUE_MAP.visited;

const useStateOfPath = (startingCoor, endingCoor) => {
  const [startNode, setStartNode] = useState(startingCoor);
  const [endNode, setEndNode] = useState(endingCoor);

  const getInitalPathState = (start, end) => {
    return Array.from({ length: GRID_HEIGHT_NODES }, (row, i) =>
      Array.from({ length: GRID_WIDTH_NODES }, (val, j) => {
        if (coordinatesAreEqual(start, [i, j])) return startNodeValue;
        if (coordinatesAreEqual(end, [i, j])) return endNodeValue;
        return 0;
      })
    );
  };
  const [stateOfPath, setStateOfPath] = useState(
    getInitalPathState(startingCoor, endingCoor)
  );
  const resetStateOfPath = () => {
    setStateOfPath(getInitalPathState(startNode, endNode));
  };

  const clearVisitedNodes = () => {
    const updatedStateOfPath = stateOfPath.map((row) => {
      return row.map((val) => {
        return val === PATHS_NAME_VALUE_MAP['visited'] ? 0 : val;
      });
    });
    setStateOfPath(updatedStateOfPath);
  };

  const updateNode = (nodeCoordinate, nodeValue) => {
    const updatedPath = [...stateOfPath];
    updatedPath[nodeCoordinate[0]][nodeCoordinate[1]] = nodeValue;
    setStateOfPath(updatedPath);
  };
  const clearNode = (nodeCoordinate) => {
    updateNode(nodeCoordinate, 0);
  };
  const updateStartNode = (newStart) => {
    if (coordinatesAreEqual(newStart, endNode)) return;
    clearNode(startNode);
    updateNode(newStart, startNodeValue);
    setStartNode(newStart);
  };
  const updateEndNode = (newEnd) => {
    if (coordinatesAreEqual(newEnd, startNode)) return;
    clearNode(endNode);
    updateNode(newEnd, endNodeValue);
    setEndNode(newEnd);
  };
  const addPathNode = (coor) => {
    if (
      coordinatesAreEqual(coor, startNode) ||
      coordinatesAreEqual(coor, endNode)
    )
      return;
    updateNode(coor, pathNodeValue);
  };
  const addVisitedNode = (coor) => {
    if (
      coordinatesAreEqual(coor, startNode) ||
      coordinatesAreEqual(coor, endNode)
    )
      return;
    updateNode(coor, visitedNodeValue);
  };

  return [
    startNode,
    updateStartNode,
    endNode,
    updateEndNode,
    stateOfPath,
    addPathNode,
    resetStateOfPath,
    addVisitedNode,
    clearVisitedNodes,
  ];
};

export default useStateOfPath;
