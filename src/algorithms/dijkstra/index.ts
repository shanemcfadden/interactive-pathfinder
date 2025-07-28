import MinHeap from '../../models/MinHeap';
import { areCoordinatesEqual, type Coordinate } from '../../util/arr';
import { type Grid } from '../../util/grid';
import { PreviousCoordinateMap } from './PreviousCoordinateMap';
import type { CompleteCalculation, CoordinateData, PathAction } from './types';

export function* getDijkstraGenerator(
  startingCoordinate: Coordinate,
  endingCoordinate: Coordinate,
  initialGrid: Grid<number>,
): Generator<PathAction, CompleteCalculation> {
  const grid = new GridClass(initialGrid);
  // Make the end coordinate accessible even if the weight is Infinity
  grid.setCoordinate(endingCoordinate, 1);
  const coordinatesHeap = initializeCoordinatesHeap(grid, startingCoordinate);

  const previousCoordinateMap = new PreviousCoordinateMap();
  let path: Coordinate[] | null = null;

  while (!path) {
    const current = coordinatesHeap.pop();
    if (!current) {
      throw new Error('No coordinates left in heap');
    }

    if (current.distanceFromStart === Infinity) {
      return {
        type: 'COMPLETE_CALCULATION',
        pathFound: false,
      };
    }

    if (previousCoordinateMap.hasCoordinateBeenVisited(current.coordinate)) {
      continue;
    }
    previousCoordinateMap.setPreviousCoordinate(
      current.coordinate,
      current.previousCoordinate,
    );

    if (areCoordinatesEqual(current.coordinate, endingCoordinate)) {
      path = previousCoordinateMap.getPathToEnd(endingCoordinate);
    } else {
      yield {
        type: 'ADD_VISITED_COORDINATE',
        coordinate: current.coordinate,
      };
      addNeighboringCoordinateDataToHeap(current, grid, coordinatesHeap);
    }
  }

  for (const coordinate of path) {
    yield {
      type: 'ADD_PATH_COORDINATE',
      coordinate,
    };
  }

  return {
    type: 'COMPLETE_CALCULATION',
    pathFound: true,
  };
}

function addNeighboringCoordinateDataToHeap(
  currentCoordinateData: CoordinateData,
  grid: GridClass<number>,
  coordinatesHeap: MinHeap<CoordinateData>,
) {
  coordinatesHeap.push(
    ...grid
      .getNeighboringCoordinates(currentCoordinateData.coordinate)
      .map((neighboringCoordinate) => {
        const neighboringCoordinateDistance = grid.getCoordinate(
          neighboringCoordinate,
        );

        return {
          coordinate: neighboringCoordinate,
          distanceFromStart:
            currentCoordinateData.distanceFromStart +
            neighboringCoordinateDistance,
          previousCoordinate: currentCoordinateData.coordinate,
        };
      }),
  );
}

function initializeCoordinatesHeap(
  grid: GridClass<number>,
  startingCoordinates: Coordinate,
): MinHeap<CoordinateData> {
  const coordinatesHeap = new MinHeap<CoordinateData>(
    (a, b) => a.distanceFromStart - b.distanceFromStart,
  );

  coordinatesHeap.push(
    ...grid.flatMap(
      (_, [a, b]): CoordinateData =>
        areCoordinatesEqual([a, b], startingCoordinates)
          ? {
              coordinate: startingCoordinates,
              distanceFromStart: 0,
              previousCoordinate: null,
            }
          : {
              coordinate: [a, b],
              distanceFromStart: Infinity,
              previousCoordinate: null,
            },
    ),
  );

  return coordinatesHeap;
}

class GridClass<T> {
  private _values: T[][];

  constructor(_values: T[][]) {
    this._values = _values.map((row) => [...row]);
  }

  public get values(): T[][] {
    return this._values;
  }

  setCoordinate(coordinate: Coordinate, value: T): void {
    if (!this.isValidCoordinate(coordinate)) {
      throw new Error(
        `Invalid coordinate: ${JSON.stringify(coordinate)}. Grid size: ${this._values.length}x${this._values[0].length}`,
      );
    }
    this._values[coordinate[0]][coordinate[1]] = value;
  }

  getCoordinate(coordinate: Coordinate): T {
    if (!this.isValidCoordinate(coordinate)) {
      throw new Error(
        `Invalid coordinate: ${JSON.stringify(coordinate)}. Grid size: ${this._values.length}x${this._values[0].length}`,
      );
    }
    return this._values[coordinate[0]][coordinate[1]];
  }

  public flatMap<U>(
    flatMapFunction: (element: T, coordinate: Coordinate) => U | U[],
  ): U[] {
    return this._values.flatMap((row, i) =>
      row.flatMap((element, j) => flatMapFunction(element, [i, j])),
    );
  }

  public getNeighboringCoordinates([i, j]: Coordinate): Coordinate[] {
    const possibleNeighbors: Coordinate[] = [
      [i - 1, j],
      [i, j - 1],
      [i + 1, j],
      [i, j + 1],
    ];

    return possibleNeighbors.filter((coordinate) =>
      this.isValidCoordinate(coordinate),
    );
  }

  private isValidCoordinate([a, b]: Coordinate): boolean {
    return (
      a >= 0 && a < this._values.length && b >= 0 && b < this._values[a].length
    );
  }
}
