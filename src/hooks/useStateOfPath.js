import { useState } from 'react';
import { coordinatesAreEqual } from 'util/arr';

const useStateOfPath = (startingCoor, endingCoor) => {
  const [startNode, setStartNode] = useState(startingCoor);
  const [endNode, setEndNode] = useState(endingCoor);
  const [stateOfPath, setStateOfPath] = useState(
    Array.from({ length: 20 }, (row, i) =>
      Array.from({ length: 20 }, (val, j) => {
        if (coordinatesAreEqual(startNode, [i, j])) return 3;
        if (coordinatesAreEqual(endNode, [i, j])) return 4;
        return 0;
      })
    )
  );
  const updateStartNode = (coor) => {
    if (coordinatesAreEqual(coor, endNode)) return;
    const updatedPath = [...stateOfPath];
    updatedPath[startNode[0]][startNode[1]] = 0;
    updatedPath[coor[0]][coor[1]] = 3;
    setStartNode(coor);
    setStateOfPath(updatedPath);
  };
  const updateEndNode = (coor) => {
    if (coordinatesAreEqual(coor, startNode)) return;
    const updatedPath = [...stateOfPath];
    updatedPath[endNode[0]][endNode[1]] = 0;
    updatedPath[coor[0]][coor[1]] = 4;
    setEndNode(coor);
    setStateOfPath(updatedPath);
  };
  const addPathNode = (coor) => {
    if (
      coordinatesAreEqual(coor, startNode) ||
      coordinatesAreEqual(coor, endNode)
    )
      return;
    const updatedPath = [...stateOfPath];
    updatedPath[coor[0]][coor[1]] = 2;
    setStateOfPath(updatedPath);
  };
  const addVisitedNode = (coor) => {
    if (
      coordinatesAreEqual(coor, startNode) ||
      coordinatesAreEqual(coor, endNode)
    )
      return;
    const updatedPath = [...stateOfPath];
    updatedPath[coor[0]][coor[1]] = 1;
    setStateOfPath(updatedPath);
  };
  const resetStateOfPath = () => {
    setStateOfPath(
      Array.from({ length: 20 }, (row, i) =>
        Array.from({ length: 20 }, (val, j) => {
          if (coordinatesAreEqual(startNode, [i, j])) return 3;
          if (coordinatesAreEqual(endNode, [i, j])) return 4;
          return 0;
        })
      )
    );
  };
  const clearVisitedNodes = () => {
    const updatedStateOfPath = stateOfPath.map((row) => {
      return row.map((val) => {
        return val === 1 ? 0 : val;
      });
    });
    setStateOfPath(updatedStateOfPath);
  };
  return [
    startNode,
    updateStartNode,
    endNode,
    updateEndNode,
    stateOfPath,
    addPathNode,
    addVisitedNode,
    resetStateOfPath,
    clearVisitedNodes,
  ];
};

export default useStateOfPath;
