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
  const updateNode = (nodeCoordinate, nodeValue) => {
    const updatedPath = [...stateOfPath];
    updatedPath[nodeCoordinate[0]][nodeCoordinate[1]] = nodeValue;
    setStateOfPath(updatedPath);
  };
  const updateStartNode = (coor) => {
    if (coordinatesAreEqual(coor, endNode)) return;
    updateNode(startNode, 0);
    updateNode(coor, 3);
    setStartNode(coor);
  };
  const updateEndNode = (coor) => {
    if (coordinatesAreEqual(coor, startNode)) return;
    updateNode(endNode, 0);
    updateNode(coor, 4);
    setEndNode(coor);
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
