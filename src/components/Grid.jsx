import React, { useState } from 'react';
import Node from 'components/Node';
import 'styles/Grid.css';
import {
  GRID_HEIGHT_NODES,
  GRID_WIDTH_NODES,
  GRID_WIDTH_PX,
  GRID_GAP_PX,
  NODE_WIDTH_PX,
  GRID_HEIGHT_PX,
} from 'settings/grid';
import { PATHS_VALUE_NAME_MAP, TEXTURES_VALUE_NAME_MAP } from 'util/settings';

const Grid = ({
  onClickFunction,
  stateOfNodes,
  setStateOfNodes,
  findingPath,
  stateOfPath,
  currentTexture,
  setSampleTerrainToNull,
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
      setSampleTerrainToNull();
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
        gridTemplateColumns: `repeat(${GRID_WIDTH_NODES}, ${NODE_WIDTH_PX}px)`,
        gridTemplateRows: `repeat(${GRID_HEIGHT_NODES}, ${NODE_WIDTH_PX}px)`,
        height: `${GRID_HEIGHT_PX}px`,
        width: `${GRID_WIDTH_PX}px`,
      }}
      onMouseLeave={() => {
        setCurrentlyDrawingTextures(false);
      }}
    >
      {stateOfNodes.map((row, i) => {
        return row.map((val, j) => {
          return (
            <Node
              currentTexture={TEXTURES_VALUE_NAME_MAP[val]}
              currentPathState={PATHS_VALUE_NAME_MAP[stateOfPath[i][j]]}
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
