export const coordinatesAreEqual = (
  coor1: Coordinate,
  coor2: Coordinate,
): boolean => JSON.stringify(coor1) === JSON.stringify(coor2);

export const getShallowCopyIfDefined = <T>(
  arr: Array<T> | undefined,
): Array<T> | undefined => (arr ? [...arr] : undefined);

export type Coordinate = [number, number];
