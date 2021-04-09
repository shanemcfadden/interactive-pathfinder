import { flipKeyValuePairs } from './obj';

export const PAGE_HEADER = 'Interactive pathfinder';
export const PAGE_DESCRIPTION = [
  `
    Find the shortest path! Select a starting block and an ending block.
    To make things trickier, draw some walls for the pathfinder to dodge.
    Once you press find path, the computer will search for the shortest
    path using Dijkstra's algorithm.
  `,
  `
    Make a guess, and see if you can beat the computer at its own game!
  `,
];

export const MODAL_HEADER = 'There are no possible paths!';

export const DEFAULT_START_NODE = [4, 4];
export const DEFAULT_END_NODE = [7, 16];

export const GRID_GAP_PX = 2;
export const GRID_WIDTH_PX = 1100;
export const GRID_MAX_HEIGHT_PX = 675;
export const GRID_WIDTH_NODES = 35;
export const NODE_WIDTH_PX = (GRID_WIDTH_PX - GRID_GAP_PX * (GRID_WIDTH_NODES - 1)) / GRID_WIDTH_NODES;
export const GRID_HEIGHT_NODES = Math.floor((GRID_MAX_HEIGHT_PX + GRID_GAP_PX) / (NODE_WIDTH_PX + GRID_GAP_PX));
export const GRID_HEIGHT_PX = GRID_HEIGHT_NODES * (NODE_WIDTH_PX + GRID_GAP_PX) - GRID_GAP_PX;

export const PATHS_VALUE_NAME_MAP = {
  1: 'visited',
  2: 'path',
  3: 'start',
  4: 'end',
};

export const TEXTURES_ARRAY = [
  {
    weight: 1,
    name: 'Asphalt',
    difficulty: 'super easy',
  },
  {
    weight: 2,
    name: 'Dirt',
    difficulty: 'easy',
  },
  {
    weight: 5,
    name: 'Grass',
    difficulty: 'moderate',
  },
  { weight: 10, name: 'Sand', difficulty: 'difficult' },
  { weight: 20, name: 'Swamp', difficulty: 'super difficult' },
  { weight: Infinity, name: 'Water', difficulty: 'impossible' },
];

export const TEXTURES_VALUE_NAME_MAP = TEXTURES_ARRAY.reduce((map, { weight, name }) => {
  map[weight] = name.toLowerCase();
  return map;
}, {});

export const TEXTURES_NAME_VALUE_MAP = flipKeyValuePairs(TEXTURES_VALUE_NAME_MAP);

export const PATHS_NAME_VALUE_MAP = flipKeyValuePairs(PATHS_VALUE_NAME_MAP);

