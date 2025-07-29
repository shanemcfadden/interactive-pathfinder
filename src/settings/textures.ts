import type { ValueOf } from '../types';

export const TextureWeight = {
  Asphalt: 1,
  Dirt: 2,
  Grass: 5,
  Sand: 10,
  Swamp: 20,
  Water: Infinity,
};

export type TextureWeightValue = ValueOf<typeof TextureWeight>;

export const TEXTURES_ARRAY: {
  weight: TextureWeightValue;
  name: string;
  difficulty: string;
}[] = [
  {
    weight: TextureWeight.Asphalt,
    name: 'Asphalt',
    difficulty: 'super easy',
  },
  {
    weight: TextureWeight.Dirt,
    name: 'Dirt',
    difficulty: 'easy',
  },
  {
    weight: TextureWeight.Grass,
    name: 'Grass',
    difficulty: 'moderate',
  },
  {
    weight: TextureWeight.Sand,
    name: 'Sand',
    difficulty: 'difficult',
  },
  {
    weight: TextureWeight.Swamp,
    name: 'Swamp',
    difficulty: 'super difficult',
  },
  {
    weight: TextureWeight.Water,
    name: 'Water',
    difficulty: 'impossible',
  },
] as const;
