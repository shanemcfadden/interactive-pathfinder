import type { Coordinate } from './arr';

export const mapGrid = <T, U>(
  grid: Grid<T>,
  mapFn: (element: T, coordinate: Coordinate) => U,
) => grid.map((row, i) => row.map((element, j) => mapFn(element, [i, j])));

export const shallowCopyOfGrid = <T>(grid: Grid<T>): Grid<T> =>
  grid.map((row) => [...row]);

export const findCoordinateInGrid = <T>(
  grid: Grid<T>,
  findFn: (element: T, coordinate: Coordinate) => boolean,
): Coordinate | undefined => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (findFn(grid[i][j], [i, j])) {
        return [i, j];
      }
    }
  }
};

export type Grid<T> = Array<Array<T>>;
