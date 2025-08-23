import { type Coordinate, Grid } from '../utils';
import { GRID_HEIGHT_NODES, GRID_WIDTH_NODES } from './grid';
import { TextureWeight, type TextureWeightValue } from './textures';

export interface Terrain {
  key: TerrainKey;
  displayText: string;
  textureMap: Grid<TextureWeightValue>;
  startCoordinate?: Coordinate;
  endCoordinate?: Coordinate;
}

export type TerrainKey = 'all-grass' | 'all-water' | 'beachside-drive' | 'jackson-pollock' | 'swamp-maze';

export type AsciiTextureWeight = 'a' | 'd' | 'g' | 's' | 'w' | 'x';
export const ASCII_TO_TEXTURE_WEIGHT: Record<AsciiTextureWeight, TextureWeightValue> = {
  a: TextureWeight.Asphalt,
  d: TextureWeight.Dirt,
  g: TextureWeight.Grass,
  s: TextureWeight.Sand,
  w: TextureWeight.Water,
  x: TextureWeight.Swamp,
};

export const DEFAULT_STARTING_TERRAIN: Terrain = {
  key: 'all-grass',
  displayText: 'All Grass',
  textureMap: new Grid(Array.from({ length: GRID_HEIGHT_NODES }, () => Array.from({ length: GRID_WIDTH_NODES }, () => TextureWeight.Grass))),
};

