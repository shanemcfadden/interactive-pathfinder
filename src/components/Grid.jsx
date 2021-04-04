import React, { useState } from 'react';
import Node from 'components/Node';
import 'styles/Grid.css';
import {
  PATHS_VALUE_NAME_MAP,
  TEXTURES_VALUE_NAME_MAP,
  GRID_HEIGHT_NODES,
  GRID_MAX_HEIGHT_PX,
  GRID_WIDTH_NODES,
  GRID_WIDTH_PX,
  GRID_GAP_PX,
  NODE_WIDTH_PX,
} from 'util/settings';

const Grid = ({
  onClickFunction,
  stateOfNodes,
  setStateOfNodes,
  findingPath,
  stateOfPath,
  currentTexture,
}) => {
  const [currentlyDrawingTextures, setCurrentlyDrawingTextures] = useState(
    false
  );
  const addTexture = (i, j, textureNumber) => {
    const newStateOfNodes = [...stateOfNodes];
    newStateOfNodes[i][j] = textureNumber;
    setStateOfNodes(newStateOfNodes);
  };
  const createHandleOnMouseDown = (i, j) => {
    return (e) => {
      e.preventDefault();
      setCurrentlyDrawingTextures(true);
      addTexture(i, j, currentTexture);
    };
  };
  const createHandleOnMouseEnter = (i, j) => {
    if (currentlyDrawingTextures) {
      return (e) => {
        e.preventDefault();
        addTexture(i, j, currentTexture);
      };
    }
  };

  const handleOnMouseUp = (e) => {
    e.preventDefault();
    setCurrentlyDrawingTextures(false);
  };

  return (
    <div
      className="grid"
      style={{
        gap: `${GRID_GAP_PX}px`,
        gridTemplateColumns: `repeat(${GRID_WIDTH_NODES}, ${NODE_WIDTH_PX}px`,
        gridTemplateRows: `repeat(${GRID_HEIGHT_NODES}, 33.09px)`,
        height: `${GRID_MAX_HEIGHT_PX}px`,
        width: `${GRID_WIDTH_PX}px`,
      }}
      onMouseLeave={() => {
        setCurrentlyDrawingTextures(false);
      }}
    >
      {stateOfNodes.map((row, i) => {
        return row.map((val, j) => {
          const currentState =
            PATHS_VALUE_NAME_MAP[stateOfPath[i][j]] ||
            TEXTURES_VALUE_NAME_MAP[val];
          return (
            <Node
              currentState={currentState}
              handleClick={() => {
                onClickFunction(i, j);
              }}
              handleOnMouseDown={
                currentTexture ? createHandleOnMouseDown(i, j) : undefined
              }
              handleOnMouseEnter={
                currentTexture ? createHandleOnMouseEnter(i, j) : undefined
              }
              handleOnMouseUp={currentTexture ? handleOnMouseUp : undefined}
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
