import { useState, type Dispatch, type SetStateAction } from 'react';
import { coordinatesAreEqual, type Coordinate } from '../util/arr';
import { GRID_HEIGHT_NODES, GRID_WIDTH_NODES } from '../settings/grid';
import { PATHS_NAME_VALUE_MAP } from '../settings/paths';
import { mapGrid, type Grid } from '../util/grid';

const startNodeValue = PATHS_NAME_VALUE_MAP.start;
const endNodeValue = PATHS_NAME_VALUE_MAP.end;

const useStateOfPath = (
  startingCoor: Coordinate,
  endingCoor: Coordinate,
): [
  Coordinate,
  (newStart: Coordinate) => void,
  Coordinate,
  (newEnd: Coordinate) => void,
  Grid<number>,
  (coor: Coordinate) => void,
  () => void,
  (coor: Coordinate) => void,
  () => void,
] => {
  const [startNode, setStartNode] = useState(startingCoor);
  const [endNode, setEndNode] = useState(endingCoor);

  const getInitalPathState = (start: Coordinate, end: Coordinate) => Array.from({ length: GRID_HEIGHT_NODES }, (_, i) =>
      Array.from({ length: GRID_WIDTH_NODES }, (_, j) => {
        if (coordinatesAreEqual(start, [i, j])) return startNodeValue;
        if (coordinatesAreEqual(end, [i, j])) return endNodeValue;
        return 0;
      }),
    );
  const [stateOfPath, setStateOfPath] = useState(
    getInitalPathState(startingCoor, endingCoor),
  );
  const resetStateOfPath = () => {
    setStateOfPath(getInitalPathState(startNode, endNode));
  };
  const clearVisitedNodes = () => {
    const updatedStateOfPath = mapGrid(stateOfPath, (val) =>
      val === PATHS_NAME_VALUE_MAP['visited'] ? 0 : val,
    );
    setStateOfPath(updatedStateOfPath);
  };

  const setNodeValue = (nodeCoordinate: Coordinate, nodeValue: number) => {
    const newStateOfPath = [...stateOfPath];
    newStateOfPath[nodeCoordinate[0]][nodeCoordinate[1]] = nodeValue;
    setStateOfPath(newStateOfPath);
  };
  const clearNode = (nodeCoordinate: Coordinate) => {
    setNodeValue(nodeCoordinate, 0);
  };
  const updateNodeValue = (
    coor: Coordinate,
    pathName: keyof typeof PATHS_NAME_VALUE_MAP,
    cleanUpFunction?: (coor: Coordinate) => void,
  ) => {
    if (
      coordinatesAreEqual(coor, startNode) ||
      coordinatesAreEqual(coor, endNode)
    )
      return;
    setNodeValue(coor, PATHS_NAME_VALUE_MAP[pathName]);
    if (cleanUpFunction) cleanUpFunction(coor);
  };
  const getCleanUpFunction =
    (
      currentState: Coordinate,
      setState: Dispatch<SetStateAction<Coordinate>>,
    ) =>
    (coor: Coordinate) => {
      clearNode(currentState);
      setState(coor);
    };
  const updateStartNode = (newStart: Coordinate) => {
    updateNodeValue(
      newStart,
      'start',
      getCleanUpFunction(startNode, setStartNode),
    );
  };
  const updateEndNode = (newEnd: Coordinate) => {
    updateNodeValue(newEnd, 'end', getCleanUpFunction(endNode, setEndNode));
  };
  const addPathNode = (coor: Coordinate) => {
    updateNodeValue(coor, 'path');
  };
  const addVisitedNode = (coor: Coordinate) => {
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
