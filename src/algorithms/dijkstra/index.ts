import MinHeap from '../../models/MinHeap';
import { areCoordinatesEqual, type Coordinate } from '../../util/arr';
import { type Grid } from '../../util/grid';
import { PreviousCoordinateMap } from './PreviousCoordinateMap';
import type { CompleteCalculation, CoordinateData, PathAction } from './types';

export function* getDijkstraGenerator(
  start: Coordinate,
  end: Coordinate,
  initialGrid: Grid<number>,
): Generator<PathAction, CompleteCalculation> {
  const grid = new GridClass(initialGrid);

  // Make the end coordinate accessible even if the weight is Infinity
  grid.setCoordinate(end, 1);
  const coordinatesDataMinHeap = initializeCoordinateDataMinHeap(grid, start);

  const previousCoordinateMap = new PreviousCoordinateMap();
  let pathToEnd: Coordinate[] | null = null;

  while (!pathToEnd) {
    const currentCoordinateData = coordinatesDataMinHeap.pop();
    if (!currentCoordinateData) {
      throw new Error('No coordinates left in heap');
    }

    if (currentCoordinateData.distanceFromStart === Infinity) {
      return {
        type: 'COMPLETE_CALCULATION',
        pathFound: false,
      };
    }

    if (
      previousCoordinateMap.hasCoordinateBeenVisited(
        currentCoordinateData.coordinate,
      )
    ) {
      continue;
    }

    previousCoordinateMap.setPreviousCoordinate(
      currentCoordinateData.coordinate,
      currentCoordinateData.previousCoordinate,
    );

    if (areCoordinatesEqual(currentCoordinateData.coordinate, end)) {
      pathToEnd = previousCoordinateMap.getPathToEnd(end);
      break;
    }

    yield {
      type: 'ADD_VISITED_COORDINATE',
      coordinate: currentCoordinateData.coordinate,
    };
    addNeighboringCoordinateDataToMinHeap(
      currentCoordinateData,
      grid,
      coordinatesDataMinHeap,
    );
  }

  for (const coordinate of pathToEnd) {
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

function addNeighboringCoordinateDataToMinHeap(
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

function initializeCoordinateDataMinHeap(
  grid: GridClass<number>,
  start: Coordinate,
): MinHeap<CoordinateData> {
  const coordinatesHeap = new MinHeap<CoordinateData>(
    (a, b) => a.distanceFromStart - b.distanceFromStart,
  );

  coordinatesHeap.push(
    ...grid.flatMap(
      (_, [a, b]): CoordinateData =>
        areCoordinatesEqual([a, b], start)
          ? {
              coordinate: start,
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

  public setCoordinate(coordinate: Coordinate, value: T): void {
    if (!this.isValidCoordinate(coordinate)) {
      throw new Error(
        `Invalid coordinate: ${JSON.stringify(coordinate)}. Grid size: ${this._values.length}x${this._values[0].length}`,
      );
    }
    this._values[coordinate[0]][coordinate[1]] = value;
  }

  public getCoordinate(coordinate: Coordinate): T {
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

  public getNeighboringCoordinates([a, b]: Coordinate): Coordinate[] {
    const possibleNeighbors: Coordinate[] = [
      [a - 1, b],
      [a, b - 1],
      [a + 1, b],
      [a, b + 1],
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
