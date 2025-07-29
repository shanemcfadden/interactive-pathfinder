import type { Coordinate } from '../../util/arr';

export type PathAction = AddVisitedCoordinate | AddPathCoordinate;

interface AddVisitedCoordinate {
  type: 'ADD_VISITED_COORDINATE';
  coordinate: Coordinate;
}
interface AddPathCoordinate {
  type: 'ADD_PATH_COORDINATE';
  coordinate: Coordinate;
}

export interface CompleteCalculation {
  type: 'COMPLETE_CALCULATION';
  pathFound: boolean;
}

export interface CoordinateData {
  distanceFromStart: number;
  previousCoordinate: Coordinate | null;
  coordinate: Coordinate;
}
