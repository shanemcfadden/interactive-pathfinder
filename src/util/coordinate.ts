export const areCoordinatesEqual = (
  coor1: Coordinate,
  coor2: Coordinate,
): boolean => JSON.stringify(coor1) === JSON.stringify(coor2);

export type Coordinate = [number, number];