export const CUSTOM_TERRAINS = {
  allGrass: {
    stateOfNodes: [
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    ],
  },
  allWater: {
    stateOfNodes: [
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
    ],
  },
  beachsideDrive: {
    startNode: [0, 0],
    endNode: [17, 34],
    stateOfNodes: [
      [Infinity, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 5, 5],
      [5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 5, 5, 5, 5, 5],
      [5, 5, 5, 10, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 5, 5, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 2, 2, 5, 5, 5, 5, 5],
      [10, 10, 10, 10, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1],
      [Infinity, Infinity, Infinity, 10, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 5],
      [Infinity, Infinity, Infinity, Infinity, 10, 10, 5, 5, 5, 5, 5, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 5, 5, 5, 5, 2, 5, 5, 1, 5],
      [Infinity, Infinity, Infinity, Infinity, Infinity, 10, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5, 5, 5, 5, 5, 5, 1, 5],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 10, 10, 5, 5, 5, 5, 5, 5, 2, 5, 2, 2, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5, 1, 1, 1, 1, 1, 1, 5],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 10, 10, 5, 5, 5, 5, 5, 5, 5, 2, 2, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 2],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 2, 5, 5, 5, 5, 5, 5, 1, 1, 1, 5, 5, 5],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 10, 10, 10, 5, 10, 5, 5, 5, 5, 5, 5, 5, 5, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 5, 5],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 10, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 10, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5],
      [Infinity, Infinity, Infinity, 10, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 10, 10, 5, 5, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 5],
      [Infinity, Infinity, Infinity, 10, 10, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 10, 10, 10, 10, 10, 10, 10, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 5, 5, 5, 10, 5, 10, 10, 10, 10],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 10, 10, 10, 10, 10, Infinity, Infinity, Infinity, 10, 10, 10, 10, 10],
    ],
  },
  jacksonPollock: {
    startNode: [15, 4],
    endNode: [5, 28],
    stateOfNodes: [
      [Infinity, Infinity, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, Infinity, Infinity, 5, 5, 5, 5, 5, Infinity, Infinity, Infinity, Infinity, 5, 1, 1, 1, 5, 5, 5, 5, 5, 5],
      [Infinity, 5, Infinity, Infinity, 5, 5, 5, Infinity, Infinity, Infinity, 5, 5, 5, 5, 5, 10, 10, 5, 5, 5, 5, Infinity, 5, 5, Infinity, 5, 5, 5, 1, 1, 1, 5, Infinity, Infinity, 5],
      [5, Infinity, 5, 5, 10, 1, 1, Infinity, 20, 20, 10, 5, Infinity, Infinity, 5, 10, 10, 10, 2, 2, 5, 1, 5, 5, Infinity, 2, 5, 5, 2, 5, 5, 1, Infinity, Infinity, 5],
      [5, Infinity, 5, 5, 1, 5, 5, 2, 20, 20, 5, 5, Infinity, 5, Infinity, Infinity, Infinity, 5, 5, Infinity, 2, 2, 2, 2, Infinity, 5, 5, 5, 5, 5, 5, 5, Infinity, 1, 5],
      [5, 5, 20, 10, 1, 1, 5, Infinity, 20, 20, Infinity, Infinity, 5, 5, 20, 5, Infinity, Infinity, Infinity, Infinity, Infinity, 5, 5, 5, Infinity, 5, Infinity, Infinity, Infinity, 5, 5, 5, Infinity, Infinity, 5],
      [5, 20, Infinity, 1, Infinity, 1, 5, Infinity, Infinity, 20, 5, 2, Infinity, 5, 5, 5, 10, Infinity, Infinity, Infinity, 5, 5, 5, Infinity, 5, Infinity, Infinity, Infinity, Infinity, 5, 5, 5, 5, Infinity, 5],
      [5, 5, 1, 20, 1, 1, Infinity, Infinity, Infinity, 2, Infinity, Infinity, Infinity, Infinity, 5, 5, Infinity, Infinity, Infinity, 5, 5, 10, 5, 5, 10, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 5],
      [5, 5, 1, 10, 10, Infinity, 5, 2, 2, 2, 5, 5, Infinity, 5, Infinity, Infinity, 2, Infinity, 5, Infinity, Infinity, 1, 5, 20, 20, Infinity, Infinity, Infinity, Infinity, Infinity, 5, Infinity, Infinity, Infinity, 5],
      [Infinity, Infinity, 1, Infinity, Infinity, Infinity, Infinity, Infinity, 2, 5, Infinity, Infinity, Infinity, Infinity, Infinity, 2, Infinity, 10, 10, 10, 5, Infinity, Infinity, 5, 20, 1, Infinity, 5, Infinity, Infinity, Infinity, Infinity, 5, 5, 5],
      [Infinity, 1, 5, 5, 5, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 20, 20, 5, 2, 10, 10, Infinity, 5, 10, 5, 5, 5, Infinity, Infinity, 10, 10, 5, 5, 5, Infinity, Infinity, 1, 1, 5],
      [5, 1, 5, 10, 5, Infinity, 5, 5, 5, Infinity, 5, Infinity, 2, 20, 10, Infinity, Infinity, 2, Infinity, 10, 5, 5, 5, Infinity, Infinity, Infinity, 10, 10, 10, Infinity, 1, 1, 1, 5, 5],
      [5, 1, 5, 5, 5, Infinity, 5, Infinity, Infinity, 1, 5, 2, 20, 10, Infinity, 20, 20, 5, 5, 10, Infinity, 5, 5, Infinity, 5, Infinity, Infinity, Infinity, 5, 1, 1, 20, 20, 20, 5],
      [1, 1, 5, 5, 5, 10, Infinity, Infinity, Infinity, 1, 2, Infinity, 10, 10, Infinity, 5, Infinity, 20, 20, 20, 20, Infinity, Infinity, Infinity, 5, Infinity, Infinity, Infinity, Infinity, 10, 5, 20, Infinity, 5, 5],
      [1, 5, Infinity, Infinity, Infinity, 5, Infinity, Infinity, Infinity, 1, 5, Infinity, Infinity, 5, 5, 5, Infinity, 10, 10, 5, 5, Infinity, Infinity, Infinity, 1, Infinity, 5, Infinity, Infinity, 10, 5, 5, Infinity, Infinity, 5],
      [1, 1, 1, 5, 5, 5, 5, 5, 2, 1, Infinity, 2, 2, Infinity, Infinity, 2, Infinity, 5, 5, 5, Infinity, 5, Infinity, Infinity, 1, 1, 1, 1, 10, 10, 5, 5, Infinity, 20, 5],
      [1, 1, 5, 5, 5, 5, 2, 2, 5, 1, 5, Infinity, 5, Infinity, Infinity, Infinity, 10, 2, 2, 5, 10, Infinity, 5, Infinity, 2, 5, 20, Infinity, 10, Infinity, 5, 5, 5, 5, Infinity],
      [5, Infinity, Infinity, Infinity, 5, 2, 2, 2, 5, Infinity, 2, 2, 5, 5, 5, Infinity, 2, Infinity, Infinity, Infinity, 5, Infinity, 5, 1, 2, 5, Infinity, 2, 10, 10, 5, 5, Infinity, 5, Infinity],
      [5, Infinity, Infinity, 2, 5, 5, 2, 2, Infinity, 5, 2, 2, 5, 5, Infinity, Infinity, 10, 1, Infinity, Infinity, Infinity, Infinity, 5, 5, 2, 5, Infinity, 1, 5, 5, Infinity, 20, Infinity, Infinity, Infinity],
      [5, 2, 2, 10, Infinity, Infinity, 1, 5, Infinity, 5, Infinity, 20, 5, Infinity, 10, Infinity, Infinity, Infinity, Infinity, 5, Infinity, Infinity, 2, 2, 2, Infinity, 5, Infinity, 5, 5, Infinity, 20, Infinity, 20, 5],
      [5, 5, 5, 5, 5, 20, 5, 5, 5, 5, 5, 5, Infinity, 5, 5, Infinity, Infinity, 20, Infinity, 5, 5, 2, 5, 5, 5, 1, 20, Infinity, 5, 5, 2, Infinity, Infinity, 5, 5],
      [5, 5, 5, 5, 5, 5, 5, 5, Infinity, 5, 5, Infinity, 5, 5, 5, 10, 5, 5, Infinity, 5, 10, 5, 5, 5, 5, 5, 5, Infinity, 5, 5, 5, 5, 5, 5, 5],
    ],
  },
  swampMaze: {
    startNode: [0, 0],
    endNode: [20, 34],
    stateOfNodes: [
      [20, Infinity, 20, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 20, 20, 20, 20, 20, 20, 20, Infinity, Infinity, Infinity, Infinity, 20, 20, 20, 20, 20, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 20, 20, 20],
      [20, Infinity, 20, 20, 20, Infinity, 20, 20, 20, 20, 20, Infinity, Infinity, Infinity, Infinity, Infinity, 20, 20, 20, 20, 20, Infinity, Infinity, Infinity, Infinity, 20, 20, 20, 20, 20, 20, 20, 20, Infinity, 20],
      [20, Infinity, Infinity, Infinity, 20, Infinity, 20, Infinity, 20, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 20, 20, 20, Infinity, 20, Infinity, Infinity, Infinity, 20, Infinity, Infinity, Infinity, Infinity, 20],
      [20, 20, 20, 20, 20, 20, 20, Infinity, 20, Infinity, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, Infinity, 20, 20, 20, Infinity, 20, 20, 20, 20, 20, 20, Infinity, 20],
      [Infinity, Infinity, Infinity, Infinity, 20, Infinity, Infinity, Infinity, 20, Infinity, 20, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 20, Infinity, Infinity, 20, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 20],
      [20, 20, 20, 20, 20, 20, 20, Infinity, 20, 20, 20, Infinity, 20, 20, 20, Infinity, 20, 20, 20, 20, 20, 20, 20, 20, Infinity, Infinity, 20, 20, 20, 20, 20, 20, 20, 20, 20],
      [20, Infinity, 20, Infinity, Infinity, Infinity, 20, Infinity, Infinity, Infinity, Infinity, Infinity, 20, Infinity, 20, Infinity, 20, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 20],
      [20, Infinity, 20, 20, 20, Infinity, 20, 20, 20, 20, 20, 20, 20, Infinity, 20, Infinity, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, Infinity, 20],
      [20, Infinity, 20, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 20, Infinity, 20],
      [20, Infinity, 20, Infinity, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, Infinity, 20, 20, 20, 20, Infinity, Infinity, 20, Infinity, 20, 20, 20, 20, 20, 20, Infinity, 20, Infinity, 20],
      [20, Infinity, 20, Infinity, 20, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 20, Infinity, Infinity, Infinity, Infinity, 20, 20, 20, 20, Infinity, 20, Infinity, Infinity, Infinity, Infinity, 20, Infinity, 20, Infinity, 20],
      [20, Infinity, 20, Infinity, 20, Infinity, 20, 20, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 20, 20, 20, 20, Infinity, 20, Infinity, Infinity, Infinity, Infinity, 20, Infinity, 20, 20, Infinity, 20, Infinity, 20, Infinity, 20],
      [20, Infinity, 20, Infinity, 20, Infinity, 20, Infinity, 20, 20, 20, 20, 20, 20, Infinity, Infinity, Infinity, Infinity, 20, Infinity, 20, 20, 20, 20, Infinity, 20, Infinity, Infinity, 20, Infinity, 20, Infinity, 20, Infinity, 20],
      [Infinity, Infinity, 20, Infinity, 20, Infinity, 20, Infinity, 20, Infinity, Infinity, Infinity, Infinity, 20, 20, 20, 20, Infinity, 20, Infinity, Infinity, Infinity, Infinity, 20, Infinity, 20, Infinity, 20, 20, Infinity, 20, Infinity, 20, Infinity, 20],
      [20, 20, 20, Infinity, 20, 20, 20, Infinity, 20, 20, 20, Infinity, Infinity, Infinity, Infinity, Infinity, 20, Infinity, 20, 20, 20, 20, 20, 20, 20, 20, Infinity, 20, Infinity, Infinity, 20, Infinity, 20, Infinity, 20],
      [20, Infinity, 20, Infinity, 20, Infinity, Infinity, Infinity, Infinity, Infinity, 20, Infinity, 20, 20, 20, Infinity, 20, Infinity, 20, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 20, 20, 20, Infinity, Infinity, 20, Infinity, 20, Infinity, 20],
      [20, Infinity, Infinity, Infinity, 20, 20, 20, 20, 20, 20, 20, Infinity, 20, Infinity, Infinity, Infinity, 20, Infinity, 20, 20, 20, Infinity, Infinity, 20, Infinity, Infinity, Infinity, Infinity, Infinity, 20, 20, 20, 20, Infinity, 20],
      [20, Infinity, 20, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 20, Infinity, Infinity, Infinity, 20, Infinity, 20, Infinity, Infinity, 20, 20, 20, 20, 20, 20, 20, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [20, 20, 20, Infinity, 20, 20, 20, 20, 20, 20, 20, 20, 20, Infinity, 20, 20, 20, Infinity, 20, Infinity, Infinity, 20, Infinity, Infinity, Infinity, Infinity, Infinity, 20, Infinity, 20, 20, 20, 20, 20, 20],
      [20, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 20, Infinity, Infinity, Infinity, Infinity, 20, Infinity, 20, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 20, 20, 20, 20, 20, Infinity, 20, 20, 20, Infinity, Infinity, 20, Infinity, 20],
      [20, 20, 20, 20, 20, 20, 20, 20, Infinity, 20, 20, 20, 20, Infinity, 20, 20, 20, 20, 20, 20, 20, 20, Infinity, Infinity, Infinity, 20, 20, Infinity, Infinity, Infinity, 20, 20, 20, Infinity, 20],
    ],
  },
};
