import { useState } from 'react';
import { coordinatesAreEqual } from 'util/arr';
import { GRID_HEIGHT_NODES, GRID_WIDTH_NODES } from 'settings/grid';
import { PATHS_NAME_VALUE_MAP } from 'settings/paths';
import { mapGrid } from 'util/grid';

const startNodeValue = PATHS_NAME_VALUE_MAP.start;
const endNodeValue = PATHS_NAME_VALUE_MAP.end;

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
    const updatedStateOfPath = mapGrid(stateOfPath, (val) =>
      val === PATHS_NAME_VALUE_MAP['visited'] ? 0 : val
    );
    setStateOfPath(updatedStateOfPath);
  };

  const setNodeValue = (nodeCoordinate, nodeValue) => {
    const newStateOfPath = [...stateOfPath];
    newStateOfPath[nodeCoordinate[0]][nodeCoordinate[1]] = nodeValue;
    setStateOfPath(newStateOfPath);
  };
  const clearNode = (nodeCoordinate) => {
    setNodeValue(nodeCoordinate, 0);
  };
  const updateNodeValue = (coor, pathName, cleanUpFunction) => {
    if (
      coordinatesAreEqual(coor, startNode) ||
      coordinatesAreEqual(coor, endNode)
    )
      return;
    setNodeValue(coor, PATHS_NAME_VALUE_MAP[pathName]);
    if (cleanUpFunction) cleanUpFunction(coor);
  };
  const getCleanUpFunction = (currentState, setState) => (coor) => {
    clearNode(currentState);
    setState(coor);
  };
  const updateStartNode = (newStart) => {
    updateNodeValue(
      newStart,
      'start',
      getCleanUpFunction(startNode, setStartNode)
    );
  };
  const updateEndNode = (newEnd) => {
    updateNodeValue(newEnd, 'end', getCleanUpFunction(endNode, setEndNode));
  };
  const addPathNode = (coor) => {
    updateNodeValue(coor, 'path');
  };
  const addVisitedNode = (coor) => {
    updateNodeValue(coor, 'visited');
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
