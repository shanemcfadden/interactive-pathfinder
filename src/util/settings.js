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

export const CUSTOM_TERRAINS = [
  {
    displayText: 'All Grass',
    stateOfNodes: [
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
    ],
  },
  {
    displayText: 'All Water',
    stateOfNodes: [
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
    ],
  },
  {
    displayText: 'Beachside Drive',
    startNode: [0, 0],
    endNode: [17, 34],
    stateOfNodes: [
      ['water', 'asphalt', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'dirt', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'asphalt', 'asphalt', 'asphalt', 'asphalt', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'dirt', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'asphalt', 'asphalt', 'asphalt', 'asphalt', 'asphalt', 'asphalt', 'asphalt', 'asphalt', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'asphalt', 'asphalt', 'grass', 'grass', 'asphalt', 'asphalt', 'asphalt', 'asphalt', 'asphalt', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'dirt', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'asphalt', 'asphalt', 'asphalt', 'asphalt', 'grass', 'grass', 'grass', 'asphalt', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'dirt', 'dirt', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['sand', 'sand', 'sand', 'sand', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'asphalt', 'asphalt', 'asphalt', 'asphalt', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'asphalt', 'asphalt'],
      ['water', 'water', 'water', 'sand', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'asphalt', 'asphalt', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'asphalt', 'grass'],
      ['water', 'water', 'water', 'water', 'sand', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass', 'dirt', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'asphalt', 'asphalt', 'asphalt', 'grass', 'grass', 'grass', 'grass', 'dirt', 'grass', 'grass', 'asphalt', 'grass'],
      ['water', 'water', 'water', 'water', 'water', 'sand', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'asphalt', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'asphalt', 'grass'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'sand', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'dirt', 'grass', 'dirt', 'dirt', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'asphalt', 'grass', 'grass', 'asphalt', 'asphalt', 'asphalt', 'asphalt', 'asphalt', 'asphalt', 'grass'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'sand', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'dirt', 'dirt', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'asphalt', 'asphalt', 'asphalt', 'asphalt', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'asphalt', 'asphalt', 'grass', 'grass', 'grass', 'grass', 'dirt'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'dirt', 'dirt', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'asphalt', 'asphalt', 'asphalt', 'grass', 'grass', 'grass'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'sand', 'sand', 'sand', 'grass', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'dirt', 'dirt', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'asphalt', 'asphalt', 'grass', 'grass'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'sand', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'dirt', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'asphalt', 'grass', 'grass'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'sand', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'asphalt', 'grass', 'grass'],
      ['water', 'water', 'water', 'sand', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'sand', 'sand', 'grass', 'grass', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'asphalt', 'asphalt', 'grass'],
      ['water', 'water', 'water', 'sand', 'sand', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'asphalt', 'asphalt'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'grass', 'grass', 'grass', 'sand', 'grass', 'sand', 'sand', 'sand', 'sand'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand'],
      ['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'sand', 'sand', 'sand', 'sand', 'sand', 'water', 'water', 'water', 'sand', 'sand', 'sand', 'sand', 'sand'],
    ],
  },
  {
    displayText: 'Jackson Pollock',
    startNode: [15, 4],
    endNode: [5, 28],
    stateOfNodes: [
      ['water', 'water', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'water', 'water', 'grass', 'grass', 'grass', 'grass', 'grass', 'water', 'water', 'water', 'water', 'grass', 'asphalt', 'asphalt', 'asphalt', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
      ['water', 'grass', 'water', 'water', 'grass', 'grass', 'grass', 'water', 'water', 'water', 'grass', 'grass', 'grass', 'grass', 'grass', 'sand', 'sand', 'grass', 'grass', 'grass', 'grass', 'water', 'grass', 'grass', 'water', 'grass', 'grass', 'grass', 'asphalt', 'asphalt', 'asphalt', 'grass', 'water', 'water', 'grass'],
      ['grass', 'water', 'grass', 'grass', 'sand', 'asphalt', 'asphalt', 'water', 'swamp', 'swamp', 'sand', 'grass', 'water', 'water', 'grass', 'sand', 'sand', 'sand', 'dirt', 'dirt', 'grass', 'asphalt', 'grass', 'grass', 'water', 'dirt', 'grass', 'grass', 'dirt', 'grass', 'grass', 'asphalt', 'water', 'water', 'grass'],
      ['grass', 'water', 'grass', 'grass', 'asphalt', 'grass', 'grass', 'dirt', 'swamp', 'swamp', 'grass', 'grass', 'water', 'grass', 'water', 'water', 'water', 'grass', 'grass', 'water', 'dirt', 'dirt', 'dirt', 'dirt', 'water', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'water', 'asphalt', 'grass'],
      ['grass', 'grass', 'swamp', 'sand', 'asphalt', 'asphalt', 'grass', 'water', 'swamp', 'swamp', 'water', 'water', 'grass', 'grass', 'swamp', 'grass', 'water', 'water', 'water', 'water', 'water', 'grass', 'grass', 'grass', 'water', 'grass', 'water', 'water', 'water', 'grass', 'grass', 'grass', 'water', 'water', 'grass'],
      ['grass', 'swamp', 'water', 'asphalt', 'water', 'asphalt', 'grass', 'water', 'water', 'swamp', 'grass', 'dirt', 'water', 'grass', 'grass', 'grass', 'sand', 'water', 'water', 'water', 'grass', 'grass', 'grass', 'water', 'grass', 'water', 'water', 'water', 'water', 'grass', 'grass', 'grass', 'grass', 'water', 'grass'],
      ['grass', 'grass', 'asphalt', 'swamp', 'asphalt', 'asphalt', 'water', 'water', 'water', 'dirt', 'water', 'water', 'water', 'water', 'grass', 'grass', 'water', 'water', 'water', 'grass', 'grass', 'sand', 'grass', 'grass', 'sand', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'grass'],
      ['grass', 'grass', 'asphalt', 'sand', 'sand', 'water', 'grass', 'dirt', 'dirt', 'dirt', 'grass', 'grass', 'water', 'grass', 'water', 'water', 'dirt', 'water', 'grass', 'water', 'water', 'asphalt', 'grass', 'swamp', 'swamp', 'water', 'water', 'water', 'water', 'water', 'grass', 'water', 'water', 'water', 'grass'],
      ['water', 'water', 'asphalt', 'water', 'water', 'water', 'water', 'water', 'dirt', 'grass', 'water', 'water', 'water', 'water', 'water', 'dirt', 'water', 'sand', 'sand', 'sand', 'grass', 'water', 'water', 'grass', 'swamp', 'asphalt', 'water', 'grass', 'water', 'water', 'water', 'water', 'grass', 'grass', 'grass'],
      ['water', 'asphalt', 'grass', 'grass', 'grass', 'water', 'water', 'water', 'water', 'water', 'water', 'swamp', 'swamp', 'grass', 'dirt', 'sand', 'sand', 'water', 'grass', 'sand', 'grass', 'grass', 'grass', 'water', 'water', 'sand', 'sand', 'grass', 'grass', 'grass', 'water', 'water', 'asphalt', 'asphalt', 'grass'],
      ['grass', 'asphalt', 'grass', 'sand', 'grass', 'water', 'grass', 'grass', 'grass', 'water', 'grass', 'water', 'dirt', 'swamp', 'sand', 'water', 'water', 'dirt', 'water', 'sand', 'grass', 'grass', 'grass', 'water', 'water', 'water', 'sand', 'sand', 'sand', 'water', 'asphalt', 'asphalt', 'asphalt', 'grass', 'grass'],
      ['grass', 'asphalt', 'grass', 'grass', 'grass', 'water', 'grass', 'water', 'water', 'asphalt', 'grass', 'dirt', 'swamp', 'sand', 'water', 'swamp', 'swamp', 'grass', 'grass', 'sand', 'water', 'grass', 'grass', 'water', 'grass', 'water', 'water', 'water', 'grass', 'asphalt', 'asphalt', 'swamp', 'swamp', 'swamp', 'grass'],
      ['asphalt', 'asphalt', 'grass', 'grass', 'grass', 'sand', 'water', 'water', 'water', 'asphalt', 'dirt', 'water', 'sand', 'sand', 'water', 'grass', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'water', 'water', 'grass', 'water', 'water', 'water', 'water', 'sand', 'grass', 'swamp', 'water', 'grass', 'grass'],
      ['asphalt', 'grass', 'water', 'water', 'water', 'grass', 'water', 'water', 'water', 'asphalt', 'grass', 'water', 'water', 'grass', 'grass', 'grass', 'water', 'sand', 'sand', 'grass', 'grass', 'water', 'water', 'water', 'asphalt', 'water', 'grass', 'water', 'water', 'sand', 'grass', 'grass', 'water', 'water', 'grass'],
      ['asphalt', 'asphalt', 'asphalt', 'grass', 'grass', 'grass', 'grass', 'grass', 'dirt', 'asphalt', 'water', 'dirt', 'dirt', 'water', 'water', 'dirt', 'water', 'grass', 'grass', 'grass', 'water', 'grass', 'water', 'water', 'asphalt', 'asphalt', 'asphalt', 'asphalt', 'sand', 'sand', 'grass', 'grass', 'water', 'swamp', 'grass'],
      ['asphalt', 'asphalt', 'grass', 'grass', 'grass', 'grass', 'dirt', 'dirt', 'grass', 'asphalt', 'grass', 'water', 'grass', 'water', 'water', 'water', 'sand', 'dirt', 'dirt', 'grass', 'sand', 'water', 'grass', 'water', 'dirt', 'grass', 'swamp', 'water', 'sand', 'water', 'grass', 'grass', 'grass', 'grass', 'water'],
      ['grass', 'water', 'water', 'water', 'grass', 'dirt', 'dirt', 'dirt', 'grass', 'water', 'dirt', 'dirt', 'grass', 'grass', 'grass', 'water', 'dirt', 'water', 'water', 'water', 'grass', 'water', 'grass', 'asphalt', 'dirt', 'grass', 'water', 'dirt', 'sand', 'sand', 'grass', 'grass', 'water', 'grass', 'water'],
      ['grass', 'water', 'water', 'dirt', 'grass', 'grass', 'dirt', 'dirt', 'water', 'grass', 'dirt', 'dirt', 'grass', 'grass', 'water', 'water', 'sand', 'asphalt', 'water', 'water', 'water', 'water', 'grass', 'grass', 'dirt', 'grass', 'water', 'asphalt', 'grass', 'grass', 'water', 'swamp', 'water', 'water', 'water'],
      ['grass', 'dirt', 'dirt', 'sand', 'water', 'water', 'asphalt', 'grass', 'water', 'grass', 'water', 'swamp', 'grass', 'water', 'sand', 'water', 'water', 'water', 'water', 'grass', 'water', 'water', 'dirt', 'dirt', 'dirt', 'water', 'grass', 'water', 'grass', 'grass', 'water', 'swamp', 'water', 'swamp', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'swamp', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'water', 'grass', 'grass', 'water', 'water', 'swamp', 'water', 'grass', 'grass', 'dirt', 'grass', 'grass', 'grass', 'asphalt', 'swamp', 'water', 'grass', 'grass', 'dirt', 'water', 'water', 'grass', 'grass'],
      ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'water', 'grass', 'grass', 'water', 'grass', 'grass', 'grass', 'sand', 'grass', 'grass', 'water', 'grass', 'sand', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'water', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
    ],
  },
  {
    displayText: 'Swamp Maze',
    startNode: [0, 0],
    endNode: [20, 34],
    stateOfNodes: [
      ['swamp', 'water', 'swamp', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'water', 'water', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'water', 'water', 'water', 'water', 'water', 'swamp', 'swamp', 'swamp'],
      ['swamp', 'water', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'water', 'water', 'water', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'water', 'water', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp'],
      ['swamp', 'water', 'water', 'water', 'swamp', 'water', 'swamp', 'water', 'swamp', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'water', 'water', 'water', 'swamp', 'water', 'water', 'water', 'water', 'swamp'],
      ['swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp'],
      ['water', 'water', 'water', 'water', 'swamp', 'water', 'water', 'water', 'swamp', 'water', 'swamp', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'swamp', 'water', 'water', 'swamp', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'swamp'],
      ['swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp'],
      ['swamp', 'water', 'swamp', 'water', 'water', 'water', 'swamp', 'water', 'water', 'water', 'water', 'water', 'swamp', 'water', 'swamp', 'water', 'swamp', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'swamp'],
      ['swamp', 'water', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp'],
      ['swamp', 'water', 'swamp', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'swamp', 'water', 'swamp'],
      ['swamp', 'water', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'water', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'water', 'swamp'],
      ['swamp', 'water', 'swamp', 'water', 'swamp', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'swamp', 'water', 'water', 'water', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'water', 'water', 'water', 'water', 'swamp', 'water', 'swamp', 'water', 'swamp'],
      ['swamp', 'water', 'swamp', 'water', 'swamp', 'water', 'swamp', 'swamp', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'water', 'water', 'water', 'water', 'swamp', 'water', 'swamp', 'swamp', 'water', 'swamp', 'water', 'swamp', 'water', 'swamp'],
      ['swamp', 'water', 'swamp', 'water', 'swamp', 'water', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'water', 'water', 'water', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'water', 'water', 'swamp', 'water', 'swamp', 'water', 'swamp', 'water', 'swamp'],
      ['water', 'water', 'swamp', 'water', 'swamp', 'water', 'swamp', 'water', 'swamp', 'water', 'water', 'water', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'water', 'water', 'water', 'water', 'swamp', 'water', 'swamp', 'water', 'swamp', 'swamp', 'water', 'swamp', 'water', 'swamp', 'water', 'swamp'],
      ['swamp', 'swamp', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'water', 'water', 'water', 'water', 'water', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'water', 'water', 'swamp', 'water', 'swamp', 'water', 'swamp'],
      ['swamp', 'water', 'swamp', 'water', 'swamp', 'water', 'water', 'water', 'water', 'water', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'water', 'swamp', 'water', 'water', 'water', 'water', 'water', 'water', 'swamp', 'swamp', 'swamp', 'water', 'water', 'swamp', 'water', 'swamp', 'water', 'swamp'],
      ['swamp', 'water', 'water', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'water', 'water', 'water', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'water', 'water', 'swamp', 'water', 'water', 'water', 'water', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp'],
      ['swamp', 'water', 'swamp', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'water', 'swamp', 'water', 'water', 'water', 'swamp', 'water', 'swamp', 'water', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
      ['swamp', 'swamp', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'water', 'water', 'swamp', 'water', 'water', 'water', 'water', 'water', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp'],
      ['swamp', 'water', 'water', 'water', 'water', 'water', 'water', 'swamp', 'water', 'water', 'water', 'water', 'swamp', 'water', 'swamp', 'water', 'water', 'water', 'water', 'water', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'water', 'water', 'swamp', 'water', 'swamp'],
      ['swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'water', 'water', 'water', 'swamp', 'swamp', 'water', 'water', 'water', 'swamp', 'swamp', 'swamp', 'water', 'swamp'],
    ],
  },
];
