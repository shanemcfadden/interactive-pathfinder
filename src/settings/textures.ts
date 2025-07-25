export type Texture = 'asphalt' | 'dirt' | 'grass' | 'sand' | 'swamp' | 'water';

export const TEXTURES_NAME_VALUE_MAP: Record<Texture, number> = {
  asphalt: 1,
  dirt: 2,
  grass: 5,
  sand: 10,
  swamp: 20,
  water: Infinity,
};

export const TEXTURES_VALUE_NAME_MAP = Object.entries(
  TEXTURES_NAME_VALUE_MAP,
).reduce<Record<string, Texture>>(
  (map, [name, value]): Record<string, Texture> => {
    map[value] = name as Texture;
    return map;
  },
  {},
);

export const TEXTURES_ARRAY: {
  weight: number;
  name: string;
  difficulty: string;
}[] = [
  {
    weight: TEXTURES_NAME_VALUE_MAP.asphalt,
    name: 'Asphalt',
    difficulty: 'super easy',
  },
  {
    weight: TEXTURES_NAME_VALUE_MAP.dirt,
    name: 'Dirt',
    difficulty: 'easy',
  },
  {
    weight: TEXTURES_NAME_VALUE_MAP.grass,
    name: 'Grass',
    difficulty: 'moderate',
  },
  {
    weight: TEXTURES_NAME_VALUE_MAP.sand,
    name: 'Sand',
    difficulty: 'difficult',
  },
  {
    weight: TEXTURES_NAME_VALUE_MAP.swamp,
    name: 'Swamp',
    difficulty: 'super difficult',
  },
  {
    weight: TEXTURES_NAME_VALUE_MAP.water,
    name: 'Water',
    difficulty: 'impossible',
  },
] as const;
