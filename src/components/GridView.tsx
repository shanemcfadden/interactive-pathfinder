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
import { type TextureWeightValue } from '../settings/textures';
import '../styles/Grid.css';
import { areCoordinatesEqual } from '../util/arr';
import {
  usePathFindingContext,
  usePathFindingDispatchContext,
} from '../contexts/PathFindingContext';

const GridView = ({
  onClickFunction,
  currentTexture,
  setSampleTerrainToNull,
}: {
  onClickFunction: (i: number, j: number) => void;
  currentTexture: TextureWeightValue | null;
  setSampleTerrainToNull: () => void;
}) => {
  const dispatchPath = usePathFindingDispatchContext();
  const { start, end, path, terrainMap: terrain } = usePathFindingContext();
  const [currentlyDrawingTextures, setCurrentlyDrawingTextures] =
    useState(false);
  const createHandleOnMouseDown =
    (i: number, j: number): MouseEventHandler =>
    (e) => {
      e.preventDefault();
      if (!currentTexture) {
        return;
      }
      setCurrentlyDrawingTextures(true);
      dispatchPath({
        type: 'UPDATE_TERRAIN_TEXTURE',
        coordinate: [i, j],
        texture: currentTexture,
      });
      setSampleTerrainToNull();
    };
  const createHandleOnMouseEnter =
    (i: number, j: number): MouseEventHandler =>
    (e) => {
      e.preventDefault();
      if (!currentTexture || !currentlyDrawingTextures) {
        return;
      }
      dispatchPath({
        type: 'UPDATE_TERRAIN_TEXTURE',
        coordinate: [i, j],
        texture: currentTexture,
      });
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
      {terrain.values.map((row, i) =>
        row.map((textureValue, j) => (
          <Node
            currentTexture={textureValue}
            isStart={areCoordinatesEqual([i, j], start)}
            isEnd={areCoordinatesEqual([i, j], end)}
            currentPathState={path.getCoordinate([i, j])}
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
