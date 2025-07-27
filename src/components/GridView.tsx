import { useState, type MouseEventHandler } from 'react';
import Node from './Node';
import {
  GRID_HEIGHT_NODES,
  GRID_WIDTH_NODES,
  GRID_WIDTH_PX,
  GRID_GAP_PX,
  NODE_WIDTH_PX,
  GRID_HEIGHT_PX,
} from '../settings/grid';
import { PATHS_VALUE_NAME_MAP } from '../settings/paths';
import { TEXTURES_VALUE_NAME_MAP } from '../settings/textures';
import { shallowCopyOfGrid, type Grid } from '../util/grid';
import '../styles/Grid.css';

const GridView = ({
  onClickFunction,
  stateOfNodes,
  setStateOfNodes,
  stateOfPath,
  currentTexture,
  setSampleTerrainToNull,
}: {
  onClickFunction: (i: number, j: number) => void;
  stateOfNodes: Grid<number>;
  setStateOfNodes: (newState: number[][]) => void;
  stateOfPath: Grid<number>;
  currentTexture: number | null;
  setSampleTerrainToNull: () => void;
}) => {
  const [currentlyDrawingTextures, setCurrentlyDrawingTextures] =
    useState(false);
  const addTexture = (i: number, j: number, textureNumber: number) => {
    const newStateOfNodes = shallowCopyOfGrid(stateOfNodes);
    newStateOfNodes[i][j] = textureNumber;
    setStateOfNodes(newStateOfNodes);
  };
  const createHandleOnMouseDown =
    (i: number, j: number): MouseEventHandler =>
    (e) => {
      e.preventDefault();
      if (!currentTexture) {
        return;
      }
      setCurrentlyDrawingTextures(true);
      addTexture(i, j, currentTexture);
      setSampleTerrainToNull();
    };
  const createHandleOnMouseEnter = (
    i: number,
    j: number,
  ): MouseEventHandler => (e) => {
      e.preventDefault();
      if (!currentTexture || !currentlyDrawingTextures) {
        return;
      }
      addTexture(i, j, currentTexture);
    };

  const handleOnMouseUp: MouseEventHandler = (e) => {
    e.preventDefault();
    if (!currentlyDrawingTextures) {
      return;
    }
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
      {stateOfNodes.map((row, i) =>
        row.map((val, j) => (
          <Node
            currentTexture={TEXTURES_VALUE_NAME_MAP[val]}
            currentPathState={PATHS_VALUE_NAME_MAP[stateOfPath[i][j]]}
            handleClick={() => {
              onClickFunction(i, j);
            }}
            handleOnMouseDown={createHandleOnMouseDown(i, j)}
            handleOnMouseEnter={createHandleOnMouseEnter(i, j)}
            handleOnMouseUp={handleOnMouseUp}
            key={`${i}-${j}`}
          />
        )),
      )}
    </div>
  );
};

export default GridView;
