export const coordinatesAreEqual = (
  coor1: Coordinate,
  coor2: Coordinate,
): boolean => JSON.stringify(coor1) === JSON.stringify(coor2);

export const getShallowCopyOfCoordinateIfDefined = (
  coordinate: Coordinate | undefined,
): Coordinate | undefined => (coordinate ? [...coordinate] : undefined);

export type Coordinate = [number, number];
