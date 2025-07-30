import { useCallback, type MouseEventHandler } from 'react';
import Node from './Node';
import {
  GRID_HEIGHT_NODES,
  GRID_WIDTH_NODES,
  GRID_WIDTH_PX,
  GRID_GAP_PX,
  NODE_WIDTH_PX,
  GRID_HEIGHT_PX,
} from '../settings/grid';
// import { type TextureWeightValue } from '../settings/textures';
import '../styles/Grid.css';
// import { areCoordinatesEqual } from '../util/arr';
import {
  usePathFindingContext,
  // usePathFindingDispatchContext,
} from '../contexts/PathFindingContext';
import {
  useUserActionContext,
  useUserActionDispatchContext,
} from '../contexts/UserActionContext';

const GridView = () => {
  const { terrainMap: terrain } = usePathFindingContext();
  const userAction = useUserActionContext();
  const dispatchUserAction = useUserActionDispatchContext();

  const onMouseLeave = useCallback<MouseEventHandler>(
    (e) => {
      e.preventDefault();

      if (userAction.type !== 'APPLY_TEXTURE') {
        return;
      }

      dispatchUserAction({
        type: 'PREPARE_APPLY_TEXTURE',
        texture: userAction.texture,
      });
    },
    [userAction, dispatchUserAction],
  );
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
      onMouseLeave={onMouseLeave}
    >
      {terrain.values.map((row, i) =>
        row.map((_, j) => (
          <Node rowIndex={i} columnIndex={j} key={`${i}-${j}`} />
        )),
      )}
    </div>
  );
};

export default GridView;
