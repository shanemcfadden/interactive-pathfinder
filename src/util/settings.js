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

export const DEFAULT_START_NODE = [4, 4];
export const DEFAULT_END_NODE = [7, 16];

export const GRID_WIDTH = 20;
export const GRID_HEIGHT = 20;

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

export const TEXTURES_VALUE_NAME_MAP = TEXTURES_ARRAY.reduce(
  (map, { weight, name }) => {
    map[weight] = name.toLowerCase();
    return map;
  },
  {}
);

export const TEXTURES_NAME_VALUE_MAP = flipKeyValuePairs(
  TEXTURES_VALUE_NAME_MAP
);

export const PATHS_NAME_VALUE_MAP = flipKeyValuePairs(PATHS_VALUE_NAME_MAP);
