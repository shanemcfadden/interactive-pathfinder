import type { Coordinate } from '../util/coordinate';

export const DEFAULT_START_NODE: Coordinate = [4, 4];
export const DEFAULT_END_NODE: Coordinate = [7, 16];

export const GRID_GAP_PX = 2;
export const GRID_WIDTH_PX = 1100;
export const GRID_MAX_HEIGHT_PX = 675;
export const GRID_WIDTH_NODES = 35;

export const NODE_WIDTH_PX =
  (GRID_WIDTH_PX - GRID_GAP_PX * (GRID_WIDTH_NODES - 1)) / GRID_WIDTH_NODES;
export const GRID_HEIGHT_NODES = Math.floor(
  (GRID_MAX_HEIGHT_PX + GRID_GAP_PX) / (NODE_WIDTH_PX + GRID_GAP_PX),
);
export const GRID_HEIGHT_PX =
  GRID_HEIGHT_NODES * (NODE_WIDTH_PX + GRID_GAP_PX) - GRID_GAP_PX;
