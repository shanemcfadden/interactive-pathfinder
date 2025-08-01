export const areCoordinatesEqual = (
  [x1, y1]: Coordinate,
  [x2, y2]: Coordinate,
): boolean => x1 === x2 && y1 === y2;

export type Coordinate = [number, number];
