import React, { useState } from 'react';
import Node from '../Node/Node';
import './Grid.css';

const Grid = ({
  startNode,
  endNode,
  onClickFunction,
  stateOfNodes,
  setStateOfNodes,
  drawingWallsAllowed,
}) => {
  // receive state of walls
  // receive setStateOfNodes
  // make an add wall function
  // add it for onMouseDown when state of walls is true
  const [currentlyDrawingWalls, setCurrentlyDrawingWalls] = useState(false);
  const addWall = (i, j) => {
    const newStateOfNodes = [...stateOfNodes];
    if (
      (startNode[0] !== i && startNode[1] !== j) ||
      (endNode[0] !== i && endNode[1] !== j)
    ) {
      newStateOfNodes[i][j] = 'wall';
    }
    setStateOfNodes(newStateOfNodes);
  };

  const createHandleOnMouseDown = (i, j) => {
    return (e) => {
      e.preventDefault();
      setCurrentlyDrawingWalls(true);
      addWall(i, j);
    };
  };
  const createHandleOnMouseEnter = (i, j) => {
    return (e) => {
      e.preventDefault();
      addWall(i, j);
    };
  };

  const handleOnMouseUp = (e) => {
    e.preventDefault();
    setCurrentlyDrawingWalls(false);
  };

  return (
    <div
      className="grid"
      onMouseLeave={() => {
        setCurrentlyDrawingWalls(false);
      }}
    >
      {stateOfNodes.map((row, i) => {
        return row.map((val, j) => {
          let currentState;
          if (i === startNode[0] && j === startNode[1]) {
            currentState = 'start';
          } else if (i === endNode[0] && j === endNode[1]) {
            currentState = 'end';
          } else {
            currentState = val;
          }
          return (
            <Node
              currentState={currentState}
              handleClick={() => {
                onClickFunction(i, j);
              }}
              handleOnMouseDown={createHandleOnMouseDown(i, j)}
              handleOnMouseEnter={createHandleOnMouseEnter(i, j)}
              handleOnMouseUp={handleOnMouseUp}
              drawingWallsAllowed={drawingWallsAllowed}
              currentlyDrawingWalls={currentlyDrawingWalls}
              key={`${i}-${j}`}
            />
          );
        });
      })}
    </div>
  );
};

export default Grid;
