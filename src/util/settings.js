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
    weight: 3,
    name: 'Grass',
  },
  { weight: 4, name: 'Sand' },
  { weight: 5, name: 'Swamp' },
  { weight: Infinity, name: 'Water' },
];

export const TEXTURES_VALUE_NAME_MAP = TEXTURES_ARRAY.reduce(
  (map, { weight, name }) => {
    map[weight] = name.toLowerCase();
    return map;
  },
  {}
);