export const SAMPLE_TERRAINS: Terrain[] = [
  DEFAULT_STARTING_TERRAIN,
  {
    key: 'all-water',
    displayText: 'All Water',
    textureMap: new Grid(Array.from({ length: GRID_HEIGHT_NODES }, () => Array.from({ length: GRID_WIDTH_NODES }, () => TextureWeight.Water))),
  },
  {
    key: 'beachside-drive',
    displayText: 'Beachside Drive',
    startCoordinate: [0, 0],
    endCoordinate: [17, 34],
    textureMap: new Grid<AsciiTextureWeight>([
      ['a', 'a', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'd', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
      ['g', 'a', 'a', 'a', 'a', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'd', 'g', 'g'],
      ['g', 'g', 'g', 'g', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
      ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'a', 'a', 'g', 'g', 'a', 'a', 'a', 'a', 'a', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'd', 'g', 'g', 'g', 'g', 'g'],
      ['g', 'g', 'g', 's', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'a', 'a', 'a', 'a', 'g', 'g', 'g', 'a', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'd', 'd', 'g', 'g', 'g', 'g', 'g'],
      ['s', 's', 's', 's', 's', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'a', 'a', 'a', 'a', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'a', 'a'],
      ['w', 'w', 'w', 's', 's', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'a', 'a', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'a', 'g'],
      ['w', 'w', 'w', 'w', 's', 's', 'g', 'g', 'g', 'g', 'g', 'd', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'a', 'a', 'a', 'g', 'g', 'g', 'g', 'd', 'g', 'g', 'a', 'g'],
      ['w', 'w', 'w', 'w', 'w', 's', 's', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'a', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'a', 'g'],
      ['w', 'w', 'w', 'w', 'w', 'w', 's', 's', 'g', 'g', 'g', 'g', 'g', 'g', 'd', 'g', 'd', 'd', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'a', 'g', 'g', 'a', 'a', 'a', 'a', 'a', 'a', 'g'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 's', 's', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'd', 'd', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'a', 'a', 'a', 'a', 'g', 'g', 'g', 'g', 'g', 'g'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 's', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'a', 'a', 'g', 'g', 'g', 'g', 'd'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 's', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'd', 'd', 'g', 'g', 'g', 'g', 'g', 'g', 'a', 'a', 'a', 'g', 'g', 'g'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 's', 's', 's', 'g', 's', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'd', 'd', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'a', 'a', 'g', 'g'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 's', 's', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'd', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'a', 'g', 'g'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 's', 's', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 's', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'a', 'g', 'g'],
      ['w', 'w', 'w', 's', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 's', 's', 'g', 'g', 's', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'a', 'a', 'g'],
      ['w', 'w', 'w', 's', 's', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 's', 's', 's', 's', 's', 's', 's', 's', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'a', 'a'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 'g', 'g', 'g', 's', 'g', 's', 's', 's', 's'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 's', 's', 's', 's', 's', 'w', 'w', 'w', 's', 's', 's', 's', 's'],
    ]).map((ascii) => ASCII_TO_TEXTURE_WEIGHT[ascii]),
  },
  {
    key: 'jackson-pollock',
    displayText: 'Jackson Pollock',
    startCoordinate: [15, 4],
    endCoordinate: [5, 28],
    textureMap: new Grid<AsciiTextureWeight>([
      ['w', 'w', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w', 'w', 'g', 'g', 'g', 'g', 'g', 'w', 'w', 'w', 'w', 'g', 'a', 'a', 'a', 'g', 'g', 'g', 'g', 'g', 'g'],
      ['w', 'g', 'w', 'w', 'g', 'g', 'g', 'w', 'w', 'w', 'g', 'g', 'g', 'g', 'g', 's', 's', 'g', 'g', 'g', 'g', 'w', 'g', 'g', 'w', 'g', 'g', 'g', 'a', 'a', 'a', 'g', 'w', 'w', 'g'],
      ['g', 'w', 'g', 'g', 's', 'a', 'a', 'w', 'x', 'x', 's', 'g', 'w', 'w', 'g', 's', 's', 's', 'd', 'd', 'g', 'a', 'g', 'g', 'w', 'd', 'g', 'g', 'd', 'g', 'g', 'a', 'w', 'w', 'g'],
      ['g', 'w', 'g', 'g', 'a', 'g', 'g', 'd', 'x', 'x', 'g', 'g', 'w', 'g', 'w', 'w', 'w', 'g', 'g', 'w', 'd', 'd', 'd', 'd', 'w', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w', 'a', 'g'],
      ['g', 'g', 'x', 's', 'a', 'a', 'g', 'w', 'x', 'x', 'w', 'w', 'g', 'g', 'x', 'g', 'w', 'w', 'w', 'w', 'w', 'g', 'g', 'g', 'w', 'g', 'w', 'w', 'w', 'g', 'g', 'g', 'w', 'w', 'g'],
      ['g', 'x', 'w', 'a', 'w', 'a', 'g', 'w', 'w', 'x', 'g', 'd', 'w', 'g', 'g', 'g', 's', 'w', 'w', 'w', 'g', 'g', 'g', 'w', 'g', 'w', 'w', 'w', 'w', 'g', 'g', 'g', 'g', 'w', 'g'],
      ['g', 'g', 'a', 'x', 'a', 'a', 'w', 'w', 'w', 'd', 'w', 'w', 'w', 'w', 'g', 'g', 'w', 'w', 'w', 'g', 'g', 's', 'g', 'g', 's', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'g'],
      ['g', 'g', 'a', 's', 's', 'w', 'g', 'd', 'd', 'd', 'g', 'g', 'w', 'g', 'w', 'w', 'd', 'w', 'g', 'w', 'w', 'a', 'g', 'x', 'x', 'w', 'w', 'w', 'w', 'w', 'g', 'w', 'w', 'w', 'g'],
      ['w', 'w', 'a', 'w', 'w', 'w', 'w', 'w', 'd', 'g', 'w', 'w', 'w', 'w', 'w', 'd', 'w', 's', 's', 's', 'g', 'w', 'w', 'g', 'x', 'a', 'w', 'g', 'w', 'w', 'w', 'w', 'g', 'g', 'g'],
      ['w', 'a', 'g', 'g', 'g', 'w', 'w', 'w', 'w', 'w', 'w', 'x', 'x', 'g', 'd', 's', 's', 'w', 'g', 's', 'g', 'g', 'g', 'w', 'w', 's', 's', 'g', 'g', 'g', 'w', 'w', 'a', 'a', 'g'],
      ['g', 'a', 'g', 's', 'g', 'w', 'g', 'g', 'g', 'w', 'g', 'w', 'd', 'x', 's', 'w', 'w', 'd', 'w', 's', 'g', 'g', 'g', 'w', 'w', 'w', 's', 's', 's', 'w', 'a', 'a', 'a', 'g', 'g'],
      ['g', 'a', 'g', 'g', 'g', 'w', 'g', 'w', 'w', 'a', 'g', 'd', 'x', 's', 'w', 'x', 'x', 'g', 'g', 's', 'w', 'g', 'g', 'w', 'g', 'w', 'w', 'w', 'g', 'a', 'a', 'x', 'x', 'x', 'g'],
      ['a', 'a', 'g', 'g', 'g', 's', 'w', 'w', 'w', 'a', 'd', 'w', 's', 's', 'w', 'g', 'w', 'x', 'x', 'x', 'x', 'w', 'w', 'w', 'g', 'w', 'w', 'w', 'w', 's', 'g', 'x', 'w', 'g', 'g'],
      ['a', 'g', 'w', 'w', 'w', 'g', 'w', 'w', 'w', 'a', 'g', 'w', 'w', 'g', 'g', 'g', 'w', 's', 's', 'g', 'g', 'w', 'w', 'w', 'a', 'w', 'g', 'w', 'w', 's', 'g', 'g', 'w', 'w', 'g'],
      ['a', 'a', 'a', 'g', 'g', 'g', 'g', 'g', 'd', 'a', 'w', 'd', 'd', 'w', 'w', 'd', 'w', 'g', 'g', 'g', 'w', 'g', 'w', 'w', 'a', 'a', 'a', 'a', 's', 's', 'g', 'g', 'w', 'x', 'g'],
      ['a', 'a', 'g', 'g', 'g', 'g', 'd', 'd', 'g', 'a', 'g', 'w', 'g', 'w', 'w', 'w', 's', 'd', 'd', 'g', 's', 'w', 'g', 'w', 'd', 'g', 'x', 'w', 's', 'w', 'g', 'g', 'g', 'g', 'w'],
      ['g', 'w', 'w', 'w', 'g', 'd', 'd', 'd', 'g', 'w', 'd', 'd', 'g', 'g', 'g', 'w', 'd', 'w', 'w', 'w', 'g', 'w', 'g', 'a', 'd', 'g', 'w', 'd', 's', 's', 'g', 'g', 'w', 'g', 'w'],
      ['g', 'w', 'w', 'd', 'g', 'g', 'd', 'd', 'w', 'g', 'd', 'd', 'g', 'g', 'w', 'w', 's', 'a', 'w', 'w', 'w', 'w', 'g', 'g', 'd', 'g', 'w', 'a', 'g', 'g', 'w', 'x', 'w', 'w', 'w'],
      ['g', 'd', 'd', 's', 'w', 'w', 'a', 'g', 'w', 'g', 'w', 'x', 'g', 'w', 's', 'w', 'w', 'w', 'w', 'g', 'w', 'w', 'd', 'd', 'd', 'w', 'g', 'w', 'g', 'g', 'w', 'x', 'w', 'x', 'g'],
      ['g', 'g', 'g', 'g', 'g', 'x', 'g', 'g', 'g', 'g', 'g', 'g', 'w', 'g', 'g', 'w', 'w', 'x', 'w', 'g', 'g', 'd', 'g', 'g', 'g', 'a', 'x', 'w', 'g', 'g', 'd', 'w', 'w', 'g', 'g'],
      ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w', 'g', 'g', 'w', 'g', 'g', 'g', 's', 'g', 'g', 'w', 'g', 's', 'g', 'g', 'g', 'g', 'g', 'g', 'w', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
    ]).map((ascii) => ASCII_TO_TEXTURE_WEIGHT[ascii]),
  },
  {
    key: 'swamp-maze',
    displayText: 'Swamp Maze',
    startCoordinate: [0, 0],
    endCoordinate: [20, 34],
    textureMap: new Grid<AsciiTextureWeight>([
      ['x', 'w', 'x', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'w', 'w', 'w', 'x', 'x', 'x', 'x', 'x', 'w', 'w', 'w', 'w', 'w', 'w', 'x', 'x', 'x'],
      ['x', 'w', 'x', 'x', 'x', 'w', 'x', 'x', 'x', 'x', 'x', 'w', 'w', 'w', 'w', 'w', 'x', 'x', 'x', 'x', 'x', 'w', 'w', 'w', 'w', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'x'],
      ['x', 'w', 'w', 'w', 'x', 'w', 'x', 'w', 'x', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'x', 'x', 'x', 'w', 'x', 'w', 'w', 'w', 'x', 'w', 'w', 'w', 'w', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'x', 'w', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'x', 'x', 'x', 'w', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'x'],
      ['w', 'w', 'w', 'w', 'x', 'w', 'w', 'w', 'x', 'w', 'x', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'x', 'w', 'w', 'x', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'x', 'x', 'x', 'w', 'x', 'x', 'x', 'w', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'w', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'w', 'x', 'w', 'w', 'w', 'x', 'w', 'w', 'w', 'w', 'w', 'x', 'w', 'x', 'w', 'x', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'x'],
      ['x', 'w', 'x', 'x', 'x', 'w', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'x', 'w', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'x'],
      ['x', 'w', 'x', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'x', 'w', 'x'],
      ['x', 'w', 'x', 'w', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'x', 'x', 'x', 'x', 'w', 'w', 'x', 'w', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'x', 'w', 'x'],
      ['x', 'w', 'x', 'w', 'x', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'x', 'w', 'w', 'w', 'w', 'x', 'x', 'x', 'x', 'w', 'x', 'w', 'w', 'w', 'w', 'x', 'w', 'x', 'w', 'x'],
      ['x', 'w', 'x', 'w', 'x', 'w', 'x', 'x', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'x', 'x', 'x', 'x', 'w', 'x', 'w', 'w', 'w', 'w', 'x', 'w', 'x', 'x', 'w', 'x', 'w', 'x', 'w', 'x'],
      ['x', 'w', 'x', 'w', 'x', 'w', 'x', 'w', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'w', 'w', 'w', 'x', 'w', 'x', 'x', 'x', 'x', 'w', 'x', 'w', 'w', 'x', 'w', 'x', 'w', 'x', 'w', 'x'],
      ['w', 'w', 'x', 'w', 'x', 'w', 'x', 'w', 'x', 'w', 'w', 'w', 'w', 'x', 'x', 'x', 'x', 'w', 'x', 'w', 'w', 'w', 'w', 'x', 'w', 'x', 'w', 'x', 'x', 'w', 'x', 'w', 'x', 'w', 'x'],
      ['x', 'x', 'x', 'w', 'x', 'x', 'x', 'w', 'x', 'x', 'x', 'w', 'w', 'w', 'w', 'w', 'x', 'w', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'x', 'w', 'w', 'x', 'w', 'x', 'w', 'x'],
      ['x', 'w', 'x', 'w', 'x', 'w', 'w', 'w', 'w', 'w', 'x', 'w', 'x', 'x', 'x', 'w', 'x', 'w', 'x', 'w', 'w', 'w', 'w', 'w', 'w', 'x', 'x', 'x', 'w', 'w', 'x', 'w', 'x', 'w', 'x'],
      ['x', 'w', 'w', 'w', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'x', 'w', 'w', 'w', 'x', 'w', 'x', 'x', 'x', 'w', 'w', 'x', 'w', 'w', 'w', 'w', 'w', 'x', 'x', 'x', 'x', 'w', 'x'],
      ['x', 'w', 'x', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'x', 'w', 'w', 'w', 'x', 'w', 'x', 'w', 'w', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
      ['x', 'x', 'x', 'w', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'x', 'x', 'x', 'w', 'x', 'w', 'w', 'x', 'w', 'w', 'w', 'w', 'w', 'x', 'w', 'x', 'x', 'x', 'x', 'x', 'x'],
      ['x', 'w', 'w', 'w', 'w', 'w', 'w', 'x', 'w', 'w', 'w', 'w', 'x', 'w', 'x', 'w', 'w', 'w', 'w', 'w', 'w', 'x', 'x', 'x', 'x', 'x', 'w', 'x', 'x', 'x', 'w', 'w', 'x', 'w', 'x'],
      ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'x', 'x', 'x', 'x', 'w', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'w', 'w', 'x', 'x', 'w', 'w', 'w', 'x', 'x', 'x', 'w', 'x'],
    ]).map((ascii) => ASCII_TO_TEXTURE_WEIGHT[ascii]),
  },
] as const;
