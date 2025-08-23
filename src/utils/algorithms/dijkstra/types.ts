import type { Coordinate } from "../../coordinate";

export type PathAction = AddVisitedCoordinate | AddPathCoordinate;

interface AddVisitedCoordinate {
  type: "ADD_VISITED_COORDINATE";
  coordinate: Coordinate;
}
interface AddPathCoordinate {
  type: "ADD_PATH_COORDINATE";
  coordinate: Coordinate;
}

export interface CompleteCalculation {
  type: "COMPLETE_CALCULATION";
  isPathFound: boolean;
}

export interface CoordinateData {
  distanceFromStart: number;
  previousCoordinate: Coordinate | null;
  coordinate: Coordinate;
}
