import React, { useRef, useState } from 'react';
import Node from 'components/Node';
import 'styles/Grid.css';

const Grid = ({
  startNode,
  endNode,
  onClickFunction,
  stateOfNodes,
  setStateOfNodes,
  drawingWallsAllowed,
  findingPath,
}) => {
  const [currentlyDrawingWalls, setCurrentlyDrawingWalls] = useState(false);
  const addWall = (i, j) => {
    const newStateOfNodes = [...stateOfNodes];
    newStateOfNodes[i][j] = 'wall';
    setStateOfNodes(newStateOfNodes);
  };
  const textures = useRef({
    1: 'asphalt',
    2: 'dirt',
    3: 'grass',
    4: 'sand',
    5: 'swamp',
    Infinity: 'water',
  });

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
            currentState = textures.current[val];
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
              findingPath={findingPath}
            />
          );
        });
      })}
    </div>
  );
};

export default Grid;
