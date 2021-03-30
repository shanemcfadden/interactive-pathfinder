import { useState } from 'react';
import { coordinatesAreEqual } from 'util/arr';

const useStateOfPath = (startingCoor, endingCoor) => {
  const [startNode, setStartNode] = useState(startingCoor);
  const [endNode, setEndNode] = useState(endingCoor);

  const getInitalPathState = (start, end) => {
    return Array.from({ length: 20 }, (row, i) =>
      Array.from({ length: 20 }, (val, j) => {
        if (coordinatesAreEqual(start, [i, j])) return 3;
        if (coordinatesAreEqual(end, [i, j])) return 4;
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
        return val === 1 ? 0 : val;
      });
    });
    setStateOfPath(updatedStateOfPath);
  };

  const updateNode = (nodeCoordinate, nodeValue) => {
    const updatedPath = [...stateOfPath];
    updatedPath[nodeCoordinate[0]][nodeCoordinate[1]] = nodeValue;
    setStateOfPath(updatedPath);
  };
  const updateStartNode = (newStart) => {
    if (coordinatesAreEqual(newStart, endNode)) return;
    updateNode(startNode, 0);
    updateNode(newStart, 3);
    setStartNode(newStart);
  };
  const updateEndNode = (newEnd) => {
    if (coordinatesAreEqual(newEnd, startNode)) return;
    updateNode(endNode, 0);
    updateNode(newEnd, 4);
    setEndNode(newEnd);
  };
  const addPathNode = (coor) => {
    if (
      coordinatesAreEqual(coor, startNode) ||
      coordinatesAreEqual(coor, endNode)
    )
      return;
    updateNode(coor, 2);
  };
  const addVisitedNode = (coor) => {
    if (
      coordinatesAreEqual(coor, startNode) ||
      coordinatesAreEqual(coor, endNode)
    )
      return;
    updateNode(coor, 1);
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
