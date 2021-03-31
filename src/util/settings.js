import { flipKeyValuePairs } from './obj';

export const DEFAULT_START_NODE = [4, 4];
export const DEFAULT_END_NODE = [7, 16];

export const GRID_WIDTH = 20;
export const GRID_HEIGHT = 20;

export const TEXTURES_ARRAY = [
  {
    weight: 1,
    name: 'Asphalt',
  },
  {
    weight: 2,
    name: 'Dirt',
  },
  {
    weight: 5,
    name: 'Grass',
  },
  { weight: 10, name: 'Sand' },
  { weight: 20, name: 'Swamp' },
  { weight: Infinity, name: 'Water' },
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

export const PATHS_VALUE_NAME_MAP = {
  1: 'visited',
  2: 'path',
  3: 'start',
  4: 'end',
};

export const PATHS_NAME_VALUE_MAP = flipKeyValuePairs(PATHS_VALUE_NAME_MAP);
