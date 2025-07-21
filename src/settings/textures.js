import { flipKeyValuePairs } from '../util/obj';

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
  {},
);

export const TEXTURES_NAME_VALUE_MAP = flipKeyValuePairs(
  TEXTURES_VALUE_NAME_MAP,
);
