export const mapGrid = <T, U>(grid: Grid<T>, mapFn: (element: T) => U) =>
  grid.map((row) => row.map(mapFn));

export const shallowCopyOfGrid = <T>(grid: Grid<T>): Grid<T> =>
  grid.map((row) => [...row]);

export type Grid<T> = Array<Array<T>>;
